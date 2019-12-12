import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import InitialPage from "./initial/InitialPage";
import DashboardBidder from "./initial/DashboardBidder";
import DashboardProponent from "./initial/DashboardProponent";
import Alerts from "./layout/Alerts";

import Login from "./accounts/Login";
import Register from "./accounts/Register";
import LoginBidder from "./accounts/LoginBidder";
import RegisterBidder from "./accounts/RegisterBidder";
import LoginProponent from "./accounts/LoginProponent";
import RegisterProponent from "./accounts/RegisterProponent";

import PrivateRouteProponente from "./common/PrivateRouteProponente";
import PrivateRouteBidder from "./common/PrivateRouteBidder";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={InitialPage} />
                  <PrivateRouteBidder
                    exact
                    path="/dashboardBidder"
                    component={DashboardBidder}
                  />
                  <PrivateRouteProponente
                    exact
                    path="/dashboardProponent"
                    component={DashboardProponent}
                  />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/login/bidder" component={LoginBidder} />
                  <Route
                    exact
                    path="/login/proponent"
                    component={LoginProponent}
                  />
                  <Route exact path="/register" component={Register} />
                  <Route
                    exact
                    path="/register/bidder"
                    component={RegisterBidder}
                  />
                  <Route
                    exact
                    path="/register/proponent"
                    component={RegisterProponent}
                  />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
