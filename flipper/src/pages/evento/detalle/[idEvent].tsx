import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { traerEventoYPostulantes } from "@/services/traerEventoYPostulantes";
import { DetalleEvento, TrabajadorStatus } from "../../../types/Types";
import AppLayout from "@/components/AppLayout/AppLayout";
import { HiPencil } from "react-icons/hi";
import { admitirOrestringirPostulaciones } from "@/services/admitirOrestringirPostulaciones";
import { PostulanteCard } from "@/components/PostulanteCard";
import LoadingSubmitForm from "@/components/LoadingSubmitForm";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { aceptarORechazarPostulante } from "@/services/aceptarORechazarPostulante";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import Link from "next/link";
import { downloadExcelDetalleEvento } from "@/components/Excel/generateExcel";
import estandarizarFecha from "@/utils/EstandarizarFecha";
const buttonStyle =
  "btn bg-[#4B39EF] normal-case text-[24px] text-white border-transparent hover:bg-[#605BDC]";
interface postulante {
  rechazados: TrabajadorStatus[];
  aprobados: TrabajadorStatus[];
  pendientes: TrabajadorStatus[];
  asistieron: TrabajadorStatus[];
  faltaron: TrabajadorStatus[];
}

const EventDatail = () => {
  const { rol, token } = useSesionUsuarioContext();
  const router = useRouter();
  const [rows, setRows] = useState<{}[]>([]);
  const [eventDetail, setEventDetail] = useState<DetalleEvento | null>(null);
  // const [postulantes, setPostulantes] = useState<postulante>({
  //   rechazados: [],
  //   aprobados: [],
  //   pendientes: [],
  //   asistieron: [],
  //   faltaron: [],
  // });
  const [loading, setLoading] = useState(false);
  const { idEvent } = router.query;
  let id = 0;
  //console.log(rows);
  const columns: GridColDef[] = [
    {
      field: "Nombre",
      headerName: "Nombre",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "Telefono",
      headerName: "Telefono",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "Perfil",
      headerName: "Perfil",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "UUID",
      headerName: "UUID",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "singleSelect",
      valueOptions: ["APROBADO", "RECHAZADO", "PENDIENTE", "FALTO", "ASISTIO"],
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => (
        <div>
          <button
            className="rounded-md bg-black text-white mb-0.5"
            onClick={() => {
              let idPostulante = params.row.UUID;
              let statusNuevo = params.row.Status;
              aceptarORechazarPostulante({
                idPostulante,
                statusNuevo,
                idEvent,
                token,
              });
            }}
          >
            Actualizar
          </button>
          <br></br>
          <Link href={`/postulaciones/${params.row.UUID}`}>
            <button className="rounded-md bg-black text-white mb">
              Ver perfil
            </button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (idEvent) {
      traerEventoYPostulantes(idEvent as string, token)
        .then((data) => {
          setEventDetail(data);
        })
        .catch((error) => error.message);
    }
  }, [idEvent, loading]);

  useEffect(() => {
    if (eventDetail && idEvent) {
      eventDetail?.trabajadores.map((trabajadorPorEvento) => {
        let objPush = {
          id: id++,
          UUID: trabajadorPorEvento.trabajadorId,
          Nombre: trabajadorPorEvento.trabajadores.name,
          Telefono: trabajadorPorEvento.trabajadores.phone,
          Perfil: eventDetail?.perfil,
          Status: trabajadorPorEvento.status,
        };
        if (rows.length < eventDetail.trabajadores.length) {
          setRows((prev) => [...prev, objPush]);
        }
      });
    }
  }, [eventDetail]);

  const handleadmitirOrestringirPostulaciones = async () => {
    const admitePostulaciones = !eventDetail?.admitePostulaciones; //le voy a enviar la contraria para hacer el cambio
    try {
      setLoading(true);
      await admitirOrestringirPostulaciones(
        idEvent as string,
        admitePostulaciones,
        token
      );
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="h-full">
        <div className="bg-gray-200">
          <div className="flex flex-col justify-center items-center gap-10 relative">
            <div className="w-full flex flex-row justify-between items-center mt-16 md:mt-0">
              <p className="w-full bg-white text-center text-[#4B39EF] font-bold text-xl py-4 relative">
                Evento: {eventDetail?.nombre}
                {rol === "empresa" && (
                  <HiPencil
                    className="text-[#f6ea06] absolute top-3 right-3 rounded-xl border-indigo-700 border-2 border-solid bg-indigo-700 transition duration-200 hover:bg-[#605BDC] cursor-pointer"
                    size={30}
                  />
                )}
              </p>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <p className="text-center font-bold text-xl text-black">
                  Fecha de Inicio:
                </p>
                <p className="text-center font-bold text-lg">
                  {estandarizarFecha(eventDetail?.fecha_inicio)}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-center font-bold text-xl text-black">
                  Fecha de Finalizacion:
                </p>
                <p className="text-center font-bold text-lg">
                  {estandarizarFecha(eventDetail?.fecha_final)}
                </p>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <p className="text-center font-bold text-xl text-black">
                  Perfiles Solicitados:
                </p>
                <p className="text-center font-bold text-lg">
                  {" "}
                  {eventDetail?.perfil}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-center font-bold text-xl text-black">
                  Ciudad Y Dirección:
                </p>
                <p className="text-center font-bold text-lg">
                  {eventDetail?.lugar}, {eventDetail?.establecimiento}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-center font-bold text-xl text-black">
                Observaciones:
              </p>
              <p className="text-center font-bold text-lg">
                {eventDetail?.observaciones}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {rol === "empresa" ? (
              <div className="flex flex-col items-center my-8 w-11/12 lg:w-9/12">
                {loading ? (
                  <LoadingSubmitForm />
                ) : (
                  <button
                    className="btn bg-[#4B39EF] normal-case text-[24px] text-white border-transparent hover:bg-[#605BDC] mb-4"
                    onClick={handleadmitirOrestringirPostulaciones}
                  >
                    {eventDetail?.admitePostulaciones
                      ? "Cerrar Postulaciones"
                      : "Abrir Postulaciones"}
                  </button>
                )}
                <Box
                  sx={{
                    height: 300,
                    width: "100%",
                    "& .super-app-theme--header": {
                      backgroundColor: "rgba(229, 231, 235)",
                      color: "#000000",
                    },
                    "& .super-app-theme--cell": {
                      backgroundColor: "rgba(229, 231, 235)",
                      color: "#000000",
                      fontWeight: "600",
                    },
                    border: 2,
                    borderColor: "black",
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 25]}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    checkboxSelection
                  />
                </Box>
                <button
                  onClick={() => {
                    downloadExcelDetalleEvento(rows);
                  }}
                  className={buttonStyle + " mt-4"}
                >
                  Descargar Excel
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EventDatail;

{
  /* <ul>
  {eventDetail?.trabajadores?.map((trabajadorPorEvento) => {
    const idPostulante = trabajadorPorEvento.trabajadorId;
    if (trabajadorPorEvento.status === "PENDIENTE")
      return (
        <>
          <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
            Pendientes
          </p>

          <PostulanteCard
            idEvent={idEvent as string}
            idPostulante={idPostulante}
            nombre={trabajadorPorEvento.trabajadores.name}
            status={trabajadorPorEvento.status}
          />

        </>
      );
    if (trabajadorPorEvento.status === "RECHAZADO")
      return (
        <>
          <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
            Rechazados
          </p>

          <PostulanteCard
            idEvent={idEvent as string}
            idPostulante={idPostulante}
            nombre={trabajadorPorEvento.trabajadores.name}
            status={trabajadorPorEvento.status}
          />

        </>
      );
    return (
      <>
        <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
          Aprobados
        </p>

        <PostulanteCard
          idEvent={idEvent as string}
          idPostulante={idPostulante}
          nombre={trabajadorPorEvento.trabajadores.name}
          status={trabajadorPorEvento.status}
        />

      </>
    );
  })} */
  /*
            
            <div className="flex flex-col justify-center items-center ">
            <div>
              <p className="p-4 mt-4 font-bold border-b-2 border-b-indigo-600 text-indigo-600 text-5xl pr-6 pl-6 rounded-sm mb-8">
                Postulaciones
              </p>
            </div>
            <div className="h-full">
              <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
                Pendientes
              </p>
              <ul>
                {postulantes?.pendientes.map((postulante) => {
                  return (
                    <PostulanteCard
                      key={postulante.trabajadorId}
                      idEvent={idEvent as string}
                      idPostulante={postulante.trabajadorId}
                      nombre={postulante.trabajadores.name}
                      status={postulante.status}
                    />
                  );
                })}
              </ul>
              <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
                Aprobados
              </p>
              <ul>
                {postulantes?.aprobados.map((postulante) => {
                  return (
                    <PostulanteCard
                      key={postulante.trabajadorId}
                      idEvent={idEvent as string}
                      idPostulante={postulante.trabajadorId}
                      nombre={postulante.trabajadores.name}
                      status={postulante.status}
                    />
                  );
                })}
              </ul>
              <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
                Rechazados
              </p>
              <ul className="mb-8">
                {postulantes?.rechazados.map((postulante) => {
                  return (
                    <PostulanteCard
                      key={postulante.trabajadorId}
                      idEvent={idEvent as string}
                      idPostulante={postulante.trabajadorId}
                      nombre={postulante.trabajadores.name}
                      status={postulante.status}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
          */
}
