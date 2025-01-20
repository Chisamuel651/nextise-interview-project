import { db } from "@/db"
import { trainersTable } from "@/db/schema"

export const createTrainer = async (trainerData: any) => {
    const [newTrainer] = await db.insert(trainersTable).values(trainerData).returning();
    return newTrainer;
}

export const getTrainers = async () => {
    const trainers = await db.select().from(trainersTable);
    return trainers;
}