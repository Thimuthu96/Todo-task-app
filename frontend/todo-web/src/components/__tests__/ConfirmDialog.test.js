import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import ConfirmDialog from '../ConfirmDialog';

describe('ConfirmDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const theme = createTheme();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnConfirm.mockClear();
    window.innerWidth = 1024; // Default to desktop view
  });

  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  test('renders dialog with custom props', () => {
    renderWithTheme(
      <ConfirmDialog 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm}
        title="Custom Title"
        message="Custom Message"
        warningMessage="Custom Warning"
        confirmButtonText="Custom Confirm"
        confirmButtonColor="error"
      />
    );
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Message')).toBeInTheDocument();
    expect(screen.getByText('Custom Warning')).toBeInTheDocument();
    expect(screen.getByText('Custom Confirm')).toBeInTheDocument();
  });

  test('calls onClose when Cancel button is clicked', () => {
    renderWithTheme(
      <ConfirmDialog 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  test('calls onConfirm when Confirm button is clicked', () => {
    renderWithTheme(
      <ConfirmDialog 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    
    expect(mockOnConfirm).toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('renders as Dialog on desktop', () => {
    renderWithTheme(
      <ConfirmDialog 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});