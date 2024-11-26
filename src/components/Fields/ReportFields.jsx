import React from "react";
import styles from "./ReportFields.module.css";

const ReportFields = ({
  reportData,
  handleChange,
  subregions,
  municipalities,
  file,
  handleFileChange,
}) => (
  <div className={styles.fieldsContainer}>
    <div className={styles.field}>
      <label htmlFor="fechaRegistro">Fecha de Registro</label>
      <input
        type="date"
        id="fechaRegistro"
        name="fechaRegistro"
        value={reportData.fechaRegistro}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.field}>
      <label htmlFor="fechaInicio">Fecha de Inicio</label>
      <input
        type="date"
        id="fechaInicio"
        name="fechaInicio"
        value={reportData.fechaInicio}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.field}>
      <label htmlFor="fechaFin">Fecha de Fin</label>
      <input
        type="date"
        id="fechaFin"
        name="fechaFin"
        value={reportData.fechaFin}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.field}>
      <label htmlFor="subregion">Subregión</label>
      <select
        id="subregion"
        name="subregion"
        value={reportData.subregion}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione una subregión</option>
        {subregions.map((subregion, index) => (
          <option key={index} value={subregion}>
            {subregion}
          </option>
        ))}
      </select>
    </div>
    <div className={styles.field}>
      <label htmlFor="municipality">Municipio</label>
      <select
        id="municipality"
        name="municipality"
        value={reportData.municipality}
        onChange={handleChange}
        required
        disabled={!reportData.subregion}
      >
        <option value="">Seleccione un municipio</option>
        {reportData.subregion &&
          municipalities[reportData.subregion]?.map((municipality, index) => (
            <option key={index} value={municipality}>
              {municipality}
            </option>
          ))}
      </select>
    </div>
    <div className={styles.field}>
      <label htmlFor="actaInicio">Acta de Inicio</label>
      <input
        type="text"
        id="actaInicio"
        name="actaInicio"
        value={reportData.actaInicio}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.field}>
      <label htmlFor="actaSocializacion">Acta de Socialización</label>
      <input
        type="text"
        id="actaSocializacion"
        name="actaSocializacion"
        value={reportData.actaSocializacion}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.field}>
      <label htmlFor="certificadoLiquidacion">Certificado de Liquidación</label>
      <input
        type="text"
        id="certificadoLiquidacion"
        name="certificadoLiquidacion"
        value={reportData.certificadoLiquidacion}
        onChange={handleChange}
        required
      />
    </div>
    {/* <div className={styles.field}>
      <label htmlFor="archivo">Adjuntar Archivo</label>
      <input
        type="file"
        id="archivo"
        name="archivo"
        onChange={handleFileChange}
      />
      {file && <p>Archivo seleccionado: {file.name}</p>}
    </div> */}
    <div className={styles.field}>
      <label htmlFor="archivo">Adjuntar Archivo</label>
      <div className={styles.fileUpload}>
        <input
          type="file"
          id="archivo"
          name="archivo"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <label htmlFor="archivo" className={styles.fileLabel}>
          {file ? `Archivo seleccionado: ${file.name}` : "Seleccionar archivo"}
        </label>
      </div>
    </div>
  </div>
);

export default ReportFields;
