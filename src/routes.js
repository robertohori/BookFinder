import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

// Configure routes
import Home from "./screens/home";

export default (
  <>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route exact path="/" component={Home} />
          </Switch>
        )}
      />
    </HashRouter>
  </>
);
