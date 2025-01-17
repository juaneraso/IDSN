import React, { useState, useEffect } from "react";
import styles from "./ReportForm.module.css";
import Header from "../Header/Header";
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

  //const token = useSelector((state) => state.token.token);
  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;
  console.log("token", token_object.token);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Transformar los datos al formato requerido
      const transformedData = {
        data: {
          eventos: events.map((event) => ({
            equipo: event.equipo_operativo || null,
            perfiles_profesional: event.perfil_profesional || null,
            perfil_operativo: event.perfil_operativo || null,
            territorializacion: {
              numero_hogares: parseInt(event.total_hogares, 10) || null,
              municipio: event.municipio_priorizado || null,
              territorio: event.codigo_nombre_territorio || null,
              microterritorio: event.codigo_micro_territorio || null,
              subregion: event.subregion || null,
            },

            descripcion: event.description_event || null,
            indicador_evento: event.indicator_name || null,
            meta_indicador_evento: event.meta_indicator || null,

            ejes_estrategicos: (event.eje_estrategico || []).map((eje) => ({
              nombre: eje || null,
            })),
            lineas_operativa: (event.linea_operativa || []).map((linea) => ({
              nombre: linea || null,
            })),

            productos: event.product_data.producto.map((producto, index) => ({
              descripcion: producto.descripcion_producto || null,

              actividades: (event.activities[index] || []).map((activity) => ({
                descripcion: activity.descripcion_actividad || null,
                cantidad_a_ejecutar: activity.cantidad || null,
                unidad_medida: activity.unidad_medida || null,
                equipo: activity.equipo_operativo || null,
                perfiles_profesional: activity.perfil_profesional || null,
                perfil_operativo: activity.perfil_operativo || null,
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
                cups: [{ codigo: activity.codigo_cups }] || null,
                soportes: activity.array_soportes.map((soporte) => ({
                  tipo: soporte.tipo_soporte || null,
                  descripcion: soporte.descripcion_soporte || null,
                  cantidad: soporte.cantidad_soporte || null,
                })),
                cronograma: activity.cronograma.map((item) => ({
                  [item.mes]: parseInt(item.peso, 10),
                })),
              })),

              operador_pic: {
                nombre_entidad: producto.nombre_entidad || null,
                descripcion: producto.descripcion_operador || null,
              },
              indicadores: (producto.indicadores || []).map((indicador) => ({
                meta_producto: indicador.meta_producto || null,
                cantidad: indicador.cantidad || null,
                indicador_linea_base: indicador.indicador_linea_base || null,
              })),
            })),
            proyecto_idsn: {
              proyecto: event.proyecto || null,
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
