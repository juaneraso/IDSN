// import React, { useState } from "react";
// import styles from "./ReportForm.module.css";
// import Header from "../Header/Header";

// const ReportForm = () => {
//   const [reportData, setReportData] = useState({
//     subregion: "",
//     municipality: "",
//     actaInicio: "",
//     fechaInicio: "",
//     fechaFin: "",
//     fechaRegistro: "",
//     actaSocializacion: "",
//     certificadoLiquidacion: "",
//   });

//   const [file, setFile] = useState(null); // Estado para el archivo
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);

//   const subregions = ["Norte", "Sur", "Oriente", "Occidente"];
//   const municipalities = {
//     Norte: ["El Charco", "La Tola"],
//     Sur: ["Ipiales", "Aldana"],
//     Oriente: ["Belen", "Alban"],
//     Occidente: ["Tumaco", "Fransisco Pizarro"],
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setReportData({ ...reportData, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]); // Guardar el archivo seleccionado
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setSuccess(null);

//     try {
//       // Crear un FormData para enviar archivo y datos
//       const data = new FormData();
//       Object.keys(reportData).forEach((key) =>
//         data.append(key, reportData[key])
//       );
//       if (file) {
//         data.append("file", file); // Agregar el archivo al FormData
//       }

//       const response = await fetch("http://localhost:4000/api/reports", {
//         method: "POST",
//         body: data,
//       });

//       if (!response.ok) {
//         throw new Error("Error al enviar el reporte.");
//       }

//       setSuccess(true);
//       setReportData({
//         subregion: "",
//         municipality: "",
//         actaInicio: "",
//         fechaInicio: "",
//         fechaFin: "",
//         fechaRegistro: "",
//         actaSocializacion: "",
//         certificadoLiquidacion: "",
//       });
//       setFile(null); // Resetear el archivo
//     } catch (error) {
//       console.error(error);
//       setSuccess(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />

//       <div className={styles.formContainer}>
//         <h2>Anexo Técnico</h2>
//         <form onSubmit={handleSubmit} className={styles.formGrid}>
//           <div className={styles.field}>
//             <label htmlFor="fechaRegistro">Fecha de Registro</label>
//             <input
//               type="date"
//               id="fechaRegistro"
//               name="fechaRegistro"
//               value={reportData.fechaRegistro}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className={styles.field}>
//             <label htmlFor="fechaInicio">Fecha de Inicio</label>
//             <input
//               type="date"
//               id="fechaInicio"
//               name="fechaInicio"
//               value={reportData.fechaInicio}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className={styles.field}>
//             <label htmlFor="fechaFin">Fecha de Fin</label>
//             <input
//               type="date"
//               id="fechaFin"
//               name="fechaFin"
//               value={reportData.fechaFin}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Subregión */}
//           <div className={styles.field}>
//             <label htmlFor="subregion">Subregión</label>
//             <select
//               id="subregion"
//               name="subregion"
//               value={reportData.subregion}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Seleccione una subregión</option>
//               {subregions.map((subregion, index) => (
//                 <option key={index} value={subregion}>
//                   {subregion}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Campo: Municipio */}
//           <div className={styles.field}>
//             <label htmlFor="municipality">Municipio</label>
//             <select
//               id="municipality"
//               name="municipality"
//               value={reportData.municipality}
//               onChange={handleChange}
//               required
//               disabled={!reportData.subregion}
//             >
//               <option value="">Seleccione un municipio</option>
//               {reportData.subregion &&
//                 municipalities[reportData.subregion]?.map(
//                   (municipality, index) => (
//                     <option key={index} value={municipality}>
//                       {municipality}
//                     </option>
//                   )
//                 )}
//             </select>
//           </div>

