// import React, { useState } from "react";
// import styles from "./Product.module.css";

// const Product = ({ productData, setProductData }) => {
//   const handleChange = (section, field, value) => {
//     setProductData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [field]: value,
//       },
//     }));
//   };

//   const handleInputChange = (section, field, value) => {
//     setProductData(section, field, value);
//   };

//   // console.log("DataProduto", productData);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setProductData((prevData) => ({
//       ...prevData,
//       soporte: {
//         ...prevData.soporte,
//         archivos: file,
//       },
//     }));
//   };

//   return (
//     <div className={styles.productContainer}>
//       {/* Sección Producto */}
//       <div className={styles.section}>
//         <h3>Producto</h3>
//         <div className={styles.field}>
//           <label>Descripción del Producto</label>
//           <input
//             type="text"
//             //value={productData?.producto?.descripcion_producto || ""}
//             value={productData.producto.descripcion_producto}
//             onChange={(e) =>
//               handleInputChange(
//                 "producto",
//                 "descripcion_producto",
//                 e.target.value
//               )
//             }
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="indicador_de_producto">Indicador de Producto</label>
//           <input
//             type="text"
//             id="indicador_de_producto"
//             value={productData.producto.indicador_de_producto}
//             onChange={(e) =>
//               handleInputChange(
//                 "producto",
//                 "indicador_de_producto",
//                 e.target.value
//               )
//             }
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="indicador_Linea_Base">Indicador Línea Base</label>
//           <input
//             type="text"
//             id="indicador_Linea_Base"
//             value={productData.producto.indicador_Linea_Base}
//             onChange={(e) =>
//               handleInputChange(
//                 "producto",
//                 "indicador_Linea_Base",
//                 e.target.value
//               )
//             }
//           />
//         </div>
//       </div>

//       {/* Sección Soporte */}
//       {/* <div className={styles.section}>
//         <h3>Soporte</h3>
//         <div className={styles.field}>
//           <label htmlFor="tipo_soporte">Tipo de Soporte</label>
//           <input
//             type="text"
//             id="tipo_soporte"
//             value={productData.soporte.tipo_soporte}
//             onChange={(e) =>
//               handleChange("soporte", "tipo_soporte", e.target.value)
//             }
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="descripcion_soporte">Descripción</label>
//           <textarea
//             id="descripcion_soporte"
//             value={productData.soporte.descripcion}
//             onChange={(e) =>
//               handleChange("soporte", "descripcion", e.target.value)
//             }
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="archivo">Archivo Adjunto</label>
//           <input
//             type="file"
//             id="archivo"
//             onChange={handleFileChange}
//             className={styles.fileInput}
//           />
//           {productData.soporte.archivos && (
//             <p>Archivo seleccionado: {productData.soporte.archivos.name}</p>
//           )}
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="valor_porcentual">Valor Porcentual</label>
//           <input
//             type="number"
//             id="valor_porcentual"
//             value={productData.soporte.valor_porcentual}
//             onChange={(e) =>
//               handleChange("soporte", "valor_porcentual", e.target.value)
//             }
//           />
//         </div>
//       </div> */}

//       {/* Sección CUPS */}
//       {/* <div className={styles.section}>
//         <h3>CUPS</h3>
//         <div className={styles.field}>
//           <label htmlFor="codigo_cups">Código</label>
//           <input
//             type="text"
//             id="codigo_cups"
//             value={productData.cups.codigo}
//             onChange={(e) => handleChange("cups", "codigo", e.target.value)}
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="subcodigo_cups">Subcódigo</label>
//           <input
//             type="text"
//             id="subcodigo_cups"
//             value={productData.cups.subcodigo}
//             onChange={(e) => handleChange("cups", "subcodigo", e.target.value)}
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="descripcion_cups">Descripción</label>
//           <textarea
//             id="descripcion_cups"
//             value={productData.cups.descripcion}
//             onChange={(e) =>
//               handleChange("cups", "descripcion", e.target.value)
//             }
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="valor_cups">Valor</label>
//           <input
//             type="number"
//             id="valor_cups"
//             value={productData.cups.valor}
//             onChange={(e) => handleChange("cups", "valor", e.target.value)}
//           />
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Product;

