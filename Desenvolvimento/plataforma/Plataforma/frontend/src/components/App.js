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
import Footer from "./footer/Footer"
import Header from "./layout/Header";
import InitialPage from "./layout/InitialPage";
import DashboardBidder from "./Dashboard/DashboardBidder";
import DashboardProponent from "./Dashboard/DashboardProponent";
import Alerts from "./layout/Alerts";
import RegisterTask from "./Dashboard/RegisterTask";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import LoginBidder from "./accounts/LoginBidder";
import RegisterBidder from "./accounts/RegisterBidder";
import LoginProponent from "./accounts/LoginProponent";
import RegisterProponent from "./accounts/RegisterProponent";
import ProfileProp from "./Dashboard/ProfileProp";
import ProfileBidder from "./Dashboard/ProfileBidder";
import Bids from "./Dashboard/Bids"
import Task from "./Dashboard/Task";
import Chat from "./Dashboard/Chat"
import PrivateRoute from "./common/PrivateRoute";
import OnGoing from "./Dashboard/OnGoing"
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/scss/paper-dashboard.scss";
import "../assets/demo/demo.css";

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
                  <PrivateRoute
                    exact
                    path="/register/task"
                    component={RegisterTask}
                  />
                  <PrivateRoute
                    exact
                    path="/task"
                    component={Task}
                    />
                     <PrivateRoute
                    exact
                    path="/profileP"
                    component={ProfileProp}
                    />
                    <PrivateRoute
                    exact
                    path="/profileB"
                    component={ProfileBidder}
                    />
                     <PrivateRoute
                    exact
                    path="/bids"
                    component={Bids}
                    />
                      <PrivateRoute
                    exact
                    path="/ongoing"
                    component={OnGoing}
                    />
                    <PrivateRoute
                    exact
                    path="/chat"
                    component={Chat}
                    />

                  
                </Switch>
              </div>
            </Fragment>
            <Footer fluid />
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
