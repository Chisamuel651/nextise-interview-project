import { relations } from "drizzle-orm";
import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { coursesTable } from "./course";
import { trainersTable } from "./trainer";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const courseTrainerTable = pgTable("course_trainer", {
  id: serial("id").notNull().primaryKey(),
  courseId: integer("course_id").notNull().references(() => coursesTable.id, {onDelete: "cascade"}),
  trainerId: integer("trainer_id").notNull().references(() => trainersTable.id, {onDelete: "cascade"}),
});

export const courseTrainerRelations = relations(courseTrainerTable, ({ one }) => ({
    course: one(coursesTable, {
        fields: [courseTrainerTable.courseId],
        references: [coursesTable.id],
    }),

    trainer: one(trainersTable, {
        fields: [courseTrainerTable.trainerId],
        references: [trainersTable.id],
    }),
}));

export const createCourseTrainerSchema = createInsertSchema(courseTrainerTable, {
    courseId: (schema) => schema.courseId,
    trainerId: (schema) => schema.trainerId,
});

export const updateCourseTrainerSchema = z.object({
    courseId: createCourseTrainerSchema.shape.courseId.optional(),
    trainerId: createCourseTrainerSchema.shape.trainerId.optional(),
});

export type CourseTrainerSchema = z.infer<typeof createCourseTrainerSchema>;
export type UpdateCourseTrainerSchema = z.infer<typeof updateCourseTrainerSchema>;

