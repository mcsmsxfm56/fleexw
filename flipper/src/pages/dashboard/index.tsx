import DatagridEmpresa from "./DatagridEmpresa";
import DatagridEventos from "./DatagridEventos";
import DatagridTrabajadores from "./DatagridTrabajadores";
import { downloadExcelAdmin } from "../../components/Excel/generateExcel";
import useSWR from "swr";
import { fetcherDashboard } from "../../services/servicesDashboard";
import {
  objEmpresa,
  objEvento,
  objTrabajador,
  objtrabajadoresEnEventos,
} from "@/types/Types";
import { useEffect, useState } from "react";
import DatagridTrabajadoresEnEventos from "./DatagridTrabajadoresEnEventos";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { useRouter } from "next/router";
import Link from "next/link";

const buttonStyle =
  "btn bg-[#4B39EF] normal-case text-[24px] text-white border-transparent hover:bg-[#605BDC]";

export default function Dashboard() {
  const [data, setData]: any = useState();
  const { isAdmin, token } = useSesionUsuarioContext();
  //console.log(token);
  /*   let isAdmin: boolean;
    const router = useRouter();
    if (typeof window !== "undefined") {
      if (localStorage.getItem("isAdmin") === "true") {
        isAdmin = true;
      } else {
        router.push("/404");
      }
    } */
  const fetcher = async () => {
    await fetch(`/api/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    if (token) {
      fetcher();
    }
  }, [token]);
  let eventosCancelados = 0;
  console.log(data);
  const sheetTrabajador: objTrabajador[] = [];
  const sheetEmpresa: objEmpresa[] = [];
  const sheetEventos: objEvento[] = [];
  const sheetTrabajadoresEnEventos: objtrabajadoresEnEventos[] = [];

  data?.trabajadoresEnEventosTable.map(
    (objtrabajadoresEnEventos: objtrabajadoresEnEventos) => {
      sheetTrabajadoresEnEventos.push(objtrabajadoresEnEventos);
    }
  );
  data?.empresaTable.map((objEmpresa: objEmpresa) => {
    //delete objEmpresa.id;
    sheetEmpresa.push(objEmpresa);
  });
  data?.eventoTable.map((objEvento: objEvento) => {
    sheetEventos.push(objEvento);
  });
  data?.trabajadorTable.map((objTrabajador: objTrabajador) => {
    sheetTrabajador.push(objTrabajador);
  });

  //if (isLoading) return <div>Cargando...</div>;
  console.log(sheetTrabajadoresEnEventos);
  return (
    <div>
      Tabla empresa
      <DatagridEmpresa dataEmpresas={data?.empresaTable} />
      Tabla eventos
      <DatagridEventos dataEventos={data?.eventoTable} />
      Tabla trabajadores
      <DatagridTrabajadores dataTrabajadores={data?.trabajadorTable} />
      Tabla trabajadoresEnEventos
      <DatagridTrabajadoresEnEventos
        dataTrabajadoresEnEventos={data?.trabajadoresEnEventosTable}
      />
      <button
        onClick={() => {
          downloadExcelAdmin(
            sheetTrabajador,
            sheetEmpresa,
            sheetEventos,
            sheetTrabajadoresEnEventos
          );
        }}
        className={buttonStyle + " ml-2"}
      >
        Descargar Excel
      </button>
      <br></br>
      Eventos Cancelados:{eventosCancelados}
      <br></br>
      <button className={buttonStyle + " ml-2"}>
        <Link href="/home">Volver a la home</Link>
      </button>
    </div>
  );
}
