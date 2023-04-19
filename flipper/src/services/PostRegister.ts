import { CompanyData, WorkerRegisterData } from "@/types/Types";
import axios, { AxiosError } from "axios";

export async function Post_Company_Register(data: CompanyData) {
  const sendData = { ...data, rol: 'empresa' }
  console.log("=== Company Data ===")
  console.log(data)
  console.log("=====")
  return axios.post('http://localhost:3000/api/users/register', data)
}

export async function Post_Worker_Register(data: WorkerRegisterData) {
  const sendData = { ...data, rol: 'trabajador' }
  console.log("=== Worker Data ===")
  console.log(data)
  console.log("=====")
  return axios.post('http://localhost:3000/api/register/trabajador', data)
}