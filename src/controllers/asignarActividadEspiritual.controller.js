import Usuario from "../models/usuario.model.js";
import ActividadEspiritual from "../models/actividadEspiritual.model.js";

/// ASIGNAR ACTIVIDAD ESPIRITUAL A UN USUARIO ///

export const asignarActividadEspiritual = async (req, res) => {
  const { idUsuario } = req.params;
  const { idActividadEspiritual } = req.body;

  try {
    const usuario = await Usuario.findById(idUsuario);
    const actividad = await ActividadEspiritual.findById(idActividadEspiritual);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }
    // Verificar si la actividad ya está asignada al usuario
    if (usuario.actividadesEspirituales.includes(idActividadEspiritual)) {
      return res.status(400).json({ message: "Actividad ya asignada" });
    }
    usuario.actividadesEspirituales.push(idActividadEspiritual);
    await usuario.save();
    const usuarioConActividades = await Usuario.findById(idUsuario).populate(
      "actividadesEspirituales",
      "nombre descripcion"
    );

    res.status(200).json({
      message: "Actividad asignada correctamente al usuario",
      usuario: usuarioConActividades,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar actividad" });
    console.log(error);
  }
};

/// OBTENER TODAS LAS ACTIVIDADES ASIGNADAS A UN USUARIO ///

export const obtenerActividadesEspiritualesUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const usuario = await Usuario.findById(idUsuario).populate(
      "actividadesEspirituales",
      "nombre descripcion"
    );
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario.actividadesEspirituales);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener actividades" });
  }
};
