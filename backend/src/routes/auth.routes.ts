import { Router } from "express"
import { AuthController } from "../controlles/auth.controller";
import { validateToken } from "../middlewares/validation.middleware";

const router = Router();

router.param("token", validateToken);

router.post("/create-account", AuthController.createAccount);
router.post("/confirm-account", AuthController.confirmAccount);
router.post("/login", AuthController.login);
router.post("/request-code", AuthController.requestConfirmCode);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/validate-token", AuthController.validateToken);
router.post("/update-password/:token", AuthController.updatePassword);

export default router;