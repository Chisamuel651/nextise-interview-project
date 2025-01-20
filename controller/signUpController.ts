import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from 'bcrypt';

export const signupUser = async (email: string, password: string) => {
    const existingUser = await db
        .select()
        .from(usersTable)
        .where(
            eq(usersTable.email, email)
        )
        .limit(1);

    if(existingUser.length){
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = db.insert(usersTable).values({
        email,
        password: hashedPassword,
    });

    const [newUser] = await query.returning()

    return {
        id: newUser.id,
        email: newUser.email,
    }
}