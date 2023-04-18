import axios, { AxiosError } from "axios";
import { userData } from "../components/RegisterForm";

export default async function POST_Register(data: userData) {
  console.log("=====")
  console.log(data)
  console.log("=====")
  return axios.post('http://localhost:3000/api/users/register', data)
}