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
import axios from 'axios';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#b2dfdb',
        },
    },
});

const API_URL = 'http://localhost:8080/tasks'; // Adjust if you use a different port or domain

export default function Nav({ onAddTask }) {
    const [open, setOpen] = React.useState(false);
    const [newTask, setNewTask] = React.useState({ title: '', date: '', status: 'To Do', description: '' });
    const [isSubmitting, setIsSubmitting] = React.useState(false); // Add a loading state

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewTask(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setNewTask(prev => ({ ...prev, date: date ? dayjs(date).format('YYYY-MM-DD') : '' }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (isSubmitting) return; // Prevent duplicate submissions
        setIsSubmitting(true); // Set submitting state

        if (newTask.title && newTask.status) {
            try {
                const response = await axios.post(API_URL, newTask);
                onAddTask(response.data);
                handleClose();
            } catch (error) {
                console.error('Error adding task:', error);
            } finally {
                setIsSubmitting(false); // Reset submitting state
            }
        } else {
            console.error('Title and Status are required.');
            setIsSubmitting(false); // Reset submitting state
        }
    };

    const handleReset = () => {
        setNewTask({ title: '', date: '', status: 'To Do', description: '' });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" color='secondary'>
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="Web app" sx={{ mr: 2 }}>
                            <DeveloperModeIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            My To-Do List
                        </Typography>
                        <IconButton size="large" edge="start" color="inherit" aria-label="Add To Do" onClick={handleClickOpen}>
                            <AddCircleIcon />
                            <Typography variant="h6" component="div">
                                Add To Do
                            </Typography>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle color='secondary'>Add To Do</DialogTitle>
                <DialogContent>
                    <AddToDo onChange={handleChange} onDateChange={handleDateChange} newTask={newTask} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleReset}>Reset</Button>
                    <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add To Do'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
