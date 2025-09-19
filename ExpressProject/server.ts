import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/auth/auth.routes";
import userRouts from "./src/users/user.routes";
import courseRouts from "./src/courses/course.routes"
import { errorMiddleware } from "./src/shared/middlewares/error.middleware";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRouts);
app.use("/courses",courseRouts);

//404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorMiddleware);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}
