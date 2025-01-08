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
      } catch (error) {
        console.error("Error fetching subregions:", error);
      }
    };

    fetchSubregions();
  }, [token]);

  console.log("Datos eventos", events);
  console.log("produc", events[0].activities.length);

  // const isEventValid = (event) => {
  //   // Verificar campos básicos del evento
  //   const basicFieldsValid = Object.values(event).every((value) => {
  //     if (Array.isArray(value)) return value.length > 0;
  //     return value !== "";
  //   });

  //   // if(events[0])
  //   // Validar product_data
  //   const productDataValid =
  //     event.product_data &&
  //     event.product_data.producto.length > 0 &&
  //     event.product_data.producto.every((producto) => {
  //       // Validar campos de producto
  //       const productoFieldsValid =
  //         producto.descripcion_producto &&
  //         producto.nombre_entidad &&
  //         producto.descripcion_operador;

  //       // Validar indicadores dentro del producto
  //       const indicadoresValid =
  //         producto.indicadores.length > 0 &&
  //         producto.indicadores.every(
  //           (indicador) =>
  //             indicador.cantidad &&
  //             indicador.indicador_linea_base &&
  //             indicador.meta_producto
  //         );

  //       return productoFieldsValid && indicadoresValid;
  //     });

  //   return basicFieldsValid && productDataValid;
  // };

  const isEventValid = (event) => {
    // Verificar campos principales de event
    if (
      !event.subregion ||
      !event.municipio_priorizado ||
      !event.codigo_nombre_territorio ||
      !event.codigo_micro_territorio ||
      !event.total_hogares ||
      !event.equipo_operativo ||
      !event.perfil_profesional ||
      !event.perfil_operativo ||
      !event.proyecto ||
      !event.description_event ||
      !event.indicator_name ||
      !event.meta_indicator
    ) {
      return false;
    }

    // Verificar arrays principales de event
    if (
      !Array.isArray(event.eje_estrategico) ||
      event.eje_estrategico.length === 0 ||
      !Array.isArray(event.linea_operativa) ||
      event.linea_operativa.length === 0
    ) {
      return false;
    }

    // Validar product_data
    if (
      !event.product_data ||
      !Array.isArray(event.product_data.producto) ||
      event.product_data.producto.length === 0 ||
      event.product_data.producto.some(
        (producto) =>
          !producto.descripcion_producto ||
          !Array.isArray(producto.indicadores) ||
          producto.indicadores.some(
            (indicador) =>
              !indicador.cantidad ||
              !indicador.indicador_linea_base ||
              !indicador.meta_producto
          )
      )
    ) {
      return false;
    }

    // Validar activities
    if (
      !Array.isArray(event.activities) ||
      event.activities.length === 0 ||
      event.activities.some((activity) => {
        if (!activity) return false; // Evitar errores si activity es null o undefined

        return (
          !activity.descripcion_actividad ||
          !activity.cantidad ||
          !activity.unidad_medida ||
          !Array.isArray(activity.entorno) ||
          activity.entorno.length === 0 ||
          !Array.isArray(activity.tecnologia) ||
          activity.tecnologia.length === 0 ||
          !Array.isArray(activity.poblacion_sujeto) ||
          activity.poblacion_sujeto.length === 0 ||
          !activity.codigo_cups ||
          !activity.valor_unitario ||
          !activity.valor_total ||
          !Array.isArray(activity.array_soportes) ||
          activity.array_soportes.some(
            (soporte) =>
              !soporte.tipo_soporte ||
              !soporte.descripcion_soporte ||
              !soporte.cantidad_soporte
          ) ||
          !Array.isArray(activity.cronograma) ||
          activity.cronograma.length !== 12 || // Asegurar que tenga 12 meses
          activity.cronograma.some(
            (item) => !item.mes || isNaN(parseInt(item.peso, 10))
          )
        );
      })
    ) {
      return false;
    }

    return true; // Si pasa todas las validaciones
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const allEventsValid = events.every(isEventValid);

    if (!allEventsValid) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor asegúrese de que todos los campos estén completos.",
      });
      return;
    }

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
      // setSuccess(false);
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
