import React from "react";
import styles from "./ReportFields.module.css";

const ReportFields = ({ reportData, handleChange }) => (
  <div className={styles.fieldsContainer}>
    <div className={styles.field}>
      <label htmlFor="subregion">Subregion</label>
      <p>Registre la o las regiones donde se desarrollaran las accciones PIC</p>
      <input
        type="text"
        id="subregion"
        name="subregion"
        value={reportData.subregion}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.field}>
      <label htmlFor="municipio">Municipio priorizado</label>
      <input
        type="text"
        id="municipio"
        name="municipio"
        value={reportData.municipio}
        onChange={handleChange}
        required
      />
    </div>

    <div className={styles.field}>
      <label htmlFor="codigo_territorio">
        Código - Nombre de Territorio APS
      </label>
      <input
        type="text"
        id="codigo_territorio"
        name="codigo_territorio"
        value={reportData.codigo_territorio}
        onChange={handleChange}
        required
      />
    </div>

    <div className={styles.field}>
      <label htmlFor="codigo_micro_territorio">Código micro-Territorio</label>
      <input
        type="text"
        id="codigo_micro_territorio"
        name="codigo_micro_territorio"
        value={reportData.codigo_micro_territorio}
        onChange={handleChange}
        required
      />
    </div>

    <div className={styles.field}>
      <label htmlFor="numero_hogares">
        Total número de Hogares Beneficiarios
      </label>
      <input
        type="text"
        id="numero_hogares"
        name="numero_hogares"
        value={reportData.numero_hogares}
        onChange={handleChange}
        required
      />
    </div>
  </div>
);

export default ReportFields;
