import React from "react";
import { MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import perfile from "../assets/profilePic.png";
import languageJson from "../config/language";

function AppMenu() {
  const activo = (e) => {
    let arrayClick = document.getElementsByClassName("menu-active-drawer");
    // console.log("desde e.target", );

    for (let i = 0; i < arrayClick.length; i++) {
      const element = arrayClick[i];
      if (e.target.parentNode.parentNode === element) {
        element.classList.toggle("mm-active");
        // console.log("elemento del array  ", element);
      } else {
        element.classList.remove("mm-active");
      }
    }
  };

  return (
    <div className="left-side-menu">
      <div className="media user-profile mt-2 mb-2">
        <img
          src={perfile}
          className="avatar-sm rounded-circle mr-2"
          alt="Perfil"
        />
        <img
          src={perfile}
          className="avatar-xs rounded-circle mr-2"
          alt="Perfil"
        />

        <div className="media-body">
          <h6 className="pro-user-name mt-0 mb-0">Panel</h6>
          <span className="pro-user-desc">Administrador</span>
        </div>
        <div className="dropdown align-self-center profile-dropdown-menu">
          <a
            className="dropdown-toggle mr-0"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="false"
            aria-expanded="false"
          >
            <span data-feather="chevron-down"></span>
          </a>
          <div className="dropdown-menu profile-dropdown">
            <a href="pages-profile.html" className="dropdown-item notify-item">
              <i data-feather="user" className="icon-dual icon-xs mr-2"></i>
              <span>My Account</span>
            </a>

            <a href="javascript:void(0);" className="dropdown-item notify-item">
              <i data-feather="settings" className="icon-dual icon-xs mr-2"></i>
              <span>Settings</span>
            </a>

            <a href="javascript:void(0);" className="dropdown-item notify-item">
              <i
                data-feather="help-circle"
                className="icon-dual icon-xs mr-2"
              ></i>
              <span>Support</span>
            </a>

            <a
              href="pages-lock-screen.html"
              className="dropdown-item notify-item"
            >
              <i data-feather="lock" className="icon-dual icon-xs mr-2"></i>
              <span>Lock Screen</span>
            </a>

            <div className="dropdown-divider"></div>

            <a href="javascript:void(0);" className="dropdown-item notify-item">
              <i data-feather="log-out" className="icon-dual icon-xs mr-2"></i>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
      <div className="sidebar-content">
        {/* <!--- Sidemenu --> */}
        <div id="sidebar-menu" className="slimscroll-menu">
          <ul className="metismenu" id="menu-bar" onClick={activo}>
            <li className="mm-active menu-active-drawer">
              <MenuItem component={Link} to="/">
                <i className="fas fa-columns"></i>
                {/* <span className="badge badge-success float-right">1</span> */}
                <span> {languageJson.dashboard_text} </span>
              </MenuItem>
            </li>

            <li className="menu-active-drawer">
              <MenuItem component={Link} to="/usuarios">
                <i className="fas fa-user"></i>
                <span> Usuarios </span>
                {/* <span className="menu-arrow"></span> */}
              </MenuItem>
            </li>

            <li className="menu-active-drawer">
              <MenuItem component={Link} to="/vehiculos">
                <i className="fas fa-car"></i>
                <span> Vehiculos </span>
                {/* <span className="menu-arrow"></span> */}
              </MenuItem>
            </li>

            <li className="menu-active-drawer">
              <MenuItem component={Link} to="/servicios">
                <i className="fas fa-clipboard-list"></i>
                <span> Servicios </span>
                {/* <span className="menu-arrow"></span> */}
              </MenuItem>
            </li>

            <li className="menu-active-drawer">
              <MenuItem component={Link} to="/talleres">
                <i className="far fa-list-alt"></i>
                <span> Talleres </span>
                {/* <span className="menu-arrow"></span> */}
              </MenuItem>
            </li>
            {/* 
            <li className="menu-active-drawer">
              <MenuItem component={Link} to="/driverearning">
                <i className="fas fa-hand-holding-usd"></i>
                <span> {languageJson.driver_earning} </span>
              </MenuItem>
            </li>

            <li className="menu-active-drawer">
              <MenuItem component={Link} to="/promos">
                <i className="fas fa-percent"></i>
                <span> {languageJson.promo} </span>
              </MenuItem>
            </li>

            <li className="menu-active-drawer">
              <MenuItem component={Link} to="/referral">
                <i className="fas fa-ticket-alt"></i>
                <span> {languageJson.refferal_bonus} </span>
              </MenuItem>
            </li>

            <li className="menu-active-drawer">
              <MenuItem component={Link} to="/notifications">
                <i className="far fa-comments"></i>
                <span> {languageJson.push_notification_title}</span>
              </MenuItem>
            </li> */}
          </ul>
        </div>
        {/* <!-- End Sidebar --> */}

        {/* <div className="clearfix"></div> */}
      </div>
      {/* <!-- Sidebar -left --> */}
    </div>
  );
}

export default AppMenu;
