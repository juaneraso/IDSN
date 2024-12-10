import React, { useEffect, useState } from "react";
import styles from "./Event.module.css";

const Event = ({ setEventData }) => {
  const [eventData, setEventState] = useState({
    Descripcion_Evento: "",
    Eje_estrategico: "",
    Linea_operativa: "",
  });

  const [indicatorData, setIndicatorState] = useState({
    nombre_indicador: "",
    descripcion_indicador: "",
    meta_resultado: "",
  });

  // const [projectData, setProjectState] = useState({
  //   proyecto: "",
  //   actividadpas: "",
  //   descripcion: "",
  // });

  const [operatorData, setOperatorState] = useState({
    nombre_entidad: "",
    municipio: "",
    descripcion: "",
  });

  // Consolidar y enviar datos al componente padre automáticamente
  useEffect(() => {
    const consolidatedData = {
      ...eventData,
      ...indicatorData,
      ...operatorData,
    };
    setEventData(consolidatedData);
  }, [eventData, indicatorData, operatorData, setEventData]);

  const handleEventChange = (event) => {
    const { name, value } = event.target;
    setEventState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleIndicatorChange = (event) => {
    const { name, value } = event.target;
    setIndicatorState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleProjectChange = (event) => {
    const { name, value } = event.target;
    setProjectState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOperatorChange = (event) => {
    const { name, value } = event.target;
    setOperatorState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={styles.eventContainer}>
      {/* <h3>Evento</h3> */}
      <div className={styles.section}>
        <h4>Sección Operador PIC</h4>
        <div className={styles.field}>
          <label htmlFor="nombre_entidad">Nombre de la Entidad</label>
          <input
            type="text"
            id="nombre_entidad"
            name="nombre_entidad"
            value={operatorData.nombre_entidad}
            onChange={handleOperatorChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="municipio">Municipio</label>
          <input
            type="text"
            id="municipio"
            name="municipio"
            value={operatorData.municipio}
            onChange={handleOperatorChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={operatorData.descripcion}
            onChange={handleOperatorChange}
            required
          />
        </div>
      </div>
      <div className={styles.section}>
        <h4>Sección Evento</h4>
        <div className={styles.field}>
          <label htmlFor="Descripcion_Evento">Descripción del Evento</label>
          <input
            type="text"
            id="Descripcion_Evento"
            name="Descripcion_Evento"
            value={eventData.Descripcion_Evento}
            onChange={handleEventChange}
            required
          />
        </div>
        <h3>Seccion Indicador</h3>

        <div className={styles.field}>
          <label htmlFor="nombre_indicador">Nombre Indicador</label>
          <input
            type="text"
            id="nombre_indicador"
            name="nombre_indicador"
            value={indicatorData.nombre_indicador}
            onChange={handleIndicatorChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="descripcion_indicador">Descripcion Indicador</label>
          <input
            type="text"
            id="descripcion_indicador"
            name="descripcion_indicador"
            value={indicatorData.descripcion_indicador}
            onChange={handleIndicatorChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="meta_resultado">Meta Indicador</label>
          <input
            type="text"
            id="meta_resultado"
            name="meta_resultado"
            value={indicatorData.meta_resultado}
            onChange={handleIndicatorChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="Eje_estrategico">Eje Estratégico</label>
          <input
            type="text"
            id="Eje_estrategico"
            name="Eje_estrategico"
            value={eventData.Eje_estrategico}
            onChange={handleEventChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="Linea_operativa">Línea Operativa</label>
          <input
            type="text"
            id="Linea_operativa"
            name="Linea_operativa"
            value={eventData.Linea_operativa}
            onChange={handleEventChange}
            required
          />
        </div>
      </div>

      {/* <div className={styles.section}>
        <h4>Sección Indicador</h4>
        <div className={styles.field}>
          <label htmlFor="nombre_indicador">Nombre del Indicador</label>
          <input
            type="text"
            id="nombre_indicador"
            name="nombre_indicador"
            value={indicatorData.nombre_indicador}
            onChange={handleIndicatorChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="descripcion_indicador">
            Descripción del Indicador
          </label>
          <textarea
            id="descripcion_indicador"
            name="descripcion_indicador"
            value={indicatorData.descripcion_indicador}
            onChange={handleIndicatorChange}
            required
          />
        </div>
      </div> */}

      {/* <div className={styles.section}>
        <h4>Sección Proyecto IDSN</h4>
        <div className={styles.field}>
          <label htmlFor="proyecto">Proyecto</label>
          <input
            type="text"
            id="proyecto"
            name="proyecto"
            value={projectData.proyecto}
            onChange={handleProjectChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="actividadpas">Actividad PAS</label>
          <input
            type="text"
            id="actividadpas"
            name="actividadpas"
            value={projectData.actividadpas}
            onChange={handleProjectChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={projectData.descripcion}
            onChange={handleProjectChange}
            required
          />
        </div>
      </div> */}
    </div>
  );
};

export default Event;
