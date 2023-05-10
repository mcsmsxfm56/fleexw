import Historial from "@/components/HistorialDeEventos/Historial";
import Eventos from "@/components/ListaDeEventos/Eventos";

import PerfilEmpresa from "@/components/Perfil/PerfilEmpresa";
import PostulacionesTrabajador from "@/components/Postulaciones/PostulacionesTrabajador";

import { useContext } from "react";
import { MenuContext } from "@/context/MenuContext";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import AppLayout from "@/components/AppLayout/AppLayout";
import CreateEventForm from "@/components/CrearEvento/CreateEventForm";
import EventosTrabajador from "@/components/ListaDeEventosTrabajador/EventosTrabajador";
import EventosConfirmadosTrabajador from "@/components/ListaDeEventos/EventosConfirmadosTrabajador";
import HistorialTrabajador from "@/components/HistorialDeEventos/HistorialTrabajador";
import { PerfilTrabajador } from "@/components/Perfil/PerfilTrabajador";

export default function Home() {
  const { showElementsEmpresa, showElementsTrabajador } = useContext(MenuContext);

  const { rol } = useSesionUsuarioContext();

  return (
    <AppLayout>
      <>
        {rol === "empresa" && showElementsEmpresa.showEventos && <Eventos />}
        {rol === "empresa" && showElementsEmpresa.showHistorial && (
          <Historial />
        )}
        {rol === "empresa" && showElementsEmpresa.showCrear && (
          <CreateEventForm />
        )}
        {rol === "empresa" && showElementsEmpresa.showPerfil && (
          <PerfilEmpresa />
        )}

        {rol === "trabajador" &&
          showElementsTrabajador.showEventosTrabajador && <EventosTrabajador />}
        {rol === "trabajador" &&
          showElementsTrabajador.showEventosConfirmadosTrabajador && (
            <EventosConfirmadosTrabajador />
          )}
        {rol === "trabajador" &&
          showElementsTrabajador.showHistorialTrabajador && (
            <HistorialTrabajador />
          )}
        {rol === "trabajador" &&
          showElementsTrabajador.showPerfilTrabajador && <PerfilTrabajador />}
      </>
    </AppLayout>
  );
}
