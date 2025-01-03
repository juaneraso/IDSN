// import React, { useState } from "react";
// import Product from "../Product/Product";
// import styles from "./Event.module.css";

// const Event = ({
//   events,
//   setEvents,
//   ejes,
//   lineas,
//   entornos,
//   tecnologias,
//   poblaciones,
//   soportes,
//   cups,
// }) => {
//   const [expandedIndices, setExpandedIndices] = useState([]);

//   const toggleAccordion = (index) => {
//     setExpandedIndices((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   const handleEventChange = (index, field, value) => {
//     const updatedEvents = [...events];
//     updatedEvents[index][field] = value;
//     setEvents(updatedEvents);
//   };

//   const handleAddStrategicAxis = (index) => {
//     const updatedEvents = [...events];

//     updatedEvents[index].eje_estrategico =
//       updatedEvents[index].eje_estrategico || [];

//     if (!updatedEvents[index].eje_estrategico.some((axis) => axis === "")) {
//       updatedEvents[index].eje_estrategico.push(""); // Añade un eje vacío
//       setEvents(updatedEvents);
//     }
//   };

//   const handleStrategicAxisChange = (eventIndex, axisIndex, value) => {
//     const updatedEvents = [...events];
//     const currentAxes = updatedEvents[eventIndex].eje_estrategico;

//     // Validar si ya se seleccionó el eje
//     if (currentAxes.includes(value)) {
//       alert("Este eje estratégico ya ha sido seleccionado.");
//       return; // No permite duplicados
//     }

//     updatedEvents[eventIndex].eje_estrategico[axisIndex] = value;
//     setEvents(updatedEvents);
//   };

//   const handleRemoveStrategicAxis = (eventIndex, axisIndex) => {
//     const updatedEvents = [...events];
//     updatedEvents[eventIndex].eje_estrategico = updatedEvents[
//       eventIndex
//     ].eje_estrategico.filter((_, i) => i !== axisIndex);
//     setEvents(updatedEvents);
//   };

//   const handleAddLineaOperativa = (index) => {
//     const updatedEvents = [...events];
//     updatedEvents[index].linea_operativa =
//       updatedEvents[index].linea_operativa || [];

//     // Solo añadir un nuevo eje si no hay un eje vacío pendiente de ser seleccionado
//     if (!updatedEvents[index].linea_operativa.some((axis) => axis === "")) {
//       updatedEvents[index].linea_operativa.push(""); // Añade un eje vacío
//       setEvents(updatedEvents);
//     }
//   };

//   const handleRemoveLineaOperativa = (eventIndex, axisIndex) => {
//     const updatedEvents = [...events];
//     updatedEvents[eventIndex].linea_operativa = updatedEvents[
//       eventIndex
//     ].linea_operativa.filter((_, i) => i !== axisIndex);
//     setEvents(updatedEvents);
//   };

//   const handleChangeLineaOperativa = (eventIndex, axisIndex, value) => {
//     const updatedEvents = [...events];
//     const currentAxes = updatedEvents[eventIndex].linea_operativa;

//     // Validar si ya se seleccionó el eje
//     if (currentAxes.includes(value)) {
//       alert("Esta linea  ya ha sido seleccionada.");
//       return; // No permite duplicados
//     }

//     updatedEvents[eventIndex].linea_operativa[axisIndex] = value;
//     setEvents(updatedEvents);
//   };

//   const handleAddEvent = () => {
//     setEvents([
//       ...events,
//       {
//         proyecto: "",
//         description_event: "",
//         indicator_name: "",
//         meta_indicator: "",
//         eje_estrategico: [],
//         linea_operativa: [],
//         activities: [],
//         productData: {
//           producto: [],
//         },
//       },
//     ]);
//   };

//   const handleRemoveEvent = (index) => {
//     const updatedEvents = events.filter((_, i) => i !== index);
//     setEvents(updatedEvents);
//   };

//   console.log("lineas", lineas);
//   return (
//     <div>
//       <h2>Eventos de Salud Pública Priorizados</h2>

