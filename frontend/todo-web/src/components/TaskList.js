import {
  Typography,
  Card,
  CardContent,
  Stack,
  Grid,
  Button,
  styled,
} from '@mui/material';

const TaskCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '12px',
  backgroundColor: '#F9FAFB',
  boxShadow: 'none',
  border: '1px solid #E5E7EB',
}));

const CompleteButton = styled(Button)(() => ({
  minWidth: '100px',
  borderRadius: '20px',
  color: '#10B981',
  backgroundColor: 'transparent',
  borderColor: '#10B981',
  '&:hover': {
    backgroundColor: 'rgba(16, 185, 129, 0.04)',
    borderColor: '#10B981',
  },
}));

function TaskList({ tasks, onTaskComplete }) {
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Tasks
      </Typography>
      <Grid container spacing={2} direction="column">
        {tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <TaskCard
              sx={{
                p: 2,
                transition: '0.2s ease',
                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  p: 0,
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {task.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {task.description}
                  </Typography>
                </Stack>
                <CompleteButton
                  variant="outlined"
                  onClick={() => onTaskComplete(task.id)}
                >
                  Complete
                </CompleteButton>
              </CardContent>
            </TaskCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default TaskList;