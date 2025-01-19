import { verifyToken } from "@/lib/auth";
import { Hono } from "hono";


const protectedRoute = new Hono();

protectedRoute.use("*", async (c, next) => {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];
  
    if (!token) {
      return c.json({ success: false, message: "Unauthorized" }, 401);
    }
  
    const user = verifyToken(token);
    if (!user) {
      return c.json({ success: false, message: "Invalid or expired token" }, 401);
    }
  
    c.set("user", user as any); // Use type assertion
    await next();
  });

protectedRoute.get("/", (c) => {
  const user = c.get("user") as {id: string; email: string};
  return c.json({ success: true, message: "Welcome!", user });
});

export default protectedRoute;