//       {events.map((event, index) => (
//         <div className={`${styles.eventContainer} ${styles.field}`} key={index}>
//           {/* <div className={styles.header}> */}
//           <div className={styles.header} onClick={() => toggleAccordion(index)}>
//             <h3
//               style={{
//                 display: "inline-block",
//                 marginRight: "10px",
//                 cursor: "pointer",
//                 color: expandedIndices.includes(index) ? "#16a085" : "#333",
//               }}
//             >
//               Evento Priorizado SP -{index + 1}
//             </h3>

//             {index >= 1 && (
//               <button
//                 type="button"
//                 onClick={() => handleRemoveEvent(index)}
//                 className={styles.deleteButton}
//               >
//                 Eliminar
//               </button>
//             )}
//           </div>
//           {expandedIndices.includes(index) && (
//             <div className={styles.content}>
//               <label htmlFor={`proyecto${index}`}>
//                 Proyecto IDSN Responsable
//               </label>
//               <input
//                 id={`proyecto${index}`}
//                 type="text"
//                 value={event.proyecto}
//                 onChange={(e) =>
//                   handleEventChange(index, "proyecto", e.target.value)
//                 }
//               />
//               <label htmlFor={`description_event${index}`}>
//                 Descripción Evento
//               </label>
//               <input
//                 id={`description_event${index}`}
//                 type="text"
//                 value={event.description_event}
//                 onChange={(e) =>
//                   handleEventChange(index, "description_event", e.target.value)
//                 }
//               />
//               <label htmlFor={`indicator_name${index}`}>
//                 Nombre del Indicador Resultado
//               </label>
//               <input
//                 id={`indicator_name${index}`}
//                 type="text"
//                 value={event.indicator_name}
//                 onChange={(e) =>
//                   handleEventChange(index, "indicator_name", e.target.value)
//                 }
//               />{" "}
//               <label htmlFor={`meta_indicator${index}`}>
//                 Meta Indicador Resultado Anual
//               </label>
//               <input
//                 id={`meta_indicator${index}`}
//                 type="text"
//                 value={event.meta_indicator}
//                 onChange={(e) =>
//                   handleEventChange(index, "meta_indicator", e.target.value)
//                 }
//               />
//               <div>
//                 <label>Ejes Estratégicos</label>
//                 {(event.eje_estrategico || []).map((axis, axisIndex) => (
//                   <div key={axisIndex} className={styles.axisContainer}>
//                     <h4>Eje estratégico {axisIndex + 1}:</h4>
//                     <select
//                       value={axis}
//                       onChange={(e) =>
//                         handleStrategicAxisChange(
//                           index,
//                           axisIndex,
//                           e.target.value
//                         )
//                       }
//                       className={styles.axisInput}
//                     >
//                       <option value="">Seleccionar un eje</option>

