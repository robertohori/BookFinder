import React from "react";
import Books from "./containers/Books";
import "./home.scss";
const Home = () => {
  return (
    <div id="home" className="page">
      <div className="container">
        <h1>Welcome to my store</h1>
        <Books />
      </div>
    </div>
  );
};
export default Home;
