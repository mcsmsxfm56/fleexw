import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { CompanyData, WorkerRegisterData } from "@/types/Types";

//const URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export async function Post_Company_Register(data: CompanyData) {
  return fetch(`api/users/register/empresa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function Post_Worker_Register(data: WorkerRegisterData) {
  // TODO el numero de id llega como string, lo paso a number

  const sendData = {
    ...data,
    rol: "trabajador",
    idNumber: parseInt(data.idNumber),
  };
  return fetch(`api/users/register/trabajador`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  }).then((res) => res.text());
}