// import React from "react";
// import styles from "./Product.module.css";
// import ActivityList from "../Activities/ActivityList";

// const Product = ({
//   productData,
//   setProductData,
//   activities,
//   setActivities,
//   subregions,
// }) => {
//   const handleInputChange = (section, field, value) => {
//     setProductData(section, field, value);
//   };

//   console.log("product", productData);
//   return (
//     <div className={styles.productContainer}>
//       <div className={styles.section}>
//         <h3>Producto</h3>
//         <div className={styles.field}>
//           <label>Descripción del Producto</label>
//           <input
//             type="text"
//             id="descripcion_producto"
//             value={productData.producto.descripcion_producto}
//             onChange={(e) =>
//               handleInputChange(
//                 "producto",
//                 "descripcion_producto",
//                 e.target.value
//               )
//             }
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="indicador_de_producto">Indicador de Producto</label>
//           <input
//             type="text"
//             id="indicador_de_producto"
//             value={productData.producto.indicador_de_producto}
//             onChange={(e) =>
//               handleInputChange(
//                 "producto",
//                 "indicador_de_producto",
//                 e.target.value
//               )
//             }
//           />
//         </div>
//         <div className={styles.field}>
//           <label htmlFor="indicador_Linea_Base">Indicador Línea Base</label>
//           <input
//             type="text"
//             id="indicador_Linea_Base"
//             value={productData.producto.indicador_Linea_Base}
//             onChange={(e) =>
//               handleInputChange(
//                 "producto",
//                 "indicador_Linea_Base",
//                 e.target.value
//               )
//             }
//           />
//         </div>
//       </div>

//       <div className={styles.section}>
//         <ActivityList
//           activities={activities}
//           setActivities={setActivities}
//           subregions={subregions}
//         />
//       </div>
//     </div>
//   );
// };

// export default Product;

///lajfljflk
///kjalkjflkas
///ajljflskfjlks
// ------------------------------------------
///-----------------------------------------
// import React from "react";
// import styles from "./Product.module.css";
// import ActivityList from "../Activities/ActivityList";

// const Product = ({
//   productData,
//   setProductData,
//   activities,
//   setActivities,
//   subregions,
// }) => {
//   // Manejar cambios en los campos de un producto específico
//   const handleInputChange = (productIndex, field, value) => {
//     const updatedProducts = [...productData.producto]; // Copia los productos actuales
//     updatedProducts[productIndex][field] = value; // Actualiza el campo correspondiente
//     setProductData({ ...productData, producto: updatedProducts }); // Sincroniza con el estado del padre
//   };

//   // Agregar un nuevo producto
//   const handleAddProduct = () => {
//     const newProduct = {
//       descripcion_producto: "",
//       indicador_de_producto: "",
//       indicador_Linea_Base: "",
//     };

//     // Actualizar productos
//     const updatedProducts = [...(productData.producto || []), newProduct];
//     setProductData({ ...productData, producto: updatedProducts });

//     // Actualizar actividades (nuevo conjunto vacío por cada producto)
//     const updatedActivities = [...activities, []];
//     setActivities(updatedActivities);
//   };

//   // Eliminar un producto
//   const handleRemoveProduct = (productIndex) => {
//     const updatedProducts = productData.producto.filter(
//       (_, index) => index !== productIndex
//     );
//     setProductData({ ...productData, producto: updatedProducts }); // Sincroniza con el estado del padre
//   };

//   console.log("Datos producto", productData);
//   return (
//     <div className={styles.productContainer}>
//       {/* <h3>Productos</h3> */}
//       {(productData.producto || []).map((product, index) => (
//         <div key={index} className={styles.section}>
//           <h3>Producto {index + 1}</h3>

