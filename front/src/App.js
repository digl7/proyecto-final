import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import Home from "./Home/Home.jsx"
import Login from "./Login/Login.jsx"

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route> 
          <Route exact path="/login" component={Login}></Route>       
      
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
