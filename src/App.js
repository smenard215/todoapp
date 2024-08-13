import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Nav from './Components/Nav';
import TaskColumns from './Components/TaskColumns';

const API_URL = 'http://localhost:8080/tasks'; // Adjust if you use a different port or domain

function App() {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(API_URL);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    // Handle task updates
    const handleTaskUpdate = async (updatedTasks) => {
        setTasks(updatedTasks);
        try {
            await Promise.all(updatedTasks.map(task =>
                axios.put(`${API_URL}/${task.id}`, task)
            ));
        } catch (error) {
            console.error('Error updating tasks:', error);
        }
    };

    // Handle adding a new task
    const handleAddTask = async (newTask) => {
        try {
            const response = await axios.post(API_URL, newTask);
            setTasks(prevTasks => [...prevTasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_URL}/${taskId}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Nav onAddTask={handleAddTask} />
            <TaskColumns tasks={tasks} onTaskUpdate={handleTaskUpdate} onDelete={handleDeleteTask} />
        </LocalizationProvider>
    );
}

export default App;
