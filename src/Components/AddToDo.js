import * as React from 'react';
import Input from '@mui/material/Input'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { Typography } from '@mui/material'; 
import Stack from '@mui/material/Stack'; 
import Select from '@mui/material/Select'; 
import MenuItem from '@mui/material/MenuItem'; 
import FormControl from '@mui/material/FormControl'; 
import InputLabel from '@mui/material/InputLabel'; 
import TextField from '@mui/material/TextField'; 
import { styled } from '@mui/material/styles'; 
import dayjs from 'dayjs'; 

// StyledMenuItem is a custom-styled MenuItem component with dynamic background color
const StyledMenuItem = styled(MenuItem)(({ theme, color }) => ({
  backgroundColor: color,
  color: theme.palette.getContrastText(color),
}));

// AddToDo component for adding or editing a task
export default function AddToDo({ onChange, onDateChange, newTask }) {
  
  // Handler function to format and update the date when selected
  const handleDateChange = (date) => {
    // Convert date to 'YYYY-MM-DD' format or set to an empty string if no date is selected
    onDateChange(date ? date.format('YYYY-MM-DD') : '');
  };

  return (
    <Stack spacing={2} sx={{ width: 500 }}>
      {/* Input field for entering the task title */}
      <Input
        placeholder="Task Name"
        name="title"
        value={newTask.title || ''} // Default to empty string if no title
        onChange={onChange} // Handle changes to the input
        required // Mark this field as required
      />
      
      {/* DatePicker component for selecting the task date */}
      <DatePicker
        name="date"
        value={newTask.date ? dayjs(newTask.date) : null} // Convert date string to Dayjs object or null
        onChange={(date) => handleDateChange(date)} // Handle date changes
        renderInput={(params) => <TextField {...params} />} // Render input field for DatePicker
      />
      
      {/* FormControl to manage the select dropdown for task status */}
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel> {/* Label for the status dropdown */}
        <Select
          name="status"
          onChange={onChange} // Handle changes to the select input
          label="Status"
          value={newTask.status || 'To Do'} // Default to 'To Do' if no status is set
        >
          {/* Styled menu items for the status dropdown */}
          <StyledMenuItem value="In Progress" color="#9C27B0">In Progress</StyledMenuItem>
          <StyledMenuItem value="Completed" color="#1A5E20">Completed</StyledMenuItem>
          <StyledMenuItem value="On Hold" color="#C62828">On Hold</StyledMenuItem>
          <StyledMenuItem value="To Do" color="#E0E0E0">To Do</StyledMenuItem>
        </Select>
      </FormControl>
      
      {/* TextField for entering a description of the task */}
      <TextField
        label="Description"
        multiline // Allows for multiple lines of text
        rows={4} // Set the number of rows for the multiline input
        name="description"
        value={newTask.description || ''} // Default to empty string if no description
        onChange={onChange} // Handle changes to the text input
        variant="outlined" // Use outlined variant for the TextField
        required // Mark this field as required
        inputProps={{ maxLength: 150 }} // Limit input length to 150 characters
      />
      
      {/* Display the current length of the description and the maximum allowed characters */}
      <Typography variant="body2" color="text.secondary">
        {newTask.description?.length || 0} / 150 characters
      </Typography>
    </Stack>
  );
}
