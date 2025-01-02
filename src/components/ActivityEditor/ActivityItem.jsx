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
import React, { useState } from "react";
import styles from "./ActivityItem.module.css";
import Select from "react-select";

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
    // entorno: entornos.map((option) => ({ value: option, label: option })),
    entornos: entornos,
    //tecnologia: tecnologias,
    poblacion_sujeto: poblaciones,
    codigo_cups: cups,
    tipo_soporte: soportes,
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

  const customStyles = {
    control: (base) => ({
      ...base,
      minWidth: "200px", // Ajusta el ancho mínimo
      //maxWidth: "400px", // Opcional, limita el ancho máximo
    }),
    menu: (base) => ({
      ...base,
      zIndex: 5, // Asegura que el menú no se superponga
    }),
    option: (base) => ({
      ...base,
      whiteSpace: "nowrap", // Evita que el texto se parta
    }),
    multiValueLabel: (base) => ({
      ...base,
      whiteSpace: "normal", // Permite que las etiquetas ocupen más espacio
    }),
  };

  const customStyles_cups = {
    control: (base) => ({
      ...base,
      minWidth: "500px", // Ajusta el ancho mínimo
      //maxWidth: "400px", // Opcional, limita el ancho máximo
    }),
    menu: (base) => ({
      ...base,
      zIndex: 5, // Asegura que el menú no se superponga
    }),
    option: (base) => ({
      ...base,
      whiteSpace: "nowrap", // Evita que el texto se parta
    }),
    multiValueLabel: (base) => ({
      ...base,
      whiteSpace: "normal", // Permite que las etiquetas ocupen más espacio
    }),
  };

  const handleCronogramaChange = (value, key, itemIndex) => {
    const updatedCronograma = [...(activity.cronograma || [])];
    console.log("cronograma", updatedCronograma);

    // Asegurarse de que el elemento existe
    if (!updatedCronograma[itemIndex]) {
      updatedCronograma[itemIndex] = {
        mes: options.meses[itemIndex],
        peso: "",
      };
    }

    // Actualizar el valor correspondiente
    updatedCronograma[itemIndex][key] = value;

    handleActivityChange(
      { target: { name: "cronograma", value: updatedCronograma } },
      index
    );
  };

  const renderCronogramaField = () => {
    const allMonths = options.meses;

    // Inicializa el cronograma si no existe
    const cronograma = allMonths.map((mes) => {
      const existing = (activity.cronograma || []).find(
        (item) => item.mes === mes
      );
      return existing || { mes, peso: "" }; // Crea un item vacío si no existe
    });

    return (
      <div>
        {/* <label>Cronograma</label> */}
        <div className={styles.cronogramaGrid}>
          {cronograma.map((item, itemIndex) => (
            <div key={item.mes} className={styles.cronogramaItem}>
              <strong>{item.mes}</strong>
              <input
                type="text"
                placeholder="%"
                value={item.peso === "0" ? "" : item.peso}
                onChange={(e) =>
                  handleCronogramaChange(
                    e.target.value,
                    "peso",
                    itemIndex,
                    index
                  )
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

  return (
    <li className={styles.activityItem}>
      <div
        className={styles.activityHeader}
        onClick={() => toggleExpanded(index)}
      >
        <strong>
          {activity.descripcion_actividad || `Actividad ${index + 1}`}
        </strong>
        <button
          type="button"
          className={styles.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveActivity(index);
          }}
        >
          -
        </button>
      </div>
      {expanded && (
        <div className={styles.activityDetails}>
          <table className={styles.activityTable}>
            <thead>
              <tr>
                <th>Descripción Actividad</th>
                <th>Cantidad</th>
                <th>Unidad de Medida</th>
                <th>Entornos</th>
                <th>Tecnologías</th>
                <th>Población Sujeto</th>
                <th>Tipo Soporte</th>
                <th>Descripción Soporte</th>
                <th>Equipo Operativo</th>
                <th>Perfil Profesional</th>
                <th>Perfil Operativo</th>
                <th>Código Cups</th>
                <th>Valor Unitario</th>
                <th>Valor Total</th>
                <th>Cronograma</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="descripcion_actividad"
                    value={activity.descripcion_actividad}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="cantidad"
                    value={activity.cantidad}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="unidad_medida"
                    value={activity.unidad_medida}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <Select
                    isMulti
                    name="entorno"
                    options={entornos.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    value={entornos
                      .map((option) => ({ value: option, label: option }))
                      .filter((option) =>
                        activity.entorno.includes(option.value)
                      )}
                    onChange={(selectedOptions) =>
                      handleActivityChange(
                        {
                          target: {
                            name: "entorno",
                            value: selectedOptions.map(
                              (option) => option.value
                            ),
                          },
                        },
                        index
                      )
                    }
                    placeholder="Seleccionar Entornos"
                    styles={customStyles}
                  />
                </td>

                <td>
                  <Select
                    isMulti
                    name="tecnologia"
                    options={tecnologias.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    value={tecnologias
                      .map((option) => ({ value: option, label: option }))
                      .filter((option) =>
                        activity.tecnologia.includes(option.value)
                      )}
                    onChange={(selectedOptions) =>
                      handleActivityChange(
                        {
                          target: {
                            name: "tecnologia",
                            value: selectedOptions.map(
                              (option) => option.value
                            ),
                          },
                        },
                        index
                      )
                    }
                    placeholder="Seleccionar Tecnologia"
                    styles={customStyles_cups}
                  />
                </td>

                <td>
                  <Select
                    isMulti
                    name="poblacion_sujeto"
                    options={poblaciones.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    value={poblaciones
                      .map((option) => ({ value: option, label: option }))
                      .filter((option) =>
                        activity.poblacion_sujeto.includes(option.value)
                      )}
                    onChange={(selectedOptions) =>
                      handleActivityChange(
                        {
                          target: {
                            name: "poblacion_sujeto",
                            value: selectedOptions.map(
                              (option) => option.value
                            ),
                          },
                        },
                        index
                      )
                    }
                    placeholder="Seleccionar Poblacion"
                    styles={customStyles}
                  />
                </td>

                <td>
                  <select
                    name="tipo_soporte"
                    value={activity.array_soportes.tipo_soporte}
                    onChange={(e) => handleActivityChange(e, index)}
                  >
                    <option value="">Seleccionar Soporte</option>
                    {options.tipo_soporte.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="descripcion_soporte"
                    value={activity.array_soportes.descripcion_soporte}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="equipo_operativo"
                    value={activity.equipo_operativo}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="perfil_profesional"
                    value={activity.perfil_profesional}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="perfil_operativo"
                    value={activity.perfil_operativo}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <Select
                    name="codigo_cups"
                    options={cups.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    value={
                      activity.codigo_cups
                        ? {
                            value: activity.codigo_cups,
                            label: activity.codigo_cups,
                          }
                        : null
                    }
                    onChange={(selectedOption) =>
                      handleActivityChange(
                        {
                          target: {
                            name: "codigo_cups",
                            value: selectedOption ? selectedOption.value : null,
                          },
                        },
                        index
                      )
                    }
                    placeholder="Seleccionar Cups"
                    styles={customStyles_cups}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="valor_unitario"
                    value={activity.valor_unitario}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="valor_total"
                    value={activity.valor_total}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>{renderCronogramaField()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </li>
  );
};

export default ActivityItem;
