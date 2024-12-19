// import React from "react";
// import styles from "./ActivityItem.module.css";

// const ActivityItem = ({
//   activity,
//   index,
//   expanded,
//   toggleExpanded,
//   handleActivityChange,
//   handleRemoveActivity,
//   subregions,
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

// import React from "react";
// import styles from "./ActivityItem.module.css";

// const ActivityItem = ({
//   activity,
//   index,
//   expanded,
//   toggleExpanded,
//   handleActivityChange,
//   handleRemoveActivity,
//   subregions,
// }) => {
//   const handleMunicipioChange = (e) => {
//     handleActivityChange(e, index);
//   };

//   return (
//     <li className={styles.activityItem}>
//       <div
//         className={styles.activityHeader}
//         onClick={() => toggleExpanded(index)}
//       >
//         <strong>
//           {activity.descripcion_Actividad || `Actividad ${index + 1}`}
//         </strong>
//         <button
//           type="button"
//           className={styles.removeButton}
//           onClick={(e) => {
//             e.stopPropagation();
//             handleRemoveActivity(index);
//           }}
//         >
//           Eliminar
//         </button>
//       </div>
//       {expanded && (
//         <div className={styles.activityDetails}>
//           {Object.keys(activity).map((key) =>
//             key === "municipioSoporte" ? (
//               <div key={key}>
//                 <label htmlFor={`${key}-${index}`}>Municipio Soporte</label>
//                 <select
//                   id={`${key}-${index}`}
//                   name={key}
//                   value={activity[key]}
//                   onChange={handleMunicipioChange}
//                 >
//                   <option value="">Seleccionar Municipio</option>
//                   {subregions.map((subregion) =>
//                     subregion.municipios.map((municipio) => (
//                       <option key={municipio.id} value={municipio.documentId}>
//                         {municipio.nombre}
//                       </option>
//                     ))
//                   )}
//                 </select>
//               </div>
//             ) : (
//               <div key={key}>
//                 <label htmlFor={`${key}-${index}`}>{key}</label>
//                 <input
//                   id={`${key}-${index}`}
//                   name={key}
//                   value={activity[key]}
//                   onChange={(e) => handleActivityChange(e, index)}
//                 />
//               </div>
//             )
//           )}
//         </div>
//       )}
//     </li>
//   );
// };

// export default ActivityItem;

//

// import React from "react";
// import styles from "./ActivityItem.module.css";

// const ActivityItem = ({
//   activity,
//   index,
//   expanded,
//   toggleExpanded,
//   handleActivityChange,
//   handleRemoveActivity,
//   subregions,
// }) => {
//   const handleAddArrayItem = (key) => {
//     const updatedArray = [...(activity[key] || []), ""];
//     handleActivityChange({ target: { name: key, value: updatedArray } }, index);
//   };

//   const handleRemoveArrayItem = (key, itemIndex) => {
//     const updatedArray = activity[key].filter((_, i) => i !== itemIndex);
//     handleActivityChange({ target: { name: key, value: updatedArray } }, index);
//   };

//   const handleArrayItemChange = (key, event, itemIndex) => {
//     const updatedArray = [...activity[key]];
//     updatedArray[itemIndex] = event.target.value;
//     handleActivityChange({ target: { name: key, value: updatedArray } }, index);
//   };

//   const renderArrayField = (key) => (
//     <div key={key}>
//       <label>{key}</label>
//       <ul>
//         {(activity[key] || []).map((item, itemIndex) => (
//           <li key={itemIndex}>
//             <input
//               value={item}
//               onChange={(e) => handleArrayItemChange(key, e, itemIndex)}
//             />
//             <button
//               type="button"
//               onClick={() => handleRemoveArrayItem(key, itemIndex)}
//             >
//               Eliminar
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button type="button" onClick={() => handleAddArrayItem(key)}>
//         Añadir {key}
//       </button>
//     </div>
//   );

//   return (
//     <li className={styles.activityItem}>
//       <div
//         className={styles.activityHeader}
//         onClick={() => toggleExpanded(index)}
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
//           {Object.keys(activity).map((key) =>
//             key === "entorno" ||
//             key === "tecnologia" ||
//             key === "poblacionSujeto" ? (
//               renderArrayField(key)
//             ) : (
//               <div key={key}>

//                 <label htmlFor={`${key}-${index}`}>{key}</label>
//                 <input
//                   id={`${key}-${index}`}
//                   name={key}
//                   value={activity[key]}
//                   onChange={(e) => handleActivityChange(e, index)}
//                 />
//               </div>
//             )
//           )}
//         </div>
//       )}
//     </li>
//   );
// };

// export default ActivityItem;

// import React from "react";
// import styles from "./ActivityItem.module.css";

