export function authorizeRoles(...rolesPermitidos) {
  return (req, res, next) => {
    const { rol } = req.usuario;
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ message: "Permisos Insuficientes" });
    }
    next();
  };
}
