import React, { useState, useEffect } from "react";
import styles from "./ReportForm.module.css";
import Header from "../Header/Header";
import ActivityList from "../Activities/ActivityList";
import ReportFields from "../Fields/ReportFields";
import Product from "../Product/Product";
import Event from "../Event/Event";
import { useSelector } from "react-redux";
import qs from "qs";

const queryParameters = {
  fields: ["documentId", "nombre"], // Campos del recurso principal
  populate: {
    municipios: {
      fields: ["nombre"], // Campos específicos de la relación
    },
  },
};

const queryString = qs.stringify(queryParameters, { encodeValuesOnly: true });

const url = `http://localhost:1337/api/subregions?${queryString}`;

const ReportForm = () => {
  const [reportData, setReportData] = useState({
    //subregion: "",
    municipio: "",
    fechaRegistro: "",
    codigo_territorio: "",
    codigo_micro_territorio: "",
    numero_micro_territorio: "",
    numero_hogares: "",
    //proyecto: "",
    // actividad_pas: "",
    //descripcion: "",
    tipo_territorio: "",
    tipo_micro_territorio: "",
    nombre_micro_territorio: "",
  });

  const token = useSelector((state) => state.token.token);
  console.log("token", token);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [activities, setActivities] = useState([]);

  const [subregions, setSubregions] = useState([]);

  const [productData, setProductData] = useState({
    producto: {
      descripcion_producto: "",
      indicador_de_producto: "",
      indicador_Linea_Base: "",
    },
    // soporte: {
    //   tipo_soporte: "",
    //   descripcion: "",
    //   archivos: null,
    //   valor_porcentual: "",
    // },
    // cups: {
    //   codigo: "",
    //   subcodigo: "",
    //   descripcion: "",
    //   valor: "",
    // },
  });

  const [eventData, setEventData] = useState(null); // Recibirá datos finales del componente Event
  //const [events, setEvents] = useState([]);

  const [events, setEvents] = useState([
    {
      description_event: "",
      indicator_name: "",
      //description_indicator: "",
      meta_indicator: "",
      eje_estrategico: "",
      linea_operativa: "",
      nombre_entidad: "",
      proyecto: "",
      //municipio: "",
      //descripcion_operador: "",
      activities: [],
      productData: {
        producto: [
          {
            descripcion_producto: "",
            indicador_de_producto: "",
            indicador_Linea_Base: "",
            cantidad: "",
          },
          // Otros productos
        ],
      },

      // productData: {
      //   producto: {
      //     descripcion_producto: "",
      //     indicador_de_producto: "",
      //     indicador_Linea_Base: "",
      //   },
      // },
    },
  ]);

  // const addEvent = () => {
  //   setEvents([
  //     ...events,
  //     {
  //       Descripcion_Evento: "",
  //       Eje_estrategico: "",
  //       Linea_operativa: "",
  //       indicadores: [],
  //       operador_pic: {},
  //       contenido_producto: {},
  //     },
  //   ]);
  // };

  const resetForm = () => {
    // Reiniciar los datos del formulario principal
    setReportData({
      subregion: "",
      municipio: "",
      fechaRegistro: "",
      codigo_territorio: "",
      codigo_micro_territorio: "",
      numero_micro_territorio: "",
      numero_hogares: "",
      proyecto: "",
      actividad_pas: "",
      descripcion: "",
      tipo_territorio: "",
      tipo_micro_territorio: "",
      nombre_micro_territorio: "",
    });

    // Reiniciar el archivo seleccionado
    setFile(null);

    // Reiniciar las actividades
    setActivities([]);

    // Reiniciar los datos del producto
    // setProductData({
    //   producto: {
    //     descripcion_producto: "",
    //     indicador_de_producto: "",
    //     indicador_Linea_Base: "",
    //   },
    //   // Puedes reiniciar otras secciones según sea necesario
    // });

    // Reiniciar los datos del evento
    setEventData(null);

    // Reiniciar el estado de éxito
    setSuccess(null);
  };

  // useEffect(() => {
  //   const fetchSubregions = async () => {
  //     try {
  //       const response = await fetch(`${url}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (!response.ok) throw new Error("Error al obtener subregiones.");
  //       const data = await response.json();
  //       setSubregions(data.data); // Guardar subregiones con municipios
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching subregions:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchSubregions();
  // }, [token]);

  //console.log("municipios", municipalities);
  console.log("subregiones", subregions);
  console.log("Datos eventos", events);
  //console.log("Datos completos", eventData);
  console.log("ACVITY DATA", events[0].activities[1]);

  console.log("reportdata", reportData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      // Transformar los datos al formato requerido
      const transformedData = {
        data: {
          territorializacion: {
            numero_microterritorios: reportData.numero_micro_territorio || null,
            numero_hogares: parseInt(reportData.numero_hogares, 10),
            ubicacion: {
              municipio: {
                connect: [{ documentId: reportData.municipio }], // Ajusta según IDs reales
              },
              subregion: {
                connect: [{ documentId: reportData.subregion }], // Ajusta según IDs reales
              },
            },
            territorio: [
              {
                id_territorio: reportData.codigo_territorio,
                tipo: reportData.tipo_territorio, // Ejemplo de transformación
              },
            ],
            microterritorio: [
              {
                id_microterritorio: reportData.codigo_micro_territorio,
                tipo: reportData.tipo_micro_territorio,
                nombre: reportData.nombre_micro_territorio,
              },
            ],
          },
          eventos: events.map((event) => ({
            descripcion: event.description_event,
            indicadores: [
              {
                nombre: event.indicator_name,
                descripcion: event.description_indicator,
                meta_resultado: event.meta_indicator,
              },
            ],
            ejes_estrategicos: [
              {
                nombre: event.eje_estrategico,
              },
            ],
            lineas_operativa: {
              nombre: event.linea_operativa,
            },
            operador_pic: {
              nombre_entidad: event.nombre_entidad,
              municipio: {
                connect: [{ documentId: event.municipio }],
              },
              descripcion: event.descripcion_operador,
            },
            contenido_producto: {
              descripcion: "Descripción general del contenido de productos", // Si hay una descripción común
              productos: event.productData.producto.map((producto, index) => ({
                //descripcion: producto.descripcion_producto,
                indicador: producto.indicador_de_producto,
                indicador_linea_base: producto.indicador_Linea_Base,
                actividades: (event.activities[index] || []).map(
                  (activity) => ({
                    descripcion: activity.descripcion_Actividad,
                    cantidad_a_ejecutar: activity.cantidad,
                    valor_unitario: activity.valorUnitario,
                    valor_total: activity.valorTotal,
                    Observaciones: activity.observacionEjecucion,
                    porcentaje_cumplimiento: activity.porcentajeCumplimiento,
                    observaciones_seguimiento: activity.observacionSeguimiento,
                    unidad_medida: {
                      nombre: activity.unidadMedida,
                    },
                    entornos: [
                      {
                        nombre: activity.entorno,
                      },
                    ],
                    tecnologias: [
                      {
                        nombre: activity.tecnologia,
                      },
                    ],
                    poblaciones: [
                      {
                        nombre: activity.poblacionSujeto,
                      },
                    ],
                    soportes: [
                      {
                        tipo: activity.Tipo_soporte,
                        descripcion: activity.Descripcion_Soporte,
                        valor_porcentual: activity.Valor_Porcentual,
                        municipio: {
                          connect: [{ documentId: activity.municipioSoporte }],
                        },
                      },
                    ],
                    equipos: [
                      {
                        nombre: activity.equipo,
                      },
                    ],
                    perfiles_profesionales: [
                      {
                        nombre: activity.perfilProfesional,
                      },
                    ],
                    cups: [
                      {
                        codigo: activity.codigoCups,
                      },
                    ],
                  })
                ),
              })),
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

      setSuccess(true);
      // Reiniciar el formulario
      // resetForm();
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.formContainer}>
        <h2>Anexo Técnico</h2>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <ReportFields
            reportData={reportData}
            handleChange={handleChange}
            // subregions={subregions}
            // municipalities={municipalities}
            file={file}
            handleFileChange={handleFileChange}
          />
          {/* 
          <Event setEventData={setEventData} subregions={subregions} /> */}

          <Event
            events={events}
            setEvents={setEvents}
            //subregions={subregions}
          />

          {/* {events.map((_, index) => (
            <Event
              key={index}
              index={index}
              events={events}
              setEvents={setEvents}
              subregions={subregions}
            />
          ))} */}

          {/* <button
            type="button"
            onClick={addEvent}
            className={styles.buttonSecondary}
          >
            Agregar Evento
          </button> */}

          {/* <Product productData={productData} setProductData={setProductData} />
          <ActivityList
            activities={activities}
            setActivities={setActivities}
            subregions={subregions}
          /> */}

          {success === true && (
            <p className={styles.success}>¡Reporte enviado con éxito!</p>
          )}
          {success === false && (
            <p className={styles.error}>Error al enviar el reporte.</p>
          )}
          <button
            className={styles.buttonMain}
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Reporte"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ReportForm;
