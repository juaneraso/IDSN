// import React, { useState } from "react";
// import styles from "./Product.module.css";
// import ActivityList from "../Activities/ActivityList";

// const Product = ({
//   productData,
//   setProductData,
//   activities,
//   setActivities,
//   subregions,
//   entornos,
//   tecnologias,
//   poblaciones,
//   soportes,
//   cups,
// }) => {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const handleInputChange = (productIndex, field, value) => {
//     const updatedProducts = [...productData.producto];
//     updatedProducts[productIndex][field] = value;
//     setProductData({ ...productData, producto: updatedProducts });
//   };

//   const handleAddIndicator = (productIndex) => {
//     const newIndicator = {
//       cantidad: "",
//       meta_producto: "",
//       indicador_linea_base: "",
//     };
//     const updatedProducts = [...productData.producto];
//     updatedProducts[productIndex].indicadores = [
//       ...(updatedProducts[productIndex].indicadores || []),
//       newIndicator,
//     ];
//     setProductData({ ...productData, producto: updatedProducts });
//   };

//   const handleUpdateIndicator = (
//     productIndex,
//     indicatorIndex,
//     field,
//     value
//   ) => {
//     const updatedProducts = [...productData.producto];
//     const indicators = updatedProducts[productIndex].indicadores || [];
//     indicators[indicatorIndex][field] = value;
//     updatedProducts[productIndex].indicadores = indicators;
//     setProductData({ ...productData, producto: updatedProducts });
//   };

//   const handleRemoveIndicator = (productIndex, indicatorIndex) => {
//     const updatedProducts = [...productData.producto];
//     const indicators = updatedProducts[productIndex].indicadores || [];
//     indicators.splice(indicatorIndex, 1);
//     updatedProducts[productIndex].indicadores = indicators;
//     setProductData({ ...productData, producto: updatedProducts });
//   };

//   const handleAddProduct = () => {
//     const newProduct = {
//       descripcion_producto: "",
//       indicadores: [],
//       nombre_entidad: "",
//       descripcion_operador: "",
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
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   // console.log("ejes producto", ejes);

//   return (
//     <div className={styles.productContainer}>
//       {(productData.producto || []).map((product, productIndex) => (
//         <div key={productIndex} className={styles.section}>
//           <div
//             className={styles.header}
//             onClick={() => toggleExpand(productIndex)}
//           >
//             <h3>Producto {productIndex + 1}</h3>
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleRemoveProduct(productIndex);
//               }}
//               className={styles.removeButton}
//             >
//               Eliminar
//             </button>
//           </div>
//           {expandedIndex === productIndex && (
//             <div className={styles.content}>
//               <div className={styles.field}>
//                 <label>Descripción del Producto</label>
//                 <p>
//                   Estrategia de intervencion o procesos previos a contratar
//                   durante la vigencia
//                 </p>
//                 <input
//                   type="text"
//                   value={product.descripcion_producto}
//                   onChange={(e) =>
//                     handleInputChange(
//                       productIndex,
//                       "descripcion_producto",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>

//               <h4>Indicadores del Producto</h4>
//               {(product.indicadores || []).map((indicator, indicatorIndex) => (
//                 <div key={indicatorIndex} className={styles.indicator}>
//                   <div className={styles.indicatorHeader}>
//                     <h3>Indicador Producto {indicatorIndex + 1}</h3>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleRemoveIndicator(productIndex, indicatorIndex)
//                       }
//                       className={styles.removeButton}
//                     >
//                       Eliminar
//                     </button>
//                   </div>
//                   <div className={styles.field}>
//                     <label>Cantidad</label>
//                     <input
//                       type="text"
//                       value={indicator.cantidad}
//                       onChange={(e) =>
//                         handleUpdateIndicator(
//                           productIndex,
//                           indicatorIndex,
//                           "cantidad",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                   <div className={styles.field}>
//                     <label>Descripción Meta Producto</label>
//                     <input
//                       type="text"
//                       value={indicator.meta_producto}
//                       onChange={(e) =>
//                         handleUpdateIndicator(
//                           productIndex,
//                           indicatorIndex,
//                           "meta_producto",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                   <div className={styles.field}>
//                     <label>Indicador Línea Base</label>
//                     <input
//                       type="text"
//                       value={indicator.indicador_linea_base}
//                       onChange={(e) =>
//                         handleUpdateIndicator(
//                           productIndex,
//                           indicatorIndex,
//                           "indicador_linea_base",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={() => handleAddIndicator(productIndex)}
//                 className={styles.buttonMain}
//               >
//                 Agregar Indicador
//               </button>
//               <h3>Operador PIC</h3>
//               <div className={styles.field}>
//                 <label>Nombre del Operador PIC</label>
//                 <input
//                   type="text"
//                   value={product.nombre_entidad}
//                   onChange={(e) =>
//                     handleInputChange(
//                       productIndex,
//                       "nombre_entidad",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//               <div className={styles.field}>
//                 <label>Descripción Operador</label>
//                 <input
//                   type="text"
//                   value={product.descripcion_operador}
//                   onChange={(e) =>
//                     handleInputChange(
//                       productIndex,
//                       "descripcion_operador",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//               <div className={styles.section}>
//                 <ActivityList
//                   entornos={entornos}
//                   tecnologias={tecnologias}
//                   poblaciones={poblaciones}
//                   soportes={soportes}
//                   cups={cups}
//                   activities={activities[productIndex] || []}
//                   setActivities={(updatedActivities) => {
//                     const newActivities = [...activities];
//                     newActivities[productIndex] = updatedActivities;
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
//         Agregar Producto
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
  entornos,
  tecnologias,
  poblaciones,
  soportes,
  cups,
}) => {
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

  return (
    <div className={styles.productContainer}>
      {/* <h2>Productos Asociados</h2> */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descripción del Producto</th>
            <th>Indicadores</th>
            <th>Operador PIC</th>
            <th>Actividades</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {(productData.producto || []).map((product, productIndex) => (
            <tr key={productIndex}>
              <td>
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
              </td>
              <td>
                {(product.indicadores || []).map(
                  (indicator, indicatorIndex) => (
                    <div key={indicatorIndex} className={styles.indicator}>
                      <div>
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
                      <div>
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
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveIndicator(productIndex, indicatorIndex)
                        }
                        className={styles.removeButton}
                      >
                        Eliminar Indicador
                      </button>
                    </div>
                  )
                )}
                <button
                  type="button"
                  onClick={() => handleAddIndicator(productIndex)}
                  className={styles.buttonMain}
                >
                  Agregar Indicador
                </button>
              </td>
              <td>
                <div>
                  <label>Nombre Operador</label>
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
                <div>
                  <label>Descripción</label>
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
              </td>
              <td>
                <ActivityList
                  entornos={entornos}
                  tecnologias={tecnologias}
                  poblaciones={poblaciones}
                  soportes={soportes}
                  cups={cups}
                  activities={activities[productIndex] || []}
                  setActivities={(updatedActivities) => {
                    const newActivities = [...activities];
                    newActivities[productIndex] = updatedActivities;
                    setActivities(newActivities);
                  }}
                  subregions={subregions}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(productIndex)}
                  className={styles.deleteButton}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
