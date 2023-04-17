import Empresa from "@/pages/api/models/empresa.model";
import { Data } from "@/pages/api/users/register";

export const getEmpresas = async () => {
  const empresas = await Empresa.findAll();
  return empresas;
};
