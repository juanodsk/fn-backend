import mongoose from "mongoose";

const actividadEspiritualSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});
export default mongoose.model("ActividadEspiritual", actividadEspiritualSchema);
