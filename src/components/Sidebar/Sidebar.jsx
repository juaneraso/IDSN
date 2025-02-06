import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ usuario_dos }) => {
  // const usuario_object = JSON.parse(sessionStorage.getItem("usuario")) || {};

  // const usuario = usuario_object.usuario;

  const usuario = usuario_dos;

  console.log("rol", usuario);
  console.log("rol_dos", usuario_dos);

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashbo" className={styles.active}>
              Inicio
            </NavLink>
          </li>
          {usuario === "referente_instituto" && (
            <li>
              <NavLink to="/repo" className={styles.active}>
                Anexo Tecnico
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/view"
              // className={({ isActive }) => (isActive ? styles.active : "")}
              className={styles.active}
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
