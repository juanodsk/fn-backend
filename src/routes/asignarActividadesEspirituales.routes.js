import express from "express";
import {
  asignarActividadEspiritual,
  obtenerActividadesEspiritualesUsuario,
} from "../controllers/asignarActividadEspiritual.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { authorizeRoles } from "../middlewares/rolesAutorizados.js";

const router = express.Router();

router.post(
  "/:idUsuario",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  asignarActividadEspiritual
);

router.get(
  "/:idUsuario/actividades",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  obtenerActividadesEspiritualesUsuario
);

export default router;
