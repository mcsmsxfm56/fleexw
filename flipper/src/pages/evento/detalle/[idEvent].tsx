import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { traerEventoYPostulantes } from "@/services/traerEventoYPostulantes";
import { DetalleEvento, TrabajadorStatus } from "../../../types/Types";
import AppLayout from "@/components/AppLayout/AppLayout";
import { HiPencil } from "react-icons/hi";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { aceptarORechazarPostulante } from "@/services/aceptarORechazarPostulante";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

interface postulante {
  rechazados: TrabajadorStatus[];
  aprobados: TrabajadorStatus[];
  pendientes: TrabajadorStatus[];
  asistieron: TrabajadorStatus[];
  faltaron: TrabajadorStatus[];
}

const EventDatail = () => {
  const { rol } = useSesionUsuarioContext();
  const router = useRouter();
  const [rows, setRows] = useState<{}[]>([]);
  const [eventDetail, setEventDetail] = useState<DetalleEvento | null>(null);
  const [postulantes, setPostulantes] = useState<postulante>({
    rechazados: [],
    aprobados: [],
    pendientes: [],
    asistieron: [],
    faltaron: [],
  });
  let id = 0;
  const columns: GridColDef[] = [
    {
      field: "Nombre",
      headerName: "Nombre",
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
        <button
          className="rounded-md bg-black text-white"
          onClick={() => {
            let idPostulante = params.row.UUID;
            let statusNuevo = params.row.Status;
            aceptarORechazarPostulante({ idPostulante, statusNuevo, idEvent });
          }}
        >
          Actualizar
        </button>
      ),
    },
  ];

  const { idEvent } = router.query;

  useEffect(() => {
    if (idEvent) {
      traerEventoYPostulantes(idEvent as string)
        .then((data) => {
          setEventDetail(data);
          console.log(data);
        })
        .catch((error) => console.log(error.message));
    }
  }, [idEvent]);

  useEffect(() => {
    if (eventDetail) {
      eventDetail?.trabajadores.map((trabajadorPorEvento) => {
        if (trabajadorPorEvento.status === "PENDIENTE") {
          setPostulantes((prevState) => ({
            ...prevState,
            pendientes: [...prevState.pendientes, trabajadorPorEvento],
          }));
          let objPush = {
            id: id++,
            UUID: trabajadorPorEvento.trabajadorId,
            Nombre: trabajadorPorEvento.trabajadores.name,
            Perfil: eventDetail?.perfil,
            Status: trabajadorPorEvento.status,
          };
          setRows((prevState) => [...prevState, objPush]);
        } else if (trabajadorPorEvento.status === "APROBADO") {
          setPostulantes((prevState) => ({
            ...prevState,
            aprobados: [...prevState.aprobados, trabajadorPorEvento],
          }));
          let objPush = {
            id: id++,
            UUID: trabajadorPorEvento.trabajadorId,
            Nombre: trabajadorPorEvento.trabajadores.name,
            Perfil: eventDetail?.perfil,
            Status: trabajadorPorEvento.status,
          };
          setRows((prevState) => [...prevState, objPush]);
        } else if (trabajadorPorEvento.status === "RECHAZADO") {
          setPostulantes((prevState) => ({
            ...prevState,
            rechazados: [...prevState.rechazados, trabajadorPorEvento],
          }));
          let objPush = {
            id: id++,
            UUID: trabajadorPorEvento.trabajadorId,
            Nombre: trabajadorPorEvento.trabajadores.name,
            Perfil: eventDetail?.perfil,
            Status: trabajadorPorEvento.status,
          };
          setRows((prevState) => [...prevState, objPush]);
        } else if (trabajadorPorEvento.status === "ASISTIO") {
          setPostulantes((prevState) => ({
            ...prevState,
            asistieron: [...prevState.asistieron, trabajadorPorEvento],
          }));
          let objPush = {
            id: id++,
            UUID: trabajadorPorEvento.trabajadorId,
            Nombre: trabajadorPorEvento.trabajadores.name,
            Perfil: eventDetail?.perfil,
            Status: trabajadorPorEvento.status,
          };
          setRows((prevState) => [...prevState, objPush]);
        } else {
          setPostulantes((prevState) => ({
            ...prevState,
            faltaron: [...prevState.faltaron, trabajadorPorEvento],
          }));
          let objPush = {
            id: id++,
            UUID: trabajadorPorEvento.trabajadorId,
            Nombre: trabajadorPorEvento.trabajadores.name,
            Perfil: eventDetail?.perfil,
            Status: trabajadorPorEvento.status,
          };
          setRows((prevState) => [...prevState, objPush]);
        }
      });
    }
  }, [eventDetail]);
  return (
    <AppLayout>
      <div className="h-full overflow-auto">
        <div
          className="bg-gray-200 md:w-4/5 md:ml-[20%] lg:ml-[250px]
            lg:w-[calc(100vw-268px)] h-screen"
        >
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="w-full mt-10 bg-white text-center text-[#4B39EF] font-bold text-xl py-4 -mx-10">
                Evento: {eventDetail?.nombre}
              </p>
              <HiPencil className="text-[#f6ea06]" size={30} />
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <p className="text-center font-bold text-xl">
                  Fecha de Inicio:
                </p>
                <p className="text-center font-bold text-lg">
                  {eventDetail?.fecha_inicio}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-center font-bold text-xl">
                  Fecha de Finalizacion:
                </p>
                <p className="text-center font-bold text-lg">
                  {eventDetail?.fecha_final}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-center font-bold text-xl">
                Perfiles Solicitados:
              </p>
              <p className="text-center font-bold text-lg">
                {" "}
                {eventDetail?.perfil}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-center font-bold text-xl">
                Ciudad Y Dirección:
              </p>
              <p className="text-center font-bold text-lg">
                {eventDetail?.lugar}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-center font-bold text-xl">Observaciones:</p>
              <p className="text-center font-bold text-lg">
                {eventDetail?.observaciones}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {rol === "empresa" ? (
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
            ) : null}
          </div>
          {}
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
