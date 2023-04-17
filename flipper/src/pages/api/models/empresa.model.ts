import sequelize from "@/pages/api/database";
import { DataTypes } from "sequelize";

const Empresa = sequelize.define("Empresa", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  NombreEmpresa: { type: DataTypes.STRING, allowNull: false },
  NombreTitular: { type: DataTypes.STRING, allowNull: false },
  Email: { type: DataTypes.STRING, allowNull: false },
  Ciudad: { type: DataTypes.STRING, allowNull: false },
  Direccion: { type: DataTypes.STRING, allowNull: false },
  Telefono: { type: DataTypes.STRING, allowNull: false },
  Contraseña: { type: DataTypes.STRING, allowNull: false },
});

export default Empresa;