// const ActivityItem = ({
//   activity,
//   index,
//   expanded,
//   toggleExpanded,
//   handleActivityChange,
//   handleRemoveActivity,
//   subregions,
// }) => {
//   const handleAddArrayItem = (key) => {
//     const updatedArray = [...(activity[key] || []), ""];
//     handleActivityChange({ target: { name: key, value: updatedArray } }, index);
//   };

//   const handleRemoveArrayItem = (key, itemIndex) => {
//     const updatedArray = activity[key].filter((_, i) => i !== itemIndex);
//     handleActivityChange({ target: { name: key, value: updatedArray } }, index);
//   };

//   const handleArrayItemChange = (key, event, itemIndex) => {
//     const updatedArray = [...activity[key]];
//     updatedArray[itemIndex] = event.target.value;
//     handleActivityChange({ target: { name: key, value: updatedArray } }, index);
//   };

//   const renderArrayField = (key, label) => (
//     <div key={key}>
//       <label>{label}</label>
//       <ul>
//         {(activity[key] || []).map((item, itemIndex) => (
//           <li key={itemIndex}>
//             <strong>{`${label} ${itemIndex + 1}`}</strong>
//             <input
//               value={item}
//               onChange={(e) => handleArrayItemChange(key, e, itemIndex)}
//             />
//             <button
//               className={styles.removeButton}
//               type="button"
//               onClick={() => handleRemoveArrayItem(key, itemIndex)}
//             >
//               Eliminar
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button
//         className={styles.buttonMain}
//         type="button"
//         onClick={() => handleAddArrayItem(key)}
//       >
//         Añadir {label}
//       </button>
//     </div>
//   );

//   return (
//     <li className={styles.activityItem}>
//       <div
//         className={styles.activityHeader}
//         onClick={() => toggleExpanded(index)}
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
//           {Object.keys(activity).map((key) =>
//             key === "entorno" ||
//             key === "tecnologia" ||
//             key === "poblacionSujeto" ||
//             key === "codigoCups" ? (
//               renderArrayField(
//                 key,
//                 key === "entorno"
//                   ? "Entorno"
//                   : key === "tecnologia"
//                   ? "Tecnología"
//                   : key === "poblacionSujeto"
//                   ? "Población Sujeto"
//                   : "Código CUPS"
//               )
//             ) : (
//               <div key={key}>
//                 <label htmlFor={`${key}-${index}`}>{key}</label>
//                 <input
//                   id={`${key}-${index}`}
//                   name={key}
//                   value={activity[key]}
//                   onChange={(e) => handleActivityChange(e, index)}
//                 />
//               </div>
//             )
//           )}
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
  // Opciones de las listas desplegables
  const options = {
    entorno: ["Urbano", "Rural", "Industrial"],
    tecnologia: ["Software", "Hardware", "Redes"],
    poblacionSujeto: ["Niños", "Adolescentes", "Adultos"],
    codigoCups: ["001", "002", "003"], // Agrega los códigos reales
  };

  const handleAddArrayItem = (key) => {
    const updatedArray = [...(activity[key] || []), ""]; // Inicializa con un valor vacío
    handleActivityChange({ target: { name: key, value: updatedArray } }, index);
  };

  const handleRemoveArrayItem = (key, itemIndex) => {
    const updatedArray = activity[key].filter((_, i) => i !== itemIndex);
    handleActivityChange({ target: { name: key, value: updatedArray } }, index);
  };

  const handleArrayItemChange = (key, value, itemIndex) => {
    const updatedArray = [...activity[key]];
    updatedArray[itemIndex] = value;
    handleActivityChange({ target: { name: key, value: updatedArray } }, index);
  };

  const renderArrayField = (key, label) => (
    <div key={key}>
      <label>{label}</label>
      <ul>
        {(activity[key] || []).map((item, itemIndex) => (
          <li key={itemIndex}>
            <strong>{`${label} ${itemIndex + 1}`}</strong>
            <select
              value={item}
              onChange={(e) =>
                handleArrayItemChange(key, e.target.value, itemIndex)
              }
            >
              <option value="">Seleccionar {label}</option>
              {options[key].map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              className={styles.removeButton}
              type="button"
              onClick={() => handleRemoveArrayItem(key, itemIndex)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button
        className={styles.buttonMain}
        type="button"
        onClick={() => handleAddArrayItem(key)}
      >
        Añadir {label}
      </button>
    </div>
  );

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
            e.stopPropagation(); // Evita que el clic cierre o expanda
            handleRemoveActivity(index);
          }}
        >
          Eliminar
        </button>
      </div>
      {expanded && (
        <div className={styles.activityDetails}>
          {Object.keys(activity).map((key) =>
            key === "entorno" ||
            key === "tecnologia" ||
            key === "poblacionSujeto" ||
            key === "codigoCups" ? (
              renderArrayField(
                key,
                key === "entorno"
                  ? "Entorno"
                  : key === "tecnologia"
                  ? "Tecnología"
                  : key === "poblacionSujeto"
                  ? "Población Sujeto"
                  : "Código CUPS"
              )
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
