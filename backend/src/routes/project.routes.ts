import { Router } from "express";
import { ProjectController } from "../controlles/project.controller";
import { validateId } from "../middlewares/validation.middleware";
import { TaskController } from "../controlles/task.controller";
import { hasAuthorization, validateProjectExist } from "../middlewares/project.middleware";
import { validateTaskExist } from "../middlewares/task.middleware";
import { autentificacion } from "../middlewares/auth.middleware";
import { TeamController } from "../controlles/team.controller";
import { NoteController } from "../controlles/note.controller";
import { validateSchema } from "../middlewares/validate.schema.middleware";
import { createProjectSchema } from "../schemas/project.schema";
import { createTaskSchema, updateTaskStatusSchema } from "../schemas/task.schema";

const router = Router();

router.use(autentificacion);

router.param("id", validateId);
router.param("projectId", validateId);
router.param("projectId", validateProjectExist);

router.param("taskId", validateId);
router.param("taskId", validateTaskExist);

router.param("noteId", validateId);

router.get("/", ProjectController.getAllProjects);
router.post("/", validateSchema(createProjectSchema), ProjectController.createProject);
router.get("/:projectId", ProjectController.getProjectById);
router.put("/:projectId", hasAuthorization, validateSchema(createProjectSchema), ProjectController.updateProject);
router.delete("/:projectId", hasAuthorization, ProjectController.deleteProject);

/* TASKS */
router.get("/:projectId/tasks", TaskController.getAllTasks);
router.post("/:projectId/tasks", hasAuthorization, validateSchema(createTaskSchema), TaskController.createTask);
router.get("/:projectId/tasks/:taskId", TaskController.getTaskById);
router.put("/:projectId/tasks/:taskId", hasAuthorization, validateSchema(createTaskSchema), TaskController.updateTaskById);
router.delete("/:projectId/tasks/:taskId", hasAuthorization, TaskController.deleteTaskById);
router.post("/:projectId/tasks/:taskId/status", validateSchema(updateTaskStatusSchema), TaskController.updateStatusTask);

/* TEAM */
router.post("/:projectId/team/find", TeamController.findMemberByEmail);
router.post("/:projectId/team", TeamController.addMemberById);
router.delete("/:projectId/team/:id", TeamController.deleteMemberById);
router.get("/:projectId/team", TeamController.getProjectTeam);

/* NOTES */
router.post("/:projectId/tasks/:taskId/notes", NoteController.createNote);
router.get("/:projectId/tasks/:taskId/notes", NoteController.getAllNotes);
router.delete("/:projectId/tasks/:taskId/notes/:noteId", NoteController.deleteNote);

export default router;