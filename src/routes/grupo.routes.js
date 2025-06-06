import express from "express";
import {
  crearGrupo,
  obtenerGrupos,
  obtenerGrupoPorId,
  actualizarGrupo,
  eliminarGrupo,
  agregarMiembroAGrupo,
} from "../controllers/grupo.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { authorizeRoles } from "../middlewares/rolesAutorizados.js";

const router = express.Router();

router.post(
  "/grupos",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  crearGrupo
);
router.get("/grupos", authRequired, obtenerGrupos);
router.get("/grupos/:id", authRequired, obtenerGrupoPorId);
router.put(
  "/grupos/:id",

  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  actualizarGrupo
);
router.delete(
  "/grupos/:id",

  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  eliminarGrupo
);
router.post(
  "/agregar-miembro",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  agregarMiembroAGrupo
);
export default router;
