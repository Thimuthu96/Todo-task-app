import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskForm from '../AddTaskForm';

describe('AddTaskForm', () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  test('renders AddTaskForm component with all elements', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    expect(screen.getByText('Add a Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Task Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Task Description')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('Add button should be disabled when fields are empty', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const addButton = screen.getByText('Add').closest('button');
    expect(addButton).toBeDisabled();
  });

  test('Add button should be enabled when both fields have values', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const titleInput = screen.getByPlaceholderText('Task Title');
    const descriptionInput = screen.getByPlaceholderText('Task Description');
    
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    
    const addButton = screen.getByText('Add').closest('button');
    expect(addButton).not.toBeDisabled();
  });

  test('should clear form fields when Clear button is clicked', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const titleInput = screen.getByPlaceholderText('Task Title');
    const descriptionInput = screen.getByPlaceholderText('Task Description');
    
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  test('should call onAddTask with correct data when Add button is clicked', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const titleInput = screen.getByPlaceholderText('Task Title');
    const descriptionInput = screen.getByPlaceholderText('Task Description');
    
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);
    
    expect(mockOnAddTask).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: 'Test Task',
      description: 'Test Description',
      completed: false
    });
    
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });
});