//                       {ejes.map((option, optionIndex) => (
//                         <option
//                           key={optionIndex}
//                           value={option}
//                           disabled={
//                             event.eje_estrategico.includes(option) &&
//                             option !== axis
//                           }
//                         >
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleRemoveStrategicAxis(index, axisIndex)
//                       }
//                       className={styles.removeButton}
//                     >
//                       Eliminar
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => handleAddStrategicAxis(index)}
//                   className={styles.buttonMain}
//                 >
//                   Añadir Eje Estratégico
//                 </button>
//               </div>
//               <div>
//                 <label>Lineas Operativas</label>
//                 {(event.linea_operativa || []).map((axis, axisIndex) => (
//                   <div key={axisIndex} className={styles.axisContainer}>
//                     <h4>Linea Operativa {axisIndex + 1}:</h4>
//                     <select
//                       value={axis}
//                       onChange={(e) =>
//                         handleChangeLineaOperativa(
//                           index,
//                           axisIndex,
//                           e.target.value
//                         )
//                       }
//                       className={styles.axisInput}
//                     >
//                       <option value="">Seleccionar una linea operativa</option>
//                       {lineas.map((option, optionIndex) => (
//                         <option
//                           key={optionIndex}
//                           value={option}
//                           disabled={
//                             event.linea_operativa.includes(option) &&
//                             option !== axis
//                           }
//                         >
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleRemoveLineaOperativa(index, axisIndex)
//                       }
//                       className={styles.removeButton}
//                     >
//                       Eliminar
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => handleAddLineaOperativa(index)}
//                   className={styles.buttonMain}
//                 >
//                   Añadir Linea Operativa
//                 </button>
//               </div>
//               <h2
//                 style={{
//                   display: "inline-block",
//                   marginRight: "10px",
//                   cursor: "pointer",
//                   color: expandedIndices.includes(index) ? "#16a085" : "#333",
//                 }}
//               >
//                 Productos
//               </h2>
//               <Product
//                 productData={event.productData}
//                 entornos={entornos}
//                 tecnologias={tecnologias}
//                 poblaciones={poblaciones}
//                 soportes={soportes}
//                 cups={cups}
//                 setProductData={(updatedProductData) => {
//                   const updatedEvents = [...events];
//                   updatedEvents[index].productData = updatedProductData;
//                   setEvents(updatedEvents);
//                 }}
//                 activities={event.activities}
//                 setActivities={(activities) => {
//                   const updatedEvents = [...events];
//                   updatedEvents[index].activities = activities;
//                   setEvents(updatedEvents);
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       ))}
//       <button
//         className={styles.buttonMain}
//         type="button"
//         onClick={handleAddEvent}
//       >
//         Añadir Otro Evento
//       </button>
//     </div>
//   );
// };

// export default Event;

import React, { useState } from "react";
import Product from "../Product/Product";
import styles from "./Event.module.css";
import Select from "react-select"; // Importamos React Select

