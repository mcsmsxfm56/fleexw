import { CompanyData } from "@/types/Types";
import axios, { AxiosError } from "axios";

export async function Post_Company_Register(data: CompanyData) {
  console.log("=====")
  console.log(data)
  console.log("=====")
  return axios.post('http://localhost:3000/api/users/register', data)
}