import { createTrainer, getTrainers } from "@/controller/trainerController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // create trainer api route
    if (req.method === 'POST') {
        try {
            const { name, trainingSubjects, location, email } = req.body;

            if (!name || !trainingSubjects || !location || !email) {
                return res.status(400).json({
                    success: false,
                    message: 'All required fields must be filled',
                });
            }

            const trainerData = {
                name,
                trainingSubjects,
                location,
                email
            };

            const newTrainer = await createTrainer(trainerData);

            return res.status(201).json({
                success: true,
                message: "trainer created successgully",
                data: newTrainer,
            });
        } catch (error) {
            console.error('Error creating trainer:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create trainer. Please try again'
            })
        }
    }
    // get all trainers
    else if (req.method === 'GET') {
        try {
            const trainers = await getTrainers();
            return res.status(200).json({ success: true, data: trainers });
        } catch (error) {
            console.error("Error fetching trainers:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch trainers'
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