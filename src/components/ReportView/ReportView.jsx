import React, { useState, useEffect } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Event from "../Event/Event";
import styles from "./ReporView.module.css";

const ReportView = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const token = useSelector((state) => state.token.token);

  const back = import.meta.env.VITE_APP_BACK;
  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${back}/api/anexo-tecnicos?pLevel=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("datos", data);
  console.log("datos11", data.data[0]);
  return (
    <>
      <Header />
      <h1>Anexo Técnicos</h1>
      <div className={styles.formContainer}>
        {data.data.map((row, index) =>
          row.eventos.map((evento) => (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Subregión</th>
                  <th>Municipio Priorizado</th>
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
                  <td>{evento.territorializacion.subregion}</td>
                  <td>{evento.territorializacion.municipio}</td>
                  <td>{evento.territorializacion.territorio}</td>
                  <td>{evento.territorializacion.microterritorio}</td>
                  <td>{evento.territorializacion.numero_hogares}</td>
                  <td>{evento.equipo}</td>
                  <td>{evento.perfiles_profesional}</td>
                  <td>{evento.perfil_operativo}</td>
                  <td>{evento.proyecto_idsn.proyecto}</td>
                  <td>{evento.descripcion}</td>
                  <td>{evento.indicador_evento}</td>
                  <td>{evento.meta_indicador_evento}</td>
                  <td>
                    <div>
                      <ul>
                        {evento.ejes_estrategicos.map((eje, index) => (
                          <li>{eje.nombre}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div>
                      <ul>
                        {evento.lineas_operativa.map((linea, index) => (
                          <li>{linea.nombre}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  <tr>
                    {evento.productos.map((producto, subIndex) => (
                      <tr colSpan="4">
                        <table className={styles.subTable}>
                          <thead>
                            <tr>
                              <th>Descripcion del producto</th>
                              <th>Indicadores</th>
                              <th>Operador PIC</th>
                              <th>Actividades</th>
                            </tr>
                          </thead>
                          <tbody>
                            <td>{producto.descripcion}</td>

                            <td>
                              {producto.indicadores.map(
                                (indicador, indicadorIndex) => (
                                  <table
                                    key={indicadorIndex}
                                    className={styles.subTable}
                                    style={{ marginBottom: "1rem" }} // Espaciado entre tablas
                                  >
                                    <thead>
                                      <tr>
                                        <th>Indicador linea base</th>
                                        <th>Cantidad</th>
                                        <th>Meta Producto</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          {indicador.indicador_linea_base}
                                        </td>
                                        <td>{indicador.cantidad}</td>
                                        <td>{indicador.meta_producto}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                )
                              )}
                            </td>
                            <td>{producto.descripcion}</td>
                          </tbody>
                        </table>
                      </tr>
                    ))}
                  </tr>

                  <td>
                    <div className={styles.cellWrapper}>
                      <p>hola</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        )}
      </div>
    </>
  );
};

export default ReportView;
