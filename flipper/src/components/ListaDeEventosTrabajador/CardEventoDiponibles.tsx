import { AiFillDelete, AiFillClockCircle } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import { EventoTrabajador } from "./ListaDeEventosTrabajador";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { MenuContext } from "@/context/MenuContext";

interface EventCardProps {
  nombreEvento: string;
  fechaEvento: string;
  observaciones: string;
  hora: string;
  direccion: string;
  idEvento: string;
}
interface trabajador {
  eventoId: string;
  notificacionVista: boolean;
  status: string;
  trabajadorId: string;
  trabajadores: [];
}

interface trabajadores {
  admitePostulaciones: boolean;
  cupos: Number;
  fecha_final: string;
  fecha_inicio: string;
  id: string;
  id_empresa: string;
  isDeleted: boolean;
  lugar: string;
  nombre: string;
  numeroPostulantes: Number;
  observaciones: string;
  pago: Number;
  perfil: string;
  trabajadores: trabajador[];
}

export const CardEventoDiponibles: React.FC<EventoTrabajador> = (evento) => {
  const { id, token } = useSesionUsuarioContext();
  const router = useRouter();
  const [postulantes, setTrabajadores] = useState<trabajadores>();
  const [postulacion, setPostulacion] = useState(false);
  //guarda los trabajadores del evento

  const { setShowElementsTrabajador } = useContext(MenuContext);

  const trabajadorPostulado = postulantes?.trabajadores.find(
    (trabajador) => trabajador.trabajadorId === id
  );

  const getEventos = async () => {
    await fetch("/api/event", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        eventoId: evento.id,
        realmethod: "GET",
      }),
    })
      .then((res) => res.json())
      .then((eventos) => setTrabajadores(eventos));
  };

  useEffect(() => {
    if (id) {
      getEventos();
    }
  }, [postulacion]);

  return (
    <div className="bg-white rounded-md border-2 border-[#787d81] h-full flex flex-col justify-between p-2 mb-2 w-full">
      <div className="flex justify-between">
        <p className="text-indigo-700 text-2xl font-bold">{evento.nombre}</p>
      </div>
      <hr></hr>
      <div className="text-indigo-700 flex justify-around">
        <div className="w-[60%]">
          <p className="text-base md:text-2xl font-bold">
            {evento.fecha_inicio.slice(0, 10)}
            {evento.fecha_inicio.slice(0, 10) !==
              evento.fecha_final.slice(0, 10) &&
              ` / ${evento.fecha_final.slice(0, 10)}`}
          </p>
          <p>
            <span className="font-bold mt-2 mb-2">Perfil:</span> {evento.perfil}
          </p>
          <p>
            <span className="font-bold mt-2 mb-2">Pago: $</span> {evento.pago}
          </p>
          <p className="mb-1">
            <span className="font-bold mt-2 mb-2">Observaciones:</span>{" "}
            {evento.observaciones}
          </p>
          <p className="mb-1">
            <span className="font-bold mt-2 mb-2">Lugar:</span>{" "}
            {evento.establecimiento}
          </p>
          <p className="mb-1">
            <span className="font-bold mt-2 mb-2">postulantes:</span>{" "}
            {` ${postulantes?.numeroPostulantes} / ${evento.cupos}   `}
          </p>
        </div>
        <div className="w-[30%] flex justify-center items-center">
          {evento.admitePostulaciones ? (
            <button
              className="rounded-md btn bg-[#4B39EF] normal-case text-[20px] text-white border-transparent hover:bg-[#605BDC] w-full px-0"
              onClick={async () => {
                let response = await fetch("/api/trabajadoreseneventos", {
                  method: "POST",
                  body: JSON.stringify({
                    trabajadorId: id,
                    eventoId: evento.id,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then(async (response) => {
                    const mensaje = await response.text();
                    if (!response.ok) throw new Error(mensaje);
                    const Toast = Swal.mixin({
                      toast: true,
                      position: "top",
                      showConfirmButton: false,
                      timer: 3000,
                      background: "#B1FFBD",
                      color: "green",
                      iconColor: "green",
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                      },
                    });
                    Toast.fire({
                      icon: "success",
                      title: mensaje,
                    });
                    setPostulacion(!postulacion);
                  })
                  .catch((error: any) => {
                    Swal.fire({
                      title: "Algo salió mal",
                      text: error.message,
                      icon: "warning",
                      showCancelButton: true,
                      cancelButtonText: "Volver",
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Ir a tu perfíl",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        setShowElementsTrabajador({
                          showEventosTrabajador: false,
                          showHistorialTrabajador: false,
                          showEventosConfirmadosTrabajador: false,
                          showPerfilTrabajador: true,
                        });
                      }
                    });
                  });
              }}
            >
              {trabajadorPostulado ? "Estas postulado" : "Postularse"}
            </button>
          ) : (
            <p className="bg-red-300 text-center text-lg font-bold px-2 rounded-lg">
              No se admiten más postulaciones
            </p>
          )}
        </div>
      </div>
      <div className="text-[#4031c6] flex items-center gap-1 capitalize ml-2">
        <AiFillClockCircle />
        <p className="mr-5">
          {evento.horaInicio.slice(11, 16)}
          {" - "}
          {evento.horaFinal.slice(11, 16)}
        </p>
        <IoLocationSharp />
        {evento.lugar}
      </div>
    </div>
  );
};
