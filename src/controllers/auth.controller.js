/////////////IMPORTACIONES/////////////
import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config.js";
import fs from "fs";

///REGISTRO DE USUARIO//////
export const register = async (req, res) => {
  const { nombres, apellidos, email, password, cedula, telefono } = req.body;
  try {
    const usuarioFound = await Usuario.findOne({ email });
    if (usuarioFound) return res.status(400).send(["El email ya está en uso"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUsuario = new Usuario({
      nombres,
      apellidos,
      email,
      password: passwordHash,
      cedula,
      telefono,
    });
    const usuarioSaved = await newUsuario.save();
    // Generar un token JWT
    const token = await createAccessToken({
      id: usuarioSaved._id,
      rol: usuarioSaved.rol,
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
    });
    res.json({
      id: usuarioSaved._id,
      nombres: usuarioSaved.nombres,
      apellidos: usuarioSaved.apellidos,
      email: usuarioSaved.email,
      telefono: usuarioSaved.telefono,
      pastor: usuarioSaved.pastorId,
      grupo: usuarioSaved.grupoId,
      estado: usuarioSaved.estado,
      rol: usuarioSaved.rol,
      historial: usuarioSaved.historial,
      estado: usuarioSaved.estado,
      fechaRegistro: usuarioSaved.fechaRegistro,
      notas: usuarioSaved.notas,
      fechaNacimiento: usuarioSaved.fechaNacimiento,
      direccion: usuarioSaved.direccion,
      fotoPerfil: usuarioSaved.fotoPerfil,
      actividadesEspirituales: usuarioSaved.actividadesEspirituales,
      cedula: usuarioSaved.cedula,
      grupoMinisterialIds: usuarioSaved.grupoMinisterialIds,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

////iNICIO DE SESION DE USUARIO//////
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuarioFound = await Usuario.findOne({ email })
      .populate("grupoMinisterialIds", "nombre")
      .populate("pastorId", "nombres apellidos")
      .populate({
        path: "grupoId",
        populate: [
          { path: "lider", select: "nombres apellidos" },
          { path: "direccion" },
          { path: "ubicacion" },
        ],
      });
    if (!usuarioFound) return res.status(400).send(["Usuario no encontrado"]);
    const isMatch = await bcrypt.compare(password, usuarioFound.password);

    if (!isMatch) return res.status(400).send(["Credenciales Incorrectas"]);

    // Generar un token JWT
    const token = await createAccessToken({
      id: usuarioFound._id,
      rol: usuarioFound.rol,
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None", // Asegura que la cookie no sea accesible desde JavaScript
    });
    res.json({
      id: usuarioFound._id,
      nombres: usuarioFound.nombres,
      apellidos: usuarioFound.apellidos,
      email: usuarioFound.email,
      telefono: usuarioFound.telefono,
      pastor: usuarioFound.pastorId,
      grupo: usuarioFound.grupoId,
      estado: usuarioFound.estado,
      rol: usuarioFound.rol,
      historial: usuarioFound.historial,
      estado: usuarioFound.estado,
      fechaRegistro: usuarioFound.fechaRegistro,
      notas: usuarioFound.notas,
      fechaNacimiento: usuarioFound.fechaNacimiento,
      direccion: usuarioFound.direccion,
      fotoPerfil: usuarioFound.fotoPerfil,
      actividadesEspirituales: usuarioFound.actividadesEspirituales,
      cedula: usuarioFound.cedula,
      grupoMinisterialIds: usuarioFound.grupoMinisterialIds,
    });
  } catch (error) {
    res.status(500).send(["Error al iniciar sesión"]);
  }
};

////CERRAR SESIÓN DE USUARIO//////
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200).send(["Sesión cerrada con éxito"]);
};

////PERFIL DE USUARIO DE USUARIO//////
export const perfil = async (req, res) => {
  const usuarioFound = await Usuario.findById(req.usuario.id)
    .populate("grupoMinisterialIds", "nombre")
    .populate("pastorId", "nombres apellidos")
    .populate({
      path: "grupoId",
      populate: [
        { path: "lider", select: "nombres apellidos" },
        { path: "direccion" },
        { path: "ubicacion" },
      ],
    });
  if (!usuarioFound) return res.status(404).send(["Usuario no encontrado"]);

  return res.json({
    id: usuarioFound._id,
    nombres: usuarioFound.nombres,
    apellidos: usuarioFound.apellidos,
    email: usuarioFound.email,
    telefono: usuarioFound.telefono,
    pastor: usuarioFound.pastorId,
    grupo: usuarioFound.grupoId,
    estado: usuarioFound.estado,
    rol: usuarioFound.rol,
    historial: usuarioFound.historial,
    estado: usuarioFound.estado,
    fechaRegistro: usuarioFound.fechaRegistro,
    notas: usuarioFound.notas,
    fechaNacimiento: usuarioFound.fechaNacimiento,
    direccion: usuarioFound.direccion,
    fotoPerfil: usuarioFound.fotoPerfil,
    actividadesEspirituales: usuarioFound.actividadesEspirituales,
    cedula: usuarioFound.cedula,
    grupoMinisterialIds: usuarioFound.grupoMinisterialIds,
  });
};

////VERIFICAR TOKEN//////

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, usuario) => {
    if (error) return res.sendStatus(401);

    const usuarioFound = await Usuario.findById(usuario.id)
      .populate("grupoMinisterialIds", "nombre")
      .populate("pastorId", "nombres apellidos")
      .populate({
        path: "grupoId",
        populate: [
          { path: "lider", select: "nombres apellidos" },
          { path: "direccion" },
          { path: "ubicacion" },
        ],
      });
    if (!usuarioFound) return res.sendStatus(401);

    return res.json({
      id: usuarioFound._id,
      nombres: usuarioFound.nombres,
      apellidos: usuarioFound.apellidos,
      email: usuarioFound.email,
      telefono: usuarioFound.telefono,
      pastor: usuarioFound.pastorId,
      grupo: usuarioFound.grupoId,
      estado: usuarioFound.estado,
      rol: usuarioFound.rol,
      historial: usuarioFound.historial,
      estado: usuarioFound.estado,
      fechaRegistro: usuarioFound.fechaRegistro,
      notas: usuarioFound.notas,
      fechaNacimiento: usuarioFound.fechaNacimiento,
      direccion: usuarioFound.direccion,
      fotoPerfil: usuarioFound.fotoPerfil,
      actividadesEspirituales: usuarioFound.actividadesEspirituales,
      cedula: usuarioFound.cedula,
      grupoMinisterialIds: usuarioFound.grupoMinisterialIds,
    });
  });
};

