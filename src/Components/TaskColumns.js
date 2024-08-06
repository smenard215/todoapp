import React from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import TaskCard from './TaskCard';

// Constants
const COLUMNS = ['To Do', 'In Progress', 'On Hold', 'Completed'];

const TaskColumns = ({ tasks, onTaskUpdate }) => {

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    onTaskUpdate(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
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
              flexDirection: 'column', 
              justifyContent: 'center', // Center items vertically
              alignItems: 'center', // Center items horizontally
              border: '1px solid', 
              borderColor: '#cfd8dc', 
              backgroundColor: '#f5f5f5',
            }}
          >
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
                flexDirection: 'column',
                alignItems: 'center', // Center cards horizontally
                gap: 2, // Optional: Add space between cards
              }}
            >
              {getTasksByStatus(column).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
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
