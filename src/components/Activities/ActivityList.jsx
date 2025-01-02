import React, { useState } from "react";
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

  const handleActivityChange = (event, index) => {
    const { name, value } = event.target;
    const updatedActivities = [...activities];
    updatedActivities[index][name] = value;
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
    const newActivity = {
      descripcion_actividad: "",
      cantidad: "",
      unidad_medida: "",
      entorno: [],
      tecnologia: [],
      poblacion_sujeto: [],
      equipo_operativo: "",
      perfil_profesional: "",
      perfil_operativo: "",
      codigo_cups: "",
      valor_unitario: "",
      valor_total: "",
      array_soportes: [
        {
          tipo_soporte: "",
          descripcion_soporte: "",
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
    setActivities([...activities, newActivity]);
    setExpandedIndex(activities.length); // Expande la nueva actividad automáticamente
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleAddActivity}
        className={styles.buttonMain}
      >
        Añadir Actividad
      </button>

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
