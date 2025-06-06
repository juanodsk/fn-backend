import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  telefono: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  cedula: {
    type: Number,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    enum: ["admin", "pastor", "lider", "discipulo"],
    default: "discipulo",
  },
  pastorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  grupoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grupo",
  },
  grupoMinisterialIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrupoMinisterial",
    },
  ],

  bloqueado: {
    type: Boolean,
    default: false,
  },
  estado: {
    type: String,
    enum: ["activo", "inactivo"],
    default: "activo",
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  historial: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Historial",
    },
  ],
  notas: {
    type: String,
  },
  fechaNacimiento: {
    type: Date,
    default: null,
  },
  direccion: {
    type: String,
  },
  actividadesEspirituales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActividadEspiritual",
    },
  ],
  fotoPerfil: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model("Usuario", usuarioSchema);
