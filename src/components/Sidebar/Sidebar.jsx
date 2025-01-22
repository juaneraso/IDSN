import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashbo"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/repo"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Anexo Tecnico
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/view"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Visualización
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
