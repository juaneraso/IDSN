// import React, { useState } from "react";
// import ActivityList from "../Activities/ActivityList";
// import Product from "../Product/Product";
// import styles from "./Event.module.css";

// const Event = ({ events, setEvents, subregions }) => {
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

//   const municipios = subregions.flatMap((subregions) => subregions.municipios);

//   const handleAddEvent = () => {
//     setEvents([
//       ...events,
//       {
//         proyecto: "",
//         description_event: "",
//         indicator_name: "",
//         description_indicator: "",
//         meta_indicator: "",
//         linea_operativa: "",
//         linea_operativa: "",
//         nombre_entidad: "",
//         municipio: "",
//         descripcion_operador: "",
//         activities: [],
//         productData: {
//           producto: [],
//         },
//       },
//     ]);
//   };

//   const handleActivitiesChange = (index, activities) => {
//     const updatedEvents = [...events];
//     updatedEvents[index].activities = activities;
//     setEvents(updatedEvents);
//   };

//   const handleProductDataChange = (index, section, field, value) => {
//     const updatedEvents = [...events];
//     updatedEvents[index].productData = {
//       ...updatedEvents[index].productData,
//       [section]: {
//         ...updatedEvents[index].productData[section],
//         [field]: value,
//       },
//     };
//     setEvents(updatedEvents);
//   };

//   const handleRemoveEvent = (index) => {
//     const updatedEvents = events.filter((_, i) => i !== index);
//     setEvents(updatedEvents);
//   };

//   return (
//     <div>
//       <h1>Eventos</h1>

//       {events.map((event, index) => (
//         <div className={`${styles.eventContainer} ${styles.field}`} key={index}>
//           {/* <div className={styles.header}> */}
//           <div className={styles.header} onClick={() => toggleAccordion(index)}>
//             {/* <h3 style={{ display: "inline-block", marginRight: "10px" }}>
//               Evento {index + 1}
//             </h3> */}
//             <h3
//               style={{
//                 display: "inline-block",
//                 marginRight: "10px",
//                 cursor: "pointer",
//                 color: expandedIndices.includes(index) ? "#16a085" : "#333",
//               }}
//             >
//               Evento {index + 1}
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
//               <label htmlFor={`proyecto${index}`}>Proyecto</label>
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
//               />

//               {/* <label htmlFor={`description_indicator${index}`}>
//                 Descripción del Indicador
//               </label>
//               <input
//                 id={`description_indicator${index}`}
//                 type="text"
//                 value={event.description_indicator}
//                 onChange={(e) =>
//                   handleEventChange(
//                     index,
//                     "description_indicator",
//                     e.target.value
//                   )
//                 }
//               /> */}

//               <label htmlFor={`meta_indicator${index}`}>
//                 Meta del Indicador
//               </label>
//               <input
//                 id={`meta_indicator${index}`}
//                 type="text"
//                 value={event.meta_indicator}
//                 onChange={(e) =>
//                   handleEventChange(index, "meta_indicator", e.target.value)
//                 }
//               />

//               <label htmlFor={`eje_estrategico${index}`}>Eje Estratégico</label>
//               <input
//                 id={`eje_estrategico${index}`}
//                 type="text"
//                 value={event.eje_estrategico}
//                 onChange={(e) =>
//                   handleEventChange(index, "eje_estrategico", e.target.value)
//                 }
//               />

//               <label htmlFor={`linea_operativa${index}`}>Línea Operativa</label>
//               <input
//                 id={`linea_operativa${index}`}
//                 type="text"
//                 value={event.linea_operativa}
//                 onChange={(e) =>
//                   handleEventChange(index, "linea_operativa", e.target.value)
//                 }
//               />
//               <h3>Seccion Operador PIC</h3>
//               <label htmlFor={`nombre_entidad${index}`}>Nombre Entidad</label>
//               <input
//                 id={`nombre_entidad${index}`}
//                 type="text"
//                 value={event.nombre_entidad}
//                 onChange={(e) =>
//                   handleEventChange(index, "nombre_entidad", e.target.value)
//                 }
//               />

