import mongoose from "mongoose";

const historialSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    tipo: {
      type: String,
      enum: [
        "asistencia",
        "discipulado",
        "conversación",
        "nota",
        "reporte",
        "Otro",
      ],
    },
    descripcion: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Historial", historialSchema);
