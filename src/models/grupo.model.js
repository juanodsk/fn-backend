import mongoose from "mongoose";

const grupoSchema = new mongoose.Schema({
  lider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    enum: ["Norte", "Sur", "Oriente", "Fuera de Neiva"],
    required: true,
  },
  diaReunion: {
    type: String,
    required: true,
  },
  horaReunion: {
    type: String,
    required: true,
  },
  miembros: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  ],
});

export default mongoose.model("Grupo", grupoSchema);
