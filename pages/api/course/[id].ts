import { deleteCourses, updateCourses } from "@/controller/courseController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
        return res.status(400).json({ success: false, message: "Course ID is required." });
    }

    if (req.method === "PUT") {
        try {
            const courseData = req.body;
            const result = await updateCourses(Number(id), courseData);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            console.error("Error updating course:", error);
            return res.status(500).json({ success: false, message: "Failed to update the course." });
        }
    } else if (req.method === "DELETE") {
        try {
            const result = await deleteCourses(Number(id));

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            return res.status(500).json({ success: false, message: "Failed to delete the course." });
        }
    } else {
        res.setHeader("Allow", ["PUT", "DELETE"]);
        return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}