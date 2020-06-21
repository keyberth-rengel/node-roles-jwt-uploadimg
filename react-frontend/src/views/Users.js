import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CircularLoading from "../components/CircularLoading";

export default function Users() {
  const [data, setData] = useState([]);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (users.users) {
      setData(users.users);
    }
  }, [users.users]);

  return users.fetching ? (
    <CircularLoading />
  ) : (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h4 className="header-title mt-0 mb-1">Usuarios</h4>
            <div className="table-responsive">
              <table
                id="datatable-buttons"
                className="table table-striped dt-responsive nowrap"
              >
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo Electronico</th>
                    <th>Imagen de Perfil</th>
                    <th>Vehiculo</th>
                    <th>Tipo de Usuario</th>
                    <th>Estado</th>
                    {/* <th>Acciones</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.nombre}</td>
                        <td>{item.email}</td>
                        <td>
                          <a
                            href={item.img}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              alt={item.nombre}
                              src={item.img}
                              style={{ width: 50 }}
                            />
                          </a>
                        </td>
                        <td>{item.vehiculos}</td>
                        <td>{item.role}</td>
                        <td>{item.estado === true ? "Activo" : "Inactivo"}</td>
                        {/* <td className="d-flex flex-column">
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
                              });
                            }}
                          >
                            Editar
                          </button>
                        </td> */}
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
  );
}
