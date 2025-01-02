import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Dashboard.module.css";

const Dashbo = () => {
  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          <h2>Bienvenido al Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashbo;
