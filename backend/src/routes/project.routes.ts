import { Router } from "express";
import { ProjectController } from "../controlles/project.controller";
import { validateId } from "../middlewares/validation.middleware";
import { TaskController } from "../controlles/task.controller";
import { hasAuthorization, validateProjectExist } from "../middlewares/project.middleware";
import { validateTaskExist } from "../middlewares/task.middleware";
import { autentificacion } from "../middlewares/auth.middleware";
import { TeamController } from "../controlles/team.controller";

const router = Router();

router.use(autentificacion);

router.param("id", validateId);
router.param("projectId", validateId);
router.param("projectId", validateProjectExist);

router.param("taskId", validateId);
router.param("taskId", validateTaskExist);

router.get("/", ProjectController.getAllProjects);
router.post("/", ProjectController.createProject);
router.get("/:projectId", ProjectController.getProjectById);
router.put("/:projectId", ProjectController.updateProject);
router.delete("/:projectId", ProjectController.deleteProject);

/* TASKS */
router.get("/:projectId/tasks", TaskController.getAllTasks);
router.post("/:projectId/tasks", hasAuthorization, TaskController.createTask);
router.get("/:projectId/tasks/:taskId", TaskController.getTaskById);
router.put("/:projectId/tasks/:taskId", hasAuthorization, TaskController.updateTaskById);
router.delete("/:projectId/tasks/:taskId", hasAuthorization, TaskController.deleteTaskById);
router.post("/:projectId/tasks/:taskId/status", TaskController.updateStatusTask);

/* TEAM */
router.post("/:projectId/team/find", TeamController.findMemberByEmail);
router.post("/:projectId/team", TeamController.addMemberById);
router.delete("/:projectId/team/:id", TeamController.deleteMemberById);
router.get("/:projectId/team", TeamController.getProjectTeam);

export default router;