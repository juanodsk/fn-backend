import express from "express";
import {
  crearHistorial,
  obtenerHistoriales,
  obtenerHistorialPorUsuario,
  eliminarHistorial,
} from "../controllers/historial.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { authorizeRoles } from "../middlewares/rolesAutorizados.js";

const router = express.Router();

router.post(
  "/",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  crearHistorial
);
router.get(
  "/",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  obtenerHistoriales
);
router.get(
  "/:usuarioId",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  obtenerHistorialPorUsuario
);
router.delete(
  "/:id",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  eliminarHistorial
);

export default router;
