import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";
import Cart from "./views/Cart";
import Workshops from "./views/Workshops";
import Service from "./views/Service";
// import Notifications from "./views/Notifications";
import AuthLoading from "./components/AuthLoading";

function App() {
  return (
    <Provider store={store}>
      <AuthLoading>
        <Router>
          <Switch>
            <ProtectedRoute exact component={Dashboard} path="/" />
            <ProtectedRoute exact component={Users} path="/usuarios" />
            <ProtectedRoute exact component={Cart} path="/vehiculos" />
            <ProtectedRoute exact component={Service} path="/servicios" />
            <ProtectedRoute exact component={Workshops} path="/talleres" />

            {/* <ProtectedRoute
              exact
              component={Notifications}
              path="/notificaciones"
            /> */}
            <Route component={Login} path="/login" />
          </Switch>
        </Router>
      </AuthLoading>
    </Provider>
  );
}

export default App;
