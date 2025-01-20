import { signupUser } from "@/controller/signUpController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // Validate the request body
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
      }

      // Use the signupUser function to interact with your real database
      const newUser = await signupUser(email, password);

      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Error during signup:", error);

      // Handle user already exists error
      if (error === "User already exists") {
        return res.status(409).json({ success: false, message: "User already exists." });
      }

      // Handle any other errors
      return res.status(500).json({ success: false, message: "An unexpected error occurred." });
    }
  } else {
    // Method not allowed
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
