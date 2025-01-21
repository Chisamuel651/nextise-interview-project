import { db } from "@/db"
import { trainersTable } from "@/db/schema"
import { eq } from "drizzle-orm";

export const createTrainer = async (trainerData: any) => {
    const [newTrainer] = await db.insert(trainersTable).values(trainerData).returning();
    return newTrainer;
}

export const getTrainers = async () => {
    const trainers = await db.select().from(trainersTable);
    return trainers;
}

export const updateTrainers = async (trainerId: number, trainerData: any) => {
    try {
        const [updatedTrainer] = await db
            .update(trainersTable)
            .set(trainerData)
            .where(eq(trainersTable.id, trainerId))
            .returning();

        if (!updatedTrainer) {
            throw new Error("Trainer not found.");
        }

        return {
            success: true,
            data: updatedTrainer,
        };
    } catch (error) {
        console.error("Error updating trainer:", error);
        return {
            success: false,
            message: "Failed to update trainer.",
        };
    }
}

export const deleteTrainers = async (trainerId: number) => {
    try {
        const result = await db
            .delete(trainersTable)
            .where(eq(trainersTable.id, trainerId))
            .returning();

        if (!result.length) {
            throw new Error("Trainer not found.");
        }

        return {
            success: true,
            message: "Trainer deleted successfully.",
        };
    } catch (error) {
        console.error("Error deleting trainer:", error);
        return {
            success: false,
            message: "Failed to delete trainer.",
        };
    }
}