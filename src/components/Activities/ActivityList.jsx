// import React, { useState } from "react";
// import ActivityItem from "../ActivityEditor/ActivityItem";
// import styles from "./ActivityList.module.css";

// const ActivityList = ({
//   activities,
//   setActivities,
//   subregions,
//   entornos,
//   tecnologias,
//   poblaciones,
//   soportes,
//   cups,
// }) => {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   console.log("activities", activities);

//   const handleActivityChange = (e, activityIndex, soporteIndex) => {
//     const { name, value } = e.target;
//     const updatedActivities = [...activities];

//     if (soporteIndex !== undefined) {
//       // Si estamos actualizando un soporte específico
//       updatedActivities[activityIndex].array_soportes[soporteIndex][name] =
//         value;
//     } else {
//       // Si estamos actualizando una propiedad directa de la actividad
//       updatedActivities[activityIndex][name] = value;
//     }

//     setActivities(updatedActivities);
//   };

//   const handleRemoveActivity = (index) => {
//     console.log("index", index);
//     const updatedActivities = activities.filter((_, i) => i !== index);
//     setActivities(updatedActivities);
//   };

//   const toggleExpanded = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   const handleAddActivity = () => {
//     const newActivity = {
//       descripcion_actividad: "",
//       cantidad: "",
//       unidad_medida: "",
//       entorno: [],
//       tecnologia: [],
//       poblacion_sujeto: [],
//       codigo_cups: "",
//       valor_unitario: "",
//       valor_total: "",
//       array_soportes: [
//         {
//           tipo_soporte: "",
//           descripcion_soporte: "",
//         },
//       ],
//       cronograma: [
//         { mes: "Ene", peso: "0" },
//         { mes: "Feb", peso: "0" },
//         { mes: "Mar", peso: "0" },
//         { mes: "Abr", peso: "0" },
//         { mes: "May", peso: "0" },
//         { mes: "Jun", peso: "0" },
//         { mes: "Jul", peso: "0" },
//         { mes: "Ago", peso: "0" },
//         { mes: "Sept", peso: "0" },
//         { mes: "Oct", peso: "0" },
//         { mes: "Nov", peso: "0" },
//         { mes: "Dic", peso: "0" },
//       ],
//     };
//     setActivities([...activities, newActivity]);
//     setExpandedIndex(activities.length); // Expande la nueva actividad automáticamente
//   };

//   return (
//     <div>
//       <button
//         type="button"
//         onClick={handleAddActivity}
//         className={styles.buttonMain}
//       >
//         Añadir Actividad
//       </button>

//       <ul className={styles.activityList}>
//         {/* {(activities || []).map((activity, index) => ( */}
//         {activities.map((activity, index) => (
//           <ActivityItem
//             key={index}
//             activity={activity}
//             index={index}
//             expanded={expandedIndex === index}
//             toggleExpanded={toggleExpanded}
//             handleActivityChange={handleActivityChange}
//             handleRemoveActivity={handleRemoveActivity}
//             subregions={subregions}
//             entornos={entornos}
//             tecnologias={tecnologias}
//             poblaciones={poblaciones}
//             soportes={soportes}
//             cups={cups}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ActivityList;

import React, { useState, useEffect } from "react";
import ActivityItem from "../ActivityEditor/ActivityItem";
import styles from "./ActivityList.module.css";

const ActivityList = ({
  activities,
  setActivities,
  subregions,
  entornos,
  tecnologias,
  poblaciones,
  soportes,
  cups,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const initialActivity = {
    descripcion_actividad: "",
    cantidad: "",
    unidad_medida: "",
    entorno: [],
    tecnologia: [],
    poblacion_sujeto: [],
    codigo_cups: "",
    valor_unitario: "",
    valor_total: "",
    array_soportes: [
      {
        tipo_soporte: "",
        descripcion_soporte: "",
        cantidad_soporte: "",
      },
    ],
    cronograma: [
      { mes: "Ene", peso: "0" },
      { mes: "Feb", peso: "0" },
      { mes: "Mar", peso: "0" },
      { mes: "Abr", peso: "0" },
      { mes: "May", peso: "0" },
      { mes: "Jun", peso: "0" },
      { mes: "Jul", peso: "0" },
      { mes: "Ago", peso: "0" },
      { mes: "Sept", peso: "0" },
      { mes: "Oct", peso: "0" },
      { mes: "Nov", peso: "0" },
      { mes: "Dic", peso: "0" },
    ],
  };

  useEffect(() => {
    if (activities.length === 0) {
      setActivities([initialActivity]);
      //setExpandedIndex(0); // Expande la actividad inicial automáticamente
    }
  }, [activities, setActivities]);

  const handleActivityChange = (e, activityIndex, soporteIndex) => {
    const { name, value } = e.target;
    const updatedActivities = [...activities];

    if (soporteIndex !== undefined) {
      updatedActivities[activityIndex].array_soportes[soporteIndex][name] =
        value;
    } else {
      updatedActivities[activityIndex][name] = value;
    }

    setActivities(updatedActivities);
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleAddActivity = () => {
    setActivities([...activities, initialActivity]);
    //setExpandedIndex(activities.length);
    setExpandedIndex(null);
  };

  return (
    <div>
      <ul className={styles.activityList}>
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            activity={activity}
            index={index}
            expanded={expandedIndex === index}
            toggleExpanded={toggleExpanded}
            handleActivityChange={handleActivityChange}
            handleRemoveActivity={handleRemoveActivity}
            handleAddActivity={handleAddActivity}
            subregions={subregions}
            entornos={entornos}
            tecnologias={tecnologias}
            poblaciones={poblaciones}
            soportes={soportes}
            cups={cups}
          />
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
