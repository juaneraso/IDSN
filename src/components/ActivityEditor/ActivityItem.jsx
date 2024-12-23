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
//   // Opciones de las listas desplegables
//   const options = {
//     entorno: ["Urbano", "Rural", "Industrial"],
//     tecnologia: ["Software", "Hardware", "Redes"],
//     poblacionSujeto: ["Niños", "Adolescentes", "Adultos"],
//     codigoCups: ["001", "002", "003"], // Agrega los códigos reales
//   };

//   const handleAddArrayItem = (key) => {
//     const updatedArray = [...(activity[key] || []), ""]; // Inicializa con un valor vacío
//     handleActivityChange({ target: { name: key, value: updatedArray } }, index);
//   };

//   const handleRemoveArrayItem = (key, itemIndex) => {
//     const updatedArray = activity[key].filter((_, i) => i !== itemIndex);
//     handleActivityChange({ target: { name: key, value: updatedArray } }, index);
//   };

//   const handleArrayItemChange = (key, value, itemIndex) => {
//     const updatedArray = [...activity[key]];
//     updatedArray[itemIndex] = value;
//     handleActivityChange({ target: { name: key, value: updatedArray } }, index);
//   };

//   const renderArrayField = (key, label) => {
//     const selectedValues = activity[key] || []; // Valores ya seleccionados
//     const availableOptions = options[key].filter(
//       (option) => !selectedValues.includes(option) // Excluir opciones ya seleccionadas
//     );

//     return (
//       <div key={key}>
//         <label>{label}</label>
//         <ul>
//           {selectedValues.map((item, itemIndex) => (
//             <li key={itemIndex}>
//               <strong>{`${label} ${itemIndex + 1}`}</strong>
//               <select
//                 value={item}
//                 onChange={(e) =>
//                   handleArrayItemChange(key, e.target.value, itemIndex)
//                 }
//               >
//                 <option value="">Seleccionar {label}</option>
//                 {options[key].map((option, idx) => (
//                   <option
//                     key={idx}
//                     value={option}
//                     disabled={
//                       selectedValues.includes(option) && option !== item
//                     }
//                   >
//                     {option}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 className={styles.removeButton}
//                 type="button"
//                 onClick={() => handleRemoveArrayItem(key, itemIndex)}
//               >
//                 Eliminar
//               </button>
//             </li>
//           ))}
//         </ul>
//         <button
//           className={styles.buttonMain}
//           type="button"
//           onClick={() => {
//             if (availableOptions.length > 0) {
//               handleAddArrayItem(key);
//             } else {
//               alert(`No hay más opciones disponibles para ${label}`);
//             }
//           }}
//         >
//           Añadir {label}
//         </button>
//       </div>
//     );
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
  const options = {
    entorno: ["Urbano", "Rural", "Industrial"],
    tecnologia: ["Software", "Hardware", "Redes"],
    poblacionSujeto: ["Niños", "Adolescentes", "Adultos"],
    codigoCups: ["001", "002", "003"], // Agrega los códigos reales
    tipoSoporte: ["Digital", "Físico", "Mixto"], // Opciones para Tipo_soporte
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

  const renderArrayField = (key, label) => {
    const selectedValues = activity[key] || [];
    const availableOptions = options[key].filter(
      (option) => !selectedValues.includes(option)
    );

    return (
      <div key={key}>
        <label>{label}</label>
        <ul>
          {selectedValues.map((item, itemIndex) => (
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
                  <option
                    key={idx}
                    value={option}
                    disabled={
                      selectedValues.includes(option) && option !== item
                    }
                  >
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
          onClick={() => {
            if (availableOptions.length > 0) {
              handleAddArrayItem(key);
            } else {
              alert(`No hay más opciones disponibles para ${label}`);
            }
          }}
        >
          Añadir {label}
        </button>
      </div>
    );
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
                  ? "Tecnología PIC"
                  : key === "poblacionSujeto"
                  ? "Población Sujeto"
                  : "Código CUPS"
              )
            ) : key === "Tipo_soporte" ? (
              <div key={key}>
                <label htmlFor={`${key}-${index}`}>Tipo de Soporte</label>
                <select
                  id={`${key}-${index}`}
                  name={key}
                  value={activity[key]}
                  onChange={(e) => handleActivityChange(e, index)}
                >
                  <option value="">Seleccionar Tipo de Soporte</option>
                  {options.tipoSoporte.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
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
