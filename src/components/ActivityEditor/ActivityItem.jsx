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
  entornos,
  tecnologias,
  poblaciones,
  soportes,
  cups,
}) => {
  const options = {
    // entorno: entornos.map((option) => ({ value: option, label: option })),
    entornos: entornos,
    //tecnologia: tecnologias,
    poblacion_sujeto: poblaciones,
    codigo_cups: cups,
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
                type="text"
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
        <strong>
          {activity.descripcion_actividad || `Actividad ${index + 1}`}
        </strong>

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
          <table className={styles.activityTable}>
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
                  <input
                    type="text"
                    name="descripcion_actividad"
                    value={activity.descripcion_actividad}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="cantidad"
                    value={activity.cantidad}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="unidad_medida"
                    value={activity.unidad_medida}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
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
                          <input
                            type="text"
                            name="descripcion_soporte"
                            value={soporte.descripcion_soporte}
                            onChange={(e) =>
                              handleSoporteChange(e, soporteIndex)
                            }
                            placeholder="Descripción Soporte"
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
                  <input
                    type="text"
                    name="valor_unitario"
                    value={activity.valor_unitario}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="valor_total"
                    value={activity.valor_total}
                    onChange={(e) => handleActivityChange(e, index)}
                  />
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
