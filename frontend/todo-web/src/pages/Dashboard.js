import { useState, useEffect } from "react";
import { Container, Grid, Box, useTheme, useMediaQuery, Alert, CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';

import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import ConfirmDialog from "../components/ConfirmDialog";
import { 
  fetchTasks, 
  addTask, 
  completeTask,
  removeTask,
  selectIncompleteTasks,
  selectTasksStatus,
  selectTasksError 
} from '../store/taskSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectIncompleteTasks);
  const status = useSelector(selectTasksStatus);
  const error = useSelector(selectTasksError);

  // Dialog state
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    type: null,
    taskId: null,
    title: '',
    message: '',
    warningMessage: '',
    confirmButtonText: '',
    confirmButtonColor: 'primary'
  });
  


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleAddTask = async (newTask) => {
    try {
      await dispatch(addTask(newTask)).unwrap();
      dispatch(fetchTasks()); // Refresh the task list
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const handleTaskComplete = (taskId) => {
    setDialogConfig({
      open: true,
      type: 'complete',
      taskId: taskId,
      title: 'Complete Task',
      message: 'Are you sure you want to mark this task as completed?',
      warningMessage: 'This action will move the task to completed tasks.',
      confirmButtonText: 'Complete',
      confirmButtonColor: 'success'
    });
  };

  const handleTaskRemove = (taskId) => {
    setDialogConfig({
      open: true,
      type: 'remove',
      taskId: taskId,
      title: 'Remove Task?',
      message: 'Are you sure you want to remove this task?',
      warningMessage: 'This action cannot be undone.',
      confirmButtonText: 'Remove',
      confirmButtonColor: 'error'
    });
  };

  const handleDialogConfirm = async () => {
    try {
      if (dialogConfig.type === 'complete') {
        await dispatch(completeTask(dialogConfig.taskId)).unwrap();
      } else if (dialogConfig.type === 'remove') {
        await dispatch(removeTask(dialogConfig.taskId)).unwrap();
      }
      dispatch(fetchTasks()); // Refresh the task list
      handleDialogClose();
    } catch (err) {
      console.error(`Failed to ${dialogConfig.type} task:`, err);
    }
  };

  const handleDialogClose = () => {
    setDialogConfig(prev => ({ ...prev, open: false }));
  };

  // const theme = useTheme();
  // const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 2, md: 4 },
        px: { xs: 2, md: 6 },
        backgroundColor: "#F3F4F6",
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Grid
  container
  spacing={3}
  sx={{
    width: "100%",
    maxWidth: { xs: "100%", md: "1200px", lg: "1200px" },
    minHeight: { xs: "calc(100vh - 32px)", md: "calc(100vh - 64px)" },
    mx: "auto",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    p: { xs: 2, md: 4 },
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
  }}
>

        {/* Left Side - Add Task */}
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          sx={{
            flex: { md: 2 }, 
            borderRight: { md: "1px solid #E5E7EB" },
              pr: { md: 4, lg: 8 },
            pl: { md: 4, lg: 4 },
            mb: { xs: 3, md: 0 },
            py: { md: 3, lg: 4 },
          }}
        >
          <AddTaskForm onAddTask={handleAddTask} />
        </Grid>

        {/* Right Side - Task List */}
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{
            flex: { md: 2 }, 
              pl: { md: 4, lg: 6 },
            pr: { md: 4, lg: 4 },
            py: { md: 3, lg: 4 },
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            >
              {status === 'loading' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              )}
              {status === 'failed' && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error || 'Failed to load tasks'}
                </Alert>
              )}
              {status === 'succeeded' && (
                <TaskList 
                  tasks={tasks} 
                  onTaskComplete={handleTaskComplete}
                  onTaskRemove={handleTaskRemove}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={dialogConfig.open}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
        title={dialogConfig.title}
        message={dialogConfig.message}
        warningMessage={dialogConfig.warningMessage}
        confirmButtonText={dialogConfig.confirmButtonText}
        confirmButtonColor={dialogConfig.confirmButtonColor}
      />
    </Container>
  );
}

export default Dashboard;
