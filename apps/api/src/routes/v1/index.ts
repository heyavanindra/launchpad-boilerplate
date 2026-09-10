import { Router } from 'express';
import TodoRouter from './todos.route.js';

const v1Router: Router = Router();

v1Router.use('/todos', TodoRouter);

export default v1Router;
