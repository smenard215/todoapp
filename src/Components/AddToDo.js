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

const StyledMenuItem = styled(MenuItem)(({ theme, color }) => ({
  backgroundColor: color,
  color: theme.palette.getContrastText(color),
}));

export default function AddToDo({ onChange, onDateChange, newTask }) {
  const handleDateChange = (date) => {
    onDateChange(date ? date.format('YYYY-MM-DD') : '');
  };

  return (
    <Stack spacing={2} sx={{ width: 500 }}>
      <Input
        placeholder="Task Name"
        name="title"
        value={newTask.title || ''}
        onChange={onChange}
        required
      />
      <DatePicker
        name="date"
        value={newTask.date ? dayjs(newTask.date) : null}
        onChange={(date) => handleDateChange(date)}
        renderInput={(params) => <TextField {...params} />}
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={newTask.status || ''}
          onChange={onChange}
          label="Status"
        >
          <StyledMenuItem value="In Progress" color="#9C27B0">In Progress</StyledMenuItem>
          <StyledMenuItem value="Completed" color="#1A5E20">Completed</StyledMenuItem>
          <StyledMenuItem value="On Hold" color="#C62828">On Hold</StyledMenuItem>
          <StyledMenuItem value="To Do" color="#E0E0E0">To Do</StyledMenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Description"
        multiline
        rows={4}
        name="description"
        value={newTask.description || ''}
        onChange={onChange}
        variant="outlined"
        required
        inputProps={{ maxLength: 150 }} // Limit input length to 150 characters
      />
      <Typography variant="body2" color="text.secondary">
        {newTask.description?.length || 0} / 150 characters
      </Typography>
    </Stack>
  );
}
