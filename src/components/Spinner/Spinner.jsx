import React from "react";
import styles from "./Spinner.module.css";

const Spinner = ({ envio }) => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p>{envio}</p>
    </div>
  );
};

export default Spinner;
