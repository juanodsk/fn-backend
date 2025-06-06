import { TopologyDescriptionChangedEvent } from "mongodb";
import ActividadEspiritual from "../models/actividadEspiritual.model.js";

/// CREAR UNA ACTIVIDAD ESPIRITUAL ///

export const crearActividadEspiritual = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const nuevaActividadEspiritual = new ActividadEspiritual({
      nombre,
      descripcion,
    });
    const actividadEspiritualGuardada = await nuevaActividadEspiritual.save();
    res.status(201).json({
      message: "Actividad espiritual creada con éxito",
      actividad: actividadEspiritualGuardada,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "No se pudo guardar la actividad espiritual" });
  }
};

/// OBTENER TODAS LAS ACTIVIDADES ESPIRITUALES ///

export const obtenerActividadesEspirituales = async (req, res) => {
  try {
    const actividadesEspirituales = await ActividadEspiritual.find();
    res.status(200).json(actividadesEspirituales);
  } catch (error) {
    res
      .status(500)
      .send({ message: "No se pudo obtener las actividades espirituales" });
  }
};

/// OBTENER UNA ACTIVIDAD ESPIRITUAL POR ID ///

export const obtenerActividadEspiritualPorId = async (req, res) => {
  try {
    const actividadEspiritual = await ActividadEspiritual.findById(
      req.params.id
    );
    if (!actividadEspiritual) {
      return res
        .status(404)
        .json({ message: "Actividad espiritual no encontrada" });
    }
    res.status(200).json(actividadEspiritual);
  } catch (error) {
    res
      .status(500)
      .send({ message: "No se pudo obtener la actividad espiritual" });
  }
};

/// ACTUALIZAR UNA ACTIVIDAD ESPIRITUAL ///

export const actualizarActividadEspiritual = async (req, res) => {
  try {
    const actividadEspiritual = await ActividadEspiritual.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actividadEspiritual) {
      return res
        .status(404)
        .json({ message: "Actividad espiritual no encontrada" });
    }
    res.status(200).json({
      message: "Actividad espiritual actualizada con éxito",
      actividad: actividadEspiritual,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "No se pudo actualizar la actividad espiritual" });
  }
};

/// ELIMINAR UNA ACTIVIDAD ESPIRITUAL ///

export const eliminarActividadEspiritual = async (req, res) => {
  try {
    const actividadEspiritual = await ActividadEspiritual.findByIdAndDelete(
      req.params.id
    );
    if (!actividadEspiritual) {
      return res
        .status(404)
        .json({ message: "Actividad espiritual no encontrada" });
    }
    res.status(200).json({
      message: "Actividad espiritual eliminada con éxito",
      actividad: actividadEspiritual,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "No se pudo eliminar la actividad espiritual" });
  }
};
