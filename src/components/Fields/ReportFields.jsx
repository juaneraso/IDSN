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
      <label htmlFor="subregion">Subregión</label>
      <select
        id="subregion"
        name="subregion"
        value={reportData.subregion}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione una subregión</option>
        {subregions.map((subregion) => (
          <option key={subregion.documentId} value={subregion.documentId}>
            {subregion.nombre}
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
          subregions
            .find((subregion) => subregion.documentId === reportData.subregion)
            ?.municipios.map((municipio) => (
              <option key={municipio.documentId} value={municipio.documentId}>
                {municipio.nombre}
              </option>
            ))}
      </select>
    </div>

    <div className={styles.field}>
      <label htmlFor="proyecto">Proyecto</label>
      <input
        type="text"
        id="proyecto"
        name="proyecto"
        value={reportData.proyecto}
        onChange={handleChange}
        required
      />
    </div>

    <div className={styles.field}>
      <label htmlFor="actividad_pas">Actividad PAS</label>
      <input
        type="text"
        id="actividad_pas"
        name="actividad_pas"
        value={reportData.actividad_pas}
        onChange={handleChange}
        required
      />
    </div>

    <div className={styles.field}>
      <label htmlFor="descripcion">Descripción</label>
      <input
        type="text"
        id="descripcion"
        name="descripcion"
        value={reportData.descripcion}
        onChange={handleChange}
        required
      />
    </div>
    <h3>Seccion Territorio</h3>
    <div className={styles.field}>
      <label htmlFor="codigo_territorio">Código Territorio</label>
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
      <label htmlFor="tipo_territorio">Tipo Territorio</label>
      <select
        id="tipo_territorio"
        name="tipo_territorio"
        value={reportData.tipo_territorio}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione un tipo</option>
        <option value="urbano">Urbano</option>
        <option value="rural">Rural</option>
      </select>
    </div>

    <h3>Seccion MicroTerritorio</h3>

    <div className={styles.field}>
      <label htmlFor="nombre_micro_territorio">Nombre micro-Territorio</label>
      <input
        type="text"
        id="nombre_micro_territorio"
        name="nombre_micro_territorio"
        value={reportData.nombre_micro_territorio}
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
      <label htmlFor="tipo_micro_territorio">Tipo micro-Territorio</label>
      <select
        id="tipo_micro_territorioo"
        name="tipo_micro_territorio"
        value={reportData.tipo_micro_territorio}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione un tipo</option>
        <option value="urbano">Urbano</option>
        <option value="rural">Rural</option>
      </select>
    </div>

    <div className={styles.field}>
      <label htmlFor="numero_micro_territorio">numero micro-Territorios</label>
      <input
        type="text"
        id="numero_micro_territorio"
        name="numero_micro_territorio"
        value={reportData.numero_micro_territorio}
        onChange={handleChange}
        required
      />
    </div>

    <div className={styles.field}>
      <label htmlFor="numero_hogares">Número de Hogares</label>
      <input
        type="text"
        id="numero_hogares"
        name="numero_hogares"
        value={reportData.numero_hogares}
        onChange={handleChange}
        required
      />
    </div>

    {/* <div className={styles.field}>
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
    </div> */}
  </div>
);

export default ReportFields;