//           {/* Campo: Acta de Inicio */}
//           <div className={styles.field}>
//             <label htmlFor="actaInicio">Acta de Inicio</label>
//             <input
//               type="text"
//               id="actaInicio"
//               name="actaInicio"
//               value={reportData.actaInicio}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Acta de Socialización */}
//           <div className={styles.field}>
//             <label htmlFor="actaSocializacion">Acta de Socialización</label>
//             <input
//               type="text"
//               id="actaSocializacion"
//               name="actaSocializacion"
//               value={reportData.actaSocializacion}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Certificado de Liquidación */}
//           <div className={styles.field}>
//             <label htmlFor="certificadoLiquidacion">
//               Certificado de Liquidación
//             </label>
//             <input
//               type="text"
//               id="certificadoLiquidacion"
//               name="certificadoLiquidacion"
//               value={reportData.certificadoLiquidacion}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Adjuntar Archivo */}
//           <div className={styles.field}>
//             <label htmlFor="archivo">Adjuntar Archivo</label>
//             <input
//               type="file"
//               id="archivo"
//               name="archivo"
//               onChange={handleFileChange}
//               required
//             />
//           </div>

//           {/* Botón de envío */}
//           <button type="submit" disabled={loading}>
//             {loading ? "Enviando..." : "Enviar Reporte"}
//           </button>
//         </form>

//         {/* Mensajes de éxito o error */}
//         {success === true && (
//           <p className={styles.success}>¡Reporte enviado con éxito!</p>
//         )}
//         {success === false && (
//           <p className={styles.error}>Error al enviar el reporte.</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default ReportForm;

// import React, { useState } from "react";
// import styles from "./ReportForm.module.css";
// import Header from "../Header/Header";

// const ReportForm = () => {
//   const [reportData, setReportData] = useState({
//     subregion: "",
//     municipality: "",
//     actaInicio: "",
//     fechaInicio: "",
//     fechaFin: "",
//     fechaRegistro: "",
//     actaSocializacion: "",
//     certificadoLiquidacion: "",
//   });

//   const [file, setFile] = useState(null); // Estado para el archivo
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);

//   // Estado para manejar las actividades
//   const [activityEnabled, setActivityEnabled] = useState(false);
//   const [activityData, setActivityData] = useState({
//     nombre: "",
//     cantidad: "",
//     unidad: "",
//   });

//   const subregions = ["Norte", "Sur", "Oriente", "Occidente"];
//   const municipalities = {
//     Norte: ["El Charco", "La Tola"],
//     Sur: ["Ipiales", "Aldana"],
//     Oriente: ["Belen", "Alban"],
//     Occidente: ["Tumaco", "Fransisco Pizarro"],
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setReportData({ ...reportData, [name]: value });
//   };

//   const handleActivityChange = (event) => {
//     const { name, value } = event.target;
//     setActivityData({ ...activityData, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]); // Guardar el archivo seleccionado
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setSuccess(null);

//     try {
//       // Crear un FormData para enviar archivo y datos
//       const data = new FormData();
//       Object.keys(reportData).forEach((key) =>
//         data.append(key, reportData[key])
//       );
//       if (file) {
//         data.append("file", file); // Agregar el archivo al FormData
//       }

//       // Agregar datos de actividad si están habilitados
//       if (activityEnabled) {
//         Object.keys(activityData).forEach((key) =>
//           data.append(key, activityData[key])
//         );
//       }

//       const response = await fetch("http://localhost:4000/api/reports", {
//         method: "POST",
//         body: data,
//       });

//       if (!response.ok) {
//         throw new Error("Error al enviar el reporte.");
//       }

//       setSuccess(true);
//       setReportData({
//         subregion: "",
//         municipality: "",
//         actaInicio: "",
//         fechaInicio: "",
//         fechaFin: "",
//         fechaRegistro: "",
//         actaSocializacion: "",
//         certificadoLiquidacion: "",
//       });
//       setFile(null); // Resetear el archivo
//       setActivityData({ nombre: "", cantidad: "", unidad: "" }); // Resetear actividad
//       setActivityEnabled(false); // Deshabilitar sección de actividad
//     } catch (error) {
//       console.error(error);
//       setSuccess(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />

