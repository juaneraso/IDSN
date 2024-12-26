// import React from "react";
// import styles from "./ActivityItem.module.css";

// const ActivityItem = ({
//   activity,
//   index,
//   expanded,
//   toggleExpanded,
//   handleActivityChange,
//   handleRemoveActivity,
//   entornos,
//   tecnologias,
//   poblaciones,
//   soportes,
//   cups,
// }) => {
//   const options = {
//     entorno: entornos,
//     tecnologia: tecnologias,
//     poblacionSujeto: poblaciones,
//     codigoCups: cups,
//     tipoSoporte: soportes,
//     meses: [
//       "Ene",
//       "Feb",
//       "Mar",
//       "Abr",
//       "May",
//       "Jun",
//       "Jul",
//       "Ago",
//       "Sept",
//       "Oct",
//       "Nov",
//       "Dic",
//     ],
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

//   const handleCronogramaChange = (value, key, itemIndex) => {
//     const updatedCronograma = [...(activity.cronograma || [])];

//     // Asegurarse de que el elemento existe
//     if (!updatedCronograma[itemIndex]) {
//       updatedCronograma[itemIndex] = {
//         mes: options.meses[itemIndex],
//         peso: "",
//       };
//     }

//     // Actualizar el valor correspondiente
//     updatedCronograma[itemIndex][key] = value;

//     handleActivityChange(
//       { target: { name: "cronograma", value: updatedCronograma } },
//       index
//     );
//   };

//   const renderCronogramaField = () => {
//     const allMonths = options.meses;

//     // Inicializa el cronograma si no existe
//     const cronograma = allMonths.map((mes) => {
//       const existing = (activity.cronograma || []).find(
//         (item) => item.mes === mes
//       );
//       return existing || { mes, peso: "" }; // Crea un item vacío si no existe
//     });

//     return (
//       <div>
//         <label>Cronograma</label>
//         <div className={styles.cronogramaGrid}>
//           {cronograma.map((item, itemIndex) => (
//             <div key={item.mes} className={styles.cronogramaItem}>
//               <strong>{item.mes}</strong>
//               <input
//                 type="text"
//                 placeholder="%"
//                 value={item.peso === "0" ? "" : item.peso}
//                 onChange={(e) =>
//                   handleCronogramaChange(e.target.value, "peso", itemIndex)
//                 }
//                 min="0"
//                 max="100"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderArrayField = (key, label) => {
//     const selectedValues = activity[key] || [];
//     const availableOptions = options[key].filter(
//       (option) => !selectedValues.includes(option)
//     );

//     return (
//       <div key={key}>
//         <label>{label}</label>
//         <ul>
//           {selectedValues.map((item, itemIndex) => (
//             <li key={`${key}-${item}-${itemIndex}`}>
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
//                     key={option}
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
//           {activity.Descripcion_Actividad || `Actividad ${index + 1}`}
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
//             key === "entorno" ||
//             key === "tecnologia" ||
//             key === "poblacionSujeto" ||
//             key === "codigoCups" ? (
//               renderArrayField(
//                 key,
//                 key === "entorno"
//                   ? "Entorno"
//                   : key === "tecnologia"
//                   ? "Tecnología PIC"
//                   : key === "poblacionSujeto"
//                   ? "Población Sujeto"
//                   : "Código CUPS"
//               )
//             ) : key === "cronograma" ? (
//               renderCronogramaField()
//             ) : key === "Tipo_soporte" ? (
//               <div key={key}>
//                 <label htmlFor={`${key}-${index}`}>Tipo de Soporte</label>
//                 <select
//                   id={`${key}-${index}`}
//                   name={key}
//                   value={activity[key]}
//                   onChange={(e) => handleActivityChange(e, index)}
//                 >
//                   <option value="">Seleccionar Tipo de Soporte</option>
//                   {options.tipoSoporte.map((option, idx) => (
//                     <option key={idx} value={option}>
//                       {option}
//                     </option>
//                   ))}
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

// import React from "react";
// import Select from "react-select";
// import styles from "./ActivityItem.module.css";

// const ActivityItem = ({
//   activity,
//   index,
//   expanded,
//   toggleExpanded,
//   handleActivityChange,
//   handleRemoveActivity,
//   entornos,
//   tecnologias,
//   poblaciones,
//   soportes,
//   cups,
// }) => {
//   const options = {
//     entorno: entornos,
//     tecnologia: tecnologias,
//     poblacionSujeto: poblaciones,
//     codigoCups: cups,
//     tipoSoporte: soportes,
//     meses: [
//       "Ene",
//       "Feb",
//       "Mar",
//       "Abr",
//       "May",
//       "Jun",
//       "Jul",
//       "Ago",
//       "Sept",
//       "Oct",
//       "Nov",
//       "Dic",
//     ],
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

