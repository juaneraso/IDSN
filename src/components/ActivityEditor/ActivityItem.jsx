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
  const options = {
    entorno: [
      "Hogar",
      "Comunitario",
      "Educativo",
      "Laboral-informal",
      "Istitucional",
    ],
    tecnologia: [
      "Caracterización social y ambiental en entornos de vida cotidiana",
      "Información en salud",
      "Centros de escucha comunitaria",
      "Educación y comunicación para la salud",
      "Prevención y Control de Vectores",
      "Conformación y fortalecimiento de redes familiares, comunitarias y sociales",
      "Zonas de Orientación y centros de escucha",
      "Rehabilitación basada en comunidad",
      "Tamizaje",
      "Jornadas de salud",
      "Vacunación antirrábica",
      "Adquisición y suministro de medicamentos o insumos",
    ],
    poblacionSujeto: [
      "Familias",
      "Comunidad",
      "Personas",
      "Estudiantes",
      "Comunidad educativa",
      "Trabajadores",
      "Instituciones prestadoras de servicios de salud",
      "Instituciones que prestan servicios sociales o protección integral",
      "Establecimientos que concentran o aglomeran individuos ",
      "Poblaciones vulnerables",
    ],
    codigoCups: [
      "I10001 INFORMACIÓN EN SALUD PARA EL CUIDADO DEL AMBIENTE",
      "I10003 INFORMACIÓN PARA LA SALUD SOBRE AGUA APTA PARA CONSUMO HUMANO",
      "I10004 INFORMACIÓN PARA LA SALUD DE MANEJO DE SUSTANCIAS Y PRODUCTOS QUÍMICOS",
      "I10005 INFORMACIÓN PARA LA SALUD DE ASPECTOS RELACIONADOS CON LA CALIDAD DEL AIRE",
      "I10006 INFORMACIÓN PARA LA SALUD EN SANEAMIENTO BÁSICO",
      "I10007 INFORMACIÓN PARA LA SALUD EN PREVENCIÓN EN ACCIDENTES EN EL HOGAR",
      "I10008 INFORMACIÓN PARA LA SALUD DE MANEJO DE RESIDUOS PELIGROSOS",
      "I10009 INFORMACIÓN PARA LA SALUD DE PREVENCIÓN DE LA RADIACIÓN ULTRAVIOLETA (RUV)",
      "I10010 INFORMACIÓN PARA LA SALUD PARA LA PROMOCIÓN DE LA MOVILIDAD SALUDABLE",
      "I10011 INFORMACIÓN PARA LA SALUD DIRIGIDA A USUARIOS Y CONSUMIDORES PARA LA SEGURIDAD SANITARIA",
      "I10101 INFORMACIÓN EN SALUD PARA LA PROMOCIÓN DE LA SALUD MENTAL",
      "I10102 INFORMACIÓN EN SALUD PARA LA SANA CONVIVENCIA Y EL TEJIDO SOCIAL",
      "I10103 INFORMACIÓN EN SALUD PARA LA PREVENCIÓN DE LA VIOLENCIA",
      "I10104 INFORMACIÓN EN SALUD PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES FRENTE AL CONSUMO DE SUSTANCIAS PSICOACTIVAS",
      "I10105 INFORMACIÓN EN SALUD PARA LA REDUCCIÓN DE RIESGOS Y DAÑOS EN RELACIÓN AL CONSUMO DE SUSTANCIAS PSICOACTIVAS",
      "I10106 INFORMACIÓN EN SALUD PARA LA REDUCCIÓN DEL AUTOESTIGMA, ESTIGMA SOCIAL Y DISCRIMINACIÓN",
      "I10107 INFORMACIÓN EN SALUD PARA LA PREVENCIÓN DE LA CONDUCTA SUICIDA",
      "I10108 INFORMACIÓN EN SALUD PARA LA PREVENCIÓN DE LA EPILEPSIA (ACCIDENTALIDAD)",
      "I10109 INFORMACIÓN EN SALUD PARA EL DESARROLLO DE HABILIDADES PARA LA VIDA",
      "I10110 INFORMACIÓN EN SALUD PARA LA REDUCCIÓN DE RIESGOS Y DAÑOS EN RELACIÓN AL CONSUMO NOCIVO DE ALCOHOL",
      "I10201 INFORMACIÓN EN SALUD SOBRE EL LIBRE EJERCICIO DE LA SEXUALIDAD, LA IDENTIDAD DE GÉNERO Y LA ORIENTACIÓN SEXUAL",
      "I10202 INFORMACIÓN EN SALUD PARA LA PREVENCIÓN DE VIOLENCIAS POR RAZONES DE GÉNERO Y VIOLENCIAS SEXUALES",
      "I10203 INFORMACIÓN EN SALUD PARA LA PREVENCIÓN DEL EMBARAZO EN LA INFANCIA Y ADOLESCENCIA",
      "I10204 INFORMACIÓN EN SALUD PARA EL USO EFECTIVO DE MÉTODOS ANTICONCEPTIVOS MODERNOS Y ACCESO A LA ANTICONCEPCIÓN",
      "I10205 INFORMACIÓN EN SALUD SOBRE LA PREVENCIÓN DEL ABORTO INSEGURO Y ACCESO A LA INTERRUPCIÓN VOLUNTARIA DEL EMBARAZO",
      "I10206 INFORMACIÓN EN SALUD PARA LA PREVENCIÓN DE ITS, VIH/SIDA Y HEPATITIS",
      "I10207 INFORMACIÓN EN SALUD EN DERECHOS SEXUALES Y REPRODUCTIVOS Y EQUIDAD DE GÉNERO",
      "I10208 INFORMACIÓN EN SALUD PARA MEJORAR EL ACCESO Y LA CALIDAD DE LOS SERVICIOS DE SALUD A ADOLESCENTES Y JÓVENES",
      "I10209 INFORMACIÓN EN SALUD MATERNA Y PERINATAL",
      "I10210 INFORMACIÓN PARA LA SALUD EN EL AUTORRECONOCIMIENTO DE COMPORTAMIENTOS DE RIESGO PARA LA AUTOEXCLUSIÓN VOLUNTARIA COMO DONANTE DE SANGRE Y TEJIDOS",
      "I10301 INFORMACIÓN EN SALUD EN PREVENCIÓN DE ENFERMEDADES INFECCIOSAS TRANSMITIDAS POR VÍA AÉREA Y CONTACTO DIRECTO",
      "I10302 INFORMACIÓN EN SALUD EN PREVENCIÓN DE ENFERMEDADES INFECCIOSAS TRANSMITIDAS SUELO, AGUA Y ALIMENTOS",
      "I10303 INFORMACIÓN EN SALUD EN PREVENCIÓN DE ENFERMEDADES INFECCIOSAS DESATENDIDAS",
      "I10304 INFORMACIÓN EN SALUD PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES TRANSMITIDAS POR VECTORES",
      "I10305 INFORMACIÓN EN SALUD PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ZOONOSIS",
      "I10306 INFORMACIÓN EN SALUD PARA LA PREVENCIÓN DE ENFERMEDADES INFECCIOSAS TRANSMITIDAS POR VÍA SANGUÍNEA",
      "I10307 INFORMACIÓN EN SALUD PARA LA PROMOCIÓN DE LA VACUNACIÓN EN LA POBLACIÓN OBJETO DEL PROGRAMA AMPLIADO DE INMUNIZACIONES - PAI",
      "I10308 INFORMACIÓN EN SALUD PARA LA PROMOCIÓN DE HÁBITOS HIGIÉNICOS",
      "I10309 INFORMACIÓN PARA LA SALUD DIRIGIDO A LA PROMOCIÓN DE LA HIGIENE DE MANOS",
      "I10310 INFORMACIÓN PARA LA SALUD DIRIGIDO A LA PROMOCIÓN DE LA HIGIENE FACIAL",
      "I10311 INFORMACIÓN PARA LA SALUD DIRIGIDO A LA PROMOCIÓN DE LA HIGIENE CORPORAL",
      "I10401 INFORMACIÓN EN SALUD PARA LA PROMOCIÓN DE LA ACTIVIDAD FÍSICA",
      "I10402 INFORMACIÓN EN SALUD PARA PROMOVER LA CESACIÓN DEL CONSUMO DE TABACO, DERIVADOS Y SUCEDÁNEOS",
      "I10403 INFORMACIÓN EN SALUD PARA LA ALIMENTACIÓN SALUDABLE",
      "I10404 INFORMACIÓN EN SALUD PARA LA PROMOCIÓN DEL CUIDADO E HIGIENE DE LA SALUD BUCAL",
      "I10405 INFORMACIÓN EN SALUD PARA LA PROMOCIÓN DE LA SALUD VISUAL",
      "I10406 INFORMACIÓN EN SALUD PARA LA PROMOCIÓN DE LA SALUD AUDITIVA Y COMUNICATIVA",
      "I10407 INFORMACIÓN EN SALUD PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES CRÓNICAS ONCOLÓGICAS",
      "I10408 INFORMACIÓN EN SALUD PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES CRÓNICAS METABÓLICAS",
      "I10409 INFORMACIÓN EN SALUD PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES CRÓNICAS CARDIOVASCULARES",
      "I10410 INFORMACIÓN EN SALUD PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES RESPIRATORIAS CRÓNICAS",
      "I10411 INFORMACIÓN EN SALUD PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE LAS ENFERMEDADES HUÉRFANAS",
      "I10412 INFORMACIÓN EN SALUD PARA LA ADOPCIÓN DE ESTILOS DE VIDA SALUDABLE",
      "I10413 INFORMACIÓN EN SALUD PARA LA PROMOCIÓN DE LA ALIMENTACIÓN EN LA PRIMERA INFANCIA",
      "I10501 INFORMACIÓN EN SALUD EN PRÁCTICAS DE CUIDADO DE LA SALUD EN EL TRABAJO",
      "I10601 INFORMACIÓN EN SALUD EN PRÁCTICAS DE CUIDADO Y CRIANZA",
      "I10602 INFORMACIÓN EN SALUD PARA LA PREPARACIÓN Y AFRONTAMIENTO DE LOS SUCESOS VITALES",
      "I10603 INFORMACIÓN EN SALUD SOBRE MECANISMOS DE PARTICIPACIÓN CIUDADANA",
      "I10604 INFORMACIÓN EN SALUD PARA EL EJERCICIO DEL DERECHO A LA SALUD",
      "I10605 INFORMACIÓN EN SALUD PARA LA PROMOCIÓN DE LA LACTANCIA MATERNA",
      "I10606 INFORMACIÓN EN SALUD PARA EL EJERCICIO DEL DERECHO A LA SALUD Y SUS MECANISMOS DE EXIGIBILIDAD",
      "I10607 INFORMACIÓN EN SALUD EN PRÁCTICAS PARA EL CUIDADO DE LA SALUD",
      "I11001 EDUCACIÓN Y COMUNICACIÓN PARA EL CUIDADO DEL AMBIENTE",
      "I11003 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD SOBRE AGUA APTA PARA CONSUMO HUMANO",
      "I11004 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD DE MANEJO DE SUSTANCIAS Y PRODUCTOS QUÍMICOS",
      "I11005 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD EN ASPECTOS RELACIONADOS CON LA CALIDAD DEL AIRE",
      "I11006 EDUCACIÓN Y COMUNICACIÓN PARA EL SANEAMIENTO BÁSICO",
      "I11007 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD EN PREVENCIÓN EN ACCIDENTES EN EL HOGAR",
      "I11008 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD EN MANEJO DE RESIDUOS PELIGROSOS",
      "I11009 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD EN PREVENCIÓN DE LA RADIACIÓN ULTRAVIOLETA (RUV)",
      "I11010 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD EN MOVILIDAD SALUDABLE",
      "I11011 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD DIRIGIDA A USUARIOS Y CONSUMIDORES DE BIENES Y SERVICIOS DE CADENAS PRODUCTIVAS",
      "I11012 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD PARA GESTIONAR EL RIESGO DE SU OCUPACIÓN U OFICIO A TRABAJADORES INFORMALES",
      "I11101 EDUCACIÓN Y COMUNICACIÓN PARA LA PROMOCIÓN DE LA SALUD MENTAL",
      "I11102 EDUCACIÓN Y COMUNICACIÓN PARA LA SANA CONVIVENCIA Y EL TEJIDO SOCIAL",
      "I11103 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA PREVENCIÓN DE LA VIOLENCIA",
      "I11104 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES FRENTE AL CONSUMO DE SUSTANCIAS PSICOACTIVAS",
      "I11105 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA REDUCCIÓN DE RIESGOS Y DAÑOS EN RELACIÓN AL CONSUMO DE SUSTANCIAS PSICOACTIVAS",
      "I11106 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA REDUCCIÓN DEL AUTOESTIGMA, ESTIGMA SOCIAL Y DISCRIMINACIÓN",
      "I11107 EDUCACIÓN Y COMUNICACIÓN PARA LA PREVENCIÓN DE LA CONDUCTA SUICIDA",
      "I11108 EDUCACIÓN Y COMUNICACIÓN PARA LA PREVENCIÓN DE LA EPILEPSIA (ACCIDENTALIDAD)",
      "I11109 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA EL DESARROLLO DE HABILIDADES PARA LA VIDA",
      "I11110 EDUCACIÓN Y COMUNICACIÓN PARA LA PREVENCIÓN DE PROBLEMAS Y TRASTORNOS MENTALES (INCLUIDA LA FORMACIÓN DE PRIMEROS RESPONDIENTES Y PREPARACIÓN PARA EL CUIDADO DE LA SALUD MENTAL EN LA COTIDIANIDAD Y EN SITUACIONES DE EMERGENCIAS SOCIALES Y SANITARIAS)",
      "I11201 EDUCACIÓN Y COMUNICACIÓN EN SALUD SOBRE EL LIBRE EJERCICIO DE LA SEXUALIDAD, LA IDENTIDAD DE GÉNERO Y LA ORIENTACIÓN SEXUAL",
      "I11202 EDUCACIÓN Y COMUNICACIÓN PARA LA PREVENCIÓN DE VIOLENCIAS DE GÉNERO Y VIOLENCIAS SEXUALES",
      "I11203 EDUCACIÓN Y COMUNICACIÓN PARA LA PREVENCIÓN DEL EMBARAZO EN LA INFANCIA Y ADOLESCENCIA",
      "I11204 EDUCACIÓN Y COMUNICACIÓN PARA EL USO EFECTIVO DE MÉTODOS ANTICONCEPTIVOS MODERNOS Y ACCESO A LA ANTICONCEPCIÓN",
      "I11205 EDUCACIÓN Y COMUNICACIÓN SOBRE LA PREVENCIÓN DEL ABORTO INSEGURO Y ACCESO A LA INTERRUPCIÓN VOLUNTARIA DEL EMBARAZO",
      "I11206 EDUCACIÓN Y COMUNICACIÓN PARA LA PREVENCIÓN DE ITS, VIH/SIDA Y HEPATITIS",
      "I11207 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD EN DERECHOS SEXUALES Y REPRODUCTIVOS Y EQUIDAD DE GÉNERO",
      "I11208 EDUCACIÓN-Y-COMUNICACIÓN-PARA-LA-SALUD-EN-EL-AUTORRECONOCIMIENTO-DE-COMPORTAMIENTOS-DE-RIESGO-PARA-LA-AUTOEXCLUSIÓN-VOLUNTARIA-COMO-DONANTE-DE-SANGRE-Y-TEJIDOS",
      "I11301 EDUCACIÓN Y COMUNICACIÓN EN PREVENCIÓN DE ENFERMEDADES INFECCIOSAS TRANSMITIDAS POR VÍA AÉREA Y CONTACTO DIRECTO",
      "I11302 EDUCACIÓN Y COMUNICACIÓN EN PREVENCIÓN DE ENFERMEDADES INFECCIOSAS TRASMITIDAS SUELO, AGUA Y ALIMENTOS",
      "I11303 EDUCACIÓN Y COMUNICACIÓN EN PREVENCIÓN DE ENFERMEDADES INFECCIOSAS DESATENDIDAS",
      "I11304 EDUCACIÓN Y COMUNICACIÓN PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES TRANSMITIDAS POR VECTORES",
      "I11305 EDUCACIÓN Y COMUNICACIÓN PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ZOONOSIS",
      "I11306 EDUCACIÓN Y COMUNICACIÓN DIRIGIDA A LA PREVENCIÓN DE ENFERMEDADES INFECCIOSAS TRANSMITIDAS POR VÍA SANGUÍNEA",
      "I11307 EDUCACIÓN Y COMUNICACIÓN SOBRE ENFERMEDADES INMUNOPREVENIBLES, CUMPLIMIENTO DEL ESQUEMA NACIONAL DE VACUNACIÓN PARA LA PREVENCIÓN, CONTROL Y ELIMINACIÓN DE LAS ENFERMEDADES INMUNOPREVENIBLES",
      "I11308 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD DIRIGIDO A LA PROMOCIÓN DE HÁBITOS HIGIÉNICOS",
      "I11401 EDUCACIÓN Y COMUNICACIÓN PARA LA PROMOCIÓN DE LA ACTIVIDAD FÍSICA",
      "I11402 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA PROMOVER LA CESACIÓN DEL CONSUMO DE TABACO, DERIVADOS Y SUCEDÁNEOS",
      "I11403 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA ALIMENTACIÓN SALUDABLE",
      "I11404 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA PROMOCIÓN DEL CUIDADO E HIGIENE DE LA SALUD BUCAL",
      "I11405 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA PROMOCIÓN DE LA SALUD VISUAL",
      "I11406 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA PROMOCIÓN DE LA SALUD AUDITIVA Y COMUNICATIVA",
      "I11407 EDUCACIÓN Y COMUNICACIÓN PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES CRÓNICAS ONCOLÓGICAS",
      "I11408 EDUCACIÓN Y COMUNICACIÓN PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES CRÓNICAS METABÓLICAS",
      "I11409 EDUCACIÓN Y COMUNICACIÓN PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES CRÓNICAS CARDIOVASCULARES",
      "I11410 EDUCACIÓN Y COMUNICACIÓN PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE ENFERMEDADES RESPIRATORIAS CRÓNICAS",
      "I11411 EDUCACIÓN Y COMUNICACIÓN PARA EL FORTALECIMIENTO DE FACTORES PROTECTORES HACIA EL CONTROL DE LAS ENFERMEDADES HUÉRFANAS",
      "I11412 EDUCACIÓN Y COMUNICACIÓN PARA LA ADOPCIÓN DE ESTILOS DE VIDA SALUDABLE",
      "I11413 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA IDENTIFICACIÓN TEMPRANA DE SIGNOS, SÍNTOMAS Y SEÑALES DE ALARMA, DE LAS ENFERMEDADES CRÓNICAS ONCOLÓGICAS PEDIÁTRICAS",
      "I11414 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA PROMOCIÓN DE LA ALIMENTACIÓN EN LA PRIMERA INFANCIA",
      "I11501 EDUCACIÓN Y COMUNICACIÓN PARA LA SALUD EN PRÁCTICAS DE CUIDADO DE LA SALUD EN EL TRABAJO",
      "I11601 EDUCACIÓN Y COMUNICACIÓN EN PRÁCTICAS DE CUIDADO Y CRIANZA",
      "I11602 EDUCACIÓN Y COMUNICACIÓN PARA LA PREPARACIÓN Y AFRONTAMIENTO DE LOS SUCESOS VITALES",
      "I11603 EDUCACIÓN Y COMUNICACIÓN EN PRÁCTICAS PARA EL CUIDADO DE LA SALUD",
      "I11604 EDUCACIÓN Y COMUNICACIÓN EN SALUD PARA LA PROMOCIÓN DE HABILIDADES COGNITIVAS",
      "I20101 ENTREGA O DISPENSACIÓN MASIVA DE DESPARASITANTES PARA LA ELIMINACIÓN DEL COMPLEJO CISTICERCOSIS TENIASIS",
      "I20102 ENTREGA O DISPENSACIÓN MASIVA O DIRIGIDA DE DESPARASITANTES PARA EL CONTROL Y LA ELIMINACIÓN DE LAS GEOHELMINTIASIS",
      "I20103 ENTREGA O DISPENSACIÓN DE INSUMOS Y MEDICAMENTOS PARA LA PREVENCIÓN Y TRATAMIENTO DE LA TRIQUIASIS TRACOMATOSA",
    ],
    tipoSoporte: [
      "Comunicación Oficial",
      "Constancia",
      "Cronograma",
      "Directorio",
      "Documento S.E",
      "Enlace de Archivo en la nube",
      "Factura",
      "Formatos",
      "Informe de Ejecutivo",
      "Informe Diagnóstico y/o Lectura de Contexto",
      "Informe Indicadores",
      "Manual",
      "Matriz",
      "Oficio de convocatoria",
      "Plan de Acción y/o Plan de trabajo",
      "Plan de Sesión",
      "Plan Pedagógico",
      "Presentación",
      "Registro Audio Visual y/o Piezas Educomunicacionales",
      "Registro de Asistencia",
      "Reporte Estadistico",
    ],
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

  const handleAddArrayItem = (key) => {
    const updatedArray = [...(activity[key] || []), ""]; // Inicializa con un valor vacío
    handleActivityChange({ target: { name: key, value: updatedArray } }, index);
  };

  const handleRemoveArrayItem = (key, itemIndex) => {
    const updatedArray = activity[key].filter((_, i) => i !== itemIndex);
    handleActivityChange({ target: { name: key, value: updatedArray } }, index);
  };

  const handleArrayItemChange = (key, value, itemIndex) => {
    const updatedArray = [...activity[key]];
    updatedArray[itemIndex] = value;
    handleActivityChange({ target: { name: key, value: updatedArray } }, index);
  };

  const handleCronogramaChange = (value, key, itemIndex) => {
    const updatedCronograma = [...(activity.cronograma || [])];

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
        <label>Cronograma</label>
        <div className={styles.cronogramaGrid}>
          {cronograma.map((item, itemIndex) => (
            <div key={item.mes} className={styles.cronogramaItem}>
              <strong>{item.mes}</strong>
              <input
                type="text"
                placeholder="%"
                value={item.peso === "0" ? "" : item.peso}
                onChange={(e) =>
                  handleCronogramaChange(e.target.value, "peso", itemIndex)
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

  const renderArrayField = (key, label) => {
    const selectedValues = activity[key] || [];
    const availableOptions = options[key].filter(
      (option) => !selectedValues.includes(option)
    );

    return (
      <div key={key}>
        <label>{label}</label>
        <ul>
          {selectedValues.map((item, itemIndex) => (
            <li key={`${key}-${item}-${itemIndex}`}>
              <strong>{`${label} ${itemIndex + 1}`}</strong>
              <select
                value={item}
                onChange={(e) =>
                  handleArrayItemChange(key, e.target.value, itemIndex)
                }
              >
                <option value="">Seleccionar {label}</option>
                {options[key].map((option, idx) => (
                  <option
                    key={option}
                    value={option}
                    disabled={
                      selectedValues.includes(option) && option !== item
                    }
                  >
                    {option}
                  </option>
                ))}
              </select>
              <button
                className={styles.removeButton}
                type="button"
                onClick={() => handleRemoveArrayItem(key, itemIndex)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <button
          className={styles.buttonMain}
          type="button"
          onClick={() => {
            if (availableOptions.length > 0) {
              handleAddArrayItem(key);
            } else {
              alert(`No hay más opciones disponibles para ${label}`);
            }
          }}
        >
          Añadir {label}
        </button>
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
          {Object.keys(activity).map((key) =>
            key === "entorno" ||
            key === "tecnologia" ||
            key === "poblacionSujeto" ||
            key === "codigoCups" ? (
              renderArrayField(
                key,
                key === "entorno"
                  ? "Entorno"
                  : key === "tecnologia"
                  ? "Tecnología PIC"
                  : key === "poblacionSujeto"
                  ? "Población Sujeto"
                  : "Código CUPS"
              )
            ) : key === "cronograma" ? (
              renderCronogramaField()
            ) : key === "Tipo_soporte" ? (
              <div key={key}>
                <label htmlFor={`${key}-${index}`}>Tipo de Soporte</label>
                <select
                  id={`${key}-${index}`}
                  name={key}
                  value={activity[key]}
                  onChange={(e) => handleActivityChange(e, index)}
                >
                  <option value="">Seleccionar Tipo de Soporte</option>
                  {options.tipoSoporte.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div key={key}>
                <label htmlFor={`${key}-${index}`}>{key}</label>
                <input
                  id={`${key}-${index}`}
                  name={key}
                  value={activity[key]}
                  onChange={(e) => handleActivityChange(e, index)}
                />
              </div>
            )
          )}
        </div>
      )}
    </li>
  );
};

export default ActivityItem;
