import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, Menu, MenuItem, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 

// List of possible task statuses
const statuses = ['In Progress', 'On Hold', 'Completed', 'To Do'];

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  // State to manage the anchor element for the status menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle clicking on the status chip
  const handleChipClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the clicked chip
  };

  // Function to handle selecting a status from the menu
  const handleMenuItemClick = (status) => {
    if (status !== task.status) {
      onStatusChange(task.id, status); // Call the onStatusChange callback if the status has changed
    }
    setAnchorEl(null); // Close the menu
  };

  // Function to close the status menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to get the background color for the status chip based on its status
  const getChipColor = (status) => {
    switch (status) {
      case 'To Do':
        return '#f4ff81'; // Light yellow for "To Do"
      case 'In Progress':
        return 'secondary.main'; // Use the secondary color from the theme
      case 'On Hold':
        return 'error.main'; // Use the error color from the theme 
      case 'Completed':
        return 'success.main'; // Use the success color from the theme 
      default:
        return 'default'; // Default color
    }
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2, position: 'relative', border: '1px solid #eeeeee' }}>
      <CardContent>
        {/* Display task title */}
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ textTransform: 'capitalize' }} // Capitalize the title text
        >
          {task.title}
        </Typography>
        {/* Display task date */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Date: {task.date}
        </Typography>
        {/* Display task description */}
        <Typography variant="body2" color="text.primary" gutterBottom>
          Description: {task.description}
        </Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          {/* Tooltip to show status chip explanation */}
          <Tooltip title="Select status" arrow>
            <Chip
              label={task.status} // Display the current status on the chip
              onClick={handleChipClick} // Open the menu when the chip is clicked
              sx={{
                cursor: 'pointer',
                backgroundColor: getChipColor(task.status), // Set chip background color based on status
                color: task.status === 'To Do' ? 'black' : 'white', // Set text color based on status
              }}
            />
          </Tooltip>
          {/* Menu to select a new status */}
          <Menu
            anchorEl={anchorEl} // Position the menu relative to the clicked chip
            open={Boolean(anchorEl)} // Open the menu if anchorEl is not null
            onClose={handleClose} // Close the menu when an item is clicked or the menu is closed
          >
            {statuses.map(status => (
              <MenuItem
                key={status}
                onClick={() => handleMenuItemClick(status)} // Change status when a menu item is clicked
              >
                {status}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </CardContent>
      {/* Button to delete the task */}
      <IconButton
        onClick={() => onDelete(task.id)} // Call onDelete with the task's id when clicked
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'error.main', 
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default TaskCard;
