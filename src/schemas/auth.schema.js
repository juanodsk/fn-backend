import { z } from "zod";

export const registerSchema = z.object({
  nombres: z.string().min(1, "El nombre es obligatorio"),
  apellidos: z.string().min(1, "Los apellidos son obligatorios"),
  email: z
    .string({ required_error: "El email es obligatorio" })
    .email("El email no es válido"),
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "El email es obligatorio" })
    .email("El email no es válido"),
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
