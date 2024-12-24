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
    subregion: "",
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
      //nombre_entidad: "",
      proyecto: "",
      //municipio: "",
      //descripcion_operador: "",
      activities: [],
      productData: {
        producto: [
          {
            descripcion_producto: "",
            indicadores: [],
            // indicador_de_producto: "",
            // indicador_Linea_Base: "",
            // cantidad: "",
            nombre_entidad: "",
            descripcion_operador: "",
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
  //console.log("subregiones", subregions);
  console.log("Datos eventos", events);
  //console.log("Datos completos", eventData);
  //console.log("ACVITY DATA", events[0].eje_estrategico[0]);

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
            numero_hogares: parseInt(reportData.numero_hogares, 10),
            municipio: reportData.municipio,
            territorio: reportData.codigo_territorio,
            microterritorio: reportData.codigo_micro_territorio || null,
            subregion: reportData.subregion,
          },
          eventos: events.map((event) => ({
            descripcion: event.description_event,
            indicador_evento: event.indicator_name,
            meta_indicador_evento: event.meta_indicator,

            ejes_estrategicos: (event.eje_estrategico || []).map((eje) => ({
              nombre: eje,
            })),
            lineas_operativa: (event.linea_operativa || []).map((linea) => ({
              nombre: linea,
            })),

            productos: event.productData.producto.map((producto, index) => ({
              descripcion: producto.descripcion_producto,

              actividades: (event.activities[index] || []).map((activity) => ({
                descripcion: activity.Descripcion_Actividad,
                cantidad_a_ejecutar: activity.cantidad,
                unidad_medida: activity.unidadMedida,
                equipo: activity.Equipo_Operativo,
                perfiles_profesional: activity.perfilProfesional,
                perfil_operativo: activity.perfilOperativo,
                valor_unitario: activity.valorUnitario,
                valor_total: activity.valorTotal,
                entornos: activity.entorno.map((entorno) => ({
                  nombre: entorno,
                })),

                tecnologias: activity.tecnologia.map((tecno) => ({
                  nombre: tecno,
                })),

                poblaciones: activity.poblacionSujeto.map((poblacion) => ({
                  nombre: poblacion,
                })),
                cups: activity.codigoCups.map((cup) => ({
                  codigo: cup,
                })),
                soportes: [
                  {
                    tipo: activity.Tipo_soporte,
                    descripcion: activity.Descripcion_Soporte,
                  },
                ],
                cronograma: activity.cronograma.map((item) => ({
                  [item.mes]: parseInt(item.peso, 10),
                })),
                // cronograma: [
                //   {
                //     enero: 10,
                //   },
                //   {
                //     febrero: 0,
                //   },
                //   {
                //     marzo: 0,
                //   },
                //   {
                //     abril: 0,
                //   },
                //   {
                //     mayo: 0,
                //   },
                //   {
                //     junio: 0,
                //   },
                //   {
                //     julio: 0,
                //   },
                //   {
                //     agosto: 0,
                //   },
                //   {
                //     septiembre: 0,
                //   },
                //   {
                //     octubre: 0,
                //   },
                //   {
                //     noviembre: 0,
                //   },
                //   {
                //     diciembre: 0,
                //   },
                // ],

                // Observaciones: activity.observacionEjecucion,
                // porcentaje_cumplimiento: activity.porcentajeCumplimiento,
                // observaciones_seguimiento: activity.observacionSeguimiento,
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

              // indicadores: [
              //   {
              //     nombre: "quitar",
              //     meta_resultado: producto.indicador_de_producto,
              //     cantidad: producto.cantidad,
              //     indicador_linea_base: producto.indicador_Linea_Base,
              //   },
              // ],
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
