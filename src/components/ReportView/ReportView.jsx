import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./ReporView.module.css";
import Spinner from "../Spinner/Spinner";

const ReportView = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterValue, setFilterValue] = useState(""); // Estado para el filtro
  const [operatorFilterValue, setOperatorFilterValue] = useState(""); // Filtro por operador

  const back = import.meta.env.VITE_APP_BACK;
  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;

  const navigate = useNavigate(); // Hook para navegación

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

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  console.log("datos", data);
  console.log("token", token);

  const handle_click = (evento) => {
    navigate("/edit", {
      state: {
        evento: evento, // Pasa aquí los datos que necesitas
      },
    });
  };

  // Obtener lista única de valores para el menú desplegable
  const projectOptions = [
    ...new Set(
      data?.data?.flatMap((row) =>
        row.eventos.map((evento) => evento.proyecto_idsn?.proyecto)
      )
    ),
  ].filter(Boolean); // Filtrar valores no válidos (null, undefined)

  // Obtener lista única de valores para el menú desplegable de operadores
  const operatorOptions = [
    ...new Set(
      data?.data?.flatMap((row) =>
        row.eventos.flatMap((evento) =>
          evento.productos.map(
            (producto) => producto.operador_pic.nombre_entidad
          )
        )
      )
    ),
  ].filter(Boolean);

  // Filtrar datos basados en el valor seleccionado
  // const filteredData = data?.data
  //   ?.map((row) => ({
  //     ...row,
  //     eventos: row.eventos.filter(
  //       (evento) =>
  //         !filterValue || evento.proyecto_idsn?.proyecto === filterValue
  //     ),
  //   }))
  //   .filter((row) => row.eventos.length > 0);

  // Filtrar datos basados en los valores seleccionados
  const filteredData = data?.data
    ?.map((row) => ({
      ...row,
      eventos: row.eventos.filter(
        (evento) =>
          (!filterValue || evento.proyecto_idsn?.proyecto === filterValue) &&
          (!operatorFilterValue ||
            evento.productos.some(
              (producto) =>
                producto.operador_pic.nombre_entidad === operatorFilterValue
            ))
      ),
    }))
    .filter((row) => row.eventos.length > 0);

  console.log("filtro", filterValue);
  return (
    <>
      <Header />
      <h1>Anexo Técnicos</h1>
      {/* Menú desplegable para filtrar */}
      <div className={styles.filterContainer}>
        <label htmlFor="proyectoFilter">Filtrar por Proyecto IDSN:</label>
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Todos los proyectos</option>
          {projectOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterContainer}>
        <label htmlFor="operatorFilter">Filtrar por Operador:</label>
        <select
          value={operatorFilterValue}
          onChange={(e) => setOperatorFilterValue(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Todos los operadores</option>
          {operatorOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formContainer}>
        {filteredData?.map((row, index) =>
          row.eventos.map((evento) => (
            <table key={`${index}-${evento.id}`} className={styles.table}>
              <thead>
                <tr>
                  <th>Subregión</th>
                  <th>Nodo - Municipio Priorizado</th>
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
                  {(filterValue || operatorFilterValue) != "" && (
                    <th>Productos</th>
                  )}
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
                    <table>
                      <tbody>
                        {evento.ejes_estrategicos.map((eje, index) => (
                          <tr key={index}>
                            <td>{eje.nombre}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tbody>
                        {evento.lineas_operativa.map((linea, index) => (
                          <tr key={index}>
                            <td>{linea.nombre}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  {(filterValue || operatorFilterValue) != "" && (
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

                              <td>
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Entidad</th>
                                      <th>Descripcion</th>
                                    </tr>
                                    <tr></tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        {producto.operador_pic.nombre_entidad}
                                      </td>
                                      <td>
                                        {producto.operador_pic.descripcion}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td>
                                {producto.actividades.map(
                                  (actividad, indicadorIndex) => (
                                    <table
                                      key={indicadorIndex}
                                      className={styles.subTable}
                                      style={{ marginBottom: "1rem" }} // Espaciado entre tablas
                                    >
                                      <thead>
                                        <tr>
                                          <th>Descripcion</th>
                                          <th>Cantidad a Ejecutar</th>
                                          <th>Unidad de Medida</th>
                                          <th>Entornos</th>
                                          <th>Tecnologias</th>
                                          <th>Poblacion Sujeto</th>
                                          <th>Soportes</th>
                                          <th>Código Cups</th>
                                          <th>Valor Unitario</th>
                                          <th>Valor Total</th>
                                          <th>Cronograma</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>{actividad.descripcion}</td>
                                          <td>
                                            {actividad.cantidad_a_ejecutar}
                                          </td>
                                          <td>{actividad.unidad_medida}</td>
                                          <td>
                                            {actividad.entornos.map(
                                              (entorno, indicadorIndex) => (
                                                <tr>*{entorno.nombre}</tr>
                                              )
                                            )}
                                          </td>
                                          <td>
                                            {actividad.tecnologias.map(
                                              (tecno, indicadorIndex) => (
                                                <tr>*{tecno.nombre}</tr>
                                              )
                                            )}
                                          </td>
                                          <td>
                                            {actividad.poblaciones.map(
                                              (poblacion, indicadorIndex) => (
                                                <tr>*{poblacion.nombre}</tr>
                                              )
                                            )}
                                          </td>

                                          <td>
                                            {actividad.soportes.map(
                                              (soporte, indicadorIndex) => (
                                                <table
                                                  key={indicadorIndex}
                                                  className={styles.subTable}
                                                  style={{
                                                    marginBottom: "1rem",
                                                  }} // Espaciado entre tablas
                                                >
                                                  <thead>
                                                    <tr>
                                                      <th>Tipo Soporte</th>
                                                      <th>Descripcion</th>
                                                      <th>Cantidad</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td>{soporte.tipo}</td>
                                                      <td>
                                                        {soporte.descripcion}
                                                      </td>
                                                      <td>
                                                        {soporte.cantidad}
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              )
                                            )}
                                          </td>
                                          <td>{actividad.cups.codigo}</td>
                                          <td>{actividad.valor_unitario}</td>
                                          <td>{actividad.valor_total}</td>
                                          <td>
                                            <table
                                              key={indicadorIndex}
                                              className={styles.subTable}
                                              style={{ marginBottom: "1rem" }} // Espaciado entre tablas
                                            >
                                              <thead>
                                                <tr>
                                                  <th>Mes</th>
                                                  <th>Porcentaje</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {actividad.cronograma.map(
                                                  (crono, indicadorIndex) => (
                                                    <tr>
                                                      {crono.Ene > 0 && (
                                                        <>
                                                          <td>Enero</td>
                                                          <td>{crono.Ene}%</td>
                                                        </>
                                                      )}
                                                      {crono.Feb > 0 && (
                                                        <>
                                                          <td>Febrero</td>
                                                          <td>{crono.Feb}%</td>
                                                        </>
                                                      )}
                                                      {crono.Mar > 0 && (
                                                        <>
                                                          <td>Marzo</td>
                                                          <td>{crono.Mar}%</td>
                                                        </>
                                                      )}
                                                      {crono.Abr > 0 && (
                                                        <>
                                                          <td>Abril</td>
                                                          <td>{crono.Abr}%</td>
                                                        </>
                                                      )}
                                                      {crono.May > 0 && (
                                                        <>
                                                          <td>Mayo</td>
                                                          <td>{crono.May}%</td>
                                                        </>
                                                      )}
                                                      {crono.Jun > 0 && (
                                                        <>
                                                          <td>Junio</td>
                                                          <td>{crono.Jun}%</td>
                                                        </>
                                                      )}
                                                      {crono.Jul > 0 && (
                                                        <>
                                                          <td>Julio</td>
                                                          <td>{crono.Jul}%</td>
                                                        </>
                                                      )}
                                                      {crono.Ago > 0 && (
                                                        <>
                                                          <td>Agosto</td>
                                                          <td>{crono.Ago}%</td>
                                                        </>
                                                      )}
                                                      {crono.Sept > 0 && (
                                                        <>
                                                          <td>Septiembre</td>
                                                          <td>{crono.Sept}%</td>
                                                        </>
                                                      )}
                                                      {crono.Oct > 0 && (
                                                        <>
                                                          <td>Octubre</td>
                                                          <td>{crono.Oct}%</td>
                                                        </>
                                                      )}
                                                      {crono.Nov > 0 && (
                                                        <>
                                                          <td>Noviembre</td>
                                                          <td>{crono.Nov}%</td>
                                                        </>
                                                      )}
                                                      {crono.Dic > 0 && (
                                                        <>
                                                          <td>Diciembre</td>
                                                          <td>{crono.Dic}%</td>
                                                        </>
                                                      )}
                                                    </tr>
                                                  )
                                                )}
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  )
                                )}
                              </td>
                            </tbody>
                          </table>
                        </tr>
                      ))}
                    </tr>
                  )}

                  <td>
                    {/* <button onClick={() => handle_click(evento)}>Editar</button> */}
                    <button
                      onClick={() =>
                        handle_click({
                          ...evento,
                          documentId: row.documentId, // Agregar documentId aquí
                        })
                      }
                    >
                      Editar
                    </button>
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
