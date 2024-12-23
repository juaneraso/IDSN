import React, { useState } from "react";
import ActivityItem from "../ActivityEditor/ActivityItem";
import styles from "./ActivityList.module.css";

const ActivityList = ({ activities, setActivities, subregions }) => {
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
      Descripcion_Actividad: "",
      cantidad: "",
      unidadMedida: "",
      entorno: [],
      tecnologia: [],
      //Tecnología_PIC: [],
      poblacionSujeto: [],
      Tipo_soporte: "",
      Descripcion_Soporte: "",
      //municipioSoporte: "",
      Equipo_Operativo: "",
      perfilProfesional: "",
      perfilOperativo: "",
      codigoCups: [],
      valorUnitario: "",
      valorTotal: "",
      cronograma: "",
      //observacionEjecucion: "",
      //porcentajeCumplimiento: "",
      //observacionSeguimiento: "",
      //estadoAvance: "",
    };
    setActivities([...activities, newActivity]);
    setExpandedIndex(activities.length); // Expande la nueva actividad automáticamente
  };

  return (
    <div>
      <h3>Actividades de Producto</h3>
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
          />
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
