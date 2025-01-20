import { createCourse, getCourses } from "@/controller/courseController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // create a course
    if(req.method === 'POST'){
        try {
            const { name, date, subject, location, participants, notes, price, trainerPrice } = req.body;

            if(!name || !date || !subject || !location || !participants || !notes || !price || !trainerPrice){
                return res.status(400).json({
                    success: false,
                    message: 'All required fields must be filled',
                });
            }

            const courseData = {
                name,
                date,
                subject,
                location,
                participants: participants || 0,
                notes: notes || "",
                price,
                trainerPrice,
            };

            const newCourse = await createCourse(courseData);

            return res.status(201).json({
                success: true,
                message: "course created successgully",
                data: newCourse,
            });
        } catch (error) {
            console.error('Error creating course:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create course. Please try again'
            })
        }
    }
    // get all courses
    else if(req.method === 'GET'){
        try {
            const courses = await getCourses();
            return res.status(200).json({ success: true, data: courses });
        } catch (error) {
            console.error("Error fetching courses:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch courses'
            })
        }
    }
    else {
        res.setHeader('Allow', ["POST", "GET"]);
        return res.status(405).json({
            success: false,
            message: `Method ${req.method} not allowed`
        })
    }
}