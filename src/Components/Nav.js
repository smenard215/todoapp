import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddToDo from './AddToDo';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

// Create a theme with a custom secondary color
const theme = createTheme({
  palette: {
    secondary: {
      main: '#b2dfdb',
    },
  },
});

export default function Nav({ onAddTask }) {
  // State to manage the visibility of the dialog
  const [open, setOpen] = React.useState(false);
  // State to manage the new task details
  const [newTask, setNewTask] = React.useState({ title: '', date: '', status: 'To Do', description: '' });

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle changes in input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle changes in date picker
  const handleDateChange = (date) => {
    setNewTask(prev => ({ ...prev, date: date ? dayjs(date).format('YYYY-MM-DD') : '' }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if title and status are provided before submitting
    if (newTask.title && newTask.status) {
      // Call the onAddTask function passed as a prop with new task data
      onAddTask({ ...newTask, id: Date.now() });
      handleClose(); // Close the dialog after submission
    } else {
      console.error('Title and Status are required.'); // Log an error if validation fails
    }
  };

  // Function to reset form fields
  const handleReset = () => {
    setNewTask({ title: '', date: '', status: 'To Do', description: '' });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color='secondary'>
          <Toolbar>
            {/* Icon button to represent the web app logo */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="Web app"
              sx={{ mr: 2 }}
            >
              <DeveloperModeIcon />
            </IconButton>
            {/* Title of the app */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My To-Do List
            </Typography>
            {/* Icon button to open the Add To Do dialog */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="Add To Do"
              onClick={handleClickOpen}
            >
              <AddCircleIcon />
              <Typography variant="h6" component="div">
                Add To Do
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      {/* Dialog for adding a new task */}
      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle color='secondary'>Add To Do</DialogTitle>
        <DialogContent>
          <AddToDo
            onChange={handleChange}
            onDateChange={handleDateChange}
            newTask={newTask}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReset}>Reset</Button> {/* Reset Button */}
          <Button type="submit">Add To Do</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
