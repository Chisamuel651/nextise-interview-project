import { getCoursesWithTrainers } from "@/controller/courseController";
import { assignTrainerToCourse } from "@/controller/courseTrainerController";
import { sendTrainerAssignmentEmail } from "@/utils/mailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { courseId, trainerId, trainerEmail, courseDetails } = req.body;
            if (!courseId || !trainerId || !trainerEmail || !courseDetails) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields:'
                });
            }

            const assignmentResult = await assignTrainerToCourse(courseId, trainerId);
            if (!assignmentResult.success) {
                return res.status(400).json(assignmentResult);
            }

            await sendTrainerAssignmentEmail(trainerEmail, courseDetails);

            return res.status(200).json({
                success: true,
                message: 'Trainer assigned and notification email sent successfully'
            });
        } catch (error) {
            console.error('Error in /api/course-trainer: ', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });

        }
    }
    else if (req.method === "GET") {
        // Handle fetching courses with trainers
        try {
            const coursesWithTrainers = await getCoursesWithTrainers();

            if (!coursesWithTrainers.success) {
                return res.status(500).json({
                    success: false,
                    message: coursesWithTrainers.message,
                });
            }

            return res.status(200).json({
                success: true,
                data: coursesWithTrainers.data,
            });
        } catch (error) {
            console.error("Error in GET /api/course-trainer:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}