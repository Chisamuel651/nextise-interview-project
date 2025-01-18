import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { courseTrainerTable } from "./course-trainer";
import { createInsertSchema } from "drizzle-zod";

export const trainersTable = pgTable('trainers', {
    id: serial('id').notNull().primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    trainingSubjects: text('training_subjects').array().notNull(),
    location: varchar('location', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const trainerRelations = relations(trainersTable, ({ many }) => ({
    courses: many(courseTrainerTable),
}));

export const createTrainerSchema = createInsertSchema(trainersTable, {
    trainingSubjects: (schema) => schema.trainingSubjects.min(1),
    email: (schema) => schema.email.email()
});

export const updateTrainerSchema = createTrainerSchema.partial();