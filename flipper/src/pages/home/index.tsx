import Historial from "@/components/HistorialDeEventos/Historial";
import Eventos from "@/components/ListaDeEventos/Eventos";
import PerfilEmpresa from "@/components/Perfil/PerfilEmpresa";
import { useContext } from "react";
import { MenuContext } from "@/context/MenuContext";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import AppLayout from "@/components/AppLayout/AppLayout";
import CreateEventForm from "@/components/CrearEvento/CreateEventForm";
import EventosDisponiblesTrabajador from "@/components/ListaDeEventosTrabajador/EventosDisponiblesTrabajador";
import EventosConfirmadosTrabajador from "@/components/ListaDeEventosTrabajador/EventosConfirmadosTrabajador";
import { PerfilTrabajador } from "@/components/Perfil/PerfilTrabajador";
import EventosHistorialTrabajador from "@/components/ListaDeEventosTrabajador/EventosHistorialTrabajador";

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
          showElementsTrabajador.showEventosTrabajador && <EventosDisponiblesTrabajador />}
        {rol === "trabajador" &&
          showElementsTrabajador.showEventosConfirmadosTrabajador && (
            <EventosConfirmadosTrabajador />
          )}
        {rol === "trabajador" &&
          showElementsTrabajador.showHistorialTrabajador && (
            <EventosHistorialTrabajador />
          )}
        {rol === "trabajador" &&
          showElementsTrabajador.showPerfilTrabajador && <PerfilTrabajador />}
      </>
    </AppLayout>
  );
}