//   const handleCronogramaChange = (value, key, itemIndex) => {
//     const updatedCronograma = [...(activity.cronograma || [])];

//     // Asegurarse de que el elemento existe
//     if (!updatedCronograma[itemIndex]) {
//       updatedCronograma[itemIndex] = {
//         mes: options.meses[itemIndex],
//         peso: "",
//       };
//     }

//     // Actualizar el valor correspondiente
//     updatedCronograma[itemIndex][key] = value;

//     handleActivityChange(
//       { target: { name: "cronograma", value: updatedCronograma } },
//       index
//     );
//   };

//   const renderCronogramaField = () => {
//     const allMonths = options.meses;

//     // Inicializa el cronograma si no existe
//     const cronograma = allMonths.map((mes) => {
//       const existing = (activity.cronograma || []).find(
//         (item) => item.mes === mes
//       );
//       return existing || { mes, peso: "" }; // Crea un item vacío si no existe
//     });

//     return (
//       <div>
//         <label>Cronograma</label>
//         <div className={styles.cronogramaGrid}>
//           {cronograma.map((item, itemIndex) => (
//             <div key={item.mes} className={styles.cronogramaItem}>
//               <strong>{item.mes}</strong>
//               <input
//                 type="text"
//                 placeholder="%"
//                 value={item.peso === "0" ? "" : item.peso}
//                 onChange={(e) =>
//                   handleCronogramaChange(e.target.value, "peso", itemIndex)
//                 }
//                 min="0"
//                 max="100"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderArrayField = (key, label) => {
//     const selectedValues = activity[key] || [];
//     const availableOptions = options[key].filter(
//       (option) => !selectedValues.includes(option)
//     );

//     if (key === "codigoCups") {
//       // Usar react-select para el campo de cups
//       const optionsForSelect = options[key].map((option) => ({
//         value: option,
//         label: option,
//       }));

//       return (
//         <div key={key}>
//           <label>{label}</label>
//           <Select
//             options={optionsForSelect}
//             isMulti
//             value={selectedValues.map((val) => ({ value: val, label: val }))}
//             onChange={(selectedOptions) =>
//               handleActivityChange(
//                 {
//                   target: {
//                     name: key,
//                     value: selectedOptions.map((opt) => opt.value),
//                   },
//                 },
//                 index
//               )
//             }
//             placeholder={`Seleccionar ${label}`}
//           />
//         </div>
//       );
//     }

//     return (
//       <div key={key}>
//         <label>{label}</label>
//         <ul>
//           {selectedValues.map((item, itemIndex) => (
//             <li key={`${key}-${item}-${itemIndex}`}>
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
//                     key={option}
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
//           {activity.Descripcion_Actividad || `Actividad ${index + 1}`}
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
//             key === "entorno" ||
//             key === "tecnologia" ||
//             key === "poblacionSujeto" ||
//             key === "codigoCups" ? (
//               renderArrayField(
//                 key,
//                 key === "entorno"
//                   ? "Entorno"
//                   : key === "tecnologia"
//                   ? "Tecnología PIC"
//                   : key === "poblacionSujeto"
//                   ? "Población Sujeto"
//                   : "Código CUPS"
//               )
//             ) : key === "cronograma" ? (
//               renderCronogramaField()
//             ) : key === "Tipo_soporte" ? (
//               <div key={key}>
//                 <label htmlFor={`${key}-${index}`}>Tipo de Soporte</label>
//                 <select
//                   id={`${key}-${index}`}
//                   name={key}
//                   value={activity[key]}
//                   onChange={(e) => handleActivityChange(e, index)}
//                 >
//                   <option value="">Seleccionar Tipo de Soporte</option>
//                   {options.tipoSoporte.map((option, idx) => (
//                     <option key={idx} value={option}>
//                       {option}
//                     </option>
//                   ))}
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

import React from "react";
import Select from "react-select";
import styles from "./ActivityItem.module.css";

