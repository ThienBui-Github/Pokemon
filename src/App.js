import React from "react";
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import Pokedex from "./components/pokedex";
import Region from "./components/region";

const App = () => {
  return (
    <div className='App'>
      <React.Fragment>
        <BrowserRouter>
          <header>
            <h2 className="center">Pokémon DataAPI</h2>
            <Menu className="menu" pointing>
              <Menu.Item as={NavLink} to="/pokedex" exact={true}>Pokédex</Menu.Item>
              <Menu.Item as={NavLink} to="/region/Kanto">Kanto</Menu.Item>
              <Menu.Item as={NavLink} to="/region/Johto">Johto</Menu.Item>
              <Menu.Item as={NavLink} to="/region/Hoenn">Hoenn</Menu.Item>
              <Menu.Item as={NavLink} to="/region/Sinnoh">Sinnoh</Menu.Item>
              <Menu.Item as={NavLink} to="/region/Unova">Unova</Menu.Item>
              <Menu.Item as={NavLink} to="/region/Kalos">Kalos</Menu.Item>
              <Menu.Item as={NavLink} to="/region/Alola">Alola</Menu.Item>
              <Menu.Item as={NavLink} to="/region/Galar">Galar</Menu.Item>
            </Menu>
          </header>
          <Routes>
            <Route path="/pokedex" element={<Pokedex />} exact={true} />
            <Route path="/region/Kanto" element={<Region />} />
            <Route path="/region/Johto" element={<Region />} />
            <Route path="/region/Hoenn" element={<Region />} />
            <Route path="/region/Sinnoh" element={<Region />} />
            <Route path="/region/Unova" element={<Region />} />
            <Route path="/region/Kalos" element={<Region />} />
            <Route path="/region/Alola" element={<Region />} />
            <Route path="/region/Galar" element={<Region />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
      {/* <Pokedex></Pokedex>
      <Region></Region> */}
    </div>
  );
};

export default App;
