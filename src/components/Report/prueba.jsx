import React, { useState } from "react";
import styles from "./ReportForm.module.css";
import Header from "../Header/Header";
import Activities from "../Activities/Activities"; // Importamos el nuevo componente

const ReportForm = () => {
  const [reportData, setReportData] = useState({
    subregion: "",
    municipality: "",
    actaInicio: "",
    fechaInicio: "",
    fechaFin: "",
    fechaRegistro: "",
    actaSocializacion: "",
    certificadoLiquidacion: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [activities, setActivities] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleActivityChange = (event, index) => {
    const { name, value } = event.target;
    const updatedActivities = [...activities];
    updatedActivities[index][name] = value;
    setActivities(updatedActivities);
  };

  const handleAddActivity = () => {
    const newActivity = {
      nombre: "",
      cantidad: "",
      unidad: "",
      unidadMedida: "",
      entorno: "",
      tecnologia: "",
      poblacionSujeto: "",
      IDsoporte: "",
      equipo: "",
      codigoCups: "",
      valorUnitario: "",
      valorTotal: "",
      cronograma: "",
      observacionEjecucion: "",
      porcentajeCumplimiento: "",
      observacionSeguimiento: "",
      estadoAvance: "",
    };
    setActivities([...activities, newActivity]);
    setEditingIndex(activities.length);
  };

  const handleEditActivity = (index) => {
    setEditingIndex(index);
  };

  const handleSaveActivity = () => {
    setEditingIndex(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const data = new FormData();
      Object.keys(reportData).forEach((key) =>
        data.append(key, reportData[key])
      );
      if (file) data.append("file", file);
      data.append("activities", JSON.stringify(activities));

      const response = await fetch("http://localhost:4000/api/reports", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Error al enviar el reporte.");

      setSuccess(true);
      setReportData({
        subregion: "",
        municipality: "",
        actaInicio: "",
        fechaInicio: "",
        fechaFin: "",
        fechaRegistro: "",
        actaSocializacion: "",
        certificadoLiquidacion: "",
      });
      setFile(null);
      setActivities([]);
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.formContainer}>
        <h2>Anexo Técnico</h2>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
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

          {/* Campo: Fecha de Inicio */}
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

          {/* Campo: Fecha de Fin */}
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

          {/* Campo: Subregión */}
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

          {/* Campo: Municipio */}
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
                municipalities[reportData.subregion]?.map(
                  (municipality, index) => (
                    <option key={index} value={municipality}>
                      {municipality}
                    </option>
                  )
                )}
            </select>
          </div>

          {/* Campo: Acta de Inicio */}
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

          {/* Campo: Acta de Socialización */}
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

          {/* Campo: Certificado de Liquidación */}
          <div className={styles.field}>
            <label htmlFor="certificadoLiquidacion">
              Certificado de Liquidación
            </label>
            <input
              type="text"
              id="certificadoLiquidacion"
              name="certificadoLiquidacion"
              value={reportData.certificadoLiquidacion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo: Adjuntar Archivo */}
          <div className={styles.field}>
            <label htmlFor="archivo">Adjuntar Archivo</label>
            <input
              type="file"
              id="archivo"
              name="archivo"
              onChange={handleFileChange}
            />
          </div>

          {/* Actividades */}
          <h3>Actividades</h3>
          <Activities
            activities={activities}
            onAddActivity={handleAddActivity}
            onEditActivity={handleEditActivity}
            onSaveActivity={handleSaveActivity}
            editingIndex={editingIndex}
            onActivityChange={handleActivityChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Reporte"}
          </button>
        </form>

        {success === true && (
          <p className={styles.success}>¡Reporte enviado con éxito!</p>
        )}
        {success === false && (
          <p className={styles.error}>Error al enviar el reporte.</p>
        )}
      </div>
    </>
  );
};

export default ReportForm;
