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
  createVehiculoAction,
  deleteVehiculoAction,
  updateVehiculoAction,
} from "../store/vehiculo/vehiculoAction";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function Cars() {
  const classes = useStyles();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [data, setData] = useState([]);
  const cars = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    ejecutar: "",
    idEliminar: "",
    alert: "",
    msjAlert: "",
    modal: false,
  });
  const [nuevoSer, setNuevoSer] = useState({
    kilometraje: "",
    disponible: true,
    marca: "",
    modelo: "",
    ano: "",
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
    if (cars.vehiculos) {
      setData(cars.vehiculos);
    }
  }, [cars.vehiculos]);

  // ============Añadir
  const crearVehiculo = (e) => {
    e.preventDefault();
    // console.log("nuevo servicio: ", nuevoSer);
    const { kilometraje, disponible, marca, modelo, ano } = nuevoSer;
    if (
      kilometraje === "" &&
      disponible === "" &&
      marca === "" &&
      modelo === "" &&
      ano === ""
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
        dispatch(createVehiculoAction(nuevoSer));
        setForm({
          ...form,
          alert: "alert-success",
          msjAlert: `Se Añadio un Nuevo Vehiculo Correctamente`,
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
  const eliminarVehiculo = (oldData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        const tblData = data;
        tblData.splice(tblData.indexOf(oldData), 1);
        dispatch(deleteVehiculoAction(oldData._id));
        setForm({
          ...form,
          alert: "alert-success",
          msjAlert: `El Vehiculo ha sido eliminado Correctamente`,
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
  const editarVehiculo = (e) => {
    e.preventDefault();
    const { kilometraje, disponible, marca, modelo, ano } = nuevoSer;
    if (
      kilometraje === "" &&
      disponible === "" &&
      marca === "" &&
      modelo === "" &&
      ano === ""
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
        dispatch(updateVehiculoAction(oldEditar._id, nuevoSer));
        setForm({
          ...form,
          alert: "alert-success",
          msjAlert: `El Vehiculo se ha modificado Correctamente`,
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

  const { kilometraje, disponible, marca, modelo, ano } = nuevoSer;
  return cars.fetching ? (
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
            {form.ejecutar === "editar" ? "Editar Vehiculo" : "Nuevo Vehiculo"}
          </Typography>
          <div className="d-flex align-items-center">
            <Button
              autoFocus
              color="inherit"
              style={{ fontSize: 14, marginLeft: 10 }}
              onClick={
                form.ejecutar === "editar" ? editarVehiculo : crearVehiculo
              }
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
                  <label for="inputEmail4">Marca del vehiculo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Marca"
                    defaultValue={marca}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        marca: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="inputPassword4">Modelo del vehiculo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Modelo"
                    defaultValue={modelo}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        modelo: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="inputCity">Año del vehiculo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    placeholder="Año"
                    defaultValue={ano}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        ano: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="inputZip">kilometraje del vehiculo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Kilometraje"
                    defaultValue={kilometraje}
                    onChange={(e) => {
                      return setNuevoSer({
                        ...nuevoSer,
                        kilometraje: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch1"
                      defaultChecked={disponible}
                      onChange={(e) => {
                        return setNuevoSer({
                          ...nuevoSer,
                          disponible: e.target.checked,
                        });
                      }}
                    />
                    <label className="custom-control-label" for="customSwitch1">
                      Estado
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-around">
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
              </div>
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
                <h4 className="header-title mt-0 mb-1">Lista de Vehiculos</h4>
                <button
                  type="buttom"
                  className="btn btn-success btn-sm ml-4"
                  onClick={() =>
                    setForm({ ...form, ejecutar: "nuevo", modal: true })
                  }
                >
                  Añadir Vehiculo
                </button>
              </div>

              <div className="table-responsive">
                <table
                  id="datatable-buttons"
                  className="table table-striped dt-responsive nowrap"
                >
                  <thead>
                    <tr>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Año</th>
                      <th>Kilometraje</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.marca}</td>
                          <td>{item.modelo}</td>
                          <td>{item.ano}</td>
                          <td>{item.kilometraje}</td>
                          <td>
                            {item.disponible === true
                              ? "disponible"
                              : "desabilitado"}
                          </td>
                          <td className="d-flex flex-column">
                            <button
                              type="buttom"
                              className="btn btn-danger mb-2 btn-sm"
                              onClick={() => eliminarVehiculo(item)}
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