//           <div className={styles.field}>
//             <label>Descripción del Producto</label>
//             <input
//               id={`descripcion_producto${index}`}
//               type="text"
//               value={product.descripcion_producto}
//               onChange={(e) =>
//                 handleInputChange(index, "descripcion_producto", e.target.value)
//               }
//             />
//           </div>
//           <div className={styles.field}>
//             <label htmlFor={`indicador_de_producto_${index}`}>
//               Indicador de Producto
//             </label>
//             <input
//               type="text"
//               id={`indicador_de_producto_${index}`}
//               value={product.indicador_de_producto}
//               onChange={(e) =>
//                 handleInputChange(
//                   index,
//                   "indicador_de_producto",
//                   e.target.value
//                 )
//               }
//             />
//           </div>
//           <div className={styles.field}>
//             <label htmlFor={`indicador_Linea_Base_${index}`}>
//               Indicador Línea Base
//             </label>
//             <input
//               type="text"
//               id={`indicador_Linea_Base_${index}`}
//               value={product.indicador_Linea_Base}
//               onChange={(e) =>
//                 handleInputChange(index, "indicador_Linea_Base", e.target.value)
//               }
//             />
//           </div>
//           <div className={styles.section}>
//             <ActivityList
//               activities={activities[index] || []} // Asegura que sean las actividades correspondientes al producto
//               setActivities={(updatedActivities) => {
//                 const newActivities = [...activities];
//                 newActivities[index] = updatedActivities; // Actualiza solo las actividades del producto actual
//                 setActivities(newActivities); // Sincroniza con el estado del padre
//               }}
//               subregions={subregions}
//             />
//           </div>
//           <button
//             type="button"
//             onClick={() => handleRemoveProduct(index)}
//             className={styles.removeButton}
//           >
//             Eliminar Producto
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={handleAddProduct}
//         className={styles.addButton}
//       >
//         Agregar Producto
//       </button>
//     </div>
//   );
// };

// export default Product;

// import React, { useState } from "react";
// import styles from "./Product.module.css";
// import ActivityList from "../Activities/ActivityList";

// const Product = ({
//   productData,
//   setProductData,
//   activities,
//   setActivities,
//   subregions,
// }) => {
//   const [expandedIndex, setExpandedIndex] = useState(null); // Estado para controlar qué producto está expandido

//   const handleInputChange = (productIndex, field, value) => {
//     const updatedProducts = [...productData.producto];
//     updatedProducts[productIndex][field] = value;
//     setProductData({ ...productData, producto: updatedProducts });
//   };

//   const handleAddProduct = () => {
//     const newProduct = {
//       descripcion_producto: "",
//       indicador_de_producto: "",
//       indicador_Linea_Base: "",
//       nombre_entidad: "",
//       descripcion_operador: "",
//       cantidad: "",
//     };
//     const updatedProducts = [...(productData.producto || []), newProduct];
//     setProductData({ ...productData, producto: updatedProducts });
//     const updatedActivities = [...activities, []];
//     setActivities(updatedActivities);
//   };

//   const handleRemoveProduct = (productIndex) => {
//     const updatedProducts = productData.producto.filter(
//       (_, index) => index !== productIndex
//     );
//     setProductData({ ...productData, producto: updatedProducts });
//   };

//   const toggleExpand = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index); // Alterna entre expandir y contraer
//   };

//   return (
//     <div className={styles.productContainer}>
//       {(productData.producto || []).map((product, index) => (
//         <div key={index} className={styles.section}>
//           <div className={styles.header} onClick={() => toggleExpand(index)}>
//             <h3>Producto {index + 1}</h3>
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation(); // Evita que el click cierre el acordeón
//                 handleRemoveProduct(index);
//               }}
//               className={styles.removeButton}
//             >
//               Eliminar
//             </button>
//           </div>
//           {expandedIndex === index && (
//             <div className={styles.content}>
//               <div className={styles.field}>
//                 <label>Descripción del Producto</label>
//                 <input
//                   id={`descripcion_producto${index}`}
//                   type="text"
//                   value={product.descripcion_producto}
//                   onChange={(e) =>
//                     handleInputChange(
//                       index,
//                       "descripcion_producto",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//               <h4>Indicador Producto</h4>
//               <div className={styles.field}>
//                 <label htmlFor={`cantidad${index}`}>Cantidad</label>
//                 <input
//                   type="text"
//                   id={`cantidad${index}`}
//                   value={product.cantidad}
//                   onChange={(e) =>
//                     handleInputChange(index, "cantidad", e.target.value)
//                   }
//                 />
//               </div>

