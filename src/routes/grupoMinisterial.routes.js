import express from "express";

import {
  crearGrupoMinisterial,
  obtenerGruposMinisteriales,
  obtenerGrupoMinisterialPorId,
  actualizarGrupoMinisterial,
  eliminarGrupoMinisterial,
  asignarUsuarioAGrupoMinisterial,
} from "../controllers/grupoMinisterial.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { authorizeRoles } from "../middlewares/rolesAutorizados.js";

const router = express.Router();

router.post(
  "/",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  crearGrupoMinisterial
);
router.get(
  "/",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  obtenerGruposMinisteriales
);
router.get(
  "/:id",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  obtenerGrupoMinisterialPorId
);

router.put(
  "/:id",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  actualizarGrupoMinisterial
);

router.delete(
  "/:id",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  eliminarGrupoMinisterial
);
router.post(
  "/:grupoId/asignar/:usuarioId",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  asignarUsuarioAGrupoMinisterial
);

export default router;
