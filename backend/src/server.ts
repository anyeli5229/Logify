import express from "express";
import dotenv from "dotenv";
import projectRoutes from "./routes/project.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Logify API funcionando correctamente 🚀' });
});

app.use("/api/projects", projectRoutes);

export default app;