//               {/* <label htmlFor={`municipio${index}`}>Municipio</label>
//               <select
//                 id={`municipio${index}`}
//                 //name="municipio"
//                 value={event.municipio}
//                 onChange={(e) =>
//                   handleEventChange(index, "municipio", e.target.value)
//                 }
//                 required
//               >
//                 <option value="" disabled>
//                   Seleccione un municipio
//                 </option>
//                 {municipios.map((municipio) => (
//                   <option key={municipio.id} value={municipio.documentId}>
//                     {municipio.nombre}
//                   </option>
//                 ))}
//               </select>
//      */}

//               <label htmlFor={`descripcion_operador${index}`}>
//                 Descripcion Operador
//               </label>
//               <input
//                 id={`descripcion_operador${index}`}
//                 type="text"
//                 value={event.descripcion_operador}
//                 onChange={(e) =>
//                   handleEventChange(
//                     index,
//                     "descripcion_operador",
//                     e.target.value
//                   )
//                 }
//               />
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
//                 subregions={subregions}
//               />

//               {/*
//               <Product
//                 productData={event.productData}
//                 setProductData={(section, field, value) => {
//                   const updatedEvents = [...events];
//                   updatedEvents[index].productData = {
//                     ...updatedEvents[index].productData,
//                     [section]: {
//                       ...updatedEvents[index].productData[section],
//                       [field]: value,
//                     },
//                   };
//                   setEvents(updatedEvents);
//                 }}
//                 activities={event.activities}
//                 setActivities={(activities) => {
//                   const updatedEvents = [...events];
//                   updatedEvents[index].activities = activities;
//                   setEvents(updatedEvents);
//                 }}
//                 subregions={subregions}
//               /> */}
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

const Event = ({ events, setEvents }) => {
  const [expandedIndices, setExpandedIndices] = useState([]);

  const toggleAccordion = (index) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  };

  const handleAddStrategicAxis = (index) => {
    const updatedEvents = [...events];

    // Asegúrate de que `eje_estrategico` esté inicializado como un array
    updatedEvents[index].eje_estrategico =
      updatedEvents[index].eje_estrategico || [];

    // Solo añadir un nuevo eje si no hay un eje vacío pendiente de ser seleccionado
    if (!updatedEvents[index].eje_estrategico.some((axis) => axis === "")) {
      updatedEvents[index].eje_estrategico.push(""); // Añade un eje vacío
      setEvents(updatedEvents);
    }
  };

  const handleStrategicAxisChange = (eventIndex, axisIndex, value) => {
    const updatedEvents = [...events];
    const currentAxes = updatedEvents[eventIndex].eje_estrategico;

    // Validar si ya se seleccionó el eje
    if (currentAxes.includes(value)) {
      alert("Este eje estratégico ya ha sido seleccionado.");
      return; // No permite duplicados
    }

    updatedEvents[eventIndex].eje_estrategico[axisIndex] = value;
    setEvents(updatedEvents);
  };

  const handleRemoveStrategicAxis = (eventIndex, axisIndex) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].eje_estrategico = updatedEvents[
      eventIndex
    ].eje_estrategico.filter((_, i) => i !== axisIndex);
    setEvents(updatedEvents);
  };

  /// handles linea operativa

  // const handleAddLineaOperativa = (index) => {
  //   const updatedEvents = [...events];
  //   updatedEvents[index].linea_operativa = [
  //     ...(updatedEvents[index].linea_operativa || []),
  //     "",
  //   ];
  //   setEvents(updatedEvents);
  // };

  // const handleRemoveLineaOperativa = (eventIndex, axisIndex) => {
  //   const updatedEvents = [...events];
  //   updatedEvents[eventIndex].linea_operativa = updatedEvents[
  //     eventIndex
  //   ].linea_operativa.filter((_, i) => i !== axisIndex);
  //   setEvents(updatedEvents);
  // };

  // const handleChangeLineaOperativa = (eventIndex, axisIndex, value) => {
  //   const updatedEvents = [...events];
  //   updatedEvents[eventIndex].linea_operativa[axisIndex] = value;
  //   setEvents(updatedEvents);
  // };

  const handleAddLineaOperativa = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].linea_operativa =
      updatedEvents[index].linea_operativa || [];

    // Solo añadir un nuevo eje si no hay un eje vacío pendiente de ser seleccionado
    if (!updatedEvents[index].linea_operativa.some((axis) => axis === "")) {
      updatedEvents[index].linea_operativa.push(""); // Añade un eje vacío
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

  const handleChangeLineaOperativa = (eventIndex, axisIndex, value) => {
    const updatedEvents = [...events];
    const currentAxes = updatedEvents[eventIndex].linea_operativa;

    // Validar si ya se seleccionó el eje
    if (currentAxes.includes(value)) {
      alert("Esta linea  ya ha sido seleccionada.");
      return; // No permite duplicados
    }

    updatedEvents[eventIndex].linea_operativa[axisIndex] = value;
    setEvents(updatedEvents);
  };

  //const municipios = subregions.flatMap((subregions) => subregions.municipios);

  const strategicAxesOptions = [
    "Innovación",
    "Sostenibilidad",
    "Educación",
    "Salud",
    "Desarrollo Social",
  ];

  const lineasOperativas = [
    "Gestion operativa",
    "Gestion de riesgo",
    "Auditoria Interna",
    "Supervision",
    "Gestion desarrollo Social",
  ];

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        proyecto: "",
        description_event: "",
        indicator_name: "",
        //description_indicator: "",
        meta_indicator: "",
        eje_estrategico: [],
        linea_operativa: [],
        nombre_entidad: "",
        //municipio: "",
        //descripcion_operador: "",
        activities: [],
        productData: {
          producto: [],
        },
      },
    ]);
  };

  // const handleActivitiesChange = (index, activities) => {
  //   const updatedEvents = [...events];
  //   updatedEvents[index].activities = activities;
  //   setEvents(updatedEvents);
  // };

  // const handleProductDataChange = (index, section, field, value) => {
  //   const updatedEvents = [...events];
  //   updatedEvents[index].productData = {
  //     ...updatedEvents[index].productData,
  //     [section]: {
  //       ...updatedEvents[index].productData[section],
  //       [field]: value,
  //     },
  //   };
  //   setEvents(updatedEvents);
  // };

  const handleRemoveEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>Eventos</h1>

      {events.map((event, index) => (
        <div className={`${styles.eventContainer} ${styles.field}`} key={index}>
          {/* <div className={styles.header}> */}
          <div className={styles.header} onClick={() => toggleAccordion(index)}>
            <h3
              style={{
                display: "inline-block",
                marginRight: "10px",
                cursor: "pointer",
                color: expandedIndices.includes(index) ? "#16a085" : "#333",
              }}
            >
              Evento {index + 1}
            </h3>

            {index >= 1 && (
              <button
                type="button"
                onClick={() => handleRemoveEvent(index)}
                className={styles.deleteButton}
              >
                Eliminar
              </button>
            )}
          </div>
          {expandedIndices.includes(index) && (
            <div className={styles.content}>
              <label htmlFor={`proyecto${index}`}>Proyecto</label>
              <input
                id={`proyecto${index}`}
                type="text"
                value={event.proyecto}
                onChange={(e) =>
                  handleEventChange(index, "proyecto", e.target.value)
                }
              />

              <label htmlFor={`description_event${index}`}>
                Descripción Evento
              </label>
              <input
                id={`description_event${index}`}
                type="text"
                value={event.description_event}
                onChange={(e) =>
                  handleEventChange(index, "description_event", e.target.value)
                }
              />
              <h4>Indicador Evento</h4>

              <label htmlFor={`indicator_name${index}`}>
                Nombre del Indicador Resultado
              </label>
              <input
                id={`indicator_name${index}`}
                type="text"
                value={event.indicator_name}
                onChange={(e) =>
                  handleEventChange(index, "indicator_name", e.target.value)
                }
              />

              <label htmlFor={`meta_indicator${index}`}>
                Meta del Indicador
              </label>
              <input
                id={`meta_indicator${index}`}
                type="text"
                value={event.meta_indicator}
                onChange={(e) =>
                  handleEventChange(index, "meta_indicator", e.target.value)
                }
              />

              <div>
                <label>Ejes Estratégicos</label>
                {(event.eje_estrategico || []).map((axis, axisIndex) => (
                  <div key={axisIndex} className={styles.axisContainer}>
                    <h4>Eje estratégico {axisIndex + 1}:</h4>
                    <select
                      value={axis}
                      onChange={(e) =>
                        handleStrategicAxisChange(
                          index,
                          axisIndex,
                          e.target.value
                        )
                      }
                      className={styles.axisInput}
                    >
                      <option value="">Seleccionar un eje</option>
                      {strategicAxesOptions.map((option, optionIndex) => (
                        <option
                          key={optionIndex}
                          value={option}
                          disabled={
                            event.eje_estrategico.includes(option) &&
                            option !== axis
                          }
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveStrategicAxis(index, axisIndex)
                      }
                      className={styles.removeButton}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddStrategicAxis(index)}
                  className={styles.buttonMain}
                >
                  Añadir Eje Estratégico
                </button>
              </div>

              {/* <div>
                <label>Lineas Operativas</label>
                {(event.linea_operativa || []).map((axis, axisIndex) => (
                  <div key={axisIndex} className={styles.axisContainer}>
                    <h4>Linea Operativa:{axisIndex + 1}</h4>
                    <input
                      type="text"
                      value={axis}
                      onChange={(e) =>
                        handleChangeLineaOperativa(
                          index,
                          axisIndex,
                          e.target.value
                        )
                      }
                      className={styles.axisInput}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveLineaOperativa(index, axisIndex)
                      }
                      className={styles.removeButton}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddLineaOperativa(index)}
                  className={styles.buttonMain}
                >
                  Añadir Linea Operativa
                </button>
              </div> */}

              <div>
                <label>Lineas Operativas</label>
                {(event.linea_operativa || []).map((axis, axisIndex) => (
                  <div key={axisIndex} className={styles.axisContainer}>
                    <h4>Linea Operativa {axisIndex + 1}:</h4>
                    <select
                      value={axis}
                      onChange={(e) =>
                        handleChangeLineaOperativa(
                          index,
                          axisIndex,
                          e.target.value
                        )
                      }
                      className={styles.axisInput}
                    >
                      <option value="">Seleccionar una linea operativa</option>
                      {lineasOperativas.map((option, optionIndex) => (
                        <option
                          key={optionIndex}
                          value={option}
                          disabled={
                            event.linea_operativa.includes(option) &&
                            option !== axis
                          }
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveLineaOperativa(index, axisIndex)
                      }
                      className={styles.removeButton}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddLineaOperativa(index)}
                  className={styles.buttonMain}
                >
                  Añadir Linea Operativa
                </button>
              </div>

              <h2
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                  cursor: "pointer",
                  color: expandedIndices.includes(index) ? "#16a085" : "#333",
                }}
              >
                Productos
              </h2>
              <Product
                productData={event.productData}
                setProductData={(updatedProductData) => {
                  const updatedEvents = [...events];
                  updatedEvents[index].productData = updatedProductData;
                  setEvents(updatedEvents);
                }}
                activities={event.activities}
                setActivities={(activities) => {
                  const updatedEvents = [...events];
                  updatedEvents[index].activities = activities;
                  setEvents(updatedEvents);
                }}
                // subregions={subregions}
              />
            </div>
          )}
        </div>
      ))}
      <button
        className={styles.buttonMain}
        type="button"
        onClick={handleAddEvent}
      >
        Añadir Otro Evento
      </button>
    </div>
  );
};

export default Event;
