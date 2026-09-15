import { defineRelations } from 'drizzle-orm';
import { index, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { user } from './auth-schema.js';

export const todoTable = pgTable(
  'todo',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    status: varchar({ length: 255 }).notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
  },
  (table) => [index('todo_userId_idx').on(table.userId)],
);

export const todoRelations = defineRelations({ todoTable, user }, (r) => ({
  todoTable: {
    user: r.one.user({
      from: r.todoTable.userId,
      to: r.user.id,
    }),
  },
  user: {
    todos: r.many.todoTable(),
  },
}));

export type Todo = typeof todoTable.$inferSelect;
export type NewTodo = typeof todoTable.$inferInsert;
