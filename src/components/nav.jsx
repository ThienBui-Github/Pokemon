import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Nav = () => {
  return (
    <nav>
      <h2 className="center">Pokémon DataAPI</h2>
      <Menu pointing>
        <Menu.Item as={NavLink} to="/pokedex" exact="true">
          Pokédex
        </Menu.Item>
        <Menu.Item as={NavLink} to="/region/Kanto">
          Kanto
        </Menu.Item>
        <Menu.Item as={NavLink} to="/region/Johto">
          Johto
        </Menu.Item>
        <Menu.Item as={NavLink} to="/region/Hoenn">
          Hoenn
        </Menu.Item>
        <Menu.Item as={NavLink} to="/region/Sinnoh">
          Sinnoh
        </Menu.Item>
        <Menu.Item as={NavLink} to="/region/Unova">
          Unova
        </Menu.Item>
        <Menu.Item as={NavLink} to="/region/Kalos">
          Kalos
        </Menu.Item>
        <Menu.Item as={NavLink} to="/region/Alola">
          Alola
        </Menu.Item>
        {/* <Menu.Item as={NavLink} to="/region/Galar">
          Galar
        </Menu.Item> */}
      </Menu>
    </nav>
  );
};
export default Nav;
