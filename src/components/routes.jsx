import React from "react";
import { Route, Routes } from "react-router-dom";
import Pokedex from "./pokedex";
import Region from "./region";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} exact="true" />
      <Route path="/pokedex" element={<Pokedex />} exact="true" />
      <Route
        index
        path="/pokedex/:pokemon"
        element={<Pokedex />}
        exact="true"
      />
      <Route path="/region/:region" element={<Region />} exact="true" />
    </Routes>
  );
};
export default AppRoutes;
