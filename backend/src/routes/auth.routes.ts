import { Router } from "express"
import { AuthController } from "../controlles/auth.controller";
import { validateToken } from "../middlewares/validation.middleware";
import { autentificacion } from "../middlewares/auth.middleware";
import { ChangePasswordSchema, EmailSchema, LoginSchema, PasswordSchema, ProfileSchema, RegisterSchema, TokenSchema, UpdatePasswordSchema } from "../schemas/auth.schema";
import { validateSchema } from "../middlewares/validate.schema.middleware";

const router = Router();

router.param("token", validateToken);

router.post("/create-account", validateSchema(RegisterSchema), AuthController.createAccount);
router.post("/confirm-account", validateSchema(TokenSchema), AuthController.confirmAccount);
router.post("/login", validateSchema(LoginSchema), AuthController.login);
router.post("/request-code", validateSchema(EmailSchema), AuthController.requestConfirmCode);
router.post("/forgot-password", validateSchema(EmailSchema), AuthController.forgotPassword);
router.post("/validate-token", validateSchema(TokenSchema), AuthController.validateToken);
router.post("/update-password/:token", validateSchema(UpdatePasswordSchema), AuthController.updatePassword);
router.get("/user", autentificacion, AuthController.user);

/** Profile */
router.put('/profile', autentificacion, validateSchema(ProfileSchema), AuthController.updateProfile)
router.post('/update-password', autentificacion, validateSchema(ChangePasswordSchema), AuthController.updateCurrentUserPassword);
router.post('/check-password', autentificacion, validateSchema(PasswordSchema), AuthController.checkPassword);

export default router;