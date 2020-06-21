import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, CssBaseline, MenuItem } from "@material-ui/core";
import logo from "../assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import AppMenu from "../components/AppMenu";
import languageJson from "../config/language";

import { logoutAction } from "../store/auth/authAction";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: "#f3f4f7",
    width: "95%",
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(logoutAction());
  };

  // function handleDrawerToggle() {
  //   setMobileOpen(!mobileOpen);
  // }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <div className="navbar flex-column flex-md-row navbar-custom">
          <div className="container-fluid">
            {/* <!-- LOGO --> */}
            <MenuItem
              component={Link}
              to="/"
              className="navbar-brand mr-0 mr-md-2 logo"
            >
              <span className="logo-lg d-flex align-items-center">
                <img src={logo} alt="" width="100" />
                <span className="d-inline h5 ml-1">Automotriz</span>
              </span>
              <span className="logo-sm">
                <img src={logo} alt="" width="100" />
              </span>
            </MenuItem>

            <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
              <li className="">
                <button className="button-menu-mobile open-left disable-btn">
                  <img src={logo} alt="" width="100" />
                </button>
              </li>
            </ul>

            <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
              <li className="d-none d-sm-block">
                <div className="app-search">
                  <form>
                    <div className="input-group">
                      <i className="fas fa-search"></i>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar..."
                      />
                    </div>
                  </form>
                </div>
              </li>

              <li
                className="dropdown notification-list"
                data-toggle="tooltip"
                data-placement="left"
                title="Alerta de Notificaciones"
              >
                <Link
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  // href="#"
                  to="/alerts"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <i className="far fa-bell"></i>
                  <span className="noti-icon-badge"></span>
                </Link>
              </li>

              {/* sing out */}

              <li
                // className="dropdown "
                data-toggle="tooltip"
                data-placement="left"
                title={languageJson.logout}
              >
                <a
                  className="nav-link dropdown-toggle"
                  // data-toggle="dropdown"
                  onClick={LogOut}
                  href="/login"
                  role="button"
                  // aria-haspopup="false"
                  // aria-expanded="false"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- end Topbar --> */}
      </AppBar>

      <AppMenu />
      <main className={classes.content}>
        <div className="content-page">
          <div className="content">
            <div className="container-fluid ml-md-4 ml-lg-1">
              {props.children}
            </div>
          </div>
          {/* <!-- content --> */}

          {/* <!-- Footer Start --> */}
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  2020 &copy; Automotriz. Todos los derechos reservados.
                </div>
              </div>
            </div>
          </footer>
          {/* <!-- end Footer --> */}
        </div>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  ),
};

export default ResponsiveDrawer;
