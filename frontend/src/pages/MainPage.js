import React from "react";
import FormPage from "./FormPage";
import ListPage from "./ListPage";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const Pages = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={FormPage}/>
        <Route exact path='/location-list' component={ListPage}/>
      </Switch>
    </Router>
  );
}

export default Pages;
