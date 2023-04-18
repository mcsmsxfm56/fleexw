import axios from "axios";
import { userData } from "../components/RegisterForm";

export default async function POST_Register(data: userData){
  axios.post('http://localhost:3000/api/users/register', data)
}