//               <div className={styles.field}>
//                 <label htmlFor={`indicador_de_producto${index}`}>
//                   Meta Producto Esperada(Indicador de Producto)
//                 </label>
//                 <input
//                   type="text"
//                   id={`indicador_de_producto${index}`}
//                   value={product.indicador_de_producto}
//                   onChange={(e) =>
//                     handleInputChange(
//                       index,
//                       "indicador_de_producto",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//               <div className={styles.field}>
//                 <label htmlFor={`indicador_Linea_Base${index}`}>
//                   Indicador Línea Base
//                 </label>
//                 <input
//                   type="text"
//                   id={`indicador_Linea_Base${index}`}
//                   value={product.indicador_Linea_Base}
//                   onChange={(e) =>
//                     handleInputChange(
//                       index,
//                       "indicador_Linea_Base",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>

//               <h3>Operador PIC</h3>

//               <div className={styles.field}>
//                 <label htmlFor={`nombre_entidad${index}`}>Nombre Entidad</label>
//                 <input
//                   type="text"
//                   id={`nombre_entidad${index}`}
//                   value={product.nombre_entidad}
//                   onChange={(e) =>
//                     handleInputChange(index, "nombre_entidad", e.target.value)
//                   }
//                 />
//               </div>
//               <div className={styles.field}>
//                 <label htmlFor={`descripcion_operador${index}`}>
//                   Descripcion Operador
//                 </label>
//                 <input
//                   type="text"
//                   id={`descripcion_operador${index}`}
//                   value={product.descripcion_operador}
//                   onChange={(e) =>
//                     handleInputChange(
//                       index,
//                       "descripcion_operador",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//               <div className={styles.section}>
//                 <ActivityList
//                   activities={activities[index] || []}
//                   setActivities={(updatedActivities) => {
//                     const newActivities = [...activities];
//                     newActivities[index] = updatedActivities;
//                     setActivities(newActivities);
//                   }}
//                   subregions={subregions}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={handleAddProduct}
//         className={styles.buttonMain}
//       >
//         Agregar Otro Producto
//       </button>
//     </div>
//   );
// };

// export default Product;

import React, { useState } from "react";
import styles from "./Product.module.css";
import ActivityList from "../Activities/ActivityList";

