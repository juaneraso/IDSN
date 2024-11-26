// import React, { useState } from "react";
// import styles from "./ActivityList.module.css";

// const ActivityList = ({ activities, setActivities }) => {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const handleActivityChange = (event, index) => {
//     const { name, value } = event.target;
//     const updatedActivities = [...activities];
//     updatedActivities[index][name] = value;
//     setActivities(updatedActivities);
//   };

//   const toggleExpanded = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   const handleAddActivity = () => {
//     const newActivity = {
//       nombre: "",
//       cantidad: "",
//       unidad: "",
//       unidadMedida: "",
//       entorno: "",
//       tecnologia: "",
//       poblacionSujeto: "",
//       IDsoporte: "",
//       equipo: "",
//       codigoCups: "",
//       valorUnitario: "",
//       valorTotal: "",
//       cronograma: "",
//       observacionEjecucion: "",
//       porcentajeCumplimiento: "",
//       observacionSeguimiento: "",
//       estadoAvance: "",
//     };
//     setActivities([...activities, newActivity]);
//     setExpandedIndex(activities.length); // Expande la nueva actividad automáticamente
//   };

//   return (
//     <div>
//       <h3>Actividades</h3>
//       <button
//         type="button"
//         onClick={handleAddActivity}
//         className={styles.toggleButton}
//       >
//         Añadir Actividad
//       </button>

//       <ul className={styles.activityList}>
//         {activities.map((activity, index) => (
//           <li key={index} className={styles.activityItem}>
//             <div
//               className={styles.activityHeader}
//               onClick={() => toggleExpanded(index)}
//             >
//               <strong>{activity.nombre || `Actividad ${index + 1}`}</strong>
//             </div>
//             {expandedIndex === index && (
//               <div className={styles.activityDetails}>
//                 {Object.keys(activity).map((key) => (
//                   <div className={styles.field} key={key}>
//                     <label htmlFor={`${key}-${index}`}>{key}</label>
//                     <input
//                       type={
//                         key.includes("valor") ||
//                         key === "porcentajeCumplimiento"
//                           ? "number"
//                           : "text"
//                       }
//                       id={`${key}-${index}`}
//                       name={key}
//                       value={activity[key]}
//                       onChange={(e) => handleActivityChange(e, index)}
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ActivityList;

// import React, { useState } from "react";
// import styles from "./ActivityList.module.css";

// const ActivityList = ({ activities, setActivities }) => {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const handleActivityChange = (event, index) => {
//     const { name, value } = event.target;
//     const updatedActivities = [...activities];
//     updatedActivities[index][name] = value;
//     setActivities(updatedActivities);
//   };

//   const toggleExpanded = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   const handleAddActivity = () => {
//     const newActivity = {
//       nombre: "",
//       cantidad: "",
//       unidad: "",
//       unidadMedida: "",
//       entorno: "",
//       tecnologia: "",
//       poblacionSujeto: "",
//       IDsoporte: "",
//       equipo: "",
//       codigoCups: "",
//       valorUnitario: "",
//       valorTotal: "",
//       cronograma: "",
//       observacionEjecucion: "",
//       porcentajeCumplimiento: "",
//       observacionSeguimiento: "",
//       estadoAvance: "",
//     };
//     setActivities([...activities, newActivity]);
//     setExpandedIndex(activities.length); // Expande la nueva actividad automáticamente
//   };

//   return (
//     <div>
//       <h3>Actividades</h3>
//       <button
//         type="button"
//         onClick={handleAddActivity}
//         className={styles.toggleButton}
//       >
//         Añadir Actividad
//       </button>

//       <ul className={styles.activityList}>
//         {activities.map((activity, index) => (
//           <li key={index} className={styles.activityItem}>
//             <div
//               className={styles.activityHeader}
//               onClick={() => toggleExpanded(index)}
//             >
//               <strong>{activity.nombre || `Actividad ${index + 1}`}</strong>
//             </div>
//             {expandedIndex === index && (
//               <div className={styles.activityDetails}>
//                 {Object.keys(activity).map((key) => (
//                   <div className={styles.field} key={key}>
//                     <label htmlFor={`${key}-${index}`}>{key}</label>
//                     <input
//                       type={
//                         key.includes("valor") ||
//                         key === "porcentajeCumplimiento"
//                           ? "number"
//                           : "text"
//                       }
//                       id={`${key}-${index}`}
//                       name={key}
//                       value={activity[key]}
//                       onChange={(e) => handleActivityChange(e, index)}
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ActivityList;

import React, { useState } from "react";
import ActivityItem from "../ActivityEditor/ActivityItem";
import styles from "./ActivityList.module.css";

const ActivityList = ({ activities, setActivities }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleActivityChange = (event, index) => {
    const { name, value } = event.target;
    const updatedActivities = [...activities];
    updatedActivities[index][name] = value;
    setActivities(updatedActivities);
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
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
    setExpandedIndex(activities.length); // Expande la nueva actividad automáticamente
  };

  return (
    <div>
      <h3>Actividades</h3>
      <button
        type="button"
        onClick={handleAddActivity}
        className={styles.buttonMain}
      >
        Añadir Actividad
      </button>

      <ul className={styles.activityList}>
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            activity={activity}
            index={index}
            expanded={expandedIndex === index}
            toggleExpanded={toggleExpanded}
            handleActivityChange={handleActivityChange}
            handleRemoveActivity={handleRemoveActivity}
          />
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
