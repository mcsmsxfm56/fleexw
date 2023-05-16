import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
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
import LoadingSubmitForm from "../LoadingSubmitForm";
import useSWR, { Fetcher } from "swr";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { Fab } from "@mui/material";
import Swal from "sweetalert2";
import { Validate, ValidationGroup } from "mui-validate";
import {
  uploadFileAvatar,
  uploadFileDni,
  uploadFilePdf,
} from "@/utils/firebase";

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
  estatura?: number;
  grupo_sanguineo?: string;
  talla_camiseta?: string;
  foto?: string;
  cv?: string;
  certificado_bancario?: string;
  rut?: string;
}
interface Files {
  foto?: object;
  imagen_dni?: object;
  cv?: object;
  rut?: object;
  certificado_bancario?: object;
}

interface FileNames {
  foto?: string;
  rut?: string;
  imagen_dni?: string;
  certificado_bancario?: string;
  cv?: string;
}

export const PerfilTrabajador: React.FC = () => {
  const { id, token } = useSesionUsuarioContext();
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [contactoInfo, setContactoInfo] = useState<Contacto>({});
  const [file, setFile] = useState<Files>({
    foto: {},
    imagen_dni: {},
    cv: {},
    rut: {},
    certificado_bancario: {},
  });
  const [names, setNames] = useState<FileNames>({
    foto: "",
    rut: "",
    imagen_dni: "",
    cv: "",
    certificado_bancario: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  };

  const fetcherProfile: Fetcher<any, string> = async (apiRoute: string) => {
    return await fetch(apiRoute, {
      method: "PUT",
      headers: {
        Accept: "Aplication/json",
        Authorization: `Bearer ${token}`,
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

  let { isLoading, error, data, mutate } = useSWR(
    "/api/trabajador",
    fetcherProfile
  );

  const submitHandlerArchivos = async (files: any) => {
    setLoading(true);
    try {
      const imagenPerfil = await uploadFileAvatar(
        files.foto,
        names?.foto as string
      );
      const imagenDni = await uploadFileDni(
        files.imagen_dni,
        names?.imagen_dni as string
      );
      const cvPdf = await uploadFilePdf(files.cv, names?.cv as string);
      const rutPdf = await uploadFilePdf(files.rut, names?.rut as string);
      const certificado = await uploadFilePdf(
        files.certificado_bancario,
        names?.certificado_bancario as string
      );
      const values: FileNames = {
        foto: `${imagenPerfil.name} ${imagenPerfil.url}`,
        imagen_dni: `${imagenDni.name} ${imagenDni.url}`,
        rut: `${rutPdf.name} ${rutPdf.url}`,
        certificado_bancario: `${certificado.name} ${certificado.url}`,
        cv: `${cvPdf.name} ${cvPdf.url}`,
      };
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
          if (!res.ok) {
            throw new Error("No se pudo realizar la peticion");
          }
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
          setSubmitError(e.message);
        })
        .finally(async () => {
          setLoading(false);
          setOpen3(false);
          await mutate();
        });
    } catch (error: any) {
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
      setSubmitError(error.message);
    }
  };
  // Perform localStorage action
  const submitHandler = async (values: Contacto) => {
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
        //
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
        setSubmitError(e.message);
      })
      .finally(async () => {
        setContactoInfo({});
        setOpen(false);
        setOpen2(false);
        await mutate();
      });
  };

  const handleChange = (
    Event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    return setContactoInfo({
      ...contactoInfo,
      [Event.target.name]: Event.target.value,
    });
  };

  const styles = {
    input: "font-bold text-xl text-indigo-600 capitalize",
  };

  const titleStyle = "font-mono text-xl text-black";
  const categoriStyle =
    "text-2xl underline uppercase font-bold text-indigo-600";
  const dataStyle = "font-bold text-xl text-indigo-600 p-2";
  const section = "bg-white p-4 items-start mx-5 w-full mx-auto rounded-md";

  return (
    <div className="flex justify-center w-full h-full">
      <div className="bg-[#e5e7eb] w-11/12 md:w-9/12 lg:w-8/12">
        <div className="flex flex-col items-center mt-20 md:mt-10 w-full">
          <div className="flex items-center gap-4 p-4 bg-white w-full rounded-md mt-6">
            <img
              className="w-32 rounded-full"
              src={data?.foto.split(" ").slice(1)}
              alt="Picture of the author"
            />
            <div className="">
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
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="ciudad"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="dense"
                            id="ciudad"
                            name="ciudad"
                            label="Ciudad"
                            type="text"
                            onChange={(Event) => handleChange(Event)}
                            fullWidth
                            defaultValue={data?.ciudad}
                            color="secondary"
                            variant="standard"
                          />
                        </Validate>
                      </ValidationGroup>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="telefono"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="dense"
                            id="telefono"
                            name="phone"
                            label="Telefono"
                            type="text"
                            onChange={(Event) => handleChange(Event)}
                            fullWidth
                            defaultValue={data?.phone}
                            color="secondary"
                            variant="standard"
                          />
                        </Validate>
                      </ValidationGroup>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="email"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="text"
                            onChange={(Event) => handleChange(Event)}
                            fullWidth
                            defaultValue={data?.email}
                            color="secondary"
                            variant="standard"
                          />
                        </Validate>
                      </ValidationGroup>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="email"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="dense"
                            id="direccion"
                            name="direccion"
                            label="Direccion"
                            defaultValue={data?.direccion}
                            type="text"
                            onChange={(Event) => handleChange(Event)}
                            fullWidth
                            variant="standard"
                            color="secondary"
                          />
                        </Validate>
                      </ValidationGroup>
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
                <span className="font-normal text-xl capitalize">
                  {data?.ciudad ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Direccion:{" "}
                <span className="font-normal text-xl capitalize">
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
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="genero"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            autoFocus
                            onChange={(Event) => handleChange(Event)}
                            margin="dense"
                            id="genero"
                            name="genero"
                            label="Genero"
                            type="text"
                            fullWidth
                            defaultValue={
                              data?.genero === "-" ? "" : data?.genero
                            }
                            color="secondary"
                            variant="standard"
                          />
                        </Validate>
                      </ValidationGroup>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="nacimiento"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="dense"
                            id="nacimiento"
                            onChange={(Event) => handleChange(Event)}
                            name="nacimiento"
                            label="Edad"
                            type="text"
                            fullWidth
                            defaultValue={data?.edad === "-" ? "" : data?.edad}
                            color="secondary"
                            variant="standard"
                          />
                        </Validate>
                      </ValidationGroup>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="estatura"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="dense"
                            id="estatura"
                            onChange={(Event) => handleChange(Event)}
                            name="estatura"
                            label="Estatura"
                            type="text"
                            fullWidth
                            defaultValue={
                              data?.estatura === "-" ? "" : data?.estatura
                            }
                            color="secondary"
                            variant="standard"
                          />
                        </Validate>
                      </ValidationGroup>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="grupo_sanguineo"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="dense"
                            onChange={(Event) => handleChange(Event)}
                            name="grupo_sanguineo"
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
                        </Validate>
                      </ValidationGroup>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="talla_camiseta"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="dense"
                            id="talla_camiseta"
                            onChange={(Event) => handleChange(Event)}
                            name="talla_camiseta"
                            label="Talla de Camiseta | Formato alfabetico Ej: S, M, L..."
                            type="text"
                            defaultValue={
                              data?.talle_camiseta === "-"
                                ? ""
                                : data?.talle_camiseta
                            }
                            fullWidth
                            variant="standard"
                            color="secondary"
                          />
                        </Validate>
                      </ValidationGroup>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="secondary">
                        <p className="font-bold">Cancelar</p>
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => submitHandler(contactoInfo)}>
                        <p className="font-bold">Actualizar</p>
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ThemeProvider>
              </div>
              <h5 className={dataStyle}>
                Género:{" "}
                <span className="font-normal text-xl capitalize">
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
                <span className="font-normal text-xl capitalize">
                  {data?.talle_camiseta}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Tipo de identificación:{" "}
                <span className="font-normal text-xl capitalize">
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
            <div className="flex justify-center my-1 p-4">
              <h4 className={categoriStyle}>Archivos Necesarios</h4>
            </div>
            <div className={`${section} mb-4 shadow-lg`}>
              <div className="absolute right-3">
                <ThemeProvider theme={theme}>
                  <Fab
                    id="second"
                    size="small"
                    color="secondary"
                    aria-label="edit"
                    onClick={handleClickOpen3}>
                    <EditIcon />
                  </Fab>
                  <Dialog open={open3} onClose={handleClose}>
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
                          <br />
                          <p className="font-bold text-red-700">
                            Atencion! <br />
                            En caso de estar actualizando sus datos, recuerde
                            siempre colocar todos los archivos obligatoriamente,
                            aun asi, si solo esta actualizando uno. Muchas
                            gracias!
                          </p>
                        </p>
                        <br />
                        <p className="font-bold">Flipper Eventos.</p>
                      </DialogContentText>
                      <p className="-mb-4 mt-2 font-bold text-indigo-600">
                        Curriculum | Formato .PDF
                      </p>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="cv"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="normal"
                            id="cv"
                            onChange={(Event: any) => {
                              setFile({ ...file, cv: Event.target.files[0] });
                              setNames({
                                ...names,
                                cv: Event.target.files[0].name
                                  .split(" ")
                                  .join(""),
                              });
                            }}
                            name="cv"
                            type="file"
                            fullWidth
                            variant="outlined"
                            color="secondary"
                          />
                        </Validate>
                      </ValidationGroup>
                      <p className="-mb-4 mt-2 font-bold text-indigo-600">
                        Rut | Formato .PDF
                      </p>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="rut"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="normal"
                            onChange={(Event: any) => {
                              setFile({ ...file, rut: Event.target.files[0] });
                              setNames({
                                ...names,
                                rut: Event.target.files[0].name
                                  .split(" ")
                                  .join(""),
                              });
                            }}
                            name="rut"
                            id="rut"
                            type="file"
                            fullWidth
                            variant="outlined"
                            color="secondary"
                          />
                        </Validate>
                      </ValidationGroup>
                      <p className="-mb-4 mt-2 font-bold text-indigo-600">
                        Certificado Bancario | Formato .PDF
                      </p>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="certificado_bancario"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            margin="normal"
                            id="certificado"
                            onChange={(Event: any) => {
                              setFile({
                                ...file,
                                certificado_bancario: Event.target.files[0],
                              });
                              setNames({
                                ...names,
                                certificado_bancario: Event.target.files[0].name
                                  .split(" ")
                                  .join(""),
                              });
                            }}
                            name="cetificado_bancario"
                            type="file"
                            fullWidth
                            color="secondary"
                            variant="outlined"
                          />
                        </Validate>
                      </ValidationGroup>
                      <p className="-mb-4 mt-2 font-bold text-indigo-600">
                        Cargar foto de perfil
                      </p>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="foto"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            hiddenLabel
                            margin="normal"
                            id="foto_perfil"
                            onChange={(Event: any) => {
                              setFile({ ...file, foto: Event.target.files[0] });
                              setNames({
                                ...names,
                                foto: Event.target.files[0].name
                                  .split(" ")
                                  .join(""),
                              });
                            }}
                            name="foto"
                            type="file"
                            fullWidth
                            variant="outlined"
                            color="secondary"
                          />
                        </Validate>
                      </ValidationGroup>
                      <p className="-mb-4 mt-2 font-bold text-indigo-600">
                        Cargar imagen frontal del Documento de Identidad |
                        Formato .PDF
                      </p>
                      <ValidationGroup validation="noisy">
                        <Validate
                          name="imagen_dni"
                          required={[true, "Debes Completar este campo"]}>
                          <TextField
                            hiddenLabel
                            margin="normal"
                            id="imagen_dni"
                            onChange={(Event: any) => {
                              setFile({
                                ...file,
                                imagen_dni: Event.target.files[0],
                              });
                              setNames({
                                ...names,
                                imagen_dni: Event.target.files[0].name
                                  .split(" ")
                                  .join(""),
                              });
                            }}
                            name="imagen_dni"
                            type="file"
                            fullWidth
                            variant="outlined"
                            color="secondary"
                          />
                        </Validate>
                      </ValidationGroup>
                    </DialogContent>
                    {loading ? (
                      <div className="mb-2">
                        <LoadingSubmitForm />
                      </div>
                    ) : (
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          <p className="font-bold">Cancelar</p>
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => submitHandlerArchivos(file)}>
                          <p className="font-bold">Actualizar</p>
                        </Button>
                      </DialogActions>
                    )}
                  </Dialog>
                </ThemeProvider>
              </div>
              <h5 className={dataStyle}>
                Curriculum Vitae:{" "}
                <Link href={`${data?.cv?.split(" ").slice(1)}`}>
                  <span className="font-normal text-xl capitalize">
                    {data?.cv?.split(" ").slice(0, 1) ?? "-"}
                  </span>{" "}
                </Link>
              </h5>
              <h5 className={dataStyle}>
                Rut:{" "}
                <Link href={`${data?.rut?.split(" ").slice(1)}`}>
                  <span className="font-normal text-xl">
                    {data?.rut?.split(" ").slice(0, 1) ?? "-"}
                  </span>{" "}
                </Link>
              </h5>
              <h5 className={dataStyle}>
                Certificado Bancario:{" "}
                <Link
                  href={`${data?.certificado_bancario?.split(" ").slice(1)}`}>
                  <span className="font-normal text-xl">
                    {data?.certificado_bancario?.split(" ").slice(0, 1) ?? "-"}{" "}
                  </span>
                </Link>
              </h5>
              <h5 className={dataStyle}>
                Imagen del Documento de Identidad:{" "}
                <Link href={`${data?.imagen_dni?.split(" ").slice(1)}`}>
                  <span className="font-normal text-xl">
                    {data?.imagen_dni?.split(" ").slice(0, 1) ?? "-"}
                  </span>{" "}
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
