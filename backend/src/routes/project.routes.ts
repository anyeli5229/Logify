import { Router } from "express";
import { ProjectController } from "../controlles/project.controllers";
import { validarId } from "../middlewares/project.middleware";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.post("/", ProjectController.createProject);
router.get("/:id", validarId, ProjectController.getProjectById);
router.put("/:id", validarId, ProjectController.updateProject);
router.delete("/:id", validarId, ProjectController.deleteProject);

export default router;