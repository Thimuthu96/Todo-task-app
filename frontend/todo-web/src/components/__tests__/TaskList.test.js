import { render, screen, fireEvent } from '@testing-library/react';
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

  beforeEach(() => {
    mockOnTaskComplete.mockClear();
  });

  test('renders empty state when no tasks are provided', () => {
    render(<TaskList tasks={[]} onTaskComplete={mockOnTaskComplete} />);
    
    expect(screen.getByText('No incomplete tasks found')).toBeInTheDocument();
    expect(screen.getByText('All tasks have been completed!')).toBeInTheDocument();
  });

  test('renders tasks correctly when tasks are provided', () => {
    render(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} />);
    
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    expect(screen.getByText('Test Description 2')).toBeInTheDocument();
    
    const completeButtons = screen.getAllByText('Complete');
    expect(completeButtons).toHaveLength(2);
  });

  test('calls onTaskComplete with correct task id when Complete button is clicked', () => {
    render(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} />);
    
    const completeButtons = screen.getAllByText('Complete');
    fireEvent.click(completeButtons[0]);
    
    expect(mockOnTaskComplete).toHaveBeenCalledWith(1);
  });

  test('each task should be in a separate card', () => {
    render(<TaskList tasks={mockTasks} onTaskComplete={mockOnTaskComplete} />);
    
    const taskCards = document.querySelectorAll('.MuiCard-root');
    expect(taskCards).toHaveLength(2);
  });

  test('task description should preserve whitespace', () => {
    const tasksWithMultilineDesc = [{
      id: 1,
      title: 'Test Task',
      description: 'Line 1\nLine 2\nLine 3',
      completed: false
    }];

    render(<TaskList tasks={tasksWithMultilineDesc} onTaskComplete={mockOnTaskComplete} />);
    
    const description = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' && 
             element.textContent.includes('Line 1') &&
             element.textContent.includes('Line 2') &&
             element.textContent.includes('Line 3');
    });
    expect(description).toHaveStyle({ whiteSpace: 'pre-line' });
  });
});