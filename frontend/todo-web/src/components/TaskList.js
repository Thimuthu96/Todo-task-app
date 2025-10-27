import {
  Typography,
  Card,
  CardContent,
  Stack,
  Grid,
  Button,
  Box,
  styled,
  IconButton,
  Pagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

const TaskCard = styled(Card)(({ theme }) => ({
  minHeight: '100px',
  borderRadius: '12px',
  backgroundColor: '#F9FAFB',
  boxShadow: 'none',
  border: '1px solid #E5E7EB',
}));

const TruncatedTypography = styled(Typography)(({ isExpanded }) => ({
  display: '-webkit-box',
  WebkitLineClamp: isExpanded ? 'unset' : 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  whiteSpace: 'pre-line',
  position: 'relative',
  width: '100%',
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

function TaskList({ tasks, onTaskComplete, onTaskRemove }) {
  const [page, setPage] = useState(1);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const tasksPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const toggleDescription = (taskId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const startIndex = (page - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <>
      {tasks.length === 0 ? (
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            border: '1px dashed #E5E7EB',
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No incomplete tasks found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            All tasks have been completed!
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3}>
          <Grid container spacing={2} direction="column">
            {currentTasks.map((task) => (
              <Grid item key={task.id}>
                <TaskCard
                  sx={{
                    px: 2,
                    pt: 1,
                    pb: 0.5,
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
                    <Stack spacing={0.5} sx={{ width: '100%', pr: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.25 }}>
                        {task.title}
                      </Typography>
                      <Box sx={{ position: 'relative', mt: 0 }}>
                        <TruncatedTypography
                          ref={(e) => {
                            if (e) {
                              const lineHeight = 20; // approximate line height in pixels
                              const hasOverflow = e.scrollHeight > (lineHeight * 2 + 2);
                              if (hasOverflow && !expandedDescriptions[task.id] && 
                                  !document.getElementById(`see-more-${task.id}`)) {
                                setExpandedDescriptions(prev => ({
                                  ...prev,
                                  [`${task.id}-overflow`]: true
                                }));
                              }
                            }
                          }}
                          variant="body2"
                          color="text.secondary"
                          isExpanded={expandedDescriptions[task.id]}
                        >
                          {task.description}
                        </TruncatedTypography>
                        {expandedDescriptions[`${task.id}-overflow`] && (
                          <Button
                            id={`see-more-${task.id}`}
                            onClick={() => toggleDescription(task.id)}
                            endIcon={expandedDescriptions[task.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            sx={{ 
                              mt: 1, 
                              color: '#0E9E52',
                              p: 0,
                              '&:hover': { 
                                backgroundColor: 'transparent',
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            {expandedDescriptions[task.id] ? 'See Less' : 'See More'}
                          </Button>
                        )}
                      </Box>
                    </Stack>
                    <Stack spacing={1} alignItems="flex-end">
                      <IconButton
                        size="small"
                        sx={{
                          color: '#D9D9D9',
                          padding: '4px',
                        }}
                        onClick={() => onTaskRemove(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <CompleteButton
                        variant="outlined"
                        onClick={() => onTaskComplete(task.id)}
                      >
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 600, 
                            color: '#0E9E52', 
                            letterSpacing: '1.5px', 
                            fontSize: '0.875rem' 
                          }}
                        >
                          Done
                        </Typography>
                      </CompleteButton>
                    </Stack>
                  </CardContent>
                </TaskCard>
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#0E9E52',
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#0E9E52 !important',
                    color: '#fff',
                  },
                }}
              />
            </Box>
          )}
        </Stack>
      )}
    </>
  );
}

export default TaskList;