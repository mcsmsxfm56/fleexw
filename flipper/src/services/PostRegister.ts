import { CompanyData, WorkerRegisterData } from "@/types/Types";
import axios, { AxiosError } from "axios";

const URL = 'http://localhost:3000'

export async function Post_Company_Register(data: CompanyData) {
  const sendData = { ...data, rol: 'empresa' }
  console.log("=== Company Data ===")
  console.log(data)
  console.log("=====")
  return axios.post(`${URL}/api/users/register/empresa`, data)
}

export async function Post_Worker_Register(data: WorkerRegisterData) {
  const sendData = { ...data, rol: 'trabajador' }
  console.log("=== Worker Data ===")
  console.log(data)
  console.log("=====")
  return axios.post(`${URL}/api/users/register/trabajador`, data)
}