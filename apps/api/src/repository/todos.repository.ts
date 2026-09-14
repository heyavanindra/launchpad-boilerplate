import { and, eq } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { db } from '../lib/db.js';
import { todoTable, type NewTodo, type Todo } from '@repo/db/schema';
import { AppError } from '../lib/errors.js';

export const createTodo = async (data: NewTodo): Promise<Todo> => {
  const [todo] = await db.insert(todoTable).values(data).returning();

  if (!todo) {
    throw new AppError('Failed to create todo', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return todo;
};

const getTodoById = async (todoId: string, userId?: string): Promise<Todo> => {
  const conditions = [eq(todoTable.id, Number(todoId))];
  if (userId) {
    conditions.push(eq(todoTable.userId, userId));
  }

  const todo = await db
    .select()
    .from(todoTable)
    .where(and(...conditions))
    .limit(1);

  if (!todo[0]) {
    throw new AppError('Todo not found', StatusCodes.NOT_FOUND);
  }

  return todo[0];
};

const getAllTodos = async (userId?: string): Promise<Todo[]> => {
  if (userId) {
    return await db.select().from(todoTable).where(eq(todoTable.userId, userId));
  }
  return await db.select().from(todoTable);
};

const updateTodoById = async (
  todoId: string,
  data: Partial<NewTodo>,
  userId?: string,
): Promise<Todo> => {
  const conditions = [eq(todoTable.id, Number(todoId))];
  if (userId) {
    conditions.push(eq(todoTable.userId, userId));
  }

  const [todo] = await db
    .update(todoTable)
    .set(data)
    .where(and(...conditions))
    .returning();

  if (!todo) {
    throw new AppError('Failed to update todo', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return todo;
};

const deleteTodoById = async (todoId: string, userId?: string): Promise<Todo> => {
  const conditions = [eq(todoTable.id, Number(todoId))];
  if (userId) {
    conditions.push(eq(todoTable.userId, userId));
  }

  const [todo] = await db
    .delete(todoTable)
    .where(and(...conditions))
    .returning();

  if (!todo) {
    throw new AppError('Failed to delete todo', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return todo;
};

export const TodoRepository = {
  createTodo,
  getTodoById,
  getAllTodos,
  updateTodoById,
  deleteTodoById,
};
