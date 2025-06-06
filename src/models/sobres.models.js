import mongoose from "mongoose";

const sobreSchema = new mongoose.Schema(
  {
    grupo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grupo",
      required: true,
    },
    recolectadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    monto: {
      type: Number,
      required: true,
      min: 0,
    },
    observaciones: {
      type: String,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sobre", sobreSchema);
