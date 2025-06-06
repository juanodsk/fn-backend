import GrupoMinisterial from "../models/grupoMinisterial.model.js";
import Usuario from "../models/usuario.model.js";

/// CREAR UN GRUPO MINISTERIAL ///
export const crearGrupoMinisterial = async (req, res) => {
  const { nombre, descripcion, pastorLider, miembros } = req.body;
  try {
    const nuevoGrupoMinisterial = new GrupoMinisterial({
      nombre,
      descripcion,
      pastorLider,
      miembros,
    });

    const grupoMinisterialGuardado = await nuevoGrupoMinisterial.save();

    res.status(201).json({
      message: "Grupo ministerial guardado con éxito",
      grupo: grupoMinisterialGuardado,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "No se pudo guardar el grupo ministerial", error });
  }
};

/// OBTENER TODOS LOS GRUPOS MINISTERIALES ///
export const obtenerGruposMinisteriales = async (req, res) => {
  try {
    const gruposMinisteriales = await GrupoMinisterial.find()
      .populate("pastorLider", "nombres apellidos")
      .populate("miembros", "nombres apellidos");

    res.status(200).json({
      message: "Grupos ministeriales obtenidos con éxito",
      grupos: gruposMinisteriales,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "No se pudieron obtener los grupos ministeriales",
      error,
    });
  }
};

/// OBTENER GRUPO MINISTERIAL POR ID ///
export const obtenerGrupoMinisterialPorId = async (req, res) => {
  try {
    const grupoMinisterial = await GrupoMinisterial.findById(req.params.id)
      .populate("pastorLider", "nombres apellidos")
      .populate("miembros", "nombres apellidos");

    if (!grupoMinisterial) {
      return res
        .status(404)
        .json({ message: "Grupo ministerial no encontrado" });
    }

    res.status(200).json({
      message: "Grupo ministerial obtenido con éxito",
      grupo: grupoMinisterial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "No se pudo obtener el grupo ministerial",
      error,
    });
  }
};

/// ACTUALIZAR GRUPO MINISTERIAL ///
export const actualizarGrupoMinisterial = async (req, res) => {
  try {
    const grupoMinisterialActualizado =
      await GrupoMinisterial.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

    if (!grupoMinisterialActualizado) {
      return res
        .status(404)
        .json({ message: "Grupo ministerial no encontrado" });
    }

    res.status(200).json({
      message: "Grupo ministerial actualizado con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "No se pudo actualizar el grupo ministerial",
      error,
    });
  }
};

/// ELIMINAR GRUPO MINISTERIAL ///
export const eliminarGrupoMinisterial = async (req, res) => {
  try {
    const grupoMinisterialEliminado = await GrupoMinisterial.findByIdAndDelete(
      req.params.id
    );

    if (!grupoMinisterialEliminado) {
      return res
        .status(404)
        .json({ message: "Grupo ministerial no encontrado" });
    }

    res.status(200).json({ message: "Grupo ministerial eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "No se pudo eliminar el grupo ministerial",
      error,
    });
  }
};
export const asignarUsuarioAGrupoMinisterial = async (req, res) => {
  const { grupoId, usuarioId } = req.params;

  try {
    const grupoMinisterial = await GrupoMinisterial.findById(grupoId);
    if (!grupoMinisterial) {
      return res
        .status(404)
        .json({ message: "Grupo ministerial no encontrado" });
    }

    const usuario = await Usuario.findById(usuarioId).populate(
      "grupoMinisterialIds",
      "nombre descripcion"
    );
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Añadir al grupo si no está ya
    if (!grupoMinisterial.miembros.includes(usuarioId)) {
      grupoMinisterial.miembros.push(usuarioId);
      await grupoMinisterial.save();
    }

    // Añadir el grupo al usuario (sin duplicados)
    if (!usuario.grupoMinisterialIds.includes(grupoId)) {
      usuario.grupoMinisterialIds.push(grupoId);
      await usuario.save();
    }

    res.status(200).json({
      message: "Usuario asignado al grupo ministerial con éxito",
      grupo: grupoMinisterial,
    });
  } catch (error) {
    console.error("Error al asignar usuario:", error);
    res.status(500).json({
      message: "No se pudo asignar el usuario al grupo ministerial",
      error,
    });
  }
};
