import { Get_Postulaciones_Trabajador } from "@/services/traerPostulaciones";
import { NotificationList } from "@/types/Types";
import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { BsFillBellFill } from "react-icons/bs";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<NotificationList>([]);
  const [newNotif, setNewNotif] = useState(false);
  const { id, token } = useSesionUsuarioContext();

  // console.log('notifications', notifications)
  useEffect(() => {
    /**
     * cada 10 segundos, revisa las notificaciones
     * La primera llamada es para la ejecute en el momento de crearse
     * Luego, cada 10 segundos
     */
    getNotif();
    const interval = setInterval(() => {
      getNotif();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getNotif = async () => {
    Get_Postulaciones_Trabajador(id, token).then((data) => {
      setNotifications(data);
      checkNewNotif(data);
    });
  };

  const checkNewNotif = (notifList: NotificationList) => {
    notifList.forEach((notif) => {
      if (!notif.notificacionVista) setNewNotif(true);
      else setNewNotif(false);
    });
  };

  return (
    <div className={`dropdown dropdown-end top-[4px] right-0 fixed z-[100] md:top-[8px] md:right-4`}>
      <label
        tabIndex={0}
        className={`shadow-lg btn border-0 m-1 bg-transparent md:bg-black ${newNotif && "bg-red-800 md:bg-orange-300"} hover:bg-[#4F46E5]`}
        onClick={() => setNewNotif(false)}
      >
        {newNotif ? <VscBellDot size={35} color="red" /> : <BsFillBellFill size={35} color="white" />}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96 overflow-y-scroll h-[80vh] flex flex-nowrap border-white z-50 relative"
      >
        {notifications.length === 0 ? (
          <p className="flex justify-center items-center h-full">No hay notificaciones</p>
        ) : (
          notifications.map((notif, index) => (
            <li key={`notification_${index}`}>
              <NotificationCard notif={notif} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
