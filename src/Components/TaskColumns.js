import React from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import TaskCard from './TaskCard';

// Constants for the different task statuses represented as columns
const COLUMNS = ['To Do', 'In Progress', 'On Hold', 'Completed'];

const TaskColumns = ({ tasks, onTaskUpdate }) => {

  // Function to filter tasks by their status
  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  // Function to handle changing the status of a task
  const handleStatusChange = (taskId, newStatus) => {
    // Update the status of the task with the given id
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    // Call the callback to update the parent component with the new tasks list
    onTaskUpdate(updatedTasks);
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId) => {
    // Filter out the task with the given id
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    // Call the callback to update the parent component with the new tasks list
    onTaskUpdate(updatedTasks);
  };

  return (
    <Grid container spacing={2} marginTop={10}>
      {COLUMNS.map(column => (
        <Grid item xs={12} sm={6} md={3} key={column}>
          <Paper 
            sx={{ 
              padding: 2, 
              minHeight: '300px', 
              display: 'flex', 
              flexDirection: 'column', // Stack children vertically
              justifyContent: 'center', 
              alignItems: 'center', 
              border: '1px solid', 
              borderColor: '#cfd8dc', 
              backgroundColor: '#f5f5f5', 
            }}
          >
            {/* Display the column title */}
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ textAlign: 'center' }} // Center-align the text
            >
              {column}
            </Typography>
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column', // Stack cards vertically
                alignItems: 'center', // Center cards horizontally
                gap: 2, // Optional: Add space between cards
              }}
            >
              {/* Render TaskCard components for tasks with the current status */}
              {getTasksByStatus(column).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange} // Pass the status change handler
                  onDelete={handleDeleteTask} // Pass the delete handler
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskColumns;
