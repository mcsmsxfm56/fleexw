import { CompanyData, WorkerRegisterData } from "@/types/Types";
import axios, { AxiosError } from "axios";

const URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export async function Post_Company_Register(data: CompanyData) {
  return axios.post(`${URL}/api/users/register/empresa`, data);
}

export async function Post_Worker_Register(data: WorkerRegisterData) {
  // TODO el numero de id llega como string, lo paso a number
  const sendData = {
    ...data,
    rol: "trabajador",
    idNumber: parseInt(data.idNumber),
  };
  return axios.post(`${URL}/api/users/register/trabajador`, sendData);
}
