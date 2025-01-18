import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable('users', {
    id: serial('id').notNull().primaryKey(),
    email: varchar('email', {length: 255}).notNull().unique(),
    password: varchar('password', {length: 255}).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const createUserSchema = createInsertSchema(usersTable, {
    email: (schema) => schema.email.email(),
    password: (schema) => schema.password.min(8),
})

export const updateUserSchema = createUserSchema.partial();