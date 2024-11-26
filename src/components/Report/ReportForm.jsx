// import React, { useState } from "react";
// import styles from "./ReportForm.module.css";
// import Header from "../Header/Header";
// import ActivityList from "../Activities/ActivityList";

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

//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);
//   const [activities, setActivities] = useState([]);

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
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setSuccess(null);

//     try {
//       const data = new FormData();
//       Object.keys(reportData).forEach((key) =>
//         data.append(key, reportData[key])
//       );
//       if (file) data.append("file", file);
//       data.append("activities", JSON.stringify(activities));

//       const response = await fetch("http://localhost:4000/api/reports", {
//         method: "POST",
//         body: data,
//       });

//       if (!response.ok) throw new Error("Error al enviar el reporte.");

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
//       setFile(null);
//       setActivities([]);
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
//           <div className={styles.field}>
//             <label htmlFor="archivo">Adjuntar Archivo</label>
//             <input
//               type="file"
//               id="archivo"
//               name="archivo"
//               onChange={handleFileChange}
//             />
//           </div>

//           {/* Componente de actividades */}
//         </form>

//         <ActivityList activities={activities} setActivities={setActivities} />

//         <button className={styles.buttonMain} type="submit" disabled={loading}>
//           {loading ? "Enviando..." : "Enviar Reporte"}
//         </button>

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
import ActivityList from "../Activities/ActivityList";
import ReportFields from "../Fields/ReportFields";

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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
          <ReportFields
            reportData={reportData}
            handleChange={handleChange}
            subregions={subregions}
            municipalities={municipalities}
            file={file}
            handleFileChange={handleFileChange}
          />
        </form>

        <ActivityList activities={activities} setActivities={setActivities} />

        <button className={styles.buttonMain} type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Reporte"}
        </button>

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
