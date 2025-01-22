import { updateTrainers, deleteTrainers } from "@/controller/trainerController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Validate trainer ID
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ success: false, message: "Trainer ID is required and must be a valid number." });
  }

  const trainerId = parseInt(id, 10);

  if (req.method === "PUT") {
    // Handle trainer update
    try {
      const { name, trainingSubjects, location, email } = req.body;

      if (!name || !trainingSubjects || !location || !email) {
        return res.status(400).json({
          success: false,
          message: "All fields (name, trainingSubjects, location, email) must be provided.",
        });
        
      }

      // Ensure trainingSubjects is an array
      if (!Array.isArray(trainingSubjects)) {
        return res.status(400).json({
          success: false,
          message: "trainingSubjects must be an array.",
        });
      }

      const updatedTrainer = await updateTrainers(trainerId, { name, trainingSubjects, location, email });

      if (updatedTrainer.success) {
        return res.status(200).json(updatedTrainer);
      } else {
        return res.status(404).json({ success: false, message: "Trainer not found." });
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
      return res.status(500).json({ success: false, message: "Failed to update trainer." });
    }
  } else if (req.method === "DELETE") {
    // Handle trainer deletion
    try {
      const deletedTrainer = await deleteTrainers(trainerId);

      if (deletedTrainer.success) {
        return res.status(200).json(deletedTrainer);
      } else {
        return res.status(404).json({ success: false, message: "Trainer not found." });
      }
    } catch (error) {
      console.error("Error deleting trainer:", error);
      return res.status(500).json({ success: false, message: "Failed to delete trainer." });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed.`,
    });
  }
}