//       <div className={styles.formContainer}>
//         <h2>Anexo Técnico</h2>
//         <form onSubmit={handleSubmit} className={styles.formGrid}>
//           {/* Campos previos */}
//           <div className={styles.field}>
//             <label htmlFor="fechaRegistro">Fecha de Registro</label>
//             <input
//               type="date"
//               id="fechaRegistro"
//               name="fechaRegistro"
//               value={reportData.fechaRegistro}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className={styles.field}>
//             <label htmlFor="fechaInicio">Fecha de Inicio</label>
//             <input
//               type="date"
//               id="fechaInicio"
//               name="fechaInicio"
//               value={reportData.fechaInicio}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Otros campos... */}
//           <div className={styles.field}>
//             <label htmlFor="subregion">Subregión</label>
//             <select
//               id="subregion"
//               name="subregion"
//               value={reportData.subregion}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Seleccione una subregión</option>
//               {subregions.map((subregion, index) => (
//                 <option key={index} value={subregion}>
//                   {subregion}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Nueva sección: Actividad */}
//           <h3>Actividad</h3>
//           <button
//             type="button"
//             onClick={() => setActivityEnabled(!activityEnabled)}
//             className={styles.toggleButton}
//           >
//             {activityEnabled ? "Deshabilitar Actividad" : "Habilitar Actividad"}
//           </button>

//           {activityEnabled && (
//             <>
//               <div className={styles.field}>
//                 <label htmlFor="nombre">Nombre</label>
//                 <input
//                   type="text"
//                   id="nombre"
//                   name="nombre"
//                   value={activityData.nombre}
//                   onChange={handleActivityChange}
//                   required
//                 />
//               </div>

//               <div className={styles.field}>
//                 <label htmlFor="cantidad">Cantidad</label>
//                 <input
//                   type="number"
//                   id="cantidad"
//                   name="cantidad"
//                   value={activityData.cantidad}
//                   onChange={handleActivityChange}
//                   required
//                 />
//               </div>

//               <div className={styles.field}>
//                 <label htmlFor="unidad">Unidad</label>
//                 <input
//                   type="text"
//                   id="unidad"
//                   name="unidad"
//                   value={activityData.unidad}
//                   onChange={handleActivityChange}
//                   required
//                 />
//               </div>
//             </>
//           )}

//           {/* Botón de envío */}
//           <button type="submit" disabled={loading}>
//             {loading ? "Enviando..." : "Enviar Reporte"}
//           </button>
//         </form>

//         {/* Mensajes de éxito o error */}
//         {success === true && (
//           <p className={styles.success}>¡Reporte enviado con éxito!</p>
//         )}
//         {success === false && (
//           <p className={styles.error}>Error al enviar el reporte.</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default ReportForm;

// import React, { useState } from "react";
// import styles from "./ReportForm.module.css";
// import Header from "../Header/Header";

// const ReportForm = () => {
//   const [reportData, setReportData] = useState({
//     subregion: "",
//     municipality: "",
//     actaInicio: "",
//     fechaInicio: "",
//     fechaFin: "",
//     fechaRegistro: "",
//     actaSocializacion: "",
//     certificadoLiquidacion: "",
//   });

//   const [file, setFile] = useState(null); // Estado para el archivo
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);

//   // Estado para manejar las actividades
//   const [activityEnabled, setActivityEnabled] = useState(false);
//   const [activityData, setActivityData] = useState({
//     nombre: "",
//     cantidad: "",
//     unidad: "",
//   });

//   const subregions = ["Norte", "Sur", "Oriente", "Occidente"];
//   const municipalities = {
//     Norte: ["El Charco", "La Tola"],
//     Sur: ["Ipiales", "Aldana"],
//     Oriente: ["Belen", "Alban"],
//     Occidente: ["Tumaco", "Fransisco Pizarro"],
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setReportData({ ...reportData, [name]: value });
//   };

//   const handleActivityChange = (event) => {
//     const { name, value } = event.target;
//     setActivityData({ ...activityData, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]); // Guardar el archivo seleccionado
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setSuccess(null);

//     try {
//       // Crear un FormData para enviar archivo y datos
//       const data = new FormData();
//       Object.keys(reportData).forEach((key) =>
//         data.append(key, reportData[key])
//       );
//       if (file) {
//         data.append("file", file); // Agregar el archivo al FormData
//       }

