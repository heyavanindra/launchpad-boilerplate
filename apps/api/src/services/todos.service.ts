import type { NewTodo, Todo } from '@repo/db/schema';
import { TodoRepository } from '../repository/todos.repository.js';

const createTodo = async (data: NewTodo): Promise<Todo> => {
  return await TodoRepository.createTodo(data);
};
const getTodoById = async (todoId: string, userId?: string): Promise<Todo> => {
  return await TodoRepository.getTodoById(todoId, userId);
};
const getTodos = async (userId?: string): Promise<Todo[]> => {
  return await TodoRepository.getAllTodos(userId);
};

const updateTodo = async (
  todoId: string,
  data: Partial<NewTodo>,
  userId?: string,
): Promise<Todo> => {
  return await TodoRepository.updateTodoById(todoId, data, userId);
};

const deleteTodo = async (todoId: string, userId?: string): Promise<Todo> => {
  return await TodoRepository.deleteTodoById(todoId, userId);
};

export const TodoService = {
  createTodo,
  getTodoById,
  getTodos,
  updateTodo,
  deleteTodo,
};

export default TodoService;