const Event = ({
  events,
  setEvents,
  ejes,
  lineas,
  entornos,
  tecnologias,
  poblaciones,
  soportes,
  cups,
}) => {
  const handleStrategicAxisChange = (eventIndex, selectedOptions) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].eje_estrategico = selectedOptions.map(
      (option) => option.value
    ); // Almacenar solo los valores seleccionados
    setEvents(updatedEvents);
  };

  const handleLineaChange = (eventIndex, selectedOptions) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].linea_operativa = selectedOptions.map(
      (option) => option.value
    ); // Almacenar solo los valores seleccionados
    setEvents(updatedEvents);
  };

  const handleAddStrategicAxis = (eventIndex) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].eje_estrategico =
      updatedEvents[eventIndex].eje_estrategico || [];

    if (
      !updatedEvents[eventIndex].eje_estrategico.some((axis) => axis === "")
    ) {
      updatedEvents[eventIndex].eje_estrategico.push(""); // Añade un eje vacío
      setEvents(updatedEvents);
    }
  };

  const handleChangeLineaOperativa = (eventIndex, axisIndex, value) => {
    const updatedEvents = [...events];
    const currentLines = updatedEvents[eventIndex].linea_operativa;

    if (currentLines.includes(value)) {
      alert("Esta línea operativa ya ha sido seleccionada.");
      return; // Evita duplicados
    }

    updatedEvents[eventIndex].linea_operativa[axisIndex] = value;
    setEvents(updatedEvents);
  };

  const handleAddLineaOperativa = (eventIndex) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].linea_operativa =
      updatedEvents[eventIndex].linea_operativa || [];

    if (
      !updatedEvents[eventIndex].linea_operativa.some((line) => line === "")
    ) {
      updatedEvents[eventIndex].linea_operativa.push(""); // Añade una línea vacía
      setEvents(updatedEvents);
    }
  };

  const handleRemoveLineaOperativa = (eventIndex, axisIndex) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].linea_operativa = updatedEvents[
      eventIndex
    ].linea_operativa.filter((_, i) => i !== axisIndex);
    setEvents(updatedEvents);
  };
  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  };

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        subregion: "",
        municipio_priorizado: "",
        codigo_nombre_territorio: "",
        codigo_micro_territorio: "",
        total_hogares: "",
        equipo_operativo: "",
        perfil_profesional: "",
        perfil_operativo: "",
        proyecto: "",
        description_event: "",
        indicator_name: "",
        meta_indicator: "",
        eje_estrategico: [],
        linea_operativa: [],
        activities: [],
        product_data: {
          producto: [],
        },
      },
    ]);
  };

  const handleRemoveEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div className={styles.eventContainer}>
      {events.map((event, index) => (
        <div key={index} className={styles.eventWrapper}>
          {index > 0 && (
            <h3 className={styles.eventTitle}>Evento {index + 1}</h3>
          )}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Subregión</th>
                <th>Municipio Priorizado</th>
                <th>Código - Nombre de Territorio APS</th>
                <th>Código Micro-Territorio</th>
                <th>Total número de Hogares Beneficiarios</th>
                <th>Equipo Operativo</th>
                <th>Perfil Profesional</th>
                <th>Perfil Operativo</th>
                <th>Proyecto IDSN Responsable</th>
                <th>Descripción Evento</th>
                <th>Nombre del Indicador</th>
                <th>Meta Indicador</th>
                <th>Ejes Estratégicos</th>
                <th>Lineas Operativas</th>
                <th>Producto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    value={event.subregion}
                    onChange={(e) =>
                      handleEventChange(index, "subregion", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.municipio_priorizado}
                    onChange={(e) =>
                      handleEventChange(
                        index,
                        "municipio_priorizado",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.codigo_nombre_territorio}
                    onChange={(e) =>
                      handleEventChange(
                        index,
                        "codigo_nombre_territorio",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.codigo_micro_territorio}
                    onChange={(e) =>
                      handleEventChange(
                        index,
                        "codigo_micro_territorio",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.total_hogares}
                    onChange={(e) =>
                      handleEventChange(index, "total_hogares", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.equipo_operativo}
                    onChange={(e) =>
                      handleEventChange(
                        index,
                        "equipo_operativo",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.perfil_profesional}
                    onChange={(e) =>
                      handleEventChange(
                        index,
                        "perfil_profesional",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.perfil_operativo}
                    onChange={(e) =>
                      handleEventChange(
                        index,
                        "perfil_operativo",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.proyecto}
                    onChange={(e) =>
                      handleEventChange(index, "proyecto", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.description_event}
                    onChange={(e) =>
                      handleEventChange(
                        index,
                        "description_event",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.indicator_name}
                    onChange={(e) =>
                      handleEventChange(index, "indicator_name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={event.meta_indicator}
                    onChange={(e) =>
                      handleEventChange(index, "meta_indicator", e.target.value)
                    }
                  />
                </td>

                <td>
                  <Select
                    isMulti
                    value={event.eje_estrategico.map((axis) => ({
                      value: axis,
                      label: axis,
                    }))}
                    options={ejes.map((eje) => ({
                      value: eje,
                      label: eje,
                    }))}
                    onChange={(selectedOptions) =>
                      handleStrategicAxisChange(index, selectedOptions)
                    }
                    placeholder="Seleccionar ejes..."
                    className={styles.select}
                  />
                </td>

                <td>
                  <Select
                    isMulti
                    value={event.linea_operativa.map((axis) => ({
                      value: axis,
                      label: axis,
                    }))}
                    options={lineas.map((linea) => ({
                      value: linea,
                      label: linea,
                    }))}
                    onChange={(selectedOptions) =>
                      handleLineaChange(index, selectedOptions)
                    }
                    placeholder="Seleccionar Lineas..."
                    className={styles.select}
                  />
                </td>

                <td>
                  <Product
                    product_data={event.product_data}
                    entornos={entornos}
                    tecnologias={tecnologias}
                    poblaciones={poblaciones}
                    soportes={soportes}
                    cups={cups}
                    setProductData={(updatedProductData) => {
                      const updatedEvents = [...events];
                      updatedEvents[index].product_data = updatedProductData;
                      setEvents(updatedEvents);
                    }}
                    activities={event.activities}
                    setActivities={(activities) => {
                      const updatedEvents = [...events];
                      updatedEvents[index].activities = activities;
                      setEvents(updatedEvents);
                    }}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleRemoveEvent(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <button
        className={styles.buttonAdd}
        type="button"
        onClick={handleAddEvent}
      >
        Añadir Otro Evento
      </button>
    </div>
  );
};

export default Event;
