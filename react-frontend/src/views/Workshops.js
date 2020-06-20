import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import DialogContent from "@material-ui/core/DialogContent";

import CircularLoading from "../components/CircularLoading";
import {
  createTallerAction,
  updateTallerAction,
  deleteTallerAction,
} from "../store/talleres/talleresAction";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function Workshops() {
  const classes = useStyles();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [data, setData] = useState([]);
  const workshops = useSelector((state) => state.workshops);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    ejecutar: "",
    idEliminar: "",
    alert: "",
    msjAlert: "",
    modal: false,
  });
  const [nuevoSer, setNuevoSer] = useState({
    nombre: "",
    servicio: "",
    descripcion: "",
    img: "",
    email: "",
    ubicacion: "",
    puntuacion: "",
    horarios: "",
    numero: "",
  });
  const handleClose = () => {
    setForm({
      ...form,
      modal: false,
    });
    setForm({
      ejecutar: "",
      idEliminar: "",
      nuevoObj: "",
      editarObj: "",
    });
  };

  const [oldEditar, setOldEditar] = useState([]);
  useEffect(() => {
    if (workshops.talleres) {
      setData(workshops.talleres);
    }
  }, [workshops.talleres]);

  // ============Añadir
  const crearTaller = (e) => {
    e.preventDefault();
    // console.log("nuevo servicio: ", nuevoSer);
    const {
      nombre,
      servicio,
      descripcion,
      img,
      email,
      ubicacion,
      puntuacion,
      horarios,
      numero,
    } = nuevoSer;
    if (
      nombre === "" &&
      servicio === "" &&
      descripcion === "" &&
      img === "" &&
      email === "" &&
      ubicacion === "" &&
      puntuacion === "" &&
      horarios === "" &&
      numero === ""
    ) {
      setForm({
        ...form,
        alert: "alert-danger",
        msjAlert: `Todos los campos son obligatorios`,
      });

      setTimeout(() => {
        setForm({
          ...form,
          alert: "",
          msjAlert: "",
        });
      }, 2500);
      return;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        const tblData = data;
        tblData.push(nuevoSer);
        dispatch(createTallerAction(nuevoSer));
        setForm({
          ...form,
          alert: "alert-success",
          msjAlert: `Se Añadio un Nuevo Taller Correctamente`,
        });
      }, 600);
      setTimeout(() => {
        setForm({
          ...form,
          alert: "",
          msjAlert: "",
          nuevo: false,
        });
      }, 2500);
    });
  };

  // =======eliminarVehiculo
  const eliminarTaller = (oldData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        const tblData = data;
        tblData.splice(tblData.indexOf(oldData), 1);
        dispatch(deleteTallerAction(oldData._id));
        setForm({
          ...form,
          alert: "alert-success",
          msjAlert: `El Taller ha sido eliminado Correctamente`,
        });
      }, 600);
      setTimeout(() => {
        setForm({
          ...form,
          alert: "",
          msjAlert: "",
        });
      }, 2500);
    });
  };

  // ========editarServicio
  const tallerTaller = (e) => {
    e.preventDefault();
    const {
      nombre,
      servicio,
      img,
      email,
      ubicacion,
      horarios,
      numero,
    } = nuevoSer;
    if (
      nombre === "" &&
      servicio === "" &&
      img === "" &&
      email === "" &&
      ubicacion === "" &&
      horarios === "" &&
      numero === ""
    ) {
      setForm({
        ...form,
        alert: "alert-danger",
        msjAlert: `Todos los campos son obligatorios`,
      });

      setTimeout(() => {
        setForm({
          ...form,
          alert: "",
          msjAlert: "",
        });
      }, 2500);
      return;
    }

    new Promise((resolve) => {
      console.log("nuevo", nuevoSer);
      console.log("editable", oldEditar);
      setTimeout(() => {
        resolve();
        const tblData = data;
        tblData[tblData.indexOf(oldEditar)] = nuevoSer;
        dispatch(updateTallerAction(oldEditar._id, nuevoSer));
        setForm({
          ...form,
          alert: "alert-success",
          msjAlert: `El Taller se ha modificado Correctamente`,
        });
      }, 600);
      setTimeout(() => {
        setForm({
          ...form,
          alert: "",
          msjAlert: "",
          ejecutar: "",
        });
      }, 2500);
    });
  };
  const {
    nombre,
    servicio,
    img,
    email,
    ubicacion,
    horarios,
    numero,
  } = nuevoSer;
  return workshops.fetching ? (
    <CircularLoading />
  ) : (
    <Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={form.modal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        TransitionComponent={Transition}
      >
        <div className="d-flex justify-content-between align-items-center col-12 py-2 px-4">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClose()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {form.ejecutar === "editar" ? "Editar Taller" : "Nuevo Taller"}
          </Typography>
          <div className="d-flex align-items-center">
            <Button
              autoFocus
              color="inherit"
              style={{ fontSize: 14, marginLeft: 10 }}
              onClick={form.ejecutar === "editar" ? tallerTaller : crearTaller}
            >
              {form.ejecutar === "editar" ? "Editar" : "Nuevo"}
            </Button>
          </div>
        </div>

        <DialogContent className="p-0">
          <div className=" d-flex justify-content-center col-12 ">
            <form className="my-4 col-sm-10 col-md-8">
              <div className="form-row">
                <div className="form-group col-12">
                  <label for="inputEmail4">Nombre del Taller</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Nombre"
                    defaultValue={nombre}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        nombre: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="inputPassword4">Url de la imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Url"
                    defaultValue={img}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        img: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="inputCity">Correo Electronico</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    placeholder="Correo "
                    defaultValue={email}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="inputZip">Servicio que Realizan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Servicio"
                    defaultValue={servicio}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        servicio: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="inputZip">Ubicacion del Taller</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Ubicacion"
                    defaultValue={ubicacion}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        ubicacion: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="inputZip">Horarios</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="00/00/00"
                    defaultValue={horarios}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        horarios: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="inputZip">Numero de contacto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Numero"
                    defaultValue={numero}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        numero: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              {/* <div className="d-flex justify-content-around">
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={() =>
                    setForm({
                      ejecutar: "",
                      idEliminar: "",
                      nuevoObj: "",
                      editarObj: "",
                    })
                  }
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {form.ejecutar === "editar" ? "Editar" : "Nuevo"}
                </button>
              </div> */}
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fin del formulario */}

      <div className="row">
        {/* =======alerta */}
        {form.alert ? (
          <div
            className={`alert ${form.alert} text-center my-4 col-12`}
            role="alert"
          >
            {form.msjAlert}
          </div>
        ) : (
          ""
        )}
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4 className="header-title mt-0 mb-1">Lista de Talleres</h4>
                <button
                  type="buttom"
                  className="btn btn-success btn-sm ml-4"
                  onClick={() =>
                    setForm({ ...form, ejecutar: "nuevo", modal: true })
                  }
                >
                  Añadir Taller
                </button>
              </div>

              <div className="table-responsive">
                <table
                  id="datatable-buttons"
                  className="table table-striped dt-responsive nowrap"
                >
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo Electronico</th>
                      <th>Servicio</th>
                      <th>Ubicacion</th>
                      <th>Horarios</th>
                      <th>Numero</th>
                      <th>Imagen</th>

                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.nombre}</td>
                          <td>{item.email}</td>
                          {/* <td>{item.servicio}</td> */}
                          <td>{item.ubicacion}</td>
                          {/* <td>{item.horarios}</td> */}
                          <td>{item.numero}</td>{" "}
                          <td>
                            <a href={item.img} target="_blank">
                              <img
                                alt={item.nombre}
                                src={item.img}
                                style={{ width: 50 }}
                              />
                            </a>
                          </td>
                          <td className="d-flex flex-column">
                            <button
                              type="buttom"
                              className="btn btn-danger mb-2 btn-sm"
                              onClick={() => eliminarTaller(item)}
                            >
                              Eliminar
                            </button>
                            <button
                              type="buttom"
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setNuevoSer(item);
                                setOldEditar(item);
                                setForm({
                                  ...form,
                                  ejecutar: "editar",
                                  modal: true,
                                });
                              }}
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <!-- end card body--> */}
          </div>
          {/* <!-- end card --> */}
        </div>
        {/* <!-- end col--> */}
      </div>
    </Fragment>
  );
}
