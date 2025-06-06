import Grupo from "../models/grupo.model.js";

///CREAR GRUPO//////
export const crearGrupo = async (req, res) => {
  const { lider, direccion, ubicacion, diaReunion, horaReunion, miembros } =
    req.body;
  try {
    const nuevoGrupo = new Grupo({
      lider,
      direccion,
      ubicacion,
      diaReunion,
      horaReunion,
      miembros,
    });
    const grupoGuardado = await nuevoGrupo.save();
    res.status(201).json({
      id: grupoGuardado._id,
      lider: grupoGuardado.lider,
      direccion: grupoGuardado.direccion,
      ubicacion: grupoGuardado.ubicacion,
      diaReunion: grupoGuardado.diaReunion,
      horaReunion: grupoGuardado.horaReunion,
      miembros: grupoGuardado.miembros,
    });
    res.status(200).send({ message: "Grupo guardado con éxito" });
  } catch (error) {
    res.status(500).send({ message: "No se pudo guardar la Celula" });
  }
};

///OBTENER GRUPO GUARDADO//////

export const obtenerGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.find()
      .populate("lider", "nombres apellidos telefono")
      .populate("miembros", "nombres apellidos telefono");
    res.status(200).json(grupos);
  } catch (error) {
    res.status(500).send({ message: "No se pudieron obtener los grupos" });
  }
};

///// OBTENER GRUPO POR ID /////

export const obtenerGrupoPorId = async (req, res) => {
  try {
    const grupo = await Grupo.findById(req.params.id)
      .populate("lider", "nombres apellidos telefono")
      .populate("miembros", "nombres apellidos telefono");
    res.json(grupo);
    if (!grupo) return res.status(404).send({ message: "Grupo no encontrado" });
  } catch (error) {
    res.status(500).send({ message: "No se pudo obtener el grupo" });
  }
};

///// ACTUALIZAR GRUPO  /////

export const actualizarGrupo = async (req, res) => {
  try {
    const grupoActualizado = await Grupo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!grupoActualizado)
      return res.status(404).send({ message: "Grupo no encontrado" });
    res.status(200).send({ message: "Grupo actualizado con éxito" });

    res.json(grupoActualizado);
  } catch (error) {
    res.status(500).send({ message: "No se pudo actualizar el grupo" });
  }
};

///// ELIMINAR GRUPO /////

export const eliminarGrupo = async (req, res) => {
  try {
    const grupoEliminado = await Grupo.findByIdAndDelete(req.params.id);
    if (!grupoEliminado)
      return res.status(404).send({ message: "Grupo no encontrado" });
    res.status(200).send({ message: "Grupo eliminado con éxito" });
  } catch (error) {
    res.status(500).send({ message: "No se pudo eliminar el grupo" });
  }
};

export const agregarMiembroAGrupo = async (req, res) => {
  try {
    const { grupoId, usuarioId } = req.body;
    if (!grupoId || !usuarioId) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const grupo = await Grupo.findById(grupoId);
    if (!grupo) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    // Evita duplicados
    if (grupo.miembros.includes(usuarioId)) {
      return res
        .status(400)
        .json({ message: "El usuario ya es miembro del grupo" });
    }

    grupo.miembros.push(usuarioId);
    await grupo.save();

    res.status(200).json({ message: "Miembro agregado con éxito", grupo });
  } catch (error) {
    res.status(500).json({ message: "No se pudo agregar el miembro al grupo" });
  }
};
