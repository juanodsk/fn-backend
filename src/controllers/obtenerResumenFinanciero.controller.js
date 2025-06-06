import TransaccionFinanciera from "../models/transaccionesFinancieras.model.js";
import Sobre from "../models/sobres.models.js";

export const obtenerResumenFinanciero = async (req, res) => {
  try {
    // 1. Total ingresos (transacciones)
    const ingresos = await TransaccionFinanciera.aggregate([
      { $match: { tipo: "Ingreso" } },
      { $group: { _id: null, total: { $sum: "$monto" } } },
    ]);

    // 2. Total egresos (transacciones)
    const egresos = await TransaccionFinanciera.aggregate([
      { $match: { tipo: "Egreso" } },
      { $group: { _id: null, total: { $sum: "$monto" } } },
    ]);

    // 3. Total sobres (por grupos/células)
    const sobres = await Sobre.aggregate([
      { $group: { _id: null, total: { $sum: "$monto" } } },
    ]);

    const totalIngresos = (ingresos[0]?.total || 0) + (sobres[0]?.total || 0);
    const totalEgresos = egresos[0]?.total || 0;
    const balance = totalIngresos - totalEgresos;

    res.status(200).json({
      totalIngresos,
      totalEgresos,
      balance,
      detalle: {
        ingresosTransacciones: ingresos[0]?.total || 0,
        ingresosSobres: sobres[0]?.total || 0,
        egresosTransacciones: totalEgresos,
      },
    });
  } catch (error) {
    console.error("Error al obtener resumen financiero:", error);
    res
      .status(500)
      .json({ message: "Error al obtener resumen financiero", error });
  }
};
