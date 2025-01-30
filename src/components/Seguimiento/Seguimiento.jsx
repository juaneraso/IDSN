import React, { useState, useEffect } from "react";
import styles from "./Seguimiento.module.css";
import Header from "../Header/Header";

import { useLocation } from "react-router-dom";

const Seguimiento = () => {
  const location = useLocation();
  const actividad = location.state?.actividad;

  const back = import.meta.env.VITE_APP_BACK;
  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;
  const url_soportes = `${back}/api/check-seguimiento?`;
  const [soportes, setSoportes] = useState([]);

  console.log("Actividad", actividad);

  const documentId = actividad.documentId;
  const soporteId = actividad.soportes[0].id;

  const [estadoSoportes, setEstadoSoportes] = useState({});

  const [obser_referente, setReferente] = useState("");
  const [obser_operador, setOperador] = useState("");

  const [observaciones, setObservaciones] = useState({
    observacion_referente: "",
    observacion_operador: "",
  });

  const handleEstadoChange = (soporteId, nuevoEstado) => {
    setEstadoSoportes((prevState) => ({
      ...prevState,
      [soporteId]: nuevoEstado,
    }));
  };

  //   const onChangeReferente = (event) => {
  //     setReferente(event.target.value);
  //   };

  const onChange_observaciones = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setObservaciones({ ...observaciones, [property]: value });

    // validate({ ...observaciones, [property]: value });
  };

  console.log("estadoSoportes", estadoSoportes);
  console.log("observaciones", observaciones);

  useEffect(() => {
    const fetchSoportes = async () => {
      if (!actividad || !actividad.soportes || actividad.soportes.length === 0)
        return;

      try {
        const requests = actividad.soportes.map(async (soporte) => {
          const response = await fetch(
            `${url_soportes}anexo_id=${actividad.documentId}&soporte_id=${soporte.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) throw new Error("Error al obtener soportes");
          const data = await response.json();
          return { soporteId: soporte.id, data };
        });

        const results = await Promise.all(requests);
        // Convertir el array de resultados en un objeto { soporteId: data }
        const soportesMap = results.reduce((acc, { soporteId, data }) => {
          acc[soporteId] = data;
          return acc;
        }, {});

        setSoportes(soportesMap);
      } catch (error) {
        console.error("Error fetching soportes:", error);
      }
    };

    fetchSoportes();
  }, [token, actividad]); // Se ejecuta cuando `actividad` o `token` cambian

  console.log("soportes", soportes);

  return (
    <>
      <Header />

      <div>
        <h1>Seguimiento</h1>
      </div>

      <div className={styles.formContainer}>
        <table className={styles.table} style={{ marginBottom: "1rem" }}>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad a Ejecutar</th>
              <th>Unidad de Medida</th>
              <th>Entornos</th>
              <th>Tecnologías</th>
              <th>Población Sujeto</th>
              <th>Soportes</th>
              <th>Código Cups</th>
              <th>Valor Unitario</th>
              <th>Valor Total</th>
              <th>Cronograma</th>
              <th>Observación Referente</th>
              <th>Observación Operador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{actividad.descripcion}</td>
              <td>{actividad.cantidad_a_ejecutar}</td>
              <td>{actividad.unidad_medida}</td>
              <td>
                {actividad.entornos.map((entorno, index) => (
                  <p key={index}>*{entorno.nombre}</p>
                ))}
              </td>
              <td>
                {actividad.tecnologias.map((tecno, index) => (
                  <p key={index}>*{tecno.nombre}</p>
                ))}
              </td>
              <td>
                {actividad.poblaciones.map((poblacion, index) => (
                  <p key={index}>*{poblacion.nombre}</p>
                ))}
              </td>
              <td>
                {/* {actividad.soportes.map((soporte, index) => (
                  <table
                    key={index}
                    className={styles.subTable}
                    style={{ marginBottom: "1rem" }}
                  >
                    <thead>
                      <tr>
                        <th>Tipo Soporte</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Soportes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{soporte.tipo}</td>
                        <td>{soporte.descripcion}</td>
                        <td>{soporte.cantidad}</td>

                        {soportes.map((soportes, index) => (
                          <tr key={index}>
                            <td>{soportes.archivos[0].name}</td>
                            <td>{soportes.archivos[0].url}</td>
                          </tr>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                ))} */}
                {actividad.soportes.map((soporte, index) => (
                  <table
                    key={index}
                    className={styles.subTable}
                    style={{ marginBottom: "1rem" }}
                  >
                    <thead>
                      <tr>
                        <th>Tipo Soporte</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Soportes</th>
                        <th>Check</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{soporte.tipo}</td>
                        <td>{soporte.descripcion}</td>
                        <td>{soporte.cantidad}</td>
                        <td>
                          {soportes[soporte.id]?.archivos?.map((archivo, i) => (
                            <tr key={i}>
                              <td>{archivo.name}</td>
                              <td>
                                <a
                                  href={archivo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Ver soporte
                                </a>
                              </td>
                            </tr>
                          )) || <p>No hay archivos</p>}
                        </td>
                        <td>
                          <td>
                            {/* <select
                              className={styles.select}
                              value={estadoSoportes[soporte.id] || "En proceso"}
                              onChange={(e) =>
                                handleEstadoChange(soporte.id, e.target.value)
                              }
                            >
                              <option value="Cumple">✅ Cumple</option>
                              <option value="No cumple">❌ No cumple</option>
                              <option value="En proceso">⏳ En proceso</option>
                            </select> */}
                            <select
                              className={styles.select}
                              value={estadoSoportes[soporte.id] || ""}
                              onChange={(e) =>
                                handleEstadoChange(soporte.id, e.target.value)
                              }
                            >
                              <option value="" disabled>
                                🟡 Selecciona un estado
                              </option>
                              <option value="Cumple">✅ Cumple</option>
                              <option value="No cumple">❌ No cumple</option>
                              <option value="En proceso">⏳ En proceso</option>
                            </select>
                          </td>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </td>

              <td>{actividad.cups.codigo}</td>
              <td>{actividad.valor_unitario}</td>
              <td>{actividad.valor_total}</td>
              <td>
                <table
                  className={styles.subTable}
                  style={{ marginBottom: "1rem" }}
                >
                  <thead>
                    <tr>
                      <th>Mes</th>
                      <th>Porcentaje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actividad.cronograma.map((crono, index) =>
                      Object.entries(crono).map(([mes, porcentaje]) =>
                        porcentaje > 0 ? (
                          <tr key={`${index}-${mes}`}>
                            <td>{mes}</td>
                            <td>{porcentaje}%</td>
                          </tr>
                        ) : null
                      )
                    )}
                  </tbody>
                </table>
              </td>
              <td>
                <textarea
                  //   className={styles.textarea}
                  name="observacion_referente"
                  type="text"
                  value={observaciones.observacion_referente}
                  onChange={onChange_observaciones}
                />
              </td>

              <td>
                <textarea
                  //   className={styles.textarea}
                  name="observacion_operador"
                  type="text"
                  value={observaciones.observacion_operador}
                  onChange={onChange_observaciones}
                />
              </td>

              <td>
                {/* <button
                  onClick={() =>
                    handle_click_actividad({
                      ...actividad,
                      documentId: actividad.documentId,
                    })
                  }
                >
                  Seguimiento
                </button> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Seguimiento;
