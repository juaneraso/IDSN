import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/reportes" className={({ isActive }) => isActive ? styles.active : ''}>
              Reportes
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? styles.active : ''}>
              Configuración
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
