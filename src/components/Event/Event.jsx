import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import styles from "./Event.module.css";
import Select from "react-select"; // Importamos React Select

const Event = ({ events, setEvents, edit_button }) => {
  const [expandedEvents, setExpandedEvents] = useState(
    // events.map(() => true) // Inicializamos todos como colapsados
    events.map((_, index) => index === 0)
  );

  // Estados
  const [ejes, setEjes] = useState([]);
  const [lineas, setLineas] = useState([]);
  const [entornos, setEntornos] = useState([]);
  const [tecnologias, setTecnologias] = useState([]);
  const [poblaciones, setPoblacion] = useState([]);
  const [soportes, setSoportes] = useState([]);
  const [cups, setCups] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const [labels, setLabels] = useState([]);

  const [municipios, setMunicipios] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [operadores, setOperadores] = useState([]);

  const [usuario, setUsuario] = useState("");

  const back = import.meta.env.VITE_APP_BACK;
  const url = `${back}/api/labels`;
  const url_municipios = `${back}/api/municipios?pagination[pageSize]=100`;
  const url_proyectos = `${back}/api/proyectos-idsns`;
  const url_operadores = `${back}/api/operador-pics?pagination[pageSize]=100`;
  const url_usuarios = `${back}/api/users/me?pLevel=2`;

  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response = await fetch(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener subregiones.");
        const data = await response.json();
        //setSubregions(data.data);
        setLabels(data);
        setCups(data.cups);
        setEjes(data.ejes);
        setEntornos(data.entornos);
        setEquipos(data.equipos);
        setLineas(data.lineas_operativas);
        setPoblacion(data.poblacion_sujeto);
        setSoportes(data.soportes);
        setTecnologias(data.tecnologias);
      } catch (error) {
        console.error("Error fetching subregions:", error);
      }
    };

    fetch_data();
  }, [token]);

  useEffect(() => {
    const fetch_subregion = async () => {
      try {
        const response = await fetch(`${url_municipios}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener subregiones.");
        const data = await response.json();
        //setSubregions(data.data);
        setMunicipios(data.data);
      } catch (error) {
        console.error("Error fetching subregions:", error);
      }
    };

    fetch_subregion();
  }, [token]);

  useEffect(() => {
    const fetch_proyecto = async () => {
      try {
        const response = await fetch(`${url_proyectos}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener subregiones.");
        const data = await response.json();
        //setSubregions(data.data);
        setProyectos(data.data);
      } catch (error) {
        console.error("Error fetching subregions:", error);
      }
    };

    fetch_proyecto();
  }, [token]);

  useEffect(() => {
    const fetch_operador = async () => {
      try {
        const response = await fetch(`${url_operadores}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener subregiones.");
        const data = await response.json();
        //setSubregions(data.data);
        setOperadores(data.data);
      } catch (error) {
        console.error("Error fetching subregions:", error);
      }
    };

    fetch_operador();
  }, [token]);

  useEffect(() => {
    const fetch_user = async () => {
      try {
        const response = await fetch(`${url_usuarios}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener usuarios.");
        const data = await response.json();
        console.log("data_usuario", data);
        //setSubregions(data.data);
        // setMunicipios(data.data);
      } catch (error) {
        console.error("Error fetching subregions:", error);
      }
    };

    fetch_user();
  }, [token]);

  // console.log("Municipios", municipios);
  // console.log("Operadores", operadores);
  // console.log("proyectos", proyectos);

  // const ejes = [
  //   "Gobernabilidad y gobernanza de la salud pública ",
  //   "Pueblos y comunidades étnicas y campesinas, mujeres, sectores LGBTIQ+ y otras poblaciones por condición y/o situación.",
  //   "Determinantes Sociales de la Salud",
  //   "Atención Primaria en Salud",
  //   "Cambio climático, emergencias, desastres y pandemias",
  //   "Conocimiento en salud pública y Soberanía Sanitaria",
  //   "Personal de salud",
  // ];

  // const equipos = ["Equipos básicos en salud", "Equipo complementario"];

  // const lineas = ["Cuidado de la salud en el territorio"];

  const customStyles = {
    control: (base) => ({
      ...base,
      minWidth: "280px", // Ajusta el ancho mínimo
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

  const handleStrategicAxisChange = (eventIndex, selectedOptions) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].eje_estrategico = selectedOptions.map(
      (option) => option.value
    ); // Almacenar solo los valores seleccionados
    setEvents(updatedEvents);
  };

  const handle_municipio = (eventIndex, selectedOptions) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].subregion = selectedOptions.map(
      (option) => option.value
    ); // Guarda los valores seleccionados en un array
    setEvents(updatedEvents);
  };

  const handleEquipoChange = (eventIndex, selectedOption) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].equipo_operativo = selectedOption
      ? selectedOption.value
      : ""; // Guarda el valor seleccionado o una cadena vacía si no hay selección
    setEvents(updatedEvents);
  };

  const handle_linea_change = (eventIndex, selectedOption) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].linea_operativa = selectedOption
      ? selectedOption.value
      : ""; // Guarda el valor seleccionado o una cadena vacía si no hay selección
    setEvents(updatedEvents);
  };

  // const handle_linea_change = (eventIndex, selectedOptions) => {
  //   const updatedEvents = [...events];
  //   updatedEvents[eventIndex].linea_operativa = selectedOptions.map(
  //     (option) => option.value
  //   ); // Almacenar solo los valores seleccionados
  //   setEvents(updatedEvents);
  // };

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  };

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        subregion: [],
        operador_pic: "",
        municipio_priorizado: "",
        codigo_nombre_territorio: "",
        codigo_micro_territorio: "",
        total_hogares: "",
        equipo_operativo: "",
        perfil_profesional: "",
        perfil_operativo: "",
        proyecto: "",
        description_event: "",
        indicator_name: "",
        meta_indicator: "",
        eje_estrategico: [],
        linea_operativa: "",
        activities: [],
        product_data: {
          producto: [
            {
              descripcion_producto: "",
              indicadores: [
                {
                  cantidad: "",
                  indicador_linea_base: "",
                  meta_producto: "",
                },
              ],
              // nombre_entidad: "",
              // descripcion_operador: "",
            },
          ],
        },
      },
    ]);
    setExpandedEvents([...expandedEvents, false]);
  };

  const handleToggleAccordion = (index) => {
    const updatedExpandedEvents = [...expandedEvents];
    updatedExpandedEvents[index] = !updatedExpandedEvents[index]; // Cambiamos el estado de ese acordeón
    setExpandedEvents(updatedExpandedEvents);
    // Condicion si queremos que el evento uno no se expanda
    // se puede aplicar o no
    if (index == 0) {
      setExpandedEvents([...expandedEvents, false]);
    }
  };

  const handleRemoveEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    const updatedExpandedEvents = [...expandedEvents];
    setEvents(updatedEvents);
    setExpandedEvents(updatedExpandedEvents);
  };

  const handle_proyecto = (eventIndex, selectedOption) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].proyecto = selectedOption
      ? selectedOption.value
      : ""; // Guarda el valor seleccionado o una cadena vacía si no hay selección
    setEvents(updatedEvents);
  };

  const handle_operador = (eventIndex, selectedOption) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].operador_pic = selectedOption
      ? selectedOption.value
      : ""; // Guarda el valor seleccionado o una cadena vacía si no hay selección
    setEvents(updatedEvents);
  };

  return (
    <div>
      {events.map((event, index) => (
        <div key={index} className={styles.eventWrapper}>
          <div className={styles.contenedor_titulo_evento}>
            {index > 0 ? (
              <strong
                className={styles.eventTitle}
                onClick={() => handleToggleAccordion(index)}
              >
                Evento {index + 1}
              </strong>
            ) : (
              <strong
                className={styles.eventTitle}
                onClick={() => handleToggleAccordion(index)}
              >
                Evento{" "}
              </strong>
            )}

            {index > 0 && (
              <button
                type="button"
                className={styles.removeButton_añadir}
                onClick={() => handleRemoveEvent(index)}
              >
                -
              </button>
            )}

            <button
              className={styles.buttonMain_añadir}
              type="button"
              onClick={handleAddEvent}
            >
              +
            </button>
          </div>

          {/* <h3 className={styles.eventTitle}>Evento {index + 1}</h3> */}
          {expandedEvents[index] && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nodo-Municipio Priorizado</th>
                  <th>Operador PIC</th>
                  <th>Código - Nombre de Territorio APS</th>
                  <th>Código Micro-Territorio</th>
                  <th>Total número de Hogares Beneficiarios</th>
                  <th>Equipo Operativo</th>
                  <th>Perfil Profesional</th>
                  <th>Perfil Operativo</th>
                  <th>Proyecto IDSN Responsable</th>
                  <th>Descripción Evento</th>
                  <th>Nombre del Indicador</th>
                  <th>Meta Indicador</th>
                  <th>Ejes Estratégicos</th>
                  <th>Lineas Operativas</th>
                  <th>Productos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Select
                      isMulti
                      value={event?.subregion?.map((subregion) => ({
                        value: subregion,
                        //   label:
                        //     municipios.find(
                        //       (muni) => muni.documentId === subregion.documentId
                        //     )?.label || subregion.documentId, // Muestra el label.
                        // }))}
                        label:
                          municipios.find(
                            (muni) => muni.documentId === subregion
                          )?.label || subregion, // Muestra el label.
                      }))}
                      // options={municipios.map((muni) => ({
                      //   value: { documentId: muni.documentId, id: muni.id },
                      //   label: muni.label,
                      // }))}
                      options={municipios.map((muni) => ({
                        value: muni.documentId,
                        label: muni.label,
                      }))}
                      onChange={(selectedOptions) =>
                        handle_municipio(index, selectedOptions)
                      }
                      placeholder="Seleccionar Region"
                      styles={customStyles}
                    />
                  </td>

                  <td>
                    <Select
                      name="operador"
                      options={operadores.map((option) => ({
                        value: option.documentId, // Valor asociado internamente
                        label: option.operador_pic, // Texto visible al usuario
                      }))}
                      value={
                        event.operador_pic
                          ? {
                              value: event.operador_pic,
                              label:
                                operadores.find(
                                  (operador) =>
                                    operador.documentId === event.operador_pic
                                )?.operador_pic || event.operador_pic,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handle_operador(index, selectedOption)
                      }
                      placeholder="Seleccionar Operador"
                      styles={customStyles}
                    />
                  </td>

                  <td>
                    <div className={styles.cellWrapper}>
                      <textarea
                        className={styles.textarea}
                        type="text"
                        value={event.codigo_nombre_territorio || ""}
                        onChange={(e) =>
                          handleEventChange(
                            index,
                            "codigo_nombre_territorio",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <div className={styles.cellWrapper}>
                      <textarea
                        className={styles.textarea}
                        type="text"
                        value={event.codigo_micro_territorio || ""}
                        onChange={(e) =>
                          handleEventChange(
                            index,
                            "codigo_micro_territorio",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      className={styles.input_hogares}
                      type="text"
                      value={event.total_hogares}
                      onChange={(e) =>
                        handleEventChange(
                          index,
                          "total_hogares",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Select
                      name="equipo_operativo"
                      options={equipos.map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      value={
                        event.equipo_operativo
                          ? {
                              value: event.equipo_operativo,
                              label: event.equipo_operativo,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleEquipoChange(index, selectedOption)
                      }
                      placeholder="Seleccionar Equipo"
                      styles={customStyles}
                    />
                  </td>

                  <td>
                    <textarea
                      className={styles.textarea}
                      type="text"
                      value={event.perfil_profesional || ""}
                      onChange={(e) =>
                        handleEventChange(
                          index,
                          "perfil_profesional",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      className={styles.textarea}
                      type="text"
                      value={event.perfil_operativo || ""}
                      onChange={(e) =>
                        handleEventChange(
                          index,
                          "perfil_operativo",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Select
                      name="proyecto"
                      options={proyectos.map((option) => ({
                        value: option.documentId, // Valor asociado internamente
                        label: option.proyecto, // Texto visible al usuario
                      }))}
                      value={
                        event.proyecto
                          ? {
                              value: event.proyecto,
                              label:
                                proyectos.find(
                                  (proyecto) =>
                                    proyecto.documentId === event.proyecto
                                )?.proyecto || event.proyecto,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handle_proyecto(index, selectedOption)
                      }
                      placeholder="Seleccionar Proyecto"
                      styles={customStyles}
                    />
                  </td>
                  <td>
                    <textarea
                      className={styles.textarea}
                      type="text"
                      value={event.description_event || ""}
                      onChange={(e) =>
                        handleEventChange(
                          index,
                          "description_event",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      className={styles.textarea}
                      type="text"
                      value={event.indicator_name || ""}
                      onChange={(e) =>
                        handleEventChange(
                          index,
                          "indicator_name",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      className={styles.textarea}
                      type="text"
                      value={event.meta_indicator || ""}
                      onChange={(e) =>
                        handleEventChange(
                          index,
                          "meta_indicator",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <Select
                      isMulti
                      value={event.eje_estrategico.map((axis) => ({
                        value: axis,
                        label: axis,
                      }))}
                      options={ejes.map((eje) => ({
                        value: eje,
                        label: eje,
                      }))}
                      onChange={(selectedOptions) =>
                        handleStrategicAxisChange(index, selectedOptions)
                      }
                      placeholder="Seleccionar ejes..."
                      styles={customStyles}
                    />
                  </td>

                  <td>
                    {/* <Select
                      isMulti
                      value={event.linea_operativa.map((axis) => ({
                        value: axis,
                        label: axis,
                      }))}
                      options={lineas.map((linea) => ({
                        value: linea,
                        label: linea,
                      }))}
                      onChange={(selectedOptions) =>
                        handleLineaChange(index, selectedOptions)
                      }
                      placeholder="Seleccionar Lineas..."
                      styles={customStyles}
                    /> */}

                    <Select
                      name="linea"
                      options={lineas.map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      value={
                        event.linea_operativa
                          ? {
                              value: event.linea_operativa,
                              label: event.linea_operativa,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handle_linea_change(index, selectedOption)
                      }
                      placeholder="Seleccionar Linea "
                      styles={customStyles}
                    />
                  </td>

                  <td>
                    <Product
                      product_data={event.product_data}
                      entornos={entornos}
                      tecnologias={tecnologias}
                      poblaciones={poblaciones}
                      soportes={soportes}
                      cups={cups}
                      setProductData={(updatedProductData) => {
                        const updatedEvents = [...events];
                        updatedEvents[index].product_data = updatedProductData;
                        setEvents(updatedEvents);
                      }}
                      activities={event.activities}
                      setActivities={(activities) => {
                        const updatedEvents = [...events];
                        updatedEvents[index].activities = activities;
                        setEvents(updatedEvents);
                      }}
                    />
                  </td>
                  <td>
                    {index > 0 && (
                      <button
                        type="button"
                        className={styles.removeButton_añadir}
                        onClick={() => handleRemoveEvent(index)}
                      >
                        -
                      </button>
                    )}
                    {edit_button}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      ))}

      {/* <button
        className={styles.buttonAdd}
        type="button"
        onClick={handleAddEvent}
      >
        Añadir Otro Evento
      </button> */}
    </div>
  );
};

export default Event;
