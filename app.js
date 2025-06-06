import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import grupoRoutes from "./src/routes/grupo.routes.js";
import historialRoutes from "./src/routes/historial.routes.js";
import grupoMinisterial from "./src/routes/grupoMinisterial.routes.js";
import actividadEspiritual from "./src/routes/actividadEspiritual.routes.js";
import asignarActividadesEspirituales from "./src/routes/asignarActividadesEspirituales.routes.js";
import sobresRoutes from "./src/routes/sobres.routes.js";
import transaccionesFinancieras from "./src/routes/transaccionesFinancieras.routes.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin:
      "https://filadelfia-neiva-frontendfn-zkn2pg-361f50-165-227-180-87.traefik.me/",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/celulas", grupoRoutes);
app.use("/historial", historialRoutes);
app.use("/actividad-espiritual", actividadEspiritual);
app.use("/grupo-ministerial", grupoMinisterial);
app.use("/asignar-actividad", asignarActividadesEspirituales);
app.use("/sobres", sobresRoutes);
app.use("/transacciones", transaccionesFinancieras);
app.use("/usuario", usuarioRoutes);

export default app;
