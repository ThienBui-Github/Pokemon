import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/nav";
import AppRoutes from "./components/routes";

const App = () => {
  return (
    <React.Fragment>
      <div className='App'>
        <BrowserRouter>
          <Nav />
          <AppRoutes />
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
};

export default App;
