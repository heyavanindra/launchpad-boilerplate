ALTER TABLE "todo" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
CREATE INDEX "todo_userId_idx" ON "todo" ("user_id");--> statement-breakpoint
ALTER TABLE "todo" ADD CONSTRAINT "todo_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;