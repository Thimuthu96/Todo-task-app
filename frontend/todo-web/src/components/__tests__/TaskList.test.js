import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import TaskList from '../TaskList';

describe('TaskList', () => {
  const mockTasks = [
    {
      id: 1,
      title: 'Test Task 1',
      description: 'Test Description 1',
      completed: false
    },
    {
      id: 2,
      title: 'Test Task 2',
      description: 'Test Description 2',
      completed: false
    }
  ];

  const mockOnTaskComplete = jest.fn();
  const mockOnTaskRemove = jest.fn();
  const theme = createTheme();

  beforeEach(() => {
    mockOnTaskComplete.mockClear();
    mockOnTaskRemove.mockClear();
  });

  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  test('renders empty state when no tasks are provided', () => {
    renderWithTheme(<TaskList tasks={[]} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    expect(screen.getByText('No incomplete tasks found')).toBeInTheDocument();
    expect(screen.getByText('All tasks have been completed!')).toBeInTheDocument();
  });

  test('renders tasks correctly when tasks are provided', () => {
    renderWithTheme(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    expect(screen.getByText('Test Description 2')).toBeInTheDocument();
    
    const doneButtons = screen.getAllByText('Done');
    expect(doneButtons).toHaveLength(2);
  });

  test('calls onTaskComplete with correct task id when Done button is clicked', () => {
    renderWithTheme(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    const doneButtons = screen.getAllByText('Done');
    fireEvent.click(doneButtons[0]);
    
    expect(mockOnTaskComplete).toHaveBeenCalledWith(1);
  });

  test('calls onTaskRemove with correct task id when Delete button is clicked', () => {
    renderWithTheme(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    const deleteButtons = screen.getAllByTestId('DeleteIcon');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnTaskRemove).toHaveBeenCalledWith(1);
  });

  test('task cards should have correct styling', () => {
    renderWithTheme(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    const taskCards = document.querySelectorAll('.MuiCard-root');
    taskCards.forEach(card => {
      expect(card).toHaveStyle({
        borderRadius: '12px',
        backgroundColor: '#F9FAFB',
      });
    });
  });

  test('Done button should have correct styling', () => {
    renderWithTheme(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    const doneButtons = screen.getAllByText('Done').map(button => button.closest('button'));
    doneButtons.forEach(button => {
      expect(button).toHaveStyle({
        color: '#10B981',
        minWidth: '100px',
        borderRadius: '20px',
      });
    });
  });

  test('task description should preserve whitespace', () => {
    const tasksWithMultilineDesc = [{
      id: 1,
      title: 'Test Task',
      description: 'Line 1\nLine 2\nLine 3',
      completed: false
    }];

    renderWithTheme(<TaskList tasks={tasksWithMultilineDesc} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    const description = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' && 
             element.textContent.includes('Line 1') &&
             element.textContent.includes('Line 2') &&
             element.textContent.includes('Line 3');
    });
    expect(description).toHaveStyle({ whiteSpace: 'pre-line' });
  });

  test('empty state should have correct styling', () => {
    renderWithTheme(<TaskList tasks={[]} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    const emptyState = screen.getByText('No incomplete tasks found').closest('div');
    expect(emptyState).toHaveStyle({
      backgroundColor: '#F9FAFB',
      borderRadius: '12px',
      border: '1px dashed #E5E7EB',
    });
  });

  test('delete button should have correct styling', () => {
    renderWithTheme(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    const deleteButtons = screen.getAllByTestId('DeleteIcon').map(icon => icon.closest('button'));
    deleteButtons.forEach(button => {
      expect(button).toHaveStyle({
        color: '#D9D9D9',
      });
    });
  });

  test('task card content should be properly aligned', () => {
    renderWithTheme(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} onTaskRemove={mockOnTaskRemove} />);
    
    const cardContents = document.querySelectorAll('.MuiCardContent-root');
    cardContents.forEach(content => {
      expect(content).toHaveStyle({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      });
    });
  });
});