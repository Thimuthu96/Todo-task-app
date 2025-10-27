import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ConfirmDialog({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  warningMessage = "This action cannot be undone.",
  confirmButtonText = "Confirm",
  confirmButtonColor = "primary",
  showWarning = true
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const content = (
    <>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>
      <Typography>
        {message}
      </Typography>
      {showWarning && (
        <Typography color="error" sx={{ fontSize: "0.875rem", mt: 1, mb: 3 }}>
          {warningMessage}
        </Typography>
      )}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        justifyContent: isMobile ? 'stretch' : 'flex-end',
        flexDirection: isMobile ? 'column' : 'row',
        mt: isMobile ? 2 : 0
      }}>
        <Button
          fullWidth={isMobile}
          variant="contained"
          onClick={onConfirm}
          color={confirmButtonColor}
          sx={{
            borderRadius: '6px',
          }}
        >
          {confirmButtonText}
        </Button>
        <Button
          fullWidth={isMobile}
          onClick={onClose}
          variant={isMobile ? "outlined" : "text"}
          sx={{
            color: '#374151',
            borderRadius: '6px',
            borderColor: isMobile ? '#E5E7EB' : 'transparent',
            '&:hover': { 
              backgroundColor: 'rgba(55, 65, 81, 0.04)',
              borderColor: isMobile ? '#D1D5DB' : 'transparent',
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            px: 3,
            py: 4,
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '12px', p: 3 },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: -12,
            top: -12,
            color: '#9CA3AF',
          }}
        >
          <CloseIcon />
        </IconButton>
        {content}
      </Box>
    </Dialog>
  );
}

export default ConfirmDialog;