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
//         description_event: "",
//         indicator_name: "",
//         description_indicator: "",
//         meta_indicator: "",
//         eje_estrategico: "",
//         linea_operativa: "",
//         nombre_entidad: "",
//         municipio: "",
//         descripcion_operador: "",
//         activities: [],
//         productData: {
//           producto: {
//             descripcion_producto: "",
//             indicador_de_producto: "",
//             indicador_Linea_Base: "",
//           },
//         },
//       },
//     ]);
//   };

//   // const handleAddEvent = () => {
//   //   setEvents([
//   //     ...events,
//   //     {
//   //       description_event: "",
//   //       indicator_name: "",
//   //       description_indicator: "",
//   //       meta_indicator: "",
//   //       eje_estrategico: "",
//   //       linea_operativa: "",
//   //       nombre_entidad: "",
//   //       municipio: "",
//   //       descripcion_operador: "",
//   //       activities: [],
//   //       productData: {
//   //         producto: [
//   //           {
//   //             descripcion_producto: "",
//   //             indicador_de_producto: "",
//   //             indicador_Linea_Base: "",
//   //           },
//   //         ],
//   //         soporte: {
//   //           archivos: null,
//   //           tipo_soporte: "",
//   //           descripcion: "",
//   //           valor_porcentual: "",
//   //         },
//   //         cups: {
//   //           codigo: "",
//   //           subcodigo: "",
//   //           descripcion: "",
//   //           valor: "",
//   //         },
//   //       },
//   //     },
//   //   ]);
//   // };

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
//                 Nombre del Indicador
//               </label>
//               <input
//                 id={`indicator_name${index}`}
//                 type="text"
//                 value={event.indicator_name}
//                 onChange={(e) =>
//                   handleEventChange(index, "indicator_name", e.target.value)
//                 }
//               />

//               <label htmlFor={`description_indicator${index}`}>
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
//               />

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

//               {/* <div className={styles.field}> */}
//               <label htmlFor={`municipio${index}`}>Municipio</label>
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
//               {/* </div> */}

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
import ActivityList from "../Activities/ActivityList";
import Product from "../Product/Product";
import styles from "./Event.module.css";

const Event = ({ events, setEvents, subregions }) => {
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

  const municipios = subregions.flatMap((subregions) => subregions.municipios);

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        description_event: "",
        indicator_name: "",
        description_indicator: "",
        meta_indicator: "",
        eje_estrategico: "",
        linea_operativa: "",
        nombre_entidad: "",
        municipio: "",
        descripcion_operador: "",
        activities: [],
        productData: {
          producto: [],
        },
      },
    ]);
  };

  const handleActivitiesChange = (index, activities) => {
    const updatedEvents = [...events];
    updatedEvents[index].activities = activities;
    setEvents(updatedEvents);
  };

  const handleProductDataChange = (index, section, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index].productData = {
      ...updatedEvents[index].productData,
      [section]: {
        ...updatedEvents[index].productData[section],
        [field]: value,
      },
    };
    setEvents(updatedEvents);
  };

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
            {/* <h3 style={{ display: "inline-block", marginRight: "10px" }}>
              Evento {index + 1}
            </h3> */}
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

              <label htmlFor={`indicator_name${index}`}>
                Nombre del Indicador
              </label>
              <input
                id={`indicator_name${index}`}
                type="text"
                value={event.indicator_name}
                onChange={(e) =>
                  handleEventChange(index, "indicator_name", e.target.value)
                }
              />

              <label htmlFor={`description_indicator${index}`}>
                Descripción del Indicador
              </label>
              <input
                id={`description_indicator${index}`}
                type="text"
                value={event.description_indicator}
                onChange={(e) =>
                  handleEventChange(
                    index,
                    "description_indicator",
                    e.target.value
                  )
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

              <label htmlFor={`eje_estrategico${index}`}>Eje Estratégico</label>
              <input
                id={`eje_estrategico${index}`}
                type="text"
                value={event.eje_estrategico}
                onChange={(e) =>
                  handleEventChange(index, "eje_estrategico", e.target.value)
                }
              />

              <label htmlFor={`linea_operativa${index}`}>Línea Operativa</label>
              <input
                id={`linea_operativa${index}`}
                type="text"
                value={event.linea_operativa}
                onChange={(e) =>
                  handleEventChange(index, "linea_operativa", e.target.value)
                }
              />
              <h3>Seccion Operador PIC</h3>
              <label htmlFor={`nombre_entidad${index}`}>Nombre Entidad</label>
              <input
                id={`nombre_entidad${index}`}
                type="text"
                value={event.nombre_entidad}
                onChange={(e) =>
                  handleEventChange(index, "nombre_entidad", e.target.value)
                }
              />

              {/* <div className={styles.field}> */}
              <label htmlFor={`municipio${index}`}>Municipio</label>
              <select
                id={`municipio${index}`}
                //name="municipio"
                value={event.municipio}
                onChange={(e) =>
                  handleEventChange(index, "municipio", e.target.value)
                }
                required
              >
                <option value="" disabled>
                  Seleccione un municipio
                </option>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.documentId}>
                    {municipio.nombre}
                  </option>
                ))}
              </select>
              {/* </div> */}

              <label htmlFor={`descripcion_operador${index}`}>
                Descripcion Operador
              </label>
              <input
                id={`descripcion_operador${index}`}
                type="text"
                value={event.descripcion_operador}
                onChange={(e) =>
                  handleEventChange(
                    index,
                    "descripcion_operador",
                    e.target.value
                  )
                }
              />
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
                subregions={subregions}
              />

              {/* 
              <Product
                productData={event.productData}
                setProductData={(section, field, value) => {
                  const updatedEvents = [...events];
                  updatedEvents[index].productData = {
                    ...updatedEvents[index].productData,
                    [section]: {
                      ...updatedEvents[index].productData[section],
                      [field]: value,
                    },
                  };
                  setEvents(updatedEvents);
                }}
                activities={event.activities}
                setActivities={(activities) => {
                  const updatedEvents = [...events];
                  updatedEvents[index].activities = activities;
                  setEvents(updatedEvents);
                }}
                subregions={subregions}
              /> */}
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