const Product = ({
  productData,
  setProductData,
  activities,
  setActivities,
  subregions,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleInputChange = (productIndex, field, value) => {
    const updatedProducts = [...productData.producto];
    updatedProducts[productIndex][field] = value;
    setProductData({ ...productData, producto: updatedProducts });
  };

  const handleAddIndicator = (productIndex) => {
    const newIndicator = {
      cantidad: "",
      meta_producto: "",
      indicador_linea_base: "",
    };
    const updatedProducts = [...productData.producto];
    updatedProducts[productIndex].indicadores = [
      ...(updatedProducts[productIndex].indicadores || []),
      newIndicator,
    ];
    setProductData({ ...productData, producto: updatedProducts });
  };

  const handleUpdateIndicator = (
    productIndex,
    indicatorIndex,
    field,
    value
  ) => {
    const updatedProducts = [...productData.producto];
    const indicators = updatedProducts[productIndex].indicadores || [];
    indicators[indicatorIndex][field] = value;
    updatedProducts[productIndex].indicadores = indicators;
    setProductData({ ...productData, producto: updatedProducts });
  };

  const handleRemoveIndicator = (productIndex, indicatorIndex) => {
    const updatedProducts = [...productData.producto];
    const indicators = updatedProducts[productIndex].indicadores || [];
    indicators.splice(indicatorIndex, 1);
    updatedProducts[productIndex].indicadores = indicators;
    setProductData({ ...productData, producto: updatedProducts });
  };

  const handleAddProduct = () => {
    const newProduct = {
      descripcion_producto: "",
      indicadores: [],
      nombre_entidad: "",
      descripcion_operador: "",
    };
    const updatedProducts = [...(productData.producto || []), newProduct];
    setProductData({ ...productData, producto: updatedProducts });
    const updatedActivities = [...activities, []];
    setActivities(updatedActivities);
  };

  const handleRemoveProduct = (productIndex) => {
    const updatedProducts = productData.producto.filter(
      (_, index) => index !== productIndex
    );
    setProductData({ ...productData, producto: updatedProducts });
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={styles.productContainer}>
      {(productData.producto || []).map((product, productIndex) => (
        <div key={productIndex} className={styles.section}>
          <div
            className={styles.header}
            onClick={() => toggleExpand(productIndex)}
          >
            <h3>Producto {productIndex + 1}</h3>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveProduct(productIndex);
              }}
              className={styles.removeButton}
            >
              Eliminar
            </button>
          </div>
          {expandedIndex === productIndex && (
            <div className={styles.content}>
              <div className={styles.field}>
                <label>Descripción del Producto</label>
                <input
                  type="text"
                  value={product.descripcion_producto}
                  onChange={(e) =>
                    handleInputChange(
                      productIndex,
                      "descripcion_producto",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* {(product.indicadores || []).map((indicator, indicatorIndex) => (
                <div key={indicatorIndex} className={styles.indicator}>
                  <h3>Indicador Producto {indicatorIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveIndicator(productIndex, indicatorIndex)
                    }
                    className={styles.removeButton}
                  >
                    Eliminar Indicador
                  </button>
                  <div className={styles.field}>
                    <label>Cantidad</label>
                    <input
                      type="text"
                      value={indicator.cantidad}
                      onChange={(e) =>
                        handleUpdateIndicator(
                          productIndex,
                          indicatorIndex,
                          "cantidad",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Meta Producto</label>
                    <input
                      type="text"
                      value={indicator.meta_producto}
                      onChange={(e) =>
                        handleUpdateIndicator(
                          productIndex,
                          indicatorIndex,
                          "meta_producto",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Indicador Línea Base</label>
                    <input
                      type="text"
                      value={indicator.indicador_linea_base}
                      onChange={(e) =>
                        handleUpdateIndicator(
                          productIndex,
                          indicatorIndex,
                          "indicador_linea_base",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))} */}
              <h4>Indicadores del Producto</h4>
              {(product.indicadores || []).map((indicator, indicatorIndex) => (
                <div key={indicatorIndex} className={styles.indicator}>
                  <div className={styles.indicatorHeader}>
                    <h3>Indicador Producto {indicatorIndex + 1}</h3>
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveIndicator(productIndex, indicatorIndex)
                      }
                      className={styles.removeButton}
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className={styles.field}>
                    <label>Cantidad</label>
                    <input
                      type="text"
                      value={indicator.cantidad}
                      onChange={(e) =>
                        handleUpdateIndicator(
                          productIndex,
                          indicatorIndex,
                          "cantidad",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Meta Producto</label>
                    <input
                      type="text"
                      value={indicator.meta_producto}
                      onChange={(e) =>
                        handleUpdateIndicator(
                          productIndex,
                          indicatorIndex,
                          "meta_producto",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Indicador Línea Base</label>
                    <input
                      type="text"
                      value={indicator.indicador_linea_base}
                      onChange={(e) =>
                        handleUpdateIndicator(
                          productIndex,
                          indicatorIndex,
                          "indicador_linea_base",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddIndicator(productIndex)}
                className={styles.buttonMain}
              >
                Agregar Indicador
              </button>
              <h3>Operador PIC</h3>
              <div className={styles.field}>
                <label>Nombre Entidad</label>
                <input
                  type="text"
                  value={product.nombre_entidad}
                  onChange={(e) =>
                    handleInputChange(
                      productIndex,
                      "nombre_entidad",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className={styles.field}>
                <label>Descripción Operador</label>
                <input
                  type="text"
                  value={product.descripcion_operador}
                  onChange={(e) =>
                    handleInputChange(
                      productIndex,
                      "descripcion_operador",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className={styles.section}>
                <ActivityList
                  activities={activities[productIndex] || []}
                  setActivities={(updatedActivities) => {
                    const newActivities = [...activities];
                    newActivities[productIndex] = updatedActivities;
                    setActivities(newActivities);
                  }}
                  subregions={subregions}
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddProduct}
        className={styles.buttonMain}
      >
        Agregar Producto
      </button>
    </div>
  );
};

export default Product;