// controllers/usuario.controller.js

export const actualizarPerfilUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    if (req.file) {
      const img = fs.readFileSync(req.file.path);
      req.body.fotoPerfil = {
        data: img,
        contentType: req.file.mimetype,
      };
    }

    const camposPermitidos = [
      "nombres",
      "apellidos",
      "telefono",
      "direccion",
      "notas",
      "fechaNacimiento",
      "fotoPerfil",
      "actividadesEspirituales",
      "grupoMinisterialIds",
      "estado",
    ];

    const datosActualizados = {};
    for (const campo of camposPermitidos) {
      if (req.body[campo] !== undefined) {
        datosActualizados[campo] = req.body[campo];
      }
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      usuarioId,
      datosActualizados,
      { new: true }
    )
      .populate("grupoMinisterialIds", "nombre")
      .populate("pastorId", "nombres apellidos")
      .populate({
        path: "grupoId",
        populate: [
          { path: "lider", select: "nombres apellidos" },
          { path: "direccion" },
          { path: "ubicacion" },
        ],
      });

    if (!usuarioActualizado) {
      return res
        .status(404)
        .json({ mensaje: "Usuario no encontrado tras actualizar." });
    }

    return res.json({
      id: usuarioActualizado._id,
      nombres: usuarioActualizado.nombres,
      apellidos: usuarioActualizado.apellidos,
      email: usuarioActualizado.email,
      telefono: usuarioActualizado.telefono,
      pastor: usuarioActualizado.pastorId,
      grupo: usuarioActualizado.grupoId,
      estado: usuarioActualizado.estado,
      rol: usuarioActualizado.rol,
      historial: usuarioActualizado.historial,
      fechaRegistro: usuarioActualizado.fechaRegistro,
      notas: usuarioActualizado.notas,
      fechaNacimiento: usuarioActualizado.fechaNacimiento,
      direccion: usuarioActualizado.direccion,
      fotoPerfil: usuarioActualizado.fotoPerfil,
      actividadesEspirituales: usuarioActualizado.actividadesEspirituales,
      cedula: usuarioActualizado.cedula,
      grupoMinisterialIds: usuarioActualizado.grupoMinisterialIds,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el perfil." });
  }
};
