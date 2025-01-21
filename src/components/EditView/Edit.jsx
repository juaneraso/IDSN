import React, { useState, useEffect } from "react";
import Event from "../Event/Event";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Swal from "sweetalert2";
import styles from "../EditView/Edit.module.css";

const Edit = () => {
  const back = import.meta.env.VITE_APP_BACK;
  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;

  const location = useLocation();
  const evento = location.state?.evento; // Recupera los datos enviados

  console.log("Evento recibido:", evento);

  const handle_send = async (event) => {
    // event.preventDefault();

    try {
      // Transformar los datos al formato requerido

      // const transformedData = {
      //   data: {
      //     eventos: events.map((event) => ({
      //       equipo: event.equipo_operativo || null,
      //       operador_pic: {
      //         connect: [{ documentId: event.operador_pic }] || null,
      //       },
      //       perfiles_profesional: event.perfil_profesional || null,
      //       perfil_operativo: event.perfil_operativo || null,
      //       territorializacion: {
      //         numero_hogares: parseInt(event.total_hogares, 10) || null,
      //         municipios: {
      //           connect: (event.subregion || []).map((region) => ({
      //             documentId: region || null,
      //           })),
      //         },
      //         // municipio: event.municipio_priorizado || null,
      //         territorio: event.codigo_nombre_territorio || null,
      //         microterritorio: event.codigo_micro_territorio || null,
      //         // subregion: event.subregion || null,
      //       },

      //       descripcion: event.description_event || null,
      //       indicador_evento: event.indicator_name || null,
      //       meta_indicador_evento: event.meta_indicator || null,

      //       ejes_estrategicos: (event.eje_estrategico || []).map((eje) => ({
      //         nombre: eje || null,
      //       })),
      //       lineas_operativa: (event.linea_operativa || []).map((linea) => ({
      //         nombre: linea || null,
      //       })),

      //       productos: event.product_data.producto.map((producto, index) => ({
      //         descripcion: producto.descripcion_producto || null,

      //         actividades: (event.activities[index] || []).map((activity) => ({
      //           descripcion: activity.descripcion_actividad || null,
      //           cantidad_a_ejecutar: activity.cantidad || null,
      //           unidad_medida: activity.unidad_medida || null,
      //           valor_unitario: activity.valor_unitario || null,
      //           valor_total: activity.valor_total || null,
      //           entornos: activity.entorno.map((entorno) => ({
      //             nombre: entorno || null,
      //           })),

      //           tecnologias: activity.tecnologia.map((tecno) => ({
      //             nombre: tecno || null,
      //           })),

      //           poblaciones: activity.poblacion_sujeto.map((poblacion) => ({
      //             nombre: poblacion || null,
      //           })),
      //           cups: { codigo: activity.codigo_cups } || null,
      //           soportes: activity.array_soportes.map((soporte) => ({
      //             tipo: soporte.tipo_soporte || null,
      //             descripcion: soporte.descripcion_soporte || null,
      //             cantidad: soporte.cantidad_soporte || null,
      //           })),
      //           cronograma: activity.cronograma.map((item) => ({
      //             [item.mes]: parseInt(item.peso, 10),
      //           })),
      //         })),
      //         // operador_pic: producto.operador_pic.operador_pic,

      //         // operador_pic: {
      //         //   nombre_entidad: producto.nombre_entidad || null,
      //         //   descripcion: "hoola" || null,
      //         // },
      //         indicadores: (producto.indicadores || []).map((indicador) => ({
      //           meta_producto: indicador.meta_producto || null,
      //           cantidad: indicador.cantidad || null,
      //           indicador_linea_base: indicador.indicador_linea_base || null,
      //         })),
      //       })),
      //       proyectos_idsn: {
      //         connect: [{ documentId: event.proyecto }] || null,
      //       },
      //     })),
      //   },
      // };

      const transformedData = {
        data: {
          eventos: events.map((event) => ({
            // operador_pic: {
            //   connect: [{ documentId: event.operador_pic }] || null,
            // },
            operador_pic: event.operador_pic
              ? {
                  connect: [{ documentId: event.operador_pic }],
                }
              : null,
            equipo: event.equipo_operativo || null,
            perfiles_profesional: event.perfil_profesional || null,
            perfil_operativo: event.perfil_operativo || null,
            // territorializacion:
            //   {
            //     numero_hogares: parseInt(event.total_hogares, 10) || null,
            //     municipios: {
            //       connect: (event.subregion || []).map((region) => ({
            //         documentId: region || null,
            //       })),
            //     },
            //     territorio: event.codigo_nombre_territorio || null,
            //     microterritorio: event.codigo_micro_territorio || null,
            //   } || null,
            territorializacion:
              event.total_hogares ||
              (Array.isArray(event.subregion) && event.subregion.length > 0) ||
              event.codigo_nombre_territorio ||
              event.codigo_micro_territorio
                ? {
                    numero_hogares: parseInt(event.total_hogares, 10) || null,
                    municipios:
                      Array.isArray(event.subregion) &&
                      event.subregion.length > 0
                        ? {
                            connect: (event.subregion || []).map((region) => ({
                              documentId: region || null,
                            })),
                          }
                        : [],
                    territorio: event.codigo_nombre_territorio || null,
                    microterritorio: event.codigo_micro_territorio || null,
                  }
                : null,

            descripcion: event.description_event || null,
            indicador_evento: event.indicator_name || null,
            meta_indicador_evento: event.meta_indicator || null,

            ejes_estrategicos: (event.eje_estrategico || []).map((eje) => ({
              nombre: eje || null,
            })),
            // lineas_operativa: (event.linea_operativa || []).map((linea) => ({
            //   nombre: linea || null,
            // })),
            lineas_operativa:
              Array.isArray(event.linea_operativa) &&
              event.linea_operativa.length > 0
                ? [
                    {
                      nombre: event.linea_operativa,
                    },
                  ]
                : [],

            productos: event.product_data.producto.map((producto, index) => ({
              descripcion: producto.descripcion_producto || null,

              actividades: (event.activities[index] || []).map((activity) => ({
                descripcion: activity.descripcion_actividad || null,
                cantidad_a_ejecutar: activity.cantidad || null,
                unidad_medida: activity.unidad_medida || null,
                valor_unitario: activity.valor_unitario || null,
                valor_total: activity.valor_total || null,
                entornos: activity.entorno.map((entorno) => ({
                  nombre: entorno || null,
                })),

                tecnologias: activity.tecnologia.map((tecno) => ({
                  nombre: tecno || null,
                })),

                poblaciones: activity.poblacion_sujeto.map((poblacion) => ({
                  nombre: poblacion || null,
                })),
                cups: { codigo: activity.codigo_cups } || null,
                soportes: activity.array_soportes.map((soporte) => ({
                  tipo: soporte.tipo_soporte || null,
                  descripcion: soporte.descripcion_soporte || null,
                  cantidad: soporte.cantidad_soporte || null,
                })),
                cronograma: activity.cronograma.map((item) => ({
                  [item.mes]: parseInt(item.peso, 10),
                })),
              })),

              indicadores: (producto.indicadores || []).map((indicador) => ({
                meta_producto: indicador.meta_producto || null,
                cantidad: indicador.cantidad || null,
                indicador_linea_base: indicador.indicador_linea_base || null,
              })),
            })),
            proyectos_idsn: event.proyecto
              ? {
                  connect: [{ documentId: event.proyecto }] || null,
                }
              : null,
          })),
        },
      };

      console.log("Transformed Data:", transformedData);

      // Realizar la solicitud
      // const response = await fetch("http://localhost:1337/api/anexo-tecnicos", {
      const response = await fetch(
        `${back}/api/anexo-tecnicos/${evento.documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(transformedData),
        }
      );

      if (!response.ok) throw new Error("Error al enviar el reporte.");

      // Reiniciar el formulario
      Swal.fire({
        icon: "success",
        title: "¡Envío correcto!",
        text: "Informacion agregada correctamente!",
      });

      //resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor revise que todos los datos esten completos !",
      });
      console.error(error);
    }
  };

  // Función para transformar los datos del evento
  const transformEvent = (evento) => {
    return {
      //subregion: evento.territorializacion.subregion,
      subregion: evento?.territorializacion?.municipios?.map(
        (muni) => muni.documentId
      ),
      operador_pic: evento?.operador_pic?.documentId,
      // municipio_priorizado: evento.territorializacion.municipio,
      codigo_nombre_territorio: evento?.territorializacion?.territorio,
      codigo_micro_territorio: evento?.territorializacion?.microterritorio,
      total_hogares: evento?.territorializacion?.numero_hogares,
      equipo_operativo: evento?.equipo,
      perfil_profesional: evento?.perfiles_profesional,
      perfil_operativo: evento?.perfil_operativo,
      proyecto: evento?.proyectos_idsn?.documentId,
      description_event: evento?.descripcion,
      indicator_name: evento?.indicador_evento,
      meta_indicator: evento?.meta_indicador_evento,
      eje_estrategico: evento?.ejes_estrategicos?.map((eje) => eje.nombre),
      linea_operativa: evento?.lineas_operativa?.map((linea) => linea.nombre),
      // activities: [
      //   evento.productos.map((producto) => {
      //     console.log(
      //       "producto_actividad",
      //       producto.actividades[0].descripcion
      //     );
      //     descripcion_actividad: producto.actividades[0].descripcion;
      //   }),
      // ],
      activities: evento.productos.map((producto) =>
        producto.actividades.map((actividad) => ({
          descripcion_actividad: actividad.descripcion,
          cantidad: actividad.cantidad_a_ejecutar,
          unidad_medida: actividad.unidad_medida,
          entorno: actividad.entornos.map((entorno) => entorno.nombre),
          tecnologia: actividad.tecnologias.map((tecno) => tecno.nombre),
          poblacion_sujeto: actividad.poblaciones.map((pobla) => pobla.nombre),
          codigo_cups: actividad.cups.codigo,
          valor_unitario: actividad.valor_unitario,
          valor_total: actividad.valor_total,
          array_soportes: actividad.soportes.map((soporte) => ({
            tipo_soporte: soporte.tipo,
            descripcion_soporte: soporte.descripcion,
            cantidad_soporte: soporte.cantidad,
          })),

          cronograma: [
            {
              mes: "Ene",
              peso: actividad.cronograma[0].Ene,
            },
            {
              mes: "Feb",
              peso: actividad.cronograma[1].Feb,
            },
            {
              mes: "Mar",
              peso: actividad.cronograma[2].Mar,
            },
            {
              mes: "Abr",
              peso: actividad.cronograma[3].Abr,
            },
            {
              mes: "May",
              peso: actividad.cronograma[4].May,
            },
            {
              mes: "Jun",
              peso: actividad.cronograma[5].Jun,
            },
            {
              mes: "Jul",
              peso: actividad.cronograma[6].Jul,
            },
            {
              mes: "Ago",
              peso: actividad.cronograma[7].Ago,
            },
            {
              mes: "Sept",
              peso: actividad.cronograma[8].Sept,
            },
            {
              mes: "Oct",
              peso: actividad.cronograma[9].Oct,
            },
            {
              mes: "Nov",
              peso: actividad.cronograma[10].Nov,
            },
            {
              mes: "Dic",
              peso: actividad.cronograma[11].Dic,
            },
          ],
        }))
      ),

      product_data: {
        producto: evento.productos.map((producto) => ({
          descripcion_producto: producto.descripcion,
          indicadores: producto.indicadores.map((indicador) => ({
            cantidad: indicador.cantidad,
            indicador_linea_base: indicador.indicador_linea_base,
            meta_producto: indicador.meta_producto,
          })),
          // operador_pic: producto.operador_pic.operador_pic,
          // descripcion_operador: producto.operador_pic.descripcion,
        })),
      },
    };
  };

  const [events, setEvents] = useState([transformEvent(evento)]);

  console.log("Evento enviado", events);

  return (
    <>
      <Header />
      <div className={styles.formContainer}>
        <Event events={events} setEvents={setEvents} />
      </div>
      <div>
        <button onClick={() => handle_send(events)}>Editar</button>
      </div>
    </>
  );
};

export default Edit;
