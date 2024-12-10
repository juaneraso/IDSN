import React, { useState, useEffect } from "react";
import styles from "./ReportForm.module.css";
import Header from "../Header/Header";
import ActivityList from "../Activities/ActivityList";
import ReportFields from "../Fields/ReportFields";
import Product from "../Product/Product";
import Event from "../Event/Event";
import { useSelector } from "react-redux";
import qs from "qs";

// const queryParameters = {
//   fields: ["documentId", "nombre"], // Campos específicos que necesitas
// };

// const queryString = qs.stringify(queryParameters, { encodeValuesOnly: true });

// const url = `http://localhost:1337/api/municipios?${queryString}`;

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
    municipality: "",
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

  const token = useSelector((state) => state.token.token);
  console.log("token", token);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [activities, setActivities] = useState([]);

  //const [municipalities, setMunicipalities] = useState([]);
  const [subregions, setSubregions] = useState([]);

  // const subregions = ["Norte", "Sur", "Oriente", "Occidente"];
  // const municipalities = {
  //   Norte: ["El Charco", "La Tola"],
  //   Sur: ["Ipiales", "Aldana"],
  //   Oriente: ["Belen", "Alban"],
  //   Occidente: ["Tumaco", "Fransisco Pizarro"],
  // };

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

  // useEffect(() => {
  //   const fetchMunicipalities = async () => {
  //     try {
  //       const queryParameters = {
  //         fields: ["documentId", "nombre"], // Campos específicos que necesitas
  //       };

  //       const queryString = qs.stringify(queryParameters, {
  //         encodeValuesOnly: true,
  //       });

  //       const response = await fetch(
  //         `http://localhost:1337/api/municipios?${queryString}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) throw new Error("Error al obtener municipios.");

  //       const data = await response.json();
  //       setMunicipalities(data.data);
  //     } catch (error) {
  //       console.error("Error fetching municipalities:", error);
  //     }
  //   };

  //   const fetchSubregions = async () => {
  //     try {
  //       const queryParameters = {
  //         fields: ["documentId", "nombre"], // Ajusta los campos necesarios
  //       };

  //       const queryString = qs.stringify(queryParameters, {
  //         encodeValuesOnly: true,
  //       });

  //       const response = await fetch(
  //         `http://localhost:1337/api/subregions?${queryString}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) throw new Error("Error al obtener subregiones.");

  //       const data = await response.json();
  //       setSubregions(data.data);
  //     } catch (error) {
  //       console.error("Error fetching subregions:", error);
  //     }
  //   };

  //   fetchMunicipalities();
  //   fetchSubregions();
  // }, [token]);

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
        setSubregions(data.data); // Guardar subregiones con municipios
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subregions:", error);
        setLoading(false);
      }
    };

    fetchSubregions();
  }, [token]);

  //console.log("municipios", municipalities);
  console.log("subregiones", subregions);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   setSuccess(null);

  //   try {
  //     const data = new FormData();

  //     // Agregar datos del formulario principal
  //     Object.keys(reportData).forEach((key) =>
  //       data.append(key, reportData[key])
  //     );

  //     // Agregar archivo adjunto
  //     if (file) data.append("file", file);

  //     // Agregar actividades
  //     data.append("activities", JSON.stringify(activities));

  //     // Agregar datos de producto
  //     Object.keys(productData).forEach((section) => {
  //       if (typeof productData[section] === "object") {
  //         Object.keys(productData[section]).forEach((field) => {
  //           data.append(`${section}_${field}`, productData[section][field]);
  //         });
  //       } else {
  //         data.append(section, productData[section]);
  //       }
  //     });

  //     // Agregar datos de evento
  //     if (eventData) {
  //       Object.keys(eventData).forEach((key) =>
  //         data.append(`event_${key}`, eventData[key])
  //       );
  //     }

  //     // Ver datos en consola (opcional)
  //     for (let pair of data.entries()) {
  //       console.log(`${pair[0]}: ${pair[1]}`);
  //     }

  //     // Realizar la solicitud
  //     const response = await fetch("http://localhost:1337/api/anexo-tecnicos", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: data,
  //     });

  //     if (!response.ok) throw new Error("Error al enviar el reporte.");

  //     setSuccess(true);

  //     // Reiniciar el formulario
  //     setReportData({
  //       subregion: "",
  //       municipality: "",
  //       fechaRegistro: "",
  //       codigo_territorio: "",
  //       codigo_micro_territorio: "",
  //       numero_micro_territorio: "",
  //       numero_hogares: "",
  //       proyecto: "",
  //       actividad_pas: "",
  //       descripcion: "",
  //       tipo_territorio: "",
  //       tipo_micro_territorio: "",
  //       nombre_micro_territorio: "",
  //     });
  //     setFile(null);
  //     setActivities([]);
  //     setProductData({
  //       producto: {
  //         descripcion_producto: "",
  //         indicador_de_producto: "",
  //         indicador_Linea_Base: "",
  //       },
  //       // soporte: {
  //       //   tipo_soporte: "",
  //       //   descripcion: "",
  //       //   archivos: null,
  //       //   valor_porcentual: "",
  //       // },
  //       // cups: {
  //       //   codigo: "",
  //       //   subcodigo: "",
  //       //   descripcion: "",
  //       //   valor: "",
  //       // },
  //     });
  //     setEventData(null);
  //   } catch (error) {
  //     console.error(error);
  //     setSuccess(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
                connect: [{ documentId: reportData.municipality }], // Ajusta según IDs reales
              },
              subregion: {
                connect: [{ documentId: reportData.subregion }], // Ajusta según IDs reales
              },
            },
            territorio: [
              {
                id_territorio: `Territorio ${reportData.codigo_territorio}`,
                tipo: reportData.tipo_territorio === "1" ? "urbano" : "rural", // Ejemplo de transformación
              },
            ],
            microterritorio: [
              {
                id_microterritorio: reportData.codigo_micro_territorio,
                tipo:
                  reportData.tipo_micro_territorio === "1" ? "urbano" : "rural",
                nombre: reportData.nombre_micro_territorio,
              },
            ],
          },
          eventos: [
            {
              descripcion: eventData.descripcion,
              indicadores: [
                {
                  nombre: eventData.nombre_indicador,
                  descripcion: eventData.descripcion_indicador,
                  meta_resultado: eventData.meta_resultado,
                },
              ],
              ejes_estrategicos: [
                {
                  nombre: eventData.eje_estrategico,
                },
              ],
              lineas_operativa: {
                nombre: eventData.linea_operativa,
              },
              contenido_producto: {
                descripcion: productData.producto.descripcion_producto,
                productos: [
                  {
                    indicador: productData.producto.indicador_de_producto,
                    indicador_linea_base:
                      productData.producto.indicador_Linea_Base,
                    actividades: activities.map((activity) => ({
                      descripcion: activity.descripcion_Actividad,
                      cantidad_a_ejecutar: activity.cantidad,
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
                          municipio: {
                            count: parseInt(activity.municipio, 10),
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
                    })),
                  },
                ],
              },
            },
          ],
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
      resetForm();
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
            subregions={subregions}
            // municipalities={municipalities}
            file={file}
            handleFileChange={handleFileChange}
          />

          <Event setEventData={setEventData} />
          <Product productData={productData} setProductData={setProductData} />
          <ActivityList activities={activities} setActivities={setActivities} />

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
