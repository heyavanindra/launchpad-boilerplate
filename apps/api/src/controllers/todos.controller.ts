import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendSuccess } from '../helper/response-helper.js';
import { TodoService } from '../services/todos.service.js';
import type { TodoCreateInput, TodoIdParamInput } from '@repo/validator';

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdTodo = await TodoService.createTodo({
      ...(req.validatedBody as TodoCreateInput),
      userId: req.user!.id,
    });

    req.log?.info({ todoId: createdTodo.id }, 'Todo created successfully');

    return sendSuccess(res, createdTodo, StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};

const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoId } = req.validatedParams as TodoIdParamInput;

    const todo = await TodoService.getTodoById(todoId, req.user?.id);
    req.log?.info({ todoId: todo.id }, 'Todo fetched successfully');
    return sendSuccess(res, todo, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoService.getTodos(req.user?.id);
    req.log?.info({ todos }, 'Todos fetched successfully');
    return sendSuccess(res, todos, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoId } = req.validatedParams as TodoIdParamInput;

    const updatedTodo = await TodoService.updateTodo(
      todoId,
      req.validatedBody as TodoCreateInput,
      req.user?.id,
    );
    req.log?.info({ todoId: updatedTodo.id }, 'Todo updated successfully');
    return sendSuccess(res, updatedTodo, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoId } = req.validatedParams as TodoIdParamInput;

    const deletedTodo = await TodoService.deleteTodo(todoId, req.user?.id);
    req.log?.info({ todoId: deletedTodo.id }, 'Todo deleted successfully');
    return sendSuccess(res, deletedTodo, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const TodoController = {
  createTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};

export default TodoController;
