import express from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { authorizeRoles } from "../middlewares/rolesAutorizados.js";

import {
  crearTransaccion,
  obtenerTransacciones,
  eliminarTransaccion,
  transaccionesPorMes,
} from "../controllers/transaccionesFinancieras.controller.js";
import { obtenerResumenFinanciero } from "../controllers/obtenerResumenFinanciero.controller.js";

const router = express.Router();
router.post(
  "/agregar",
  authRequired,
  authorizeRoles("admin", "lider"),
  crearTransaccion
);
router.get(
  "/",
  authRequired,
  authorizeRoles("admin", "lider"),
  obtenerTransacciones
);
router.delete(
  "/:id",
  authRequired,
  authorizeRoles("admin", "lider"),
  eliminarTransaccion
);
router.get(
  "/mensuales",
  authRequired,
  authorizeRoles("admin", "lider"),
  transaccionesPorMes
);

////// Resumen financiero ////////
router.get(
  "/resumen",
  authRequired,
  authorizeRoles("admin", "lider"),
  obtenerResumenFinanciero
);

export default router;
