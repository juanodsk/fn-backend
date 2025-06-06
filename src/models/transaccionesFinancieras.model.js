import mongoose from "mongoose";

const transaccionSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ["Ingreso", "Egreso"],
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  registradoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

export default mongoose.model("Transaccion", transaccionSchema);
