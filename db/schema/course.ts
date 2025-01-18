import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { courseTrainerTable } from "./course-trainer";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';

export const coursesTable = pgTable('courses', {
    id: serial('id').notNull().primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    date: timestamp('date', {mode: 'string'}).notNull(),
    subject: varchar('subject', {length: 255}).notNull(),
    participants: integer('participants').notNull().default(0),
    notes: text('notes'),
    price: numeric('price', {precision: 10, scale: 2}).notNull(),
    trainerPrice: numeric('numeric_price', {precision: 10, scale: 2}).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const courseRelations = relations(coursesTable, ({ many }) => ({
    trainers: many(courseTrainerTable),
}));

export const createCourseSchema = createInsertSchema(coursesTable, {
    name: (schema) => schema.name.min(1),
    price: () => z.number().gte(0),
    trainerPrice: () => z.number().gte(0),
})

export const updateCourseSchema = createCourseSchema.partial();