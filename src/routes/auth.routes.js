import express from "express";
import {
  login,
  register,
  logout,
  perfil,
  verifyToken,
  actualizarPerfilUsuario,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/perfil", authRequired, perfil);
router.get("/verify", verifyToken);
router.put("/perfil", authRequired, actualizarPerfilUsuario);

export default router;
