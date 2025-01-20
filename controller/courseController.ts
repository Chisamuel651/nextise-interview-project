import { db } from "@/db"
import { coursesTable } from "@/db/schema"

export const createCourse = async (courseData: any) => {
    const [newCourse] = await db.insert(coursesTable).values(courseData).returning();
  return newCourse;
}

export const getCourses = async () => {
    const courses = await db.select().from(coursesTable);
    return courses;
}