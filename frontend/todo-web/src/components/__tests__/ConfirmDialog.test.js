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
  });

  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  test('renders dialog with correct content when open', () => {
    renderWithTheme(
      <ConfirmDialog 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    expect(screen.getByText('Complete and Remove Task?')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to complete and remove this task from the list?')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone and the task will be permanently removed.')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
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