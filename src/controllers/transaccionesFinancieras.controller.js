import TransaccionFinanciera from "../models/transaccionesFinancieras.model.js";
// Crear transacción
export const crearTransaccion = async (req, res) => {
  try {
    const { tipo, descripcion, monto, fecha, categoria } = req.body;

    const nuevaTransaccion = new TransaccionFinanciera({
      tipo,
      categoria,
      descripcion,
      monto,
      fecha,
      registradoPor: req.usuario.id,
    });

    await nuevaTransaccion.save();
    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar transacción", error });
  }
};

// Obtener todas las transacciones
export const obtenerTransacciones = async (req, res) => {
  try {
    const transacciones = await TransaccionFinanciera.find()
      .populate("registradoPor", "nombres apellidos")
      .sort({ fecha: -1 });

    res.status(200).json(transacciones);
  } catch (error) {
    console.error("Error al crear transacción:", error);

    res.status(500).json({ message: "Error al obtener transacciones", error });
  }
};

// Eliminar transacción
export const eliminarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;

    const transaccion = await TransaccionFinanciera.findByIdAndDelete(id);
    if (!transaccion) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }

    res.status(200).json({ message: "Transacción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar transacción", error });
  }
};

// Obtener transacciones por mes y año
export const transaccionesPorMes = async (req, res) => {
  const { mes, año } = req.query;

  try {
    const desde = new Date(año, mes - 1, 1);
    const hasta = new Date(año, mes, 0, 23, 59, 59);

    const transacciones = await TransaccionFinanciera.find({
      fecha: { $gte: desde, $lte: hasta },
    }).sort({ fecha: -1 });

    res.status(200).json(transacciones);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener transacciones por mes", error });
  }
};
