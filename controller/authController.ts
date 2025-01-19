import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from 'bcrypt';

export const loginUser = async (username: string, password: string) => {
    const user = await db.transaction(async (trx) => {
        const [existingUser] = await trx
        .select()
        .from(usersTable)
        .where(
            eq(usersTable.email, username)
        )
        .limit(1);

        if(!existingUser) return null;

        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) return null;

        return {
            id: existingUser.id,
            email: existingUser.email
        };
    })

    return user;
}