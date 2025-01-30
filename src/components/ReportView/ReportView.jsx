import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./ReporView.module.css";
import Spinner from "../Spinner/Spinner";
import Swal from "sweetalert2";

const ReportView = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterValue, setFilterValue] = useState(""); // Estado para el filtro
  const [operatorFilterValue, setOperatorFilterValue] = useState(""); // Filtro por operador

  const [nombre, setNombre] = useState("");

  const back = import.meta.env.VITE_APP_BACK;
  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;

  const url_municipios = `${back}/api/municipios?pagination[pageSize]=100`;
  const [municipios, setMunicipios] = useState([]);

  const url_soportes = `${back}/api/seguimiento/upload-file`;
  const url_soportes_get = `${back}/api/check-seguimiento?`;
  const navigate = useNavigate(); // Hook para navegación

  const customStyles = {
    control: (base) => ({
      ...base,
      minWidth: "280px", // Ajusta el ancho mínimo
      //maxWidth: "400px", // Opcional, limita el ancho máximo
    }),
    menu: (base) => ({
      ...base,
      zIndex: 5, // Asegura que el menú no se superponga
    }),
    option: (base) => ({
      ...base,
      whiteSpace: "nowrap", // Evita que el texto se parta
    }),
    multiValueLabel: (base) => ({
      ...base,
      whiteSpace: "normal", // Permite que las etiquetas ocupen más espacio
    }),
  };

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

  useEffect(() => {
    const fetch_subregion = async () => {
      try {
        const response = await fetch(`${url_municipios}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener subregiones.");
        const data = await response.json();
        //setSubregions(data.data);
        setMunicipios(data.data);
      } catch (error) {
        console.error("Error fetching subregions:", error);
      }
    };

    fetch_subregion();
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

  // const handle_soporte = (documentId, soporteId) => {
  //   console.log("documentId", documentId);
  //   console.log("SoporteId", soporteId);

  //   const selectOptions = municipios
  //     .map(
  //       (muni) => `<option value="${muni.documentId}">${muni.label}</option>`
  //     )
  //     .join("");

  //   Swal.fire({
  //     title: "Ingrese la información",
  //     html: `

  //       <label for="region">Seleccionar Región:</label>
  //       <select id="region" class="swal2-select">
  //         <option value="">Selecciona una región</option>
  //         ${selectOptions}
  //       </select>

  //       <label for="archivo">Archivo Soporte:</label>
  //       <input type="file" id="archivo" class="swal2-file" >
  //     `,
  //     showCancelButton: true,
  //     confirmButtonText: "Enviar",
  //     cancelButtonText: "Cancelar",
  //     preConfirm: () => {
  //       // const nombre = document.getElementById("nombre").value;
  //       // const comentarios = document.getElementById("comentarios").value;
  //       const region = document.getElementById("region").value;
  //       const archivo = document.getElementById("archivo").files[0];

  //       // Validar que todos los campos tengan datos
  //       if (!region || !archivo) {
  //         Swal.showValidationMessage("Por favor completa todos los campos.");
  //         return false;
  //       }

  //       return { region, archivo };
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       console.log("Datos ingresados:", result.value);

  //       const { region, archivo } = result.value;
  //       // console.log("Nombre:", nombre);
  //       // console.log("Comentarios:", comentarios);
  //       console.log("Región:", region);
  //       console.log("Archivo:", archivo.name);

  //       Swal.fire(
  //         "¡Enviado!",
  //         "Tus datos han sido enviados con éxito.",
  //         "success"
  //       );
  //     } else {
  //       console.log("El usuario canceló el popup");
  //     }
  //   });
  // };

  // const handle_soporte = async (documentId, soporteId) => {
  //   console.log("documentId", documentId);
  //   console.log("SoporteId", soporteId);

  //   const selectOptions = municipios
  //     .map(
  //       (muni) => `<option value="${muni.documentId}">${muni.label}</option>`
  //     )
  //     .join("");

  //   Swal.fire({
  //     title: "Ingrese la información",
  //     html: `
  //       <label for="region">Seleccionar Región:</label>
  //       <select id="region" class="swal2-select">
  //         <option value="">Selecciona una región</option>
  //         ${selectOptions}
  //       </select>

  //       <label for="archivo">Archivo Soporte:</label>
  //       <input type="file" id="archivo" class="swal2-file">
  //     `,
  //     showCancelButton: true,
  //     confirmButtonText: "Enviar",
  //     cancelButtonText: "Cancelar",
  //     preConfirm: () => {
  //       const region = document.getElementById("region").value;
  //       const archivo = document.getElementById("archivo").files[0];

  //       if (!region || !archivo) {
  //         Swal.showValidationMessage("Por favor completa todos los campos.");
  //         return false;
  //       }

  //       return { region, archivo };
  //     },
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       const { region, archivo } = result.value;

  //       // Crear FormData
  //       const formData = new FormData();
  //       formData.append("anexo_id", documentId);
  //       formData.append("soporte_id", soporteId);
  //       formData.append("municipio_id", region);
  //       formData.append("files", archivo);

  //       try {
  //         // Enviar POST al backend
  //         const response = await fetch(`${url_soportes}`, {
  //           method: "POST",
  //           body: formData,
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         if (!response.ok) throw new Error("Error al enviar los datos");

  //         const data = await response.json();
  //         console.log("Respuesta del servidor:", data);

  //         Swal.fire(
  //           "¡Enviado!",
  //           "Tus datos han sido enviados con éxito.",
  //           "success"
  //         );
  //       } catch (error) {
  //         console.error("Error:", error);
  //         Swal.fire("Error", "Hubo un problema al enviar los datos.", "error");
  //       }
  //     } else {
  //       console.log("El usuario canceló el popup");
  //     }
  //   });
  // };

  // const handle_soporte = async (documentId, soporteId) => {
  //   console.log("documentId", documentId);
  //   console.log("SoporteId", soporteId);

  //   try {
  //     // Hacer la petición GET para obtener datos existentes
  //     const response = await fetch(
  //       `${url_soportes_get}anexo_id=${documentId}&soporte_id=${soporteId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // if (!response.ok) throw new Error("Error al obtener los datos");

  //     const existingData = await response.json();
  //     console.log("Datos existentes:", existingData);

  //     // Verificar si hay datos existentes
  //     const hasExistingData =
  //       existingData && Object.keys(existingData).length > 0;

  //     const selectOptions = municipios
  //       .map(
  //         (muni) =>
  //           `<option value="${muni.documentId}" ${
  //             hasExistingData &&
  //             muni.documentId === existingData.municipio.documentId
  //               ? "selected"
  //               : ""
  //           }>${muni.label}</option>`
  //       )
  //       .join("");

  //     // Mostrar SweetAlert con los datos obtenidos o en blanco
  //     Swal.fire({
  //       title: hasExistingData ? "Editar Soporte" : "Ingrese la Información",
  //       html: `
  //         <label for="region">Seleccionar Región:</label>
  //         <select id="region" class="swal2-select">
  //           <option value="">Selecciona una región</option>
  //           ${selectOptions}
  //         </select>

  //    ${
  //      hasExistingData
  //        ? `<p><strong>Archivo actual:</strong> ${existingData.archivos[0].name}</p>`
  //        : `<label for="archivo">Archivo Soporte:</label>
  //          <input type="file" id="archivo" class="swal2-file">`
  //    }
  //       `,
  //       showCancelButton: true,
  //       confirmButtonText: hasExistingData ? "Actualizar" : "Enviar",
  //       cancelButtonText: "Cancelar",
  //       preConfirm: () => {
  //         const region = document.getElementById("region").value;
  //         const archivo = document.getElementById("archivo").files[0];

  //         if (!region || (!archivo && !hasExistingData)) {
  //           Swal.showValidationMessage("Por favor completa todos los campos.");
  //           return false;
  //         }

  //         return { region, archivo };
  //       },
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         const { region, archivo } = result.value;

  //         // Crear FormData
  //         const formData = new FormData();
  //         formData.append("anexo_id", documentId);
  //         formData.append("soporte_id", soporteId);
  //         formData.append("municipio_id", region);

  //         if (archivo) {
  //           formData.append("files", archivo);
  //         }

  //         try {
  //           // Enviar POST o PUT al backend
  //           const response = await fetch(`${url_soportes}`, {
  //             method: hasExistingData ? "PUT" : "POST",
  //             body: formData,
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           });

  //           if (!response.ok) throw new Error("Error al enviar los datos");

  //           const data = await response.json();
  //           console.log("Respuesta del servidor:", data);

  //           Swal.fire(
  //             "¡Éxito!",
  //             `Tus datos han sido ${
  //               hasExistingData ? "actualizados" : "enviados"
  //             } con éxito.`,
  //             "success"
  //           );
  //         } catch (error) {
  //           console.error("Error:", error);
  //           Swal.fire(
  //             "Error",
  //             "Hubo un problema al enviar los datos.",
  //             "error"
  //           );
  //         }
  //       } else {
  //         console.log("El usuario canceló el popup");
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     Swal.fire("Error", "No se pudieron obtener los datos.", "error");
  //   }
  // };

  const handle_soporte = async (documentId, soporteId) => {
    console.log("documentId", documentId);
    console.log("SoporteId", soporteId);

    try {
      // Hacer la petición GET para obtener datos existentes
      const response = await fetch(
        `${url_soportes_get}anexo_id=${documentId}&soporte_id=${soporteId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let existingData = null;

      if (response.ok) {
        existingData = await response.json();
      } else if (response.status === 404) {
        console.warn("No se encontraron datos para este soporte.");
        existingData = null; // O puedes asignar un objeto vacío si prefieres
      } else {
        throw new Error(`Error al obtener los datos: ${response.status}`);
      }

      console.log("Datos existentes:", existingData);

      // Verificar si hay datos existentes
      const hasExistingData = existingData !== null;

      const selectOptions = municipios
        .map(
          (muni) =>
            `<option value="${muni.documentId}" ${
              hasExistingData &&
              muni.documentId === existingData?.municipio?.documentId
                ? "selected"
                : ""
            }>${muni.label}</option>`
        )
        .join("");

      // Mostrar SweetAlert con los datos obtenidos o en blanco
      Swal.fire({
        title: hasExistingData ? "Editar Soporte" : "Ingrese la Información",
        html: `
          <label for="region">Seleccionar Región:</label>
          <select id="region" class="swal2-select">
            <option value="">Selecciona una región</option>
            ${selectOptions}
          </select>
  
          ${
            hasExistingData
              ? `<p><strong>Archivo actual:</strong> ${existingData.archivos[0].name}</p>`
              : `<label for="archivo">Archivo Soporte:</label>
                 <input type="file" id="archivo" class="swal2-file">`
          }
        `,
        showCancelButton: true,
        confirmButtonText: hasExistingData ? "Actualizar" : "Enviar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          const region = document.getElementById("region").value;
          const archivo = document.getElementById("archivo")?.files[0];

          if (!region || (!archivo && !hasExistingData)) {
            Swal.showValidationMessage("Por favor completa todos los campos.");
            return false;
          }

          return { region, archivo };
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { region, archivo } = result.value;

          // Crear FormData
          const formData = new FormData();
          formData.append("anexo_id", documentId);
          formData.append("soporte_id", soporteId);
          formData.append("municipio_id", region);

          if (archivo) {
            formData.append("files", archivo);
          }

          try {
            // Enviar POST o PUT al backend
            const response = await fetch(`${url_soportes}`, {
              method: hasExistingData ? "PUT" : "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) throw new Error("Error al enviar los datos");

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            Swal.fire(
              "¡Éxito!",
              `Tus datos han sido ${
                hasExistingData ? "actualizados" : "enviados"
              } con éxito.`,
              "success"
            );
          } catch (error) {
            console.error("Error:", error);
            Swal.fire(
              "Error",
              "Hubo un problema al enviar los datos.",
              "error"
            );
          }
        } else {
          console.log("El usuario canceló el popup");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "No se pudieron obtener los datos.", "error");
    }
  };

  console.log("nombre", nombre);

  // Obtener lista única de valores para el menú desplegable
  const projectOptions = [
    ...new Set(
      data?.data?.flatMap((row) =>
        row.eventos.map((evento) => evento.proyectos_idsn?.proyecto)
      )
    ),
  ].filter(Boolean); // Filtrar valores no válidos (null, undefined)

  // Obtener lista única de valores para el menú desplegable de operadores

  const operatorOptions = [
    ...new Set(
      data?.data?.flatMap((row) =>
        row.eventos.flatMap(
          (evento) =>
            // evento.productos.map((producto) => producto.operador_pic.operador_pic)
            evento?.operador_pic?.operador_pic
        )
      )
    ),
  ].filter(Boolean);

  // Filtrar datos basados en los valores seleccionados
  const filteredData = data?.data
    ?.map((row) => ({
      ...row,
      eventos: row.eventos.filter(
        (evento) =>
          (!filterValue || evento.proyectos_idsn?.proyecto === filterValue) &&
          (!operatorFilterValue ||
            evento?.operador_pic?.operador_pic === operatorFilterValue)
        // evento.productos.some(
        //   (producto) =>
        //     producto.operador_pic.operador_pic === operatorFilterValue
        // )
      ),
    }))
    .filter((row) => row.eventos.length > 0);

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
                  <th>Nodo - Municipio Priorizado</th>
                  <th>Operador Pic</th>
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
                  {/* <td>
                    {evento.territorializacion.municipios[0].nombre_municipio}
                  </td> */}
                  <td>
                    <table>
                      {/* <tbody>
                        {evento.territorializacion.municipios.map(
                          (muni, index) => (
                            <tr key={index}>
                              <td>{muni.label}</td>
                            </tr>
                          )
                        )}
                      </tbody> */}

                      <tbody>
                        {Array.isArray(
                          evento?.territorializacion?.municipios
                        ) && evento.territorializacion.municipios.length > 0 ? (
                          evento.territorializacion.municipios.map(
                            (muni, index) => (
                              <tr key={index}>
                                <td>{muni.label}</td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td>Informacion sin ingresar</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </td>
                  <td>{evento?.operador_pic?.operador_pic}</td>
                  {/* <td>{evento.territorializacion.territorio}</td> */}
                  {/* <td>
                    {evento?.territorializacion?.territorio
                      ? evento.territorializacion.territorio
                      : "No hay territorio"}
                  </td> */}
                  <td>{evento?.territorializacion?.territorio || ""}</td>

                  <td>
                    {evento?.territorializacion?.microterritorio ||
                      "Falta ingresar "}
                  </td>
                  <td>
                    {evento?.territorializacion?.numero_hogares ||
                      "No hay hogares"}
                  </td>
                  <td>{evento?.equipo}</td>
                  <td>{evento?.perfiles_profesional}</td>
                  <td>{evento?.perfil_operativo}</td>
                  <td>{evento?.proyectos_idsn?.proyecto}</td>
                  <td>{evento?.descripcion}</td>
                  <td>{evento?.indicador_evento}</td>
                  <td>{evento?.meta_indicador_evento}</td>
                  <td>
                    <table>
                      <tbody>
                        {evento?.ejes_estrategicos?.map((eje, index) => (
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
                        {evento?.lineas_operativa?.map((linea, index) => (
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
                                {/* <th>Operador PIC</th> */}
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

                              {/* <td>
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
                              </td> */}
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
                                                      <th>Acciones</th>
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
                                                      <td>
                                                        <button
                                                          onClick={() =>
                                                            handle_soporte(
                                                              row.documentId,
                                                              soporte.id
                                                            )
                                                          }
                                                        >
                                                          Soporte
                                                        </button>
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
