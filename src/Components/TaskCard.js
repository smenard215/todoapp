import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, Menu, MenuItem, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon

const statuses = ['In Progress', 'On Hold', 'Completed', 'To Do'];

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChipClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (status) => {
    if (status !== task.status) {
      onStatusChange(task.id, status);
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getChipColor = (status) => {
    switch (status) {
      case 'To Do':
        return '#f4ff81'; 
      case 'In Progress':
        return 'secondary.main'; 
      case 'On Hold':
        return 'error.main'; 
      case 'Completed':
        return 'success.main'; 
      default:
        return 'default'; 
    }
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2, position: 'relative', border: '1px solid #eeeeee' }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ textTransform: 'capitalize' }} // Capitalize title
        >
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Date: {task.date}
        </Typography>
        <Typography variant="body2" color="text.primary" gutterBottom>
          Description: {task.description}
        </Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          <Tooltip title="Select status" arrow>
            <Chip
              label={task.status}
              onClick={handleChipClick}
              sx={{
                cursor: 'pointer',
                backgroundColor: getChipColor(task.status), 
                color: task.status === 'To Do' ? 'black' : 'white', 
              }}
            />
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {statuses.map(status => (
              <MenuItem
                key={status}
                onClick={() => handleMenuItemClick(status)}
              >
                {status}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </CardContent>
      <IconButton
        onClick={() => onDelete(task.id)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'error.main', // Set the color to red
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default TaskCard;
