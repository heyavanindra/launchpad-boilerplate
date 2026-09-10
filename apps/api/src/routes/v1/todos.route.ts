import { Router } from 'express';
import { TodoController } from '../../controllers/todos.controller.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { validateBody, validateParams } from '../../middlewares/validation.middleware.js';
import { todoCreateSchema, todoIdParamSchema } from '../../validations/todo.validation.js';

const TodoRouter: Router = Router();

TodoRouter.use(requireAuth);

TodoRouter.get('/', TodoController.getTodos);
TodoRouter.post('/', validateBody(todoCreateSchema), TodoController.createTodo);
TodoRouter.get('/:todoId', validateParams(todoIdParamSchema), TodoController.getTodo);
TodoRouter.put(
  '/:todoId',
  validateParams(todoIdParamSchema),
  validateBody(todoCreateSchema),
  TodoController.updateTodo,
);
TodoRouter.delete('/:todoId', validateParams(todoIdParamSchema), TodoController.deleteTodo);

export default TodoRouter;
