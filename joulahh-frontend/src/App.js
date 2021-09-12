import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./screens/Header";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="main">
          <div className="app__left"></div>
          <div className="app__right"></div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
