import { Get_Postulaciones_Trabajador } from "@/services/traerPostulaciones";
import { NotificationList } from "@/types/Types";
import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<NotificationList>([]);

  useEffect(() => {
    Get_Postulaciones_Trabajador("9c386e92-b891-4cd7-965e-31d6772f5014").then(
      (data) => {
        console.log(data);
        setNotifications(data);
      }
    );
  }, []);

  return (
    <div className="dropdown dropdown-end fixed top-0 right-0">
      <label tabIndex={0} className="btn m-1">
        Click
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96 overflow-y-scroll h-[80vh] flex flex-nowrap"
      >
        {notifications.map((notif, index) => (
          <li key={`notification_${index}`}>
            <NotificationCard notif={notif} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
