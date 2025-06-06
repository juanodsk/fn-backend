import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

// Crear un nuevo usuario (similar a register pero con más campos opcionales)
export const agregarUsuario = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      email,
      password,
      telefono,
      rol,
      pastorId,
      grupoId,
      bloqueado,
      estado,
      notas,
      fechaNacimiento,
      direccion,
      fotoPerfil,
      actividadesEspirituales,
    } = req.body;

    // Verificar que email no exista
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario)
      return res.status(400).json({ message: "Email ya registrado" });

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
      email,
      password: passwordHash,
      telefono,
      rol,
      pastorId,
      grupoId,
      bloqueado,
      estado,
      notas,
      historial,
      fechaNacimiento,
      direccion,
      fotoPerfil,
      actividadesEspirituales,
    });

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json({
      id: usuarioGuardado._id,
      nombres: usuarioGuardado.nombres,
      apellidos: usuarioGuardado.apellidos,
      email: usuarioGuardado.email,
      rol: usuarioGuardado.rol,
      fechaRegistro: usuarioGuardado.fechaRegistro,
    });
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json({ message: "Error al agregar usuario", error });
  }
};

// Actualizar usuario (por id)
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const {
    nombres,
    apellidos,
    email,
    password,
    telefono,
    rol,
    pastorId,
    grupoId,
    bloqueado,
    estado,
    notas,
    fechaNacimiento,
    direccion,
    fotoPerfil,
    actividadesEspirituales,
    historial,
  } = req.body;

  try {
    const usuario = await Usuario.findById(id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Si se actualiza el password, hashearlo
    if (password) {
      usuario.password = await bcrypt.hash(password, 10);
    }

    // Actualizar campos opcionales si vienen en req.body
    if (nombres !== undefined) usuario.nombres = nombres;
    if (apellidos !== undefined) usuario.apellidos = apellidos;
    if (email !== undefined) usuario.email = email;
    if (telefono !== undefined) usuario.telefono = telefono;
    if (rol !== undefined) usuario.rol = rol;
    if (pastorId !== undefined) usuario.pastorId = pastorId;
    if (grupoId !== undefined) usuario.grupoId = grupoId;
    if (bloqueado !== undefined) usuario.bloqueado = bloqueado;
    if (estado !== undefined) usuario.estado = estado;
    if (notas !== undefined) usuario.notas = notas;
    if (fechaNacimiento !== undefined)
      usuario.fechaNacimiento = fechaNacimiento;
    if (direccion !== undefined) usuario.direccion = direccion;
    if (fotoPerfil !== undefined) usuario.fotoPerfil = fotoPerfil;
    if (actividadesEspirituales !== undefined)
      usuario.actividadesEspirituales = actividadesEspirituales;
    if (historial !== undefined) usuario.historial = historial;

    await usuario.save();

    res.json({
      message: "Usuario actualizado",
      usuario,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

// Eliminar usuario (por id)
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findById(id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await Usuario.findByIdAndDelete(id);

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};
// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findById(id)
      .populate({
        path: "pastorId",
        select: "-password -rol",
      })
      .populate("grupoId")
      .populate("actividadesEspirituales")
      .populate("historial");
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};
