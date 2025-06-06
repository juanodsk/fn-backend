import express from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { authorizeRoles } from "../middlewares/rolesAutorizados.js";

import {
  crearActividadEspiritual,
  obtenerActividadesEspirituales,
  obtenerActividadEspiritualPorId,
  actualizarActividadEspiritual,
  eliminarActividadEspiritual,
} from "../controllers/actividadEspiritual.controller.js";

const router = express.Router();

router.post(
  "/",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  crearActividadEspiritual
);
router.get(
  "/",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  obtenerActividadesEspirituales
);

router.get(
  "/:id",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  obtenerActividadEspiritualPorId
);

router.put(
  "/:id",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  actualizarActividadEspiritual
);

router.delete(
  "/:id",
  authRequired,
  authorizeRoles("admin", "pastor", "lider"),
  eliminarActividadEspiritual
);

export default router;