const ActivityItem = ({
  activity,
  index,
  expanded,
  toggleExpanded,
  handleActivityChange,
  handleRemoveActivity,
  entornos,
  tecnologias,
  poblaciones,
  soportes,
  cups,
}) => {
  const options = {
    entorno: entornos,
    tecnologia: tecnologias,
    poblacionSujeto: poblaciones,
    codigoCups: cups,
    tipoSoporte: soportes,
    meses: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sept",
      "Oct",
      "Nov",
      "Dic",
    ],
  };

  const handleAddArrayItem = (key) => {
    const updatedArray = [...(activity[key] || []), ""];
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

  const handleCronogramaChange = (value, key, itemIndex) => {
    const updatedCronograma = [...(activity.cronograma || [])];

    if (!updatedCronograma[itemIndex]) {
      updatedCronograma[itemIndex] = {
        mes: options.meses[itemIndex],
        peso: "",
      };
    }

    updatedCronograma[itemIndex][key] = value;

    handleActivityChange(
      { target: { name: "cronograma", value: updatedCronograma } },
      index
    );
  };

  const handleAddArraysoporte = () => {
    const updatedArraysoportes = [
      ...(activity.Arraysoportes || []),
      { Tipo_soporte: "", Descripcion_Soporte: "" },
    ];
    handleActivityChange(
      { target: { name: "Arraysoportes", value: updatedArraysoportes } },
      index
    );
  };

  const handleRemoveArraysoporte = (itemIndex) => {
    const updatedArraysoportes = activity.Arraysoportes.filter(
      (_, i) => i !== itemIndex
    );
    handleActivityChange(
      { target: { name: "Arraysoportes", value: updatedArraysoportes } },
      index
    );
  };

  const handleArraysoporteChange = (key, value, itemIndex) => {
    const updatedArraysoportes = [...activity.Arraysoportes];
    updatedArraysoportes[itemIndex][key] = value;
    handleActivityChange(
      { target: { name: "Arraysoportes", value: updatedArraysoportes } },
      index
    );
  };

  const renderCronogramaField = () => {
    const allMonths = options.meses;
    const cronograma = allMonths.map((mes) => {
      const existing = (activity.cronograma || []).find(
        (item) => item.mes === mes
      );
      return existing || { mes, peso: "" };
    });

    return (
      <div>
        <label>Cronograma</label>
        <div className={styles.cronogramaGrid}>
          {cronograma.map((item, itemIndex) => (
            <div key={item.mes} className={styles.cronogramaItem}>
              <strong>{item.mes}</strong>
              <input
                type="text"
                placeholder="%"
                value={item.peso === "0" ? "" : item.peso}
                onChange={(e) =>
                  handleCronogramaChange(e.target.value, "peso", itemIndex)
                }
                min="0"
                max="100"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderArrayField = (key, label) => {
    const selectedValues = activity[key] || [];
    const availableOptions = options[key].filter(
      (option) => !selectedValues.includes(option)
    );

    if (key === "codigoCups") {
      const optionsForSelect = options[key].map((option) => ({
        value: option,
        label: option,
      }));

      return (
        <div key={key}>
          <label>{label}</label>
          <Select
            options={optionsForSelect}
            isMulti
            value={selectedValues.map((val) => ({ value: val, label: val }))}
            onChange={(selectedOptions) =>
              handleActivityChange(
                {
                  target: {
                    name: key,
                    value: selectedOptions.map((opt) => opt.value),
                  },
                },
                index
              )
            }
            placeholder={`Seleccionar ${label}`}
          />
        </div>
      );
    }

    return (
      <div key={key}>
        <label>{label}</label>
        <ul>
          {selectedValues.map((item, itemIndex) => (
            <li key={`${key}-${item}-${itemIndex}`}>
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
                    key={option}
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

  const renderArraysoportes = () => {
    return (
      <div>
        <label>Array de Soportes</label>
        {activity.Arraysoportes &&
          activity.Arraysoportes.map((item, itemIndex) => (
            <div key={itemIndex} className={styles.arraysoporteItem}>
              <label>Tipo de Soporte</label>
              <select
                value={item.Tipo_soporte}
                onChange={(e) =>
                  handleArraysoporteChange(
                    "Tipo_soporte",
                    e.target.value,
                    itemIndex
                  )
                }
              >
                <option value="">Seleccionar Tipo de Soporte</option>
                {options.tipoSoporte.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label>Descripción del Soporte</label>
              <input
                type="text"
                value={item.Descripcion_Soporte}
                onChange={(e) =>
                  handleArraysoporteChange(
                    "Descripcion_Soporte",
                    e.target.value,
                    itemIndex
                  )
                }
              />
              <button
                className={styles.removeButton}
                type="button"
                onClick={() => handleRemoveArraysoporte(itemIndex)}
              >
                Eliminar Soporte
              </button>
            </div>
          ))}
        <button
          className={styles.buttonMain}
          type="button"
          onClick={handleAddArraysoporte}
        >
          Añadir Soporte
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
          {activity.Descripcion_Actividad || `Actividad ${index + 1}`}
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
            ) : key === "cronograma" ? (
              renderCronogramaField()
            ) : key === "Arraysoportes" ? (
              renderArraysoportes()
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