//       // Agregar datos de actividad si están habilitados
//       if (activityEnabled) {
//         Object.keys(activityData).forEach((key) =>
//           data.append(key, activityData[key])
//         );
//       }

//       const response = await fetch("http://localhost:4000/api/reports", {
//         method: "POST",
//         body: data,
//       });

//       if (!response.ok) {
//         throw new Error("Error al enviar el reporte.");
//       }

//       setSuccess(true);
//       setReportData({
//         subregion: "",
//         municipality: "",
//         actaInicio: "",
//         fechaInicio: "",
//         fechaFin: "",
//         fechaRegistro: "",
//         actaSocializacion: "",
//         certificadoLiquidacion: "",
//       });
//       setFile(null); // Resetear el archivo
//       setActivityData({ nombre: "", cantidad: "", unidad: "" }); // Resetear actividad
//       setActivityEnabled(false); // Deshabilitar sección de actividad
//     } catch (error) {
//       console.error(error);
//       setSuccess(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />

//       <div className={styles.formContainer}>
//         <h2>Anexo Técnico</h2>
//         <form onSubmit={handleSubmit} className={styles.formGrid}>
//           {/* Campo: Fecha de Registro */}
//           <div className={styles.field}>
//             <label htmlFor="fechaRegistro">Fecha de Registro</label>
//             <input
//               type="date"
//               id="fechaRegistro"
//               name="fechaRegistro"
//               value={reportData.fechaRegistro}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Fecha de Inicio */}
//           <div className={styles.field}>
//             <label htmlFor="fechaInicio">Fecha de Inicio</label>
//             <input
//               type="date"
//               id="fechaInicio"
//               name="fechaInicio"
//               value={reportData.fechaInicio}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Fecha de Fin */}
//           <div className={styles.field}>
//             <label htmlFor="fechaFin">Fecha de Fin</label>
//             <input
//               type="date"
//               id="fechaFin"
//               name="fechaFin"
//               value={reportData.fechaFin}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Subregión */}
//           <div className={styles.field}>
//             <label htmlFor="subregion">Subregión</label>
//             <select
//               id="subregion"
//               name="subregion"
//               value={reportData.subregion}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Seleccione una subregión</option>
//               {subregions.map((subregion, index) => (
//                 <option key={index} value={subregion}>
//                   {subregion}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Campo: Municipio */}
//           <div className={styles.field}>
//             <label htmlFor="municipality">Municipio</label>
//             <select
//               id="municipality"
//               name="municipality"
//               value={reportData.municipality}
//               onChange={handleChange}
//               required
//               disabled={!reportData.subregion}
//             >
//               <option value="">Seleccione un municipio</option>
//               {reportData.subregion &&
//                 municipalities[reportData.subregion]?.map(
//                   (municipality, index) => (
//                     <option key={index} value={municipality}>
//                       {municipality}
//                     </option>
//                   )
//                 )}
//             </select>
//           </div>

//           {/* Campo: Acta de Inicio */}
//           <div className={styles.field}>
//             <label htmlFor="actaInicio">Acta de Inicio</label>
//             <input
//               type="text"
//               id="actaInicio"
//               name="actaInicio"
//               value={reportData.actaInicio}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Acta de Socialización */}
//           <div className={styles.field}>
//             <label htmlFor="actaSocializacion">Acta de Socialización</label>
//             <input
//               type="text"
//               id="actaSocializacion"
//               name="actaSocializacion"
//               value={reportData.actaSocializacion}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Certificado de Liquidación */}
//           <div className={styles.field}>
//             <label htmlFor="certificadoLiquidacion">
//               Certificado de Liquidación
//             </label>
//             <input
//               type="text"
//               id="certificadoLiquidacion"
//               name="certificadoLiquidacion"
//               value={reportData.certificadoLiquidacion}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Campo: Adjuntar Archivo */}
//           <div className={styles.field}>
//             <label htmlFor="archivo">Adjuntar Archivo</label>
//             <input
//               type="file"
//               id="archivo"
//               name="archivo"
//               onChange={handleFileChange}
//               required
//             />
//           </div>

