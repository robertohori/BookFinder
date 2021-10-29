import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Configure routes
import Home from "./screens/home";

export default (
  <>
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
    ,
  </>
);
