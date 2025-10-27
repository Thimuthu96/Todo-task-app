import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  styled,
} from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: '#E5E7EB',
    },
    '&:hover fieldset': {
      borderColor: '#0E9E52',
    },
  },
}));

const AddTaskContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));


function AddTaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      onAddTask({ ...newTask, id: Date.now(), completed: false });
      setNewTask({ title: '', description: '' });
    }
  };

  return (
    <AddTaskContainer>
      <Typography variant="h6" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
        Add a Task
      </Typography>

      <Stack spacing={2}>
        <StyledTextField
          fullWidth
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          size="small"
        />
        <StyledTextField
          fullWidth
          multiline
          rows={3}
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <Stack 
          pt={3} 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={1.5} 
          justifyContent={{ xs: 'stretch', sm: 'flex-end' }}
          width="100%"
        >
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddTask}
            disabled={!newTask.title || !newTask.description}
            sx={{
              backgroundColor: '#0E9E52',
              fontWeight: 500,
              textTransform: 'none',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': { backgroundColor: '#0E9E52' },
              '&:disabled': {
                backgroundColor: '#E5E7EB',
                color: '#9CA3AF',
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#fff', letterSpacing: '1.5px', fontSize: '0.875rem'  }}>Add</Typography>
          </Button>
          <Button
            fullWidth
            sx={{
              color: '#0E9E52',
              fontWeight: 500,
              '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.04)' },
              width: { xs: '100%', sm: 'auto' }
            }}
            onClick={() => setNewTask({ title: '', description: '' })}
          >
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#0E9E52', letterSpacing: '1.5px', fontSize: '0.875rem'  }}>Clear</Typography>
          </Button>
        </Stack>
      </Stack>
    </AddTaskContainer>
  );
}

export default AddTaskForm;