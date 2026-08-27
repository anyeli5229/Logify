import { Router } from "express"
import { AuthController } from "../controlles/auth.controller";

const router = Router();

router.post("/create-account", AuthController.createAccount);
router.post("/confirm-account", AuthController.confirmAccount);
router.post("/login", AuthController.login);

export default router;