import express from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { authorizeRoles } from "../middlewares/rolesAutorizados.js";

import {
  crearSobre,
  obtenerSobres,
  obtenerSobresPorGrupo,
  totalRecacudadoSobresPorMes,
  totalRecaudadoSobresPorSemana,
  totalRecaudadoSobresPorGrupo,
  eliminarSobre,
} from "../controllers/sobres.controller.js";

const router = express.Router();

router.post(
  "/crear",
  authRequired,
  authorizeRoles("admin", "lider"),
  crearSobre
);
router.get("/", authRequired, authorizeRoles("admin", "lider"), obtenerSobres);
router.get(
  "/grupo/:idGrupo",
  authRequired,
  authorizeRoles("admin", "lider"),
  obtenerSobresPorGrupo
);
router.get(
  "/total-recaudado/mes/:year",
  authRequired,
  authorizeRoles("admin", "lider"),
  totalRecacudadoSobresPorMes
);
router.get(
  "/total-recaudado/semana",
  authRequired,
  authorizeRoles("admin", "lider"),
  totalRecaudadoSobresPorSemana
);
router.get(
  "/total-recaudado/grupo/:idGrupo",
  authRequired,
  authorizeRoles("admin", "lider"),
  totalRecaudadoSobresPorGrupo
);
router.delete(
  "/eliminar/:id",
  authRequired,
  authorizeRoles("admin", "lider"),
  eliminarSobre
);
export default router;
