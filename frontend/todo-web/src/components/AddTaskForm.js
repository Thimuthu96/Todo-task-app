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
      borderColor: '#10B981',
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
        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button
            sx={{
              color: '#10B981',
              fontWeight: 500,
              '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.04)' },
            }}
            onClick={() => setNewTask({ title: '', description: '' })}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTask}
            disabled={!newTask.title || !newTask.description}
            sx={{
              backgroundColor: '#10B981',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#0EA975' },
              '&:disabled': {
                backgroundColor: '#E5E7EB',
                color: '#9CA3AF',
              },
            }}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </AddTaskContainer>
  );
}

export default AddTaskForm;