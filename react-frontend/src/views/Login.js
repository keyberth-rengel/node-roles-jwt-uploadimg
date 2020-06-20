import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import languageJson from "../config/language";
import { loginAction } from "../store/auth/authAction";

const Login = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.token) {
      props.history.push("/");
    }
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("desde submit");
    e.preventDefault();
    dispatch(loginAction({ email, password }));
    // dispatch(signIn(email, password));
  };

  return (
    <div className="authentication-bg">
      <div className="account-pages my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="card">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-md-6 p-5">
                      <div className="mx-auto mb-5">
                        <a href="index.html">
                          <img src={logo} alt="Asodex Taxi Admin" width="60" />
                          <h3 className="d-inline align-middle ml-1 text-logo">
                            Asodex
                          </h3>
                        </a>
                      </div>

                      <h6 className="h5 mb-0 mt-4">¡Bienvenido!</h6>
                      <p className="text-muted mt-1 mb-4">
                        Por favor ingrese su correo electronico y se contraseña
                        para acceder al panel admin
                      </p>

                      <form
                        onSubmit={handleSubmit}
                        className="authentication-form"
                      >
                        <div className="form-group">
                          <label className="form-control-label">
                            {languageJson.email_address}
                          </label>
                          <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fas fa-envelope"></i>
                              </span>
                            </div>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="correo electronico"
                              name="email"
                              onChange={handleEmailChange}
                              value={email}
                            />
                          </div>
                        </div>

                        <div className="form-group mt-4">
                          {languageJson.password}
                          <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fas fa-lock"></i>
                              </span>
                            </div>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="contraseña"
                              name="password"
                              value={password}
                              onChange={handlePasswordChange}
                            />
                          </div>
                        </div>

                        <div className="form-group mb-0 text-center">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            {languageJson.sign_in}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-6 d-none d-md-inline-block">
                      <div className="auth-page-sidebar">
                        <div className="overlay"></div>
                        {/* <div className="auth-user-testimonial">
                          <p className="font-size-24 font-weight-bold text-white mb-1">
                            I simply love it!
                          </p>
                          <p className="lead">
                            "It's a elegent templete. I love it very much!"
                          </p>
                          <p>- Admin User</p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- end card-body --> */}
              </div>
              {/* <!-- end card --> */}

              {/* <!-- end row --> */}
            </div>
            {/* <!-- end col --> */}
          </div>
          {/* <!-- end row --> */}
        </div>
        {/* <!-- end container --> */}
      </div>
      {/* <!-- end page --> */}
    </div>
  );
};

export default Login;
