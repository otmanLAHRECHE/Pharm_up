import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import DashboardContent from "./pharmacy/Dashboard";
import PrivateRoute from "./common/private_route";
import SignInSide from "./accounts/login";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("App.js");
    return (
    
      <BrowserRouter>
            <Fragment>
              <div>
                <Routes>
                  <Route exact path="/" element={<PrivateRoute><DashboardContent/></PrivateRoute>} />
                  <Route exact path="/login" element={<SignInSide/>} /> 
                </Routes>
              </div>
            </Fragment>
        </BrowserRouter>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);