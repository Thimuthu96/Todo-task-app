import { useState } from "react";
import { Container, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import ConfirmDialog from "../components/ConfirmDialog";

function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Clean home",
      description: "Need to clean bed room",
    },
    {
      id: 2,
      title: "Study React",
      description: "Complete the todo app tutorial",
    },
  ]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskComplete = (taskId) => {
    setSelectedTask(taskId);
    setConfirmDialogOpen(true);
  };

  const confirmTaskComplete = () => {
    setTasks(tasks.filter((task) => task.id !== selectedTask));
    setConfirmDialogOpen(false);
  };

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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
              <TaskList tasks={tasks} onTaskComplete={handleTaskComplete} />
            </motion.div>
          </AnimatePresence>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={confirmTaskComplete}
      />
    </Container>
  );
}

export default Dashboard;
