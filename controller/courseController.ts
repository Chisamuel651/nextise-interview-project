import { db } from "@/db"
import { coursesTable, courseTrainerTable, trainersTable } from "@/db/schema"
import { eq } from "drizzle-orm";

export const createCourse = async (courseData: any) => {
    const [newCourse] = await db.insert(coursesTable).values(courseData).returning();
  return newCourse;
}

export const getCourses = async () => {
    const courses = await db.select().from(coursesTable);
    return courses;
}



export const updateCourses = async (courseId: number, courseData: any) => {
  try {
    const [updatedCourse] = await db
      .update(coursesTable)
      .set(courseData)
      .where(
        eq(coursesTable.id, courseId)
      )
      .returning();

      if(!updatedCourse){
        throw new Error('Course not found.');
      }
      return {
        success: true,
        data: updatedCourse,
      };
  } catch (error) {
    console.error('Error updating course', error);
    return {
      success: false,
      message: 'Failed to update course.',
    };
  }
}

export const deleteCourses = async (courseId: number) => {
  try {
    
    await db.transaction(async (trx) => {
      
      await trx.delete(courseTrainerTable).where(eq(courseTrainerTable.courseId, courseId));

      
      const result = await trx.delete(coursesTable).where(eq(coursesTable.id, courseId)).returning();

      if (!result.length) {
        throw new Error("Course not found.");
      }
    });

    return {
      success: true,
      message: "Course and its associated data deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting course:", error);
    return {
      success: false,
      message: "Failed to delete course.",
    };
  }
}

export const getCoursesWithTrainers = async () => {
  try {
    const courses = await db
      .select({
        courseId: coursesTable.id,
        name: coursesTable.name,
        date: coursesTable.date,
        subject: coursesTable.subject,
        location: coursesTable.location,
        trainer: {
          id: trainersTable.id,
          name: trainersTable.name,
          trainingSubjects: trainersTable.trainingSubjects,
          email: trainersTable.email,
        }
      })
      .from(coursesTable)
      .leftJoin(courseTrainerTable, eq(coursesTable.id, courseTrainerTable.courseId))
      .leftJoin(trainersTable, eq(courseTrainerTable.trainerId, trainersTable.id));

      return {
        success: true,
        data: courses,
      }
  } catch (error) {
    console.error("Error fetching courses with trainers:", error);
    return {
      success: false,
      message: "Failed to fetch courses.",
    };
  }
}