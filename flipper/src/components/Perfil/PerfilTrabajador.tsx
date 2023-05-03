import React, { useState } from "react";
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
import { Form, Formik } from "formik";

const theme = createTheme({
  palette: {
    secondary: {
      light: "#4B39EF",
      main: "#4B39EF",
    },
  },
});

interface Contacto {
  ciudad: string;
  direccion: string;
  email: string;
  phone: string;
}

interface Postulante {
  name: string;

  genero: string;
  edad: string;
  estatura: string;
  grupo_sanguineo: string;
  talla_camiseta: string;
  idType: string;
  idNumber: number;
  nacimiento: string;
  foto: string;
  cv: string;
  certificado_bancario: string;
  rut: string;
}

export const PerfilTrabajador: React.FC = () => {
  const { id } = useSesionUsuarioContext();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

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
  const initialValuesContacto: Contacto = {
    ciudad: data?.ciudad ?? "",
    direccion: data?.direccion ?? "",
    email: data?.email ?? "",
    phone: data?.phone ?? "",
  };
  const submitHandler = (values: Contacto) => {};
  //   useEffect(() => {
  //     if (id) {
  //       fetcherProfile("/api/trabajador");
  //     }
  //   }, [id]);

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
                  <Formik
                    initialValues={initialValuesContacto}
                    onSubmit={(values, actions) => {
                      submitHandler(values);
                      actions.setSubmitting(false);
                    }}
                    validationSchema={EditTrabajadorContactoSchema}>
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
                        <Form>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="ciudad"
                            label="Ciudad"
                            type="text"
                            fullWidth
                            defaultValue={data?.ciudad}
                            color="secondary"
                            variant="standard"
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="telefono"
                            label="Telefono"
                            type="text"
                            fullWidth
                            defaultValue={data?.phone}
                            color="secondary"
                            variant="standard"
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="text"
                            fullWidth
                            defaultValue={data?.email}
                            color="secondary"
                            variant="standard"
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="direccion"
                            label="Direccion"
                            type="text"
                            fullWidth
                            variant="standard"
                            color="secondary"
                          />
                        </Form>
                        {submitError && (
                          <span className="bg-red-600 text-white font-bold px-8 py-2 rounded mb-4">
                            {submitError}
                          </span>
                        )}
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
                  </Formik>
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
                  {data?.direccion ?? "-"}
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
