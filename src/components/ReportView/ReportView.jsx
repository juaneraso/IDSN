// import React, { useState, useEffect } from "react";
// import qs from "qs";
// import { useSelector } from "react-redux";
// import Header from "../Header/Header";

// const ReportView = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = useSelector((state) => state.token.token);
//   //   const token =
//   //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM0MzcwMDI5LCJleHAiOjE3MzQ0NTY0Mjl9.91SQwnPAwYCHJQt92_Y2vLhk_pcXtY0yQPNecYvpnlM";
//   console.log("token", token);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const query = qs.stringify(
//           {
//             populate: {
//               territorializacion: {
//                 populate: {
//                   ubicacion: {
//                     populate: ["municipio", "subregion"],
//                   },
//                   territorio: "*",
//                   microterritorio: "*",
//                 },
//               },
//               eventos: {
//                 populate: {
//                   indicadores: "*",
//                   ejes_estrategicos: "*",
//                   lineas_operativa: "*",
//                   operador_pic: { populate: "municipio" },
//                   contenido_producto: {
//                     populate: {
//                       productos: {
//                         populate: {
//                           actividades: {
//                             populate: [
//                               "unidad_medida",
//                               "entornos",
//                               "tecnologias",
//                               "poblaciones",
//                               "soportes.municipio",
//                               "equipos",
//                               "perfiles_profesionales",
//                               "cups",
//                             ],
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           { encodeValuesOnly: true } // Opcional, para evitar que encodee innecesariamente.
//         );

//         const response = await fetch(
//           `http://localhost:1337/api/anexo-tecnicos?${query}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   console.log("data", data);

//   return (
//     <div>
//       <Header />
//       <h1>Anexo Técnicos</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default ReportView;

import React, { useState, useEffect } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import Header from "../Header/Header";

const ReportView = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = qs.stringify(
          {
            populate: {
              territorializacion: {
                populate: {
                  ubicacion: {
                    populate: ["municipio", "subregion"],
                  },
                  territorio: "*",
                  microterritorio: "*",
                },
              },
              eventos: {
                populate: {
                  indicadores: "*",
                  ejes_estrategicos: "*",
                  lineas_operativa: "*",
                  operador_pic: { populate: "municipio" },
                  contenido_producto: {
                    populate: {
                      productos: {
                        populate: {
                          actividades: {
                            populate: [
                              "unidad_medida",
                              "entornos",
                              "tecnologias",
                              "poblaciones",
                              "soportes.municipio",
                              "equipos",
                              "perfiles_profesionales",
                              "cups",
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          { encodeValuesOnly: true }
        );

        const response = await fetch(
          `http://localhost:1337/api/anexo-tecnicos?${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    <div>
      <Header />
      <h1>Anexo Técnicos</h1>
      <div>
        {data.data.map((anexo) => {
          return (
            <div
              key={anexo.id}
              style={{
                border: "1px solid #ccc",
                margin: "1rem",
                padding: "1rem",
              }}
            >
              <h2>Anexo Técnico ID: {anexo.id}</h2>
              <p>Numero Hogares : {anexo.territorializacion.numero_hogares}</p>
              <p>
                Numero Micro-Territorios :
                {anexo.territorializacion.numero_microterritorios}
              </p>
              <h3>Ubicacion</h3>
              <p>
                Municipio :{anexo.territorializacion.ubicacion.municipio.nombre}
              </p>
              <p>
                Sub-Region :
                {anexo.territorializacion.ubicacion.subregion.nombre}
              </p>
              {anexo.territorializacion.territorio.map((territorio) => (
                <div key={territorio.id}>
                  <p>Id-Territorio: {territorio.id_territorio}</p>
                  <p>Tipo-Territorio: {territorio.tipo}</p>
                </div>
              ))}

              {anexo.territorializacion.microterritorio.map((micro) => (
                <div key={micro.id}>
                  <p>Nombre-microterritorio: {micro.nombre}</p>
                  <p>Id-microterritorio: {micro.id_microterritorio}</p>
                  <p>Tipo-microterritorio: {micro.tipo}</p>
                </div>
              ))}

              <div>
                <h3>Eventos</h3>
                {anexo.eventos.map((evento) => (
                  <div key={evento.id} style={{ marginBottom: "1rem" }}>
                    <p>Descripción: {evento.descripcion}</p>

                    <h3>Indicadores</h3>

                    {evento.indicadores?.map((indicador) => (
                      <div key={indicador.id}>
                        <p>nombre: {indicador.nombre}</p>
                        <p>Descripción: {indicador.descripcion}</p>
                        <p>Meta Resultado: {indicador.meta_resultado}</p>
                      </div>
                    ))}

                    <h3>Ejes Estrategicos</h3>

                    {evento.ejes_estrategicos?.map((eje) => (
                      <div key={eje.id}>
                        <p>nombre: {eje.nombre}</p>
                      </div>
                    ))}

                    <p>Linea Operativa:{evento.lineas_operativa.nombre}</p>

                    <h3>Operador-Pic</h3>

                    <p>Operador:{evento.operador_pic?.nombre_entidad}</p>
                    <p>Descripcion:{evento.operador_pic?.descripcion}</p>
                    <p>Municipio:{evento.operador_pic?.municipio.nombre}</p>

                    <h3>Productos</h3>
                    <p>Descripcion:{evento.contenido_producto.descripcion}</p>

                    {evento.contenido_producto?.productos.map((producto) => (
                      <div key={producto.id}>
                        <p>Indicador: {producto.indicador}</p>
                        <p>
                          Indicador-Linea-Base: {producto.indicador_linea_base}
                        </p>

                        <h3>Actividades</h3>
                        {producto?.actividades.map((actividad) => (
                          <div key={actividad.id}>
                            <p>Descripcion: {actividad.descripcion}</p>
                            <p>
                              Cantidad a Ejecutar:{" "}
                              {actividad.cantidad_a_ejecutar}
                            </p>
                            <p>Valor Unitario: {actividad?.valor_unitario}</p>
                            <p>Valor Total: {actividad?.valor_total}</p>
                            <p>Observaciones: {actividad?.Observaciones}</p>
                            <p>
                              Porcentaje Cumplimiento:{" "}
                              {actividad?.porcentaje_cumplimiento}
                            </p>
                            <p>
                              Observaciones Seguimiento:{" "}
                              {actividad?.Observaciones_seguimiento}
                            </p>
                            <p>
                              Unidad Medida: {actividad?.unidad_medida.nombre}
                            </p>
                            <h3>Entornos</h3>
                            {actividad.entornos?.map((entorno) => (
                              <div key={entorno.id}>
                                <p>nombre: {entorno.nombre}</p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportView;
