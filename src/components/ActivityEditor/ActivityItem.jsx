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
          <table className={styles.activityTable}>
            <thead>
              <tr>
                <th>Descripcion Actividad</th>
                <th>Cantidad</th>
                <th>Unidad Medida</th>
                <th>Entornos</th>
                <th>Tecnologías</th>
                <th>Poblacion Sujeto</th>
                <th>Tipo Soporte</th>
                <th>Descripcion Soporte</th>
                <th>Equipo Operativo</th>
                <th>Perfil Profesional</th>
                <th>Perfil Operativo</th>
                <th>Codigo Cups</th>
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
                    name="Descripcion_Actividad"
                    value={activity.Descripcion_Actividad}
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
                    name="unidadMedida"
                    value={activity.unidadMedida}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                {/* <td>
                  <select
                    name="entorno"
                    value={activity.entorno}
                    onChange={(e) => handleActivityChange(e, index)}
                  >
                    <option value="">Seleccionar Entorno</option>
                    {options.entorno.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td> */}

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
                  />
                </td>

                <td>
                  {/* <select
                    name="tecnologia"
                    value={activity.tecnologia}
                    onChange={(e) => handleActivityChange(e, index)}
                  >
                    <option value="">Seleccionar Tecnología</option>
                    {options.tecnologia.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select> */}

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
                  />
                </td>

                <td>
                  <select
                    name="poblacionSujeto"
                    value={activity.poblacionSujeto}
                    onChange={(e) => handleActivityChange(e, index)}
                  >
                    <option value="">Seleccionar Poblacion</option>
                    {options.poblacionSujeto.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <select
                    name="tipoSoporte"
                    value={activity.Arraysoportes.Tipo_soporte}
                    onChange={(e) => handleActivityChange(e, index)}
                  >
                    <option value="">Seleccionar Soporte</option>
                    {options.tipoSoporte.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="Descripcion_Soporte"
                    value={activity.Arraysoportes.Descripcion_Soporte}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="Equipo_Operativo"
                    value={activity.Equipo_Operativo}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="perfilProfesional"
                    value={activity.perfilProfesional}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="perfilOperativo"
                    value={activity.perfilOperativo}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="CodigoCups"
                    value={activity.codigoCups}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="valorUnitario"
                    value={activity.valorUnitario}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="valorTotal"
                    value={activity.valorTotal}
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
