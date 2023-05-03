import { NotificationSingle } from "@/types/Types";
import React from "react";

interface NotificationCardProps {
  notif: NotificationSingle;
}

const NotificationCard = ({ notif }: NotificationCardProps) => {
  const { evento, status, eventoId, trabajadorId } = notif;

  return (
    <div className="flex flex-col my-2">
      <h3>{evento.nombre}</h3>
      <p>{status}</p>
      <p>{evento.observaciones}</p>
    </div>
  );
};

export default NotificationCard;
