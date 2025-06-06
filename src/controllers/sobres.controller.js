import Sobre from "../models/sobres.models.js";
import mongoose from "mongoose";

/// CREAR UN SOBRE ///
export const crearSobre = async (req, res) => {
  try {
    const nuevoSobre = new Sobre(req.body);
    const sobreGuardado = await nuevoSobre.save();
    res.status(201).json({
      message: "Sobre guardado con éxito",
      sobre: sobreGuardado,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el sobre", error });
  }
};

/// OBTENER TODOS LOS SOBRES ///
export const obtenerSobres = async (req, res) => {
  try {
    const sobres = await Sobre.find()
      .populate("grupo", "nombre")
      .populate("recolectadoPor", "nombres apellidos");
    res.status(200).json(sobres);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener sobres", error });
  }
};

/// OBTENER SOBRES POR GRUPO ///

export const obtenerSobresPorGrupo = async (req, res) => {
  const { idGrupo } = req.params;
  try {
    const sobres = await Sobre.find({ grupo: idGrupo })
      .populate("grupo", "nombre")
      .populate("recolectadoPor", "nombre");
    res.status(200).json(sobres);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los sobres", error });
  }
};

/// TOTAL RECAUDADO POR MES ///

export const totalRecacudadoSobresPorMes = async (req, res) => {
  const year = parseInt(req.params.year);
  try {
    const totales = await Sobre.aggregate([
      {
        $match: {
          fecha: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$fecha" },
          total: { $sum: "$monto" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(totales);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los totales", error });
  }
};
/// TOTAL RECAUDADO POR SEMANA ///
export const totalRecaudadoSobresPorSemana = async (req, res) => {
  const desde = new Date(req.query.desde); // ejemplo: 2025-05-01
  const hasta = new Date(req.query.hasta); // ejemplo: 2025-05-07
  try {
    const total = await Sobre.aggregate([
      {
        $match: {
          fecha: {
            $gte: desde,
            $lte: hasta,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$monto" },
        },
      },
    ]);

    res.status(200).json(total[0] || { total: 0 });
  } catch (error) {
    res.status(500).json({ message: "Error al calcular total semanal", error });
  }
};

/// TOTAL RECAUDADO POR GRUPO ///

export const totalRecaudadoSobresPorGrupo = async (req, res) => {
  const { idGrupo } = req.params;
  try {
    const total = await Sobre.aggregate([
      {
        $match: {
          grupo: mongoose.Types.ObjectId(idGrupo),
        },
      },
      {
        $group: {
          _id: "$grupo",
          total: { $sum: "$monto" },
        },
      },
    ]);
    res.status(200).json(total[0] || { total: 0 });
  } catch (error) {
    console.error("Error en totalRecaudadoSobresPorGrupo:", error);
    res.status(500).json({ message: "Error al obtener el total por grupo" });
  }
};
/// ELIMINAR SOBRE ///
export const eliminarSobre = async (req, res) => {
  try {
    const sobre = await Sobre.findByIdAndDelete(req.params.id);
    if (!sobre) {
      return res.status(404).json({ message: "Sobre no encontrado" });
    }
    res.status(200).json({ message: "Sobre eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el sobre" });
  }
};
