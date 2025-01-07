import React, { useState } from "react";
import styles from "./ActivityItem.module.css";
import Select from "react-select";

const ActivityItem = ({
  activity,
  index,
  expanded,
  toggleExpanded,
  handleActivityChange,
  handleRemoveActivity,
  handleAddActivity,
  //entornos,
  //tecnologias,
  //poblaciones,
  //soportes,
  //cups,
}) => {
  const entornos = [
    "Hogar",
    "Comunitario",
    "Educativo",
    "Laboral-informal",
    "Institucional",
  ];

  const poblaciones = [
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
  ];

  const tecnologias = [
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
  ];

  const soportes = [
    "Acta de Reunión",
    "Acta y/o constancia de Entrega",
    "Agenda Metodológica",
    "Agenda",
    "Base de Datos",
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
  ];

  const cups = [
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
  ];

  const options = {
    // entorno: entornos.map((option) => ({ value: option, label: option })),
    //entornos: entornos,
    //poblacion_sujeto: poblaciones,
    //codigo_cups: cups,
    tipo_soporte: soportes,
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

  const customStyles = {
    control: (base) => ({
      ...base,
      minWidth: "200px", // Ajusta el ancho mínimo
      //maxWidth: "400px", // Opcional, limita el ancho máximo
    }),
    menu: (base) => ({
      ...base,
      zIndex: 5, // Asegura que el menú no se superponga
    }),
    option: (base) => ({
      ...base,
      whiteSpace: "nowrap", // Evita que el texto se parta
    }),
    multiValueLabel: (base) => ({
      ...base,
      whiteSpace: "normal", // Permite que las etiquetas ocupen más espacio
    }),
  };

  const customStyles_cups = {
    control: (base) => ({
      ...base,
      minWidth: "500px", // Ajusta el ancho mínimo
      //maxWidth: "400px", // Opcional, limita el ancho máximo
    }),
    menu: (base) => ({
      ...base,
      zIndex: 5, // Asegura que el menú no se superponga
    }),
    option: (base) => ({
      ...base,
      whiteSpace: "nowrap", // Evita que el texto se parta
    }),
    multiValueLabel: (base) => ({
      ...base,
      whiteSpace: "normal", // Permite que las etiquetas ocupen más espacio
    }),
  };

  const handleCronogramaChange = (value, key, itemIndex) => {
    const updatedCronograma = [...(activity.cronograma || [])];
    console.log("cronograma", updatedCronograma);

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

  // Añadir soporte
  const addSoporte = () => {
    const newSoportes = [
      ...(activity.array_soportes || []),
      { tipo_soporte: "", descripcion_soporte: "" },
    ];
    handleActivityChange(
      { target: { name: "array_soportes", value: newSoportes } },
      index
    );
  };

  // Eliminar soporte
  const removeSoporte = (soporteIndex) => {
    const newSoportes = activity.array_soportes.filter(
      (_, idx) => idx !== soporteIndex
    );
    handleActivityChange(
      { target: { name: "array_soportes", value: newSoportes } },
      index
    );
  };

  // Cambiar soporte
  const handleSoporteChange = (e, soporteIndex) => {
    const { name, value } = e.target;
    const newSoportes = [...activity.array_soportes];
    console.log("soportes", newSoportes);
    newSoportes[soporteIndex][name] = value;
    handleActivityChange(
      { target: { name: "array_soportes", value: newSoportes } },
      index
    );
  };

  // Obtener todas las opciones seleccionadas para deshabilitarlas

  const selectedOptions = activity.array_soportes?.map(
    (soporte) => soporte.tipo_soporte
  );

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
        {/* <label>Cronograma</label> */}
        <div className={styles.cronogramaGrid}>
          {cronograma.map((item, itemIndex) => (
            <div key={item.mes} className={styles.cronogramaItem}>
              <strong>{item.mes}</strong>
              <input
                type="number"
                placeholder="%"
                value={item.peso === "0" ? "" : item.peso}
                onChange={(e) =>
                  handleCronogramaChange(
                    e.target.value,
                    "peso",
                    itemIndex,
                    index
                  )
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

  return (
    <li className={styles.activityItem}>
      <div
        className={styles.activityHeader}
        onClick={() => toggleExpanded(index)}
      >
        <strong>Actividad {index + 1}</strong>

        {index > 0 && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveActivity(index);
            }}
          >
            -
          </button>
        )}

        <button
          className={styles.buttonMain_añadir}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAddActivity();
          }}
        >
          +
        </button>
      </div>
      {expanded && (
        <div className={styles.activityDetails}>
          <table>
            <thead>
              <tr>
                <th>Descripción Actividad</th>
                <th>Cantidad</th>
                <th>Unidad de Medida</th>
                <th>Entornos</th>
                <th>Tecnologías</th>
                <th>Población Sujeto</th>
                <th>Soportes</th>
                <th>Código Cups</th>
                <th>Valor Unitario</th>
                <th>Valor Total</th>
                <th>Cronograma</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.contenedor_actividad}>
                    <textarea
                      type="text"
                      name="descripcion_actividad"
                      value={activity.descripcion_actividad}
                      onChange={(e) => handleActivityChange(e, index)}
                      //className={styles.input_estilo}
                      className={styles.textarea_actividad}
                    />
                  </div>
                </td>

                <td>
                  <div className={styles.inputContainer}>
                    <input
                      type="number"
                      name="cantidad"
                      value={activity.cantidad}
                      onChange={(e) => handleActivityChange(e, index)}
                      className={styles.inputGlobal}
                      min="0"
                    />
                  </div>
                </td>

                <td>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="unidad_medida"
                      value={activity.unidad_medida}
                      onChange={(e) => handleActivityChange(e, index)}
                      className={styles.inputGlobal}
                    />
                  </div>
                </td>

                <td>
                  <Select
                    isMulti
                    name="entorno"
                    options={entornos.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    value={entornos
                      .map((option) => ({ value: option, label: option }))
                      .filter((option) =>
                        activity.entorno.includes(option.value)
                      )}
                    onChange={(selectedOptions) =>
                      handleActivityChange(
                        {
                          target: {
                            name: "entorno",
                            value: selectedOptions.map(
                              (option) => option.value
                            ),
                          },
                        },
                        index
                      )
                    }
                    placeholder="Seleccionar Entornos"
                    styles={customStyles}
                  />
                </td>

                <td>
                  <Select
                    isMulti
                    name="tecnologia"
                    options={tecnologias.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    value={tecnologias
                      .map((option) => ({ value: option, label: option }))
                      .filter((option) =>
                        activity.tecnologia.includes(option.value)
                      )}
                    onChange={(selectedOptions) =>
                      handleActivityChange(
                        {
                          target: {
                            name: "tecnologia",
                            value: selectedOptions.map(
                              (option) => option.value
                            ),
                          },
                        },
                        index
                      )
                    }
                    placeholder="Seleccionar Tecnologia"
                    styles={customStyles_cups}
                  />
                </td>

                <td>
                  <Select
                    isMulti
                    name="poblacion_sujeto"
                    options={poblaciones.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    value={poblaciones
                      .map((option) => ({ value: option, label: option }))
                      .filter((option) =>
                        activity.poblacion_sujeto.includes(option.value)
                      )}
                    onChange={(selectedOptions) =>
                      handleActivityChange(
                        {
                          target: {
                            name: "poblacion_sujeto",
                            value: selectedOptions.map(
                              (option) => option.value
                            ),
                          },
                        },
                        index
                      )
                    }
                    placeholder="Seleccionar Poblacion"
                    styles={customStyles}
                  />
                </td>

                <table className={styles.soporte_table}>
                  <thead>
                    <tr>
                      <th>Tipo Soporte</th>
                      <th>Descripción Soporte</th>
                      <th>Cantidad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.array_soportes?.map((soporte, soporteIndex) => (
                      <tr key={soporteIndex}>
                        {console.log("soporte", soporteIndex)}
                        <td>
                          <select
                            className={styles.soporte_select}
                            name="tipo_soporte"
                            value={soporte.tipo_soporte}
                            onChange={(e) =>
                              handleSoporteChange(e, soporteIndex)
                            }
                          >
                            <option value="">Seleccionar Soporte</option>
                            {options.tipo_soporte.map((option, idx) => (
                              // <option key={idx} value={option}>
                              //   {option}
                              // </option>
                              <option
                                key={idx}
                                value={option}
                                disabled={
                                  selectedOptions.includes(option) &&
                                  option !== soporte.tipo_soporte
                                }
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <textarea
                            type="text"
                            name="descripcion_soporte"
                            value={soporte.descripcion_soporte}
                            onChange={(e) =>
                              handleSoporteChange(e, soporteIndex)
                            }
                            placeholder="Descripción Soporte"
                            className={styles.textarea}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="cantidad_soporte"
                            value={soporte.cantidad_soporte}
                            onChange={(e) =>
                              handleSoporteChange(e, soporteIndex)
                            }
                            placeholder="Cantidad"
                            className={styles.soporte_input}
                          />
                        </td>
                        <td>
                          {soporteIndex > 0 && (
                            <button
                              className={styles.removeButton}
                              type="button"
                              onClick={() => removeSoporte(soporteIndex)}
                            >
                              -
                            </button>
                          )}
                          <button
                            className={styles.buttonMain_añadir}
                            type="button"
                            onClick={addSoporte}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <td>
                  <Select
                    name="codigo_cups"
                    options={cups.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    value={
                      activity.codigo_cups
                        ? {
                            value: activity.codigo_cups,
                            label: activity.codigo_cups,
                          }
                        : null
                    }
                    onChange={(selectedOption) =>
                      handleActivityChange(
                        {
                          target: {
                            name: "codigo_cups",
                            value: selectedOption ? selectedOption.value : null,
                          },
                        },
                        index
                      )
                    }
                    placeholder="Seleccionar Cups"
                    styles={customStyles_cups}
                  />
                </td>

                <td>
                  <div className={styles.input_valor_container}>
                    <input
                      type="number"
                      name="valor_unitario"
                      value={activity.valor_unitario}
                      onChange={(e) => handleActivityChange(e, index)}
                      className={styles.input_valor}
                      min="0"
                    />
                  </div>
                </td>
                <td>
                  <div className={styles.input_valor_container}>
                    <input
                      type="number"
                      name="valor_total"
                      value={activity.valor_total}
                      onChange={(e) => handleActivityChange(e, index)}
                      className={styles.input_valor}
                      min="0"
                    />
                  </div>
                </td>

                <td>{renderCronogramaField()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </li>
  );
};

export default ActivityItem;