//           {/* Nueva sección: Actividad */}
//           <h3>Actividad</h3>
//           <button
//             type="button"
//             onClick={() => setActivityEnabled(!activityEnabled)}
//             className={styles.toggleButton}
//           >
//             {activityEnabled ? " Actividad" : "Añadir Actividad"}
//           </button>

//           {activityEnabled && (
//             <>
//               <div className={styles.field}>
//                 <label htmlFor="nombre">Nombre</label>
//                 <input
//                   type="text"
//                   id="nombre"
//                   name="nombre"
//                   value={activityData.nombre}
//                   onChange={handleActivityChange}
//                   required
//                 />
//               </div>

//               <div className={styles.field}>
//                 <label htmlFor="cantidad">Cantidad</label>
//                 <input
//                   type="number"
//                   id="cantidad"
//                   name="cantidad"
//                   value={activityData.cantidad}
//                   onChange={handleActivityChange}
//                   required
//                 />
//               </div>

//               <div className={styles.field}>
//                 <label htmlFor="unidad">Unidad</label>
//                 <input
//                   type="text"
//                   id="unidad"
//                   name="unidad"
//                   value={activityData.unidad}
//                   onChange={handleActivityChange}
//                   required
//                 />
//               </div>
//             </>
//           )}

//           {/* Botón de envío */}
//           <button type="submit" disabled={loading}>
//             {loading ? "Enviando..." : "Enviar Reporte"}
//           </button>
//         </form>

//         {/* Mensajes de éxito o error */}
//         {success === true && (
//           <p className={styles.success}>¡Reporte enviado con éxito!</p>
//         )}
//         {success === false && (
//           <p className={styles.error}>Error al enviar el reporte.</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default ReportForm;

import React, { useState } from "react";
import styles from "./ReportForm.module.css";
import Header from "../Header/Header";

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

  const [file, setFile] = useState(null); // Estado para el archivo
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // Estado para manejar las actividades
  const [activityEnabled, setActivityEnabled] = useState(false);
  const [activityData, setActivityData] = useState({
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
  });

  const subregions = ["Norte", "Sur", "Oriente", "Occidente"];
  const municipalities = {
    Norte: ["El Charco", "La Tola"],
    Sur: ["Ipiales", "Aldana"],
    Oriente: ["Belen", "Alban"],
    Occidente: ["Tumaco", "Fransisco Pizarro"],
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleActivityChange = (event) => {
    const { name, value } = event.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Guardar el archivo seleccionado
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      // Crear un FormData para enviar archivo y datos
      const data = new FormData();
      Object.keys(reportData).forEach((key) =>
        data.append(key, reportData[key])
      );
      if (file) {
        data.append("file", file); // Agregar el archivo al FormData
      }

      // Agregar datos de actividad si están habilitados
      if (activityEnabled) {
        Object.keys(activityData).forEach((key) =>
          data.append(key, activityData[key])
        );
      }

      const response = await fetch("http://localhost:4000/api/reports", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Error al enviar el reporte.");
      }

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
      setFile(null); // Resetear el archivo
      setActivityData({
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
      });
      setActivityEnabled(false); // Deshabilitar sección de actividad
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
          {/* Campo: Fecha de Registro */}
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
              required
            />
          </div>

          {/* Nueva sección: Actividad */}
          <h3>Actividad</h3>
          <button
            type="button"
            onClick={() => setActivityEnabled(!activityEnabled)}
            className={styles.toggleButton}
          >
            {activityEnabled ? "Ocultar Actividad" : "Añadir Actividad"}
          </button>

          {activityEnabled && (
            <>
              {Object.keys(activityData).map((key) => (
                <div className={styles.field} key={key}>
                  <label htmlFor={key}>{key}</label>
                  <input
                    type={
                      key.includes("valor") || key === "porcentajeCumplimiento"
                        ? "number"
                        : "text"
                    }
                    id={key}
                    name={key}
                    value={activityData[key]}
                    onChange={handleActivityChange}
                    required
                  />
                </div>
              ))}
            </>
          )}

          {/* Botón de envío */}
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Reporte"}
          </button>
        </form>

        {/* Mensajes de éxito o error */}
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
