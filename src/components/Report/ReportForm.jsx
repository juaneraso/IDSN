import React, { useState, useEffect } from "react";
import styles from "./ReportForm.module.css";
import Header from "../Header/Header";
import ReportFields from "../Fields/ReportFields";
import Product from "../Product/Product";
import Event from "../Event/Event";
import { useSelector } from "react-redux";
import qs from "qs";
import Swal from "sweetalert2";

const queryParameters = {
  fields: ["documentId", "nombre"], // Campos del recurso principal
  populate: {
    municipios: {
      fields: ["nombre"], // Campos específicos de la relación
    },
  },
};

const queryString = qs.stringify(queryParameters, { encodeValuesOnly: true });

// URL PARA PETICION BACK
const url = `http://localhost:1337/api/labels`;

const ReportForm = () => {
  const [reportData, setReportData] = useState({
    subregion: "",
    municipio: "",
    fechaRegistro: "",
    codigo_territorio: "",
    codigo_micro_territorio: "",
    numero_micro_territorio: "",
    numero_hogares: "",
    tipo_territorio: "",
    tipo_micro_territorio: "",
    nombre_micro_territorio: "",
  });

  const token = useSelector((state) => state.token.token);
  console.log("token", token);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [ejes, setEjes] = useState([]);
  const [lineas, setLineas] = useState([]);
  const [entornos, setEntornos] = useState([]);
  const [tecnologias, setTecnologias] = useState([]);
  const [poblaciones, setPoblacion] = useState([]);
  const [soportes, setSoportes] = useState([]);
  const [cups, setCups] = useState([]);

  const [labels, setLabels] = useState([]);

  const [events, setEvents] = useState([
    {
      subregion: "",
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
      linea_operativa: [],
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
            nombre_entidad: "",
            descripcion_operador: "",
          },
        ],
      },
    },
  ]);

  // const validateEvents = (events) => {
  //   const missingFields = [];

  //   events.forEach((event, eventIndex) => {
  //     // Validar los campos de nivel principal del evento
  //     Object.keys(event).forEach((key) => {
  //       if (typeof event[key] === "string" && event[key].trim() === "") {
  //         missingFields.push(
  //           `Evento ${eventIndex + 1}: El campo '${key}' está vacío.`
  //         );
  //       }
  //     });

  //     // Validar ejes estratégicos
  //     (event.eje_estrategico || []).forEach((eje, ejeIndex) => {
  //       if (!eje || eje.trim() === "") {
  //         missingFields.push(
  //           `Evento ${eventIndex + 1}, Eje Estratégico ${
  //             ejeIndex + 1
  //           }: está vacío.`
  //         );
  //       }
  //     });

  //     // Validar líneas operativas
  //     (event.linea_operativa || []).forEach((linea, lineaIndex) => {
  //       if (!linea || linea.trim() === "") {
  //         missingFields.push(
  //           `Evento ${eventIndex + 1}, Línea Operativa ${
  //             lineaIndex + 1
  //           }: está vacía.`
  //         );
  //       }
  //     });

  //     // Validar productos
  //     (event.product_data?.producto || []).forEach(
  //       (producto, productoIndex) => {
  //         if (!producto.descripcion_producto.trim()) {
  //           missingFields.push(
  //             `Evento ${eventIndex + 1}, Producto ${
  //               productoIndex + 1
  //             }: descripción del producto está vacía.`
  //           );
  //         }

  //         // Validar indicadores dentro de cada producto
  //         (producto.indicadores || []).forEach((indicador, indicadorIndex) => {
  //           if (!indicador.meta_producto.trim()) {
  //             missingFields.push(
  //               `Evento ${eventIndex + 1}, Producto ${
  //                 productoIndex + 1
  //               }, Indicador ${
  //                 indicadorIndex + 1
  //               }: meta del producto está vacía.`
  //             );
  //           }
  //           if (!indicador.cantidad) {
  //             missingFields.push(
  //               `Evento ${eventIndex + 1}, Producto ${
  //                 productoIndex + 1
  //               }, Indicador ${indicadorIndex + 1}: cantidad está vacía.`
  //             );
  //           }
  //         });
  //       }
  //     );

  //     // Validar actividades
  //     (event.activities || []).forEach((activity, activityIndex) => {
  //       if (!activity.descripcion_actividad.trim()) {
  //         missingFields.push(
  //           `Evento ${eventIndex + 1}, Actividad ${
  //             activityIndex + 1
  //           }: descripción de la actividad está vacía.`
  //         );
  //       }
  //       if (!activity.cantidad) {
  //         missingFields.push(
  //           `Evento ${eventIndex + 1}, Actividad ${
  //             activityIndex + 1
  //           }: cantidad está vacía.`
  //         );
  //       }
  //     });
  //   });

  //   return missingFields;
  // };

  const validateEvents = (events) => {
    const missingFields = [];

    events.forEach((event, eventIndex) => {
      // Validar los campos de nivel principal del evento
      Object.keys(event).forEach((key) => {
        if (typeof event[key] === "string" && event[key].trim() === "") {
          missingFields.push(
            `Evento ${eventIndex + 1}: El campo '${key}' está vacío.`
          );
        }
      });

      // Validar ejes estratégicos
      (event.eje_estrategico || []).forEach((eje, ejeIndex) => {
        if (!eje || typeof eje !== "string" || eje.trim() === "") {
          missingFields.push(
            `Evento ${eventIndex + 1}, Eje Estratégico ${
              ejeIndex + 1
            }: está vacío.`
          );
        }
      });

      // Validar líneas operativas
      (event.linea_operativa || []).forEach((linea, lineaIndex) => {
        if (!linea || typeof linea !== "string" || linea.trim() === "") {
          missingFields.push(
            `Evento ${eventIndex + 1}, Línea Operativa ${
              lineaIndex + 1
            }: está vacía.`
          );
        }
      });

      // Validar productos
      (event.product_data?.producto || []).forEach(
        (producto, productoIndex) => {
          if (
            !producto?.descripcion_producto ||
            producto.descripcion_producto.trim() === ""
          ) {
            missingFields.push(
              `Evento ${eventIndex + 1}, Producto ${
                productoIndex + 1
              }: descripción del producto está vacía.`
            );
          }

          // Validar indicadores dentro de cada producto
          (producto.indicadores || []).forEach((indicador, indicadorIndex) => {
            if (
              !indicador?.meta_producto ||
              indicador.meta_producto.trim() === ""
            ) {
              missingFields.push(
                `Evento ${eventIndex + 1}, Producto ${
                  productoIndex + 1
                }, Indicador ${
                  indicadorIndex + 1
                }: meta del producto está vacía.`
              );
            }
            if (indicador?.cantidad == null) {
              missingFields.push(
                `Evento ${eventIndex + 1}, Producto ${
                  productoIndex + 1
                }, Indicador ${indicadorIndex + 1}: cantidad está vacía.`
              );
            }
          });
        }
      );

      // Validar actividades
      (event.activities || []).forEach((activity, activityIndex) => {
        if (
          !activity?.descripcion_actividad ||
          activity.descripcion_actividad.trim() === ""
        ) {
          missingFields.push(
            `Evento ${eventIndex + 1}, Actividad ${
              activityIndex + 1
            }: descripción de la actividad está vacía.`
          );
        }
        if (activity?.cantidad == null) {
          missingFields.push(
            `Evento ${eventIndex + 1}, Actividad ${
              activityIndex + 1
            }: cantidad está vacía.`
          );
        }
      });
    });

    return missingFields;
  };

  const resetForm = () => {
    // Reiniciar los datos del formulario principal

    // setReportData({
    //   subregion: "",
    //   municipio: "",
    //   fechaRegistro: "",
    //   codigo_territorio: "",
    //   codigo_micro_territorio: "",
    //   numero_micro_territorio: "",
    //   numero_hogares: "",
    //   proyecto: "",
    //   actividad_pas: "",
    //   descripcion: "",
    //   tipo_territorio: "",
    //   tipo_micro_territorio: "",
    //   nombre_micro_territorio: "",
    // });

    // Reiniciar las actividades
    // setActivities([]);

    // Reiniciar los datos del evento
    setEvents([
      {
        subregion: "",
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
        linea_operativa: [],
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
              nombre_entidad: "",
              descripcion_operador: "",
            },
          ],
        },
      },
    ]);

    // Reiniciar el estado de éxito
    setSuccess(null);
  };

  useEffect(() => {
    const fetchSubregions = async () => {
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
        setEjes(data.ejes);
        setLineas(data.lineas_operativas);
        setEntornos(data.entornos);
        setTecnologias(data.tecnologias);
        setPoblacion(data.poblacion_sujeto);
        setSoportes(data.soportes);
        setCups(data.cups);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subregions:", error);
        setLoading(false);
      }
    };

    fetchSubregions();
  }, [token]);

  console.log("Datos eventos", events);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!validateEvents()) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Campos incompletos",
    //     text: "Por favor, completa todos los campos antes de enviar.",
    //   });
    //   setLoading(false);
    //   return;
    // }

    // const missingFields = validateEvents(events);
    // if (missingFields.length > 0) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Faltan campos por llenar",
    //     html: missingFields.join("<br>"), // Muestra los errores en un formato de lista
    //   });
    //   return;
    // }

    try {
      // Transformar los datos al formato requerido
      const transformedData = {
        data: {
          eventos: events.map((event) => ({
            equipo: event.equipo_operativo,
            perfiles_profesional: event.perfil_profesional,
            perfil_operativo: event.perfil_operativo,
            territorializacion: {
              numero_hogares: parseInt(event.total_hogares, 10),
              municipio: event.municipio_priorizado,
              territorio: event.codigo_nombre_territorio,
              microterritorio: event.codigo_micro_territorio || null,
              subregion: event.subregion,
            },

            descripcion: event.description_event,
            indicador_evento: event.indicator_name,
            meta_indicador_evento: event.meta_indicator,

            ejes_estrategicos: (event.eje_estrategico || []).map((eje) => ({
              nombre: eje,
            })),
            lineas_operativa: (event.linea_operativa || []).map((linea) => ({
              nombre: linea,
            })),

            productos: event.product_data.producto.map((producto, index) => ({
              descripcion: producto.descripcion_producto,

              actividades: (event.activities[index] || []).map((activity) => ({
                descripcion: activity.descripcion_actividad,
                cantidad_a_ejecutar: activity.cantidad,
                unidad_medida: activity.unidad_medida,
                equipo: activity.equipo_operativo,
                perfiles_profesional: activity.perfil_profesional,
                perfil_operativo: activity.perfil_operativo,
                valor_unitario: activity.valor_unitario,
                valor_total: activity.valor_total,
                entornos: activity.entorno.map((entorno) => ({
                  nombre: entorno,
                })),

                tecnologias: activity.tecnologia.map((tecno) => ({
                  nombre: tecno,
                })),

                poblaciones: activity.poblacion_sujeto.map((poblacion) => ({
                  nombre: poblacion,
                })),
                cups: [{ codigo: activity.codigo_cups }],
                soportes: activity.array_soportes.map((soporte) => ({
                  tipo: soporte.tipo_soporte,
                  descripcion: soporte.descripcion_soporte,
                  cantidad: soporte.cantidad_soporte,
                })),
                cronograma: activity.cronograma.map((item) => ({
                  [item.mes]: parseInt(item.peso, 10),
                })),
              })),

              operador_pic: {
                nombre_entidad: producto.nombre_entidad,
                descripcion: producto.descripcion_operador,
              },
              indicadores: (producto.indicadores || []).map((indicador) => ({
                meta_producto: indicador.meta_producto,
                cantidad: indicador.cantidad,
                indicador_linea_base: indicador.indicador_linea_base,
              })),
            })),
            proyecto_idsn: {
              proyecto: event.proyecto,
            },
          })),
        },
      };

      console.log("Transformed Data:", transformedData);

      // Realizar la solicitud
      const response = await fetch("http://localhost:1337/api/anexo-tecnicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) throw new Error("Error al enviar el reporte.");

      // setSuccess(true);
      // Reiniciar el formulario
      Swal.fire({
        icon: "success",
        title: "¡Envío correcto!",
        text: "Informacion agregada correctamente!",
      });

      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor revise que todos los datos esten completos !",
      });
      console.error(error);
      // setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.field}>
            <Event
              events={events}
              setEvents={setEvents}
              ejes={ejes}
              lineas={lineas}
              entornos={entornos}
              tecnologias={tecnologias}
              poblaciones={poblaciones}
              soportes={soportes}
              cups={cups}
            />
          </div>

          <div className={styles.contedor_boton}>
            <button
              className={styles.buttonMain}
              type="submit"
              // disabled={loading}
            >
              Enviar Anexo
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportForm;
