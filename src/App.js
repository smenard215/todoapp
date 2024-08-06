import React, { useState } from 'react';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Nav from './Components/Nav';
import TaskColumns from './Components/TaskColumns';

const initialTasks = [
  { id: 1, title: 'Complete Project Report', date: '2024-08-05',  status: 'In Progress', description: 'Finalize and submit the project report by the end of the day.' },
  { id: 2, title: 'Prepare for Meeting', date: '2024-08-06',  status: 'To Do', description: 'Review the agenda and prepare presentation slides.' },
  { id: 3, title: 'Fix Bug in Application', date: '2024-08-07',  status: 'On Hold', description: 'Investigate the issue with the login feature.' },
  { id: 4, title: 'Update Documentation', date: '2024-08-08', status: 'Completed', description: 'Add new API endpoints to the project documentation.' }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleTaskUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Nav onAddTask={handleAddTask} />
      <TaskColumns tasks={tasks} onTaskUpdate={handleTaskUpdate} />
    </LocalizationProvider>
  );
}

export default App;
