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
import InitialPage from "./layout/InitialPage";
import DashboardBidder from "./Dashboard/DashboardBidder";
import DashboardProponent from "./Dashboard/DashboardProponent";
import Bid from "./Dashboard/Bid";
import Alerts from "./layout/Alerts";

import Login from "./accounts/Login";
import Register from "./accounts/Register";
import LoginBidder from "./accounts/LoginBidder";
import RegisterBidder from "./accounts/RegisterBidder";
import LoginProponent from "./accounts/LoginProponent";
import RegisterProponent from "./accounts/RegisterProponent";

import PrivateRoute from "./common/PrivateRoute";
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
                  <PrivateRoute
                    exact
                    path="/dashboardBidder"
                    component={DashboardBidder}
                  />
                  <PrivateRoute
                    exact
                    path="/dashboardProponent"
                    component={DashboardProponent}
                  />
                  <PrivateRoute
                    exact
                    path="/registar/bid/:taskId"
                    component={Bid}
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
