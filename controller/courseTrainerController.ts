import { db } from "@/db"
import { coursesTable, courseTrainerTable } from "@/db/schema"
import { eq, and } from "drizzle-orm";

export const assignTrainerToCourse = async (courseId: number, trainerId: number) => {
    try {
        const [course] = await db
            .select({ date: coursesTable.date })
            .from(coursesTable)
            .where(
                eq(coursesTable.id, courseId)
            );

        if (!course) {
            throw new Error('Courses not found');
        }

        const existingCourseAssignement = await db
            .select()
            .from(courseTrainerTable)
            .where(
                eq(courseTrainerTable.courseId, courseId)
            )
            .limit(1);

            if(existingCourseAssignement.length > 0){
                throw new Error('This course is already assigned to a trainer');
            }

        const existingAssignment = await db
            .select()
            .from(courseTrainerTable)
            .innerJoin(coursesTable,
                eq(courseTrainerTable.courseId, coursesTable.id)
            )
            .where(
                and(
                    eq(courseTrainerTable.trainerId, trainerId),
                    eq(coursesTable.date, course.date)
                )
            )
            .limit(1);

        if (existingAssignment.length > 0) {
            throw new Error('Trainer is already assigned to another course on this day');
        }

        const [newAssignment] = await db
            .insert(courseTrainerTable)
            .values({
                courseId,
                trainerId
            })
            .returning();

        return {
            success: true,
            data: newAssignment,
        }
    } catch (error) {
        console.error("Error assigning trainer to course:", error);
        return {
            success: false,
            message: error || "Failed to assign trainer to course.",
        };
    }
}