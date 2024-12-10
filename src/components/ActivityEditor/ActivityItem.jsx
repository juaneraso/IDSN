import React from "react";
import styles from "./ActivityItem.module.css";

const ActivityItem = ({
  activity,
  index,
  expanded,
  toggleExpanded,
  handleActivityChange,
  handleRemoveActivity,
}) => {
  return (
    <li className={styles.activityItem}>
      <div
        className={styles.activityHeader}
        onClick={() => toggleExpanded(index)} // Mueve el evento aquí
      >
        <strong>
          {activity.descripcion_Actividad || `Actividad ${index + 1}`}
        </strong>
        <button
          type="button"
          className={styles.removeButton}
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic cierre o expanda
            handleRemoveActivity(index);
          }}
        >
          Eliminar
        </button>
      </div>
      {expanded && (
        <div className={styles.activityDetails}>
          {Object.keys(activity).map((key) => (
            <div key={key}>
              <label htmlFor={`${key}-${index}`}>{key}</label>
              <input
                id={`${key}-${index}`}
                name={key}
                value={activity[key]}
                onChange={(e) => handleActivityChange(e, index)}
              />
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default ActivityItem;
