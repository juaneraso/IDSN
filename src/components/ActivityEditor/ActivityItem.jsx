// import React from "react";
// import styles from "./ActivityItem.module.css";

// const ActivityItem = ({
//   activity,
//   index,
//   expanded,
//   toggleExpanded,
//   handleActivityChange,
//   handleRemoveActivity,
//   subregions
// }) => {
//   return (
//     <li className={styles.activityItem}>
//       <div
//         className={styles.activityHeader}
//         onClick={() => toggleExpanded(index)} // Mueve el evento aquí
//       >
//         <strong>
//           {activity.descripcion_Actividad || `Actividad ${index + 1}`}
//         </strong>
//         <button
//           type="button"
//           className={styles.removeButton}
//           onClick={(e) => {
//             e.stopPropagation(); // Evita que el clic cierre o expanda
//             handleRemoveActivity(index);
//           }}
//         >
//           Eliminar
//         </button>
//       </div>
//       {expanded && (
//         <div className={styles.activityDetails}>
//           {Object.keys(activity).map((key) => (
//             <div key={key}>
//               <label htmlFor={`${key}-${index}`}>{key}</label>
//               <input
//                 id={`${key}-${index}`}
//                 name={key}
//                 value={activity[key]}
//                 onChange={(e) => handleActivityChange(e, index)}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </li>
//   );
// };

// export default ActivityItem;

import React from "react";
import styles from "./ActivityItem.module.css";

const ActivityItem = ({
  activity,
  index,
  expanded,
  toggleExpanded,
  handleActivityChange,
  handleRemoveActivity,
  subregions,
}) => {
  const handleMunicipioChange = (e) => {
    handleActivityChange(e, index);
  };

  return (
    <li className={styles.activityItem}>
      <div
        className={styles.activityHeader}
        onClick={() => toggleExpanded(index)}
      >
        <strong>
          {activity.descripcion_Actividad || `Actividad ${index + 1}`}
        </strong>
        <button
          type="button"
          className={styles.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveActivity(index);
          }}
        >
          Eliminar
        </button>
      </div>
      {expanded && (
        <div className={styles.activityDetails}>
          {Object.keys(activity).map((key) =>
            key === "municipioSoporte" ? (
              <div key={key}>
                <label htmlFor={`${key}-${index}`}>Municipio Soporte</label>
                <select
                  id={`${key}-${index}`}
                  name={key}
                  value={activity[key]}
                  onChange={handleMunicipioChange}
                >
                  <option value="">Seleccionar Municipio</option>
                  {subregions.map((subregion) =>
                    subregion.municipios.map((municipio) => (
                      <option key={municipio.id} value={municipio.documentId}>
                        {municipio.nombre}
                      </option>
                    ))
                  )}
                </select>
              </div>
            ) : (
              <div key={key}>
                <label htmlFor={`${key}-${index}`}>{key}</label>
                <input
                  id={`${key}-${index}`}
                  name={key}
                  value={activity[key]}
                  onChange={(e) => handleActivityChange(e, index)}
                />
              </div>
            )
          )}
        </div>
      )}
    </li>
  );
};

export default ActivityItem;
