// import React, { useEffect, useState } from "react";
// import styles from "./Event.module.css";

// const Event = ({ setEventData, subregions }) => {
//   const [eventData, setEventState] = useState({
//     Descripcion_Evento: "",
//     Eje_estrategico: "",
//     Linea_operativa: "",
//   });

//   const [indicatorData, setIndicatorState] = useState({
//     nombre_indicador: "",
//     descripcion_indicador: "",
//     meta_resultado: "",
//   });

//   const [operatorData, setOperatorState] = useState({
//     nombre_entidad: "",
//     municipio: "",
//     descripcion: "",
//   });

//   // Aplana los municipios de las subregiones
//   const municipios = subregions.flatMap((subregions) => subregions.municipios);

//   useEffect(() => {
//     const consolidatedData = {
//       ...eventData,
//       ...indicatorData,
//       ...operatorData,
//     };
//     setEventData(consolidatedData);
//   }, [eventData, indicatorData, operatorData, setEventData]);

//   const handleOperatorChange = (event) => {
//     const { name, value } = event.target;
//     setOperatorState((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleEventChange = (event) => {
//     const { name, value } = event.target;
//     setEventState((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleIndicatorChange = (event) => {
//     const { name, value } = event.target;
//     setIndicatorState((prevState) => ({ ...prevState, [name]: value }));
//   };

//   return (
//     <div className={styles.eventContainer}>
//       <div className={styles.section}>
//         <h4>Sección Evento</h4>
//         <div className={styles.field}>
//           <label htmlFor="Descripcion_Evento">Descripción del Evento</label>
//           <input
//             type="text"
//             id="Descripcion_Evento"
//             name="Descripcion_Evento"
//             value={eventData.Descripcion_Evento}
//             onChange={handleEventChange}
//             required
//           />
//         </div>
//         {/* Sección Indicador */}
//         <h3>Sección Indicador</h3>
//         <div className={styles.field}>
//           <label htmlFor="nombre_indicador">Nombre Indicador</label>
//           <input
//             type="text"
//             id="nombre_indicador"
//             name="nombre_indicador"
//             value={indicatorData.nombre_indicador}
//             onChange={handleIndicatorChange}
//             required
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="descripcion_indicador">Descripción Indicador</label>
//           <input
//             type="text"
//             id="descripcion_indicador"
//             name="descripcion_indicador"
//             value={indicatorData.descripcion_indicador}
//             onChange={handleIndicatorChange}
//             required
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="meta_resultado">Meta Indicador</label>
//           <input
//             type="text"
//             id="meta_resultado"
//             name="meta_resultado"
//             value={indicatorData.meta_resultado}
//             onChange={handleIndicatorChange}
//             required
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="Eje_estrategico">Eje Estratégico</label>
//           <input
//             type="text"
//             id="Eje_estrategico"
//             name="Eje_estrategico"
//             value={eventData.Eje_estrategico}
//             onChange={handleEventChange}
//             required
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="Linea_operativa">Línea Operativa</label>
//           <input
//             type="text"
//             id="Linea_operativa"
//             name="Linea_operativa"
//             value={eventData.Linea_operativa}
//             onChange={handleEventChange}
//             required
//           />
//         </div>
//       </div>
//       <div className={styles.section}>
//         <h4>Sección Operador PIC</h4>
//         <div className={styles.field}>
//           <label htmlFor="nombre_entidad">Nombre de la Entidad</label>
//           <input
//             type="text"
//             id="nombre_entidad"
//             name="nombre_entidad"
//             value={operatorData.nombre_entidad}
//             onChange={handleOperatorChange}
//             required
//           />
//         </div>

//         <div className={styles.field}>
//           <label htmlFor="municipio">Municipio</label>
//           <select
//             id="municipio"
//             name="municipio"
//             value={operatorData.municipio}
//             onChange={handleOperatorChange}
//             required
//           >
//             <option value="" disabled>
//               Seleccione un municipio
//             </option>
//             {municipios.map((municipio) => (
//               <option key={municipio.id} value={municipio.documentId}>
//                 {municipio.nombre}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className={styles.field}>
//           <label htmlFor="descripcion">Descripción</label>
//           <textarea
//             id="descripcion"
//             name="descripcion"
//             value={operatorData.descripcion}
//             onChange={handleOperatorChange}
//             required
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Event;

// import React from "react";
// import styles from "./Event.module.css"; // Ajusta la ruta según tu estructura

// const Event = ({ index, events, setEvents, subregions }) => {
//   // Obtener los datos específicos del evento por índice
//   const eventData = events[index];

//   // Actualizar el estado de un evento específico
//   const updateEvent = (field, value) => {
//     const updatedEvents = [...events];
//     updatedEvents[index] = { ...updatedEvents[index], [field]: value };
//     setEvents(updatedEvents);
//   };

//   // Manejar cambios en los inputs de texto
//   const handleEventChange = (event) => {
//     const { name, value } = event.target;
//     updateEvent(name, value);
//   };

//   return (
//     <div className={styles.eventContainer}>
//       <h4>Evento {index + 1}</h4>

//       {/* Descripción del evento */}
//       <div className={styles.field}>
//         <label htmlFor={`Descripcion_Evento_${index}`}>
//           Descripción del Evento
//         </label>
//         <input
//           type="text"
//           id={`Descripcion_Evento_${index}`}
//           name="Descripcion_Evento"
//           value={eventData.Descripcion_Evento || ""}
//           onChange={handleEventChange}
//           required
//         />
//       </div>

//       {/* Eje estratégico */}
//       <div className={styles.field}>
//         <label htmlFor={`Eje_estrategico_${index}`}>Eje Estratégico</label>
//         <input
//           type="text"
//           id={`Eje_estrategico_${index}`}
//           name="Eje_estrategico"
//           value={eventData.Eje_estrategico || ""}
//           onChange={handleEventChange}
//         />
//       </div>

//       {/* Línea operativa */}
//       <div className={styles.field}>
//         <label htmlFor={`Linea_operativa_${index}`}>Línea Operativa</label>
//         <input
//           type="text"
//           id={`Linea_operativa_${index}`}
//           name="Linea_operativa"
//           value={eventData.Linea_operativa || ""}
//           onChange={handleEventChange}
//         />
//       </div>

//       {/* Subregión (ejemplo de select dinámico) */}
//       <div className={styles.field}>
//         <label htmlFor={`Subregion_${index}`}>Subregión</label>
//         <select
//           id={`Subregion_${index}`}
//           name="subregion"
//           value={eventData.subregion || ""}
//           onChange={(e) => updateEvent("subregion", e.target.value)}
//         >
//           <option value="">Seleccionar</option>
//           {subregions.map((region) => (
//             <option key={region.id} value={region.nombre}>
//               {region.nombre}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Indicadores */}
//       <div className={styles.field}>
//         <label htmlFor={`Indicadores_${index}`}>
//           Indicadores (Separados por comas)
//         </label>
//         <input
//           type="text"
//           id={`Indicadores_${index}`}
//           name="indicadores"
//           value={(eventData.indicadores || []).join(", ")}
//           onChange={(e) =>
//             updateEvent(
//               "indicadores",
//               e.target.value.split(",").map((item) => item.trim())
//             )
//           }
//         />
//       </div>

//       {/* Operador PIC */}
//       <div className={styles.field}>
//         <label htmlFor={`Operador_PIC_${index}`}>Operador PIC</label>
//         <input
//           type="text"
//           id={`Operador_PIC_${index}`}
//           name="operador_pic"
//           value={eventData.operador_pic?.nombre || ""}
//           onChange={(e) =>
//             updateEvent("operador_pic", { nombre: e.target.value })
//           }
//         />
//       </div>

//       {/* Producto */}
//       <div className={styles.field}>
//         <label htmlFor={`Contenido_Producto_${index}`}>
//           Contenido del Producto
//         </label>
//         <textarea
//           id={`Contenido_Producto_${index}`}
//           name="contenido_producto"
//           value={eventData.contenido_producto?.descripcion || ""}
//           onChange={(e) =>
//             updateEvent("contenido_producto", { descripcion: e.target.value })
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default Event;

/// Funcionando antes

// import React, { useState } from "react";
// import ActivityList from "../Activities/ActivityList";
// import Product from "../Product/Product";

// const Event = ({ subregions }) => {
//   const [events, setEvents] = useState([
//     {
//       description_event: "",
//       indicator_name: "",
//       description_indicator: "",
//       meta_indicator: "",
//       eje_estrategico: "",
//       linea_operativa: "",
//       activities: [],
//       productData: {
//         producto: {
//           descripcion_producto: "",
//           indicador_de_producto: "",
//           indicador_Linea_Base: "",
//         },

//         soporte: {
//           archivos: null,
//           tipo_soporte: "",
//           descripcion: "",
//           valor_porcentual: "",
//         },
//         cups: {
//           codigo: "",
//           subcodigo: "",
//           descripcion: "",
//           valor: "",
//         },
//       },
//     },
//   ]);

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
//         activities: [],
//         productData: {
//           producto: {
//             descripcion_producto: "",
//             indicador_de_producto: "",
//             indicador_Linea_Base: "",
//           },
//           soporte: {
//             archivos: null,
//             tipo_soporte: "",
//             descripcion: "",
//             valor_porcentual: "",
//           },
//           cups: {
//             codigo: "",
//             subcodigo: "",
//             descripcion: "",
//             valor: "",
//           },
//         },
//       },
//     ]);
//   };

//   const handleEventChange = (index, field, value) => {
//     const updatedEvents = [...events];
//     updatedEvents[index][field] = value;
//     setEvents(updatedEvents);
//   };

//   const handleIndicatorsChange = (index, field, value) => {
//     const updatedEvents = [...events];
//     updatedEvents[index][field] = value;
//     setEvents(updatedEvents);
//   };

//   const handleActivitiesChange = (index, activities) => {
//     const updatedEvents = [...events];
//     updatedEvents[index].activities = activities;
//     setEvents(updatedEvents);
//   };

//   // const handleProductDataChange = (index, productData) => {
//   //   const updatedEvents = [...events];
//   //   updatedEvents[index].productData = productData;

//   //   setEvents(updatedEvents);
//   // };

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

//   //console.log("Event", events);

//   return (
//     <div>
//       <h1>Eventos</h1>
//       <button type="button" onClick={handleAddEvent}>
//         Añadir Otro Evento
//       </button>

//       {events.map((event, index) => (
//         <div key={index}>
//           <h3>Evento {index + 1}</h3>

//           <label htmlFor={`description_event${index}`}>
//             Descripcion Evento
//           </label>
//           <input
//             id={`description_event${index}`} // ID único para cada input
//             type="text"
//             placeholder="Descripcion del Evento"
//             value={event.description_event}
//             onChange={(e) =>
//               handleEventChange(index, "description_event", e.target.value)
//             }
//           />

//           <h3>Seccion Indicador</h3>
//           <label htmlFor={`indicator_name${index}`}>Nombre Indicador</label>
//           <input
//             id={`indicator_name${index}`} // ID único para cada input
//             type="text"
//             placeholder="Nombre indicador"
//             value={event.indicator_name}
//             onChange={(e) =>
//               handleIndicatorsChange(index, "indicator_name", e.target.value)
//             }
//           />

//           <label htmlFor={`description_indicator${index}`}>
//             Descripcion Indicador
//           </label>
//           <input
//             id={`description_indicator${index}`} // ID único para cada input
//             type="text"
//             // placeholder="description_indicator"
//             value={event.description_indicator}
//             onChange={(e) =>
//               handleIndicatorsChange(
//                 index,
//                 "description_indicator",
//                 e.target.value
//               )
//             }
//           />
//           <label htmlFor={`meta_indicator${index}`}>Meta Indicador</label>
//           <input
//             id={`meta_indicator${index}`} // ID único para cada input
//             type="text"
//             //placeholder="Nombre indicador"
//             value={event.meta_indicator}
//             onChange={(e) =>
//               handleIndicatorsChange(index, "meta_indicator", e.target.value)
//             }
//           />

//           <label htmlFor={`eje_estrategico${index}`}>Eje Estrategico</label>
//           <input
//             id={`eje_estrategico${index}`} // ID único para cada input
//             type="text"
//             //placeholder="Nombre indicador"
//             value={event.eje_estrategico}
//             onChange={(e) =>
//               handleIndicatorsChange(index, "eje_estrategico", e.target.value)
//             }
//           />

//           <label htmlFor={`linea_operativa${index}`}>Linea Operativa</label>
//           <input
//             id={`linea_operativa${index}`} // ID único para cada input
//             type="text"
//             //placeholder="Nombre indicador"
//             value={event.linea_operativa}
//             onChange={(e) =>
//               handleIndicatorsChange(index, "linea_operativa", e.target.value)
//             }
//           />

//           <ActivityList
//             activities={event.activities}
//             setActivities={(activities) =>
//               handleActivitiesChange(index, activities)
//             }
//             subregions={subregions}
//           />

//           {/* <Product
//             productData={event.productData}
//             setProductData={(productData) =>
//               handleProductDataChange(index, productData)
//             }
//           /> */}
//           <Product
//             productData={event.productData}
//             setProductData={(section, field, value) =>
//               handleProductDataChange(index, section, field, value)
//             }
//           />

//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Event;

import React from "react";
import ActivityList from "../Activities/ActivityList";
import Product from "../Product/Product";
import styles from "./Event.module.css";

const Event = ({ events, setEvents, subregions }) => {
  // Manejar cambios en un evento específico
  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  };

  const municipios = subregions.flatMap((subregions) => subregions.municipios);

  // Agregar un nuevo evento
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
          producto: {
            descripcion_producto: "",
            indicador_de_producto: "",
            indicador_Linea_Base: "",
          },
          soporte: {
            archivos: null,
            tipo_soporte: "",
            descripcion: "",
            valor_porcentual: "",
          },
          cups: {
            codigo: "",
            subcodigo: "",
            descripcion: "",
            valor: "",
          },
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

  // Eliminar un evento
  const handleRemoveEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>Eventos</h1>
      <button
        className={styles.buttonMain}
        type="button"
        onClick={handleAddEvent}
      >
        Añadir Otro Evento
      </button>
      {events.map((event, index) => (
        <div
          className={styles.field}
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Evento {index + 1}</h3>
          <button type="button" onClick={() => handleRemoveEvent(index)}>
            Eliminar Evento
          </button>

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

          <label htmlFor={`indicator_name${index}`}>Nombre del Indicador</label>
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
              handleEventChange(index, "description_indicator", e.target.value)
            }
          />

          <label htmlFor={`meta_indicator${index}`}>Meta del Indicador</label>
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
              handleEventChange(index, "descripcion_operador", e.target.value)
            }
          />

          <ActivityList
            activities={event.activities}
            setActivities={(activities) =>
              handleActivitiesChange(index, activities)
            }
            subregions={subregions}
          />

          {/* <Product
            productData={event.productData}
            setProductData={(productData) =>
              handleProductDataChange(index, productData)
            }
          /> */}
          <Product
            productData={event.productData}
            setProductData={(section, field, value) =>
              handleProductDataChange(index, section, field, value)
            }
          />

          <hr />
        </div>
      ))}
    </div>
  );
};

export default Event;
