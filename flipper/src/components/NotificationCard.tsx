import { set_Ver_Notificación } from "@/services/notificacion";
import { NotificationSingle } from "@/types/Types";
import React, { useState } from "react";

interface NotificationCardProps {
  notif: NotificationSingle;
}

const notifVistaStyle = "";
const notifNoVistaStyle = "";

const NotificationCard = ({ notif }: NotificationCardProps) => {
  const { evento, status, eventoId, trabajadorId, notificacionVista } = notif;

  const [visto, setVisto] = useState(notificacionVista);

  const handleVisto = async () => {
    // Manda a la BD que la notificación ya se vió
    setVisto(true);
    set_Ver_Notificación(trabajadorId, eventoId, true);
  };

  return (
    <div
      className={`flex flex-col my-2 ${!visto && "bg-red-400"}`}
      onMouseEnter={handleVisto}
    >
      <h3>{evento.nombre}</h3>
      <p>{status}</p>
      <p>{evento.lugar}</p>
      <p>Inicia: {evento.fecha_inicio.toString()}</p>
      <p>Termina: {evento.fecha_final.toString()}</p>
      <p>${evento.pago}</p>
      <p>{evento.observaciones}</p>
    </div>
  );
};

export default NotificationCard;
