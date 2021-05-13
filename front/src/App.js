import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Filter from "./Filter/Filter";

import Home from "./Home/Home.jsx"
import Login from "./Login/Login.jsx"
import MoviePage from "./MoviePage/MoviePage";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route> 
          <Route path="/login" component={Login}></Route>
          <Route path="/movie/:id" component={MoviePage}></Route>    
          <Route path="/filter" component={Filter}></Route>
      
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
