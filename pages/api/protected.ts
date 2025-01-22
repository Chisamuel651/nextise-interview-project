import { verifyToken } from "@/lib/auth";
import { Hono, Context } from "hono";

interface CustomContext {
  user: { id: string; email: string };
}

type AppContext = Context & { set<T extends keyof CustomContext>(key: T, value: CustomContext[T]): void; };

const protectedRoute = new Hono<{ Bindings: Record<string, never>, Variables: Record<string, never>, Custom: CustomContext }>();

protectedRoute.use("*", async (c: AppContext, next) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1]; 

  const user = token ? verifyToken(token) : null;
  if (!user) {
    return c.json({ success: false, message: "Unauthorized" }, 401);
  }

  c.set("user", user); // Set user in context for downstream use
  await next();
});

protectedRoute.get("/", (c: AppContext) => {
  const user = c.get("user");
  return c.json({ success: true, message: "Welcome!", user });
});

export default protectedRoute;
