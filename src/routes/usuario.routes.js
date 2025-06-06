import express from "express";
import {
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorId,
} from "../controllers/usuario.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { authorizeRoles } from "../middlewares/rolesAutorizados.js";

const router = express.Router();

// Crear usuario - solo admin
router.post("/crear", authRequired, authorizeRoles("admin"), agregarUsuario);

// Actualizar usuario por ID - admin o lider
router.put(
  "/actualizar/:id",
  authRequired,
  authorizeRoles("admin", "lider"),
  actualizarUsuario
);

// Eliminar usuario por ID - solo admin
router.delete(
  "/eliminar/:id",
  authRequired,
  authorizeRoles("admin"),
  eliminarUsuario
);

// Obtener usuario por ID - admin o lider
router.get(
  "/:id",
  authRequired,
  authorizeRoles("admin", "lider"),
  obtenerUsuarioPorId
);

export default router;
