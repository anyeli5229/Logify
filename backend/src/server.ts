import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import projectRoutes from "./routes/project.routes";
import authRoutes from "./routes/auth.routes";
import { corsConfig } from "./config/cors";

dotenv.config();
const app = express();

app.use(cors(corsConfig))
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;