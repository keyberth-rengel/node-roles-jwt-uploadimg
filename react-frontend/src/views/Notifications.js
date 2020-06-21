import React, { useState, useEffect, Fragment } from "react";
// import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import languageJson from "../config/language";

import {
  sendNotification,
  editNotifications,
} from "../actions/notificationactions";

export default function Notifications() {
  const [data, setData] = useState([]);
  const notificationdata = useSelector((state) => state.notificationdata);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    nuevo: false,
    editar: false,
    idEliminar: "",
    alert: "",
    msjAlert: "",
  });
  const [nuevoSer, setNuevoSer] = useState({
    devicetype: "",
    usertype: "",
    title: "",
    body: "",
  });

  const [editarSer, setEditarSer] = useState({
    devicetype: "",
    usertype: "",
    title: "",
    body: "",
  });

  const [oldEditar, setOldEditar] = useState([]);
  useEffect(() => {
    if (notificationdata.notifications) {
      setData(notificationdata.notifications);
    }
  }, [notificationdata.notifications]);

  // ============Añadir
  const crearServicio = (e) => {
    e.preventDefault();
    const { devicetype, usertype, title, body } = nuevoSer;
    if (devicetype === "" && usertype === "" && title === "" && body === "") {
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
        dispatch(sendNotification(nuevoSer));
        dispatch(editNotifications(nuevoSer, "Add"));

        setForm({
          ...form,
          alert: "alert-success",
          msjAlert: `Se ha enviado la Notificacion Correctamente`,
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

  // =======eliminarServicio
  const eliminarServicio = (oldData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        dispatch(editNotifications(oldData, "Delete"));

        setForm({
          ...form,
          alert: "alert-success",
          msjAlert: `El ha eliminado la notificacion Correctamente`,
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
  const editarServicio = (e) => {
    e.preventDefault();

    const { devicetype, usertype, title, body } = editarSer;
    if (devicetype === "" && usertype === "" && title === "" && body === "") {
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
      setTimeout(() => {
        resolve();
        const tblData = data;
        tblData[tblData.indexOf(oldEditar)] = editarSer;
        dispatch(editNotifications(tblData, "Update"));
        setForm({
          ...form,
          alert: "alert-success",
          msjAlert: `La notificacion se ha modificado Correctamente`,
        });
      }, 600);
      setTimeout(() => {
        setForm({
          ...form,
          alert: "",
          msjAlert: "",
          editar: false,
        });
      }, 2500);
    });
  };

  // <MaterialTable
  //   title={languageJson.push_notification_title}
  //   columns={columns}
  //   data={data}
  //   editable={{
  //     onRowAdd: newData =>
  //       new Promise(resolve => {
  //         setTimeout(() => {
  //           resolve();
  //           const tblData = data;
  //           tblData.push(newData);
  //           dispatch(sendNotification(newData));
  //           dispatch(editNotifications(newData,"Add"));
  //         }, 600);
  //       }),

  //       onRowUpdate: (newData, oldData) =>
  //       new Promise(resolve => {
  //         setTimeout(() => {
  //           resolve();
  //           const tblData = data;
  //           tblData[tblData.indexOf(oldData)] = newData;
  //           dispatch(editNotifications(newData,"Update"));
  //         }, 600);
  //       }),
  //     onRowDelete: newData =>
  //       new Promise(resolve => {
  //         setTimeout(() => {
  //           resolve();
  //           dispatch(editNotifications(newData,"Delete"));
  //         }, 600);
  //       }),
  //   }}
  // />
  // <div class="form-group">
  //   <label for="exampleFormControlTextarea1">Example textarea</label>
  //   <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  // </div>

  const { devicetype, usertype, title, body } = editarSer;
  return notificationdata.loading ? (
    <CircularLoading />
  ) : (
    <Fragment>
      {!form.nuevo ? (
        ""
      ) : (
        <div className="row justify-content-center">
          <form className="my-4 col-sm-10 col-md-8" onSubmit={crearServicio}>
            <h4 className="header-title mt-0 mb-3 text-center">
              Nueva Notificacion
            </h4>
            <div className="form-row">
              <div className="form-group  col-sm-6  col-md-6">
                <label for="inputEmail4">Dispositivos</label>
                <select
                  onChange={(e) => {
                    return setNuevoSer({
                      ...nuevoSer,
                      devicetype: e.target.value,
                    });
                  }}
                  className="custom-select"
                >
                  <option selected>Dispositivos...</option>
                  <option value="All">Todos</option>
                  <option value="Android">Android</option>
                  <option value="iOS">IOS</option>
                </select>
              </div>
              <div className="form-group  col-sm-6  col-md-6">
                <label for="inputPassword4">Tipo de Usuarios</label>
                <select
                  onChange={(e) => {
                    return setNuevoSer({
                      ...nuevoSer,
                      usertype: e.target.value,
                    });
                  }}
                  className="custom-select"
                >
                  <option selected>Usuarios...</option>
                  <option value="All">Todos</option>
                  <option value="Driver">Conductores</option>
                  <option value="Rider">Clientes</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-6 col-md-6">
                <label for="inputZip">Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  placeholder="Titulo"
                  onChange={(e) => {
                    return setNuevoSer({
                      ...nuevoSer,
                      title: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-group col-sm-6 col-md-6">
                <label for="exampleFormControlTextarea1">Contenido</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Escriba...."
                  onChange={(e) => {
                    return setNuevoSer({
                      ...nuevoSer,
                      body: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-around">
              <button
                type="submit"
                className="btn btn-danger"
                onClick={() =>
                  setForm({
                    nuevo: false,
                    editar: false,
                    idEliminar: "",
                    nuevoObj: "",
                    editarObj: "",
                  })
                }
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}

      {!form.editar ? (
        ""
      ) : (
        <div className="row justify-content-center">
          <form className="my-4 col-sm-10 col-md-8" onSubmit={editarServicio}>
            <h4 className="header-title mt-0 mb-3 text-center">
              Editar Notificacion
            </h4>
            <div className="form-row">
              <div className="form-group  col-sm-6  col-md-6">
                <label for="inputEmail4">Dispositivos</label>
                <select
                  onChange={(e) => {
                    return setEditarSer({
                      ...editarSer,
                      devicetype: e.target.value,
                    });
                  }}
                  defaultChecked={devicetype}
                  className="custom-select"
                >
                  <option selected>Dispositivos...</option>
                  <option value="All">Todos</option>
                  <option value="Android">Android</option>
                  <option value="iOS">IOS</option>
                </select>
              </div>
              <div className="form-group  col-sm-6  col-md-6">
                <label for="inputPassword4">Tipo de Usuarios</label>
                <select
                  onChange={(e) => {
                    return setEditarSer({
                      ...editarSer,
                      usertype: e.target.value,
                    });
                  }}
                  defaultChecked={usertype}
                  className="custom-select"
                >
                  <option selected>Usuarios...</option>
                  <option value="All">Todos</option>
                  <option value="Driver">Conductores</option>
                  <option value="Rider">Clientes</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-6 col-md-6">
                <label for="inputZip">Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  placeholder="Titulo"
                  onChange={(e) => {
                    return setEditarSer({
                      ...editarSer,
                      title: e.target.value,
                    });
                  }}
                  defaultValue={title}
                />
              </div>
              <div className="form-group col-sm-6 col-md-6">
                <label for="exampleFormControlTextarea1">Contenido</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Escriba...."
                  onChange={(e) => {
                    return setEditarSer({
                      ...editarSer,
                      body: e.target.value,
                    });
                  }}
                  defaultValue={body}
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-around">
              <button
                type="submit"
                className="btn btn-danger"
                onClick={() =>
                  setForm({
                    nuevo: false,
                    editar: false,
                    idEliminar: "",
                    nuevoObj: "",
                    editarObj: "",
                  })
                }
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Editar
              </button>
            </div>
          </form>
        </div>
      )}

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
                <h4 className="header-title mt-0 mb-1">
                  {languageJson.push_notification_title}
                </h4>
                <button
                  type="buttom"
                  className="btn btn-success btn-sm ml-4"
                  onClick={() =>
                    setForm({ ...form, nuevo: true, editar: false })
                  }
                >
                  Nueva Notificacion
                </button>
              </div>
              <div className="table-responsive">
                <table
                  id="datatable-buttons"
                  className="table table-striped dt-responsive nowrap"
                >
                  <thead>
                    <tr>
                      <th>{languageJson.device_type}</th>
                      <th>{languageJson.user_type}</th>
                      <th>{languageJson.title}</th>
                      <th>{languageJson.body}</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.devicetype}</td>
                          <td>{item.usertype}</td>
                          <td>{item.title}</td>
                          <td>{item.body}</td>
                          <td className="d-flex flex-column">
                            <button
                              type="buttom"
                              className="btn btn-danger mb-2 btn-sm"
                              onClick={() => eliminarServicio(item)}
                            >
                              Eliminar
                            </button>
                            <button
                              type="buttom"
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setEditarSer(item);
                                setOldEditar(item);
                                setForm({
                                  ...form,
                                  editar: true,
                                  nuevo: false,
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
