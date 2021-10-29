import React from "react";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./configureStore";

import Header from "./components/Header";
import Footer from "./components/Footer";

import routes from "./routes";

import "./App.css";

function App() {
  return (
    <>
      <a className="skip-main" href="#main">
        Skip to main content
      </a>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="app">
            <Header />
            <main id="main">{routes}</main>
          </div>
          <Footer />
        </ConnectedRouter>
      </Provider>
    </>
  );
}

export default App;
