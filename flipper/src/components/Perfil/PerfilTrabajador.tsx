import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditTrabajadorContactoSchema from "@/utils/EditTrabajadorContactoSchema";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import useSWR, { Fetcher } from "swr";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { Fab } from "@mui/material";
import { Form, Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";

const theme = createTheme({
  palette: {
    secondary: {
      light: "#4B39EF",
      main: "#4B39EF",
    },
  },
});

interface Contacto {
  ciudad?: string;
  direccion?: string;
  email?: string;
  phone?: string;
  genero?: string;
  nacimiento?: string;
  estatura?: string;
  grupo_sanguineo?: string;
  talla_camiseta?: string;
  foto?: string;
  cv?: string;
  certificado_bancario?: string;
  rut?: string;
}

export const PerfilTrabajador: React.FC = () => {
  const { id, token } = useSesionUsuarioContext();
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [contactoInfo, setContactoInfo] = useState<Contacto>({});
  const [refresh, setRefresh] = useState<boolean>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const fetcherProfile: Fetcher<any, string> = async (apiRoute: string) => {
    return await fetch(apiRoute, {
      method: "PUT",
      headers: {
        Accept: "Aplication/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        realmethod: "GET",
        id: id,
      }),
    })
      .then((res) => res.json())
      .catch((error) => error);
  };
  // Perform localStorage action
  let { isLoading, error, data } = useSWR("/api/trabajador", fetcherProfile);

  const submitHandler = async (values: Contacto) => {
    setRefresh(true);
    console.log("entre");
    console.log(values);
    setSubmitError("");

    await fetch("/api/trabajador/modTrabajador", {
      method: "PUT",
      headers: {
        Accept: "Aplication/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
      }),
    })
      .then((res) => {
        console.log(refresh);
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
          title: "Datos de Contacto actualizados correctamente",
        });
      })
      .catch((e) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          background: "red",
          color: "white",
          iconColor: "white",
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "No se pudo actualizar la informacion",
        });
        setSubmitError(e.response.data);
      })
      .finally(() => {
        console.log(refresh);
        setContactoInfo({});
        setOpen(false);
        setRefresh(false);
      });
  };
  useEffect(() => {
    fetcherProfile("/api/trabajador");
  }, [refresh, data]);

  const handleChange = (
    Event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    return setContactoInfo({
      ...contactoInfo,
      [Event.target.name]: Event.target.value,
    });
  };
  console.log(contactoInfo);
  console.log("data", data);

  const styles = {
    input: "font-bold text-3xl text-indigo-600 capitalize",
  };

  const titleStyle = "font-mono text-xl text-black";
  const categoriStyle =
    "text-2xl underline uppercase font-bold text-indigo-600";
  const dataStyle = "font-bold text-xl text-indigo-600 p-2";
  const section = "bg-white p-4 items-start mx-5 w-full mx-auto rounded-md";

  return (
    <div className="flex items-center justify-center w-full h-screen 2xl:ml-36">
      <div className=" md:w-2/4 md:flex bg-[#e5e7eb] ">
        <div className="flex flex-col items-center mx-auto w-full">
          <div className="flex items-center gap-4 p-4 bg-white w-full rounded-md mt-6">
            <img
              className="w-32 rounded-full"
              src={data?.foto}
              alt="Picture of the author"
            />
            <div className="ml-10">
              <h3 className={styles.input}>{data?.name}</h3>
              <p className="text-indigo-600">Trabajador</p>
            </div>
          </div>

          <div className="flex-col justify-center items-center w-full relative">
            <div className="flex justify-center my-1 w-full p-4">
              <h4 className={categoriStyle}>Información de contacto</h4>
            </div>
            <div className={section}>
              <div className="absolute right-3">
                <ThemeProvider theme={theme}>
                  <Fab
                    id="first"
                    size="small"
                    color="secondary"
                    aria-label="edit"
                    onClick={handleClickOpen}>
                    <EditIcon />
                  </Fab>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle color="secondary">
                      <p className="font-bold">Completa tu Informacion</p>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <p className="font-bold">
                          Es obligatorio que completes tus datos para poder
                          postularte a un evento. De lo contrario no podras
                          participar de los mismos.
                          <br />
                          Disculpe las molestias!
                        </p>
                        <br />
                        <p className="font-bold">Flipper Eventos.</p>
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="ciudad"
                        name="ciudad"
                        label="Ciudad"
                        type="text"
                        onChange={(Event) => handleChange(Event)}
                        fullWidth
                        defaultValue={data?.ciudad}
                        color="secondary"
                        variant="standard">
                        <ErrorMessage
                          name="ciudad"
                          component="div"
                          className="text-red-500"
                        />
                      </TextField>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="telefono"
                        name="phone"
                        label="Telefono"
                        type="text"
                        onChange={(Event) => handleChange(Event)}
                        fullWidth
                        defaultValue={data?.phone}
                        color="secondary"
                        variant="standard"></TextField>

                      <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="text"
                        onChange={(Event) => handleChange(Event)}
                        fullWidth
                        defaultValue={data?.email}
                        color="secondary"
                        variant="standard"></TextField>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="direccion"
                        name="direccion"
                        label="Direccion"
                        defaultValue={data?.direccion}
                        type="text"
                        onChange={(Event) => handleChange(Event)}
                        fullWidth
                        variant="standard"
                        color="secondary"></TextField>
                      {submitError && (
                        <span className="bg-red-600 text-white font-bold px-8 py-2 rounded mb-4">
                          {submitError}
                        </span>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        type="button"
                        color="secondary">
                        Cancelar
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => submitHandler(contactoInfo)}>
                        Actualizar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ThemeProvider>
              </div>
              <h5 className={dataStyle}>
                Ciudad:{" "}
                <span className="font-normal text-xl">
                  {data?.ciudad ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Direccion:{" "}
                <span className="font-normal text-xl">
                  {data?.direccion || "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Email:{" "}
                <span className="font-normal text-xl">
                  {data?.email ?? "-"}
                </span>
              </h5>
              <h5 className={dataStyle}>
                Teléfono:{" "}
                <span className="font-normal text-xl">
                  {data?.phone ?? "-"}
                </span>{" "}
              </h5>
            </div>
            <div className="flex justify-center my-1 p-4">
              <h4 className={categoriStyle}>Información Personal</h4>
            </div>
            <div className={section}>
              <div className="absolute right-3">
                <ThemeProvider theme={theme}>
                  <Fab
                    id="second"
                    size="small"
                    color="secondary"
                    aria-label="edit"
                    onClick={handleClickOpen2}>
                    <EditIcon />
                  </Fab>
                  <Dialog open={open2} onClose={handleClose}>
                    <DialogTitle color="secondary">
                      <p className="font-bold">Completa tu Informacion</p>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <p className="font-bold">
                          Es obligatorio que completes tus datos para poder
                          postularte a un evento. De lo contrario no podras
                          participar de los mismos.
                          <br /> Disculpe las molestias!
                        </p>
                        <br />
                        <p className="font-bold">Flipper Eventos.</p>
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="genero"
                        label="Genero"
                        type="text"
                        fullWidth
                        defaultValue={data?.genero === "-" ? "" : data?.genero}
                        color="secondary"
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="edad"
                        label="Edad"
                        type="text"
                        fullWidth
                        defaultValue={data?.edad === "-" ? "" : data?.edad}
                        color="secondary"
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="estatura"
                        label="Estatura"
                        type="text"
                        fullWidth
                        defaultValue={
                          data?.estatura === "-" ? "" : data?.estatura
                        }
                        color="secondary"
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="grupo-sanguineo"
                        label="Grupo Sanguineo"
                        type="text"
                        fullWidth
                        defaultValue={
                          data?.grupo_sanguineo === "-"
                            ? ""
                            : data?.grupo_sanguineo
                        }
                        color="secondary"
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="talla_camiseta"
                        label="Talla de Camiseta"
                        type="text"
                        defaultValue={
                          data?.talla_camiseta === "-"
                            ? ""
                            : data?.talla_camiseta
                        }
                        fullWidth
                        variant="standard"
                        color="secondary"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="secondary">
                        <p className="font-bold">Cancelar</p>
                      </Button>
                      <Button onClick={handleClose} color="secondary">
                        <p className="font-bold">Actualizar</p>
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ThemeProvider>
              </div>
              <h5 className={dataStyle}>
                Género:{" "}
                <span className="font-normal text-xl">
                  {data?.genero ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Edad:{" "}
                <span className="font-normal text-xl">{data?.edad ?? "-"}</span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Estatura:{" "}
                <span className="font-normal text-xl">
                  {data?.estatura ?? "-"}{" "}
                </span>
              </h5>
              <h5 className={dataStyle}>
                Grupo Sanguíneo:{" "}
                <span className="font-normal text-xl">
                  {data?.grupo_sanguineo ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Talle de camisa:{" "}
                <span className="font-normal text-xl">
                  {data?.talla_camiseta ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Tipo de identificación:{" "}
                <span className="font-normal text-xl">
                  {data?.idType ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Identificacion:{" "}
                <span className="font-normal text-xl">
                  {data?.idNumber ?? "-"}
                </span>{" "}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
