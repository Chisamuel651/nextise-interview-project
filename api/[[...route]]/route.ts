import { Hono } from 'hono'
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import { loginUser } from '@/controller/authController';
import jwt from "jsonwebtoken";
import { signupUser } from '@/controller/signUpController';

const authRoute = new Hono();

const JWT_SECRET = process.env.JWT_SECRET || "";

const loginSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8),
});

authRoute
    .post(
        "/login",
        zValidator('json', loginSchema),
        async (c) => {
            try {
                const { username, password } = c.req.valid('json')

                const user: any = await loginUser(username, password);

                if (!user) {
                    return c.json({
                        success: false,
                        message: 'Invalid credentials'
                    })
                }

                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: '1hr' }
                )

                return c.json({
                    success: true,
                    message: 'Login Successful',
                    token,
                }, { status: 200 })
            } catch (error) {
                return c.json({
                    success: false,
                    message: "An error occured",
                    error: error
                }, 500)
            }
        }
    )
    .post(
        '/signup',
        zValidator('json', loginSchema),
        async (c) => {
            try {
                const { username, password } = c.req.valid('json');
                const newUser = await signupUser(username, password);

                return c.json({
                    success: true,
                    message: 'user registered successfully',
                    user: newUser,
                }, {status: 200});
            } catch (error) {
                return c.json({
                    success: false,
                    message: 'failed to register user',
                    error: error
                }, 500)
            }
        }
    )

export default authRoute;