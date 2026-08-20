import { Router } from "express";
import { ProjectController } from "../controlles/project.controllers";
import { validateId } from "../middlewares/validation.middleware";
import { TaskController } from "../controlles/task.controller";
import { validateProjectExist } from "../middlewares/project.middleware";
import { validateTaskExist } from "../middlewares/task.middleware";

const router = Router();

router.param("id", validateId);
router.param("projectId", validateId);
router.param("projectId", validateProjectExist);

router.param("taskId", validateId);
router.param("taskId", validateTaskExist);

router.get("/", ProjectController.getAllProjects);
router.post("/", ProjectController.createProject);
router.get("/:id", ProjectController.getProjectById);
router.put("/:id", ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

/* TASKS */
router.get("/:projectId/tasks", TaskController.getAllTasks);
router.post("/:projectId/tasks", TaskController.createTask);
router.get("/:projectId/tasks/:taskId", TaskController.getTaskById);
router.put("/:projectId/tasks/:taskId", TaskController.updateTaskById);
router.delete("/:projectId/tasks/:taskId", TaskController.deleteTaskById);
router.post("/:projectId/tasks/:taskId/status", TaskController.updateStatusTask);

export default router;