import Historial from "../models/historial.model.js";
import Usuario from "../models/usuario.model.js";

/// CREAR UN REGISTRO DE HISTORIAL ///

export const crearHistorial = async (req, res) => {
  const { usuario, tipo, descripcion, fecha } = req.body;
  try {
    const nuevoHistorial = new Historial({
      usuario,
      tipo,
      descripcion,
      fecha,
      creadoPor: req.usuario.id,
    });
    const historialGuardado = await nuevoHistorial.save();
    await Usuario.findByIdAndUpdate(usuario, {
      $push: { historial: historialGuardado._id },
    });
    res.status(201).json({
      id: historialGuardado._id,
      usuario: historialGuardado.usuario,
      tipo: historialGuardado.tipo,
      descripcion: historialGuardado.descripcion,
      fecha: historialGuardado.fecha,
      creadoPor: historialGuardado.creadoPor,
    });
  } catch (error) {
    console.log("Error al crear historial:", error);
    res.status(500).send({ message: "No se pudo guardar el historial" });
  }
};

/// OBTENER TODO EL HISTORIAL ///

export const obtenerHistoriales = async (req, res) => {
  try {
    const historiales = await Historial.find()
      .populate("usuario", "nombres apellidos")
      .populate("creadoPor", "nombres apellidos")
      .sort({ createdAt: -1 });
    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).send({ message: "No se pudo obtener el historial" });
  }
};

/// OBTENER HISTORIAL DE UN USUARIO ///

export const obtenerHistorialPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const historiales = await Historial.find({ usuario: usuarioId })
      .populate("creadoPor", "nombres apellidos")
      .sort({ createdAt: -1 });
    res.status(200).json(historiales);
  } catch (error) {
    res
      .status(500)
      .send({ message: "No se pudo obtener el historial del usuario" });
  }
};

/// ELIMINAR UN REGISTRO ///

export const eliminarHistorial = async (req, res) => {
  try {
    const historialEliminado = await Historial.findByIdAndDelete(req.params.id);
    if (!historialEliminado) {
      return res.status(404).send({ message: "Historial no encontrado" });
    }
    res.status(200).send({ message: "Historial eliminado" });
  } catch (error) {
    res.status(500).send({ message: "No se pudo eliminar el historial" });
  }
};
