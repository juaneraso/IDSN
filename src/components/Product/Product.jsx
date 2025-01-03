// import React, { useState } from "react";
// import styles from "./Product.module.css";
// import ActivityList from "../Activities/ActivityList";

// const Product = ({
//   product_data,
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
//   const handleInputChange = (productIndex, field, value) => {
//     const updatedProducts = [...product_data.producto];
//     updatedProducts[productIndex][field] = value;
//     setProductData({ ...product_data, producto: updatedProducts });
//   };

//   const handleAddIndicator = (productIndex) => {
//     const newIndicator = {
//       cantidad: "",
//       meta_producto: "",
//       indicador_linea_base: "",
//     };
//     const updatedProducts = [...product_data.producto];
//     updatedProducts[productIndex].indicadores = [
//       ...(updatedProducts[productIndex].indicadores || []),
//       newIndicator,
//     ];
//     setProductData({ ...product_data, producto: updatedProducts });
//   };

//   const handleUpdateIndicator = (
//     productIndex,
//     indicatorIndex,
//     field,
//     value
//   ) => {
//     const updatedProducts = [...product_data.producto];
//     const indicators = updatedProducts[productIndex].indicadores || [];
//     indicators[indicatorIndex][field] = value;
//     updatedProducts[productIndex].indicadores = indicators;
//     setProductData({ ...product_data, producto: updatedProducts });
//   };

//   const handleRemoveIndicator = (productIndex, indicatorIndex) => {
//     const updatedProducts = [...product_data.producto];
//     const indicators = updatedProducts[productIndex].indicadores || [];
//     indicators.splice(indicatorIndex, 1);
//     updatedProducts[productIndex].indicadores = indicators;
//     setProductData({ ...product_data, producto: updatedProducts });
//   };

//   const handleAddProduct = () => {
//     const newProduct = {
//       descripcion_producto: "",
//       indicadores: [],
//       nombre_entidad: "",
//       descripcion_operador: "",
//     };
//     const updatedProducts = [...(product_data.producto || []), newProduct];
//     setProductData({ ...product_data, producto: updatedProducts });
//     const updatedActivities = [...activities, []];
//     setActivities(updatedActivities);
//   };

//   const handleRemoveProduct = (productIndex) => {
//     const updatedProducts = product_data.producto.filter(
//       (_, index) => index !== productIndex
//     );
//     setProductData({ ...product_data, producto: updatedProducts });
//   };

//   return (
//     <div className={styles.productContainer}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Descripción del Producto</th>
//             <th>Indicadores</th>
//             <th>Operador PIC</th>
//             <th>Actividades</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(product_data.producto || []).map((product, productIndex) => (
//             <tr key={productIndex}>
//               <td>
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
//               </td>
//               <td>
//                 {(product.indicadores || []).map(
//                   (indicator, indicatorIndex) => (
//                     <div key={indicatorIndex} className={styles.indicator}>
//                       <div>
//                         <div className={styles.indicatorHeader}>
//                           <h5>Indicador-{indicatorIndex + 1}</h5>
//                           <button
//                             type="button"
//                             onClick={() =>
//                               handleRemoveIndicator(
//                                 productIndex,
//                                 indicatorIndex
//                               )
//                             }
//                             className={styles.removeButton_añadir}
//                           >
//                             -
//                           </button>
//                         </div>
//                         <label>Cantidad</label>
//                         <input
//                           type="text"
//                           value={indicator.cantidad}
//                           onChange={(e) =>
//                             handleUpdateIndicator(
//                               productIndex,
//                               indicatorIndex,
//                               "cantidad",
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label>Meta Producto</label>
//                         <input
//                           type="text"
//                           value={indicator.meta_producto}
//                           onChange={(e) =>
//                             handleUpdateIndicator(
//                               productIndex,
//                               indicatorIndex,
//                               "meta_producto",
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label>Indicador Linea Base</label>
//                         <input
//                           type="text"
//                           value={indicator.indicador_linea_base}
//                           onChange={(e) =>
//                             handleUpdateIndicator(
//                               productIndex,
//                               indicatorIndex,
//                               "indicador_linea_base",
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                     </div>
//                   )
//                 )}
//                 <div className={styles.buttonContainer}>
//                   <button
//                     type="button"
//                     onClick={() => handleAddIndicator(productIndex)}
//                     className={styles.buttonMain_añadir}
//                   >
//                     +
//                   </button>
//                 </div>
//               </td>
//               <td>
//                 <div>
//                   <label>Nombre Operador</label>
//                   <input
//                     type="text"
//                     value={product.nombre_entidad}
//                     onChange={(e) =>
//                       handleInputChange(
//                         productIndex,
//                         "nombre_entidad",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label>Descripción</label>
//                   <input
//                     type="text"
//                     value={product.descripcion_operador}
//                     onChange={(e) =>
//                       handleInputChange(
//                         productIndex,
//                         "descripcion_operador",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>
//               </td>
//               <td>
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
//               </td>
//               <td>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveProduct(productIndex)}
//                   className={styles.removeButton}
//                 >
//                   Eliminar
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
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

import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";
import ActivityList from "../Activities/ActivityList";

const Product = ({
  product_data,
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
  const [isIndicatorOpen, setIsIndicatorOpen] = useState({}); // Estado para gestionar los acordeones

  // useEffect(() => {
  //   const updatedProducts = product_data.producto.map((product) => {
  //     if (!product.indicadores || product.indicadores.length === 0) {
  //       return {
  //         ...product,
  //         indicadores: [
  //           {
  //             cantidad: "",
  //             meta_producto: "",
  //             indicador_linea_base: "",
  //           },
  //         ],
  //       };
  //     }
  //     return product;
  //   });

  //   if (
  //     JSON.stringify(updatedProducts) !== JSON.stringify(product_data.producto)
  //   ) {
  //     setProductData({ ...product_data, producto: updatedProducts });
  //   }
  // }, [product_data, setProductData]);

  const toggleIndicator = (productIndex, indicatorIndex) => {
    console.log("productIndex", productIndex);

    setIsIndicatorOpen((prevState) => ({
      ...prevState,
      [`${productIndex}-${indicatorIndex}`]:
        !prevState[`${productIndex}-${indicatorIndex}`],
    }));
  };

  const handleInputChange = (productIndex, field, value) => {
    const updatedProducts = [...product_data.producto];
    updatedProducts[productIndex][field] = value;
    setProductData({ ...product_data, producto: updatedProducts });
  };

  const handleAddIndicator = (productIndex) => {
    const newIndicator = {
      cantidad: "",
      meta_producto: "",
      indicador_linea_base: "",
    };
    const updatedProducts = [...product_data.producto];
    updatedProducts[productIndex].indicadores = [
      ...(updatedProducts[productIndex].indicadores || []),
      newIndicator,
    ];
    setProductData({ ...product_data, producto: updatedProducts });
  };

  const handleUpdateIndicator = (
    productIndex,
    indicatorIndex,
    field,
    value
  ) => {
    const updatedProducts = [...product_data.producto];
    const indicators = updatedProducts[productIndex].indicadores || [];
    indicators[indicatorIndex][field] = value;
    updatedProducts[productIndex].indicadores = indicators;
    setProductData({ ...product_data, producto: updatedProducts });
  };

  const handleRemoveIndicator = (productIndex, indicatorIndex) => {
    const updatedProducts = [...product_data.producto];
    const indicators = updatedProducts[productIndex].indicadores || [];
    indicators.splice(indicatorIndex, 1);
    updatedProducts[productIndex].indicadores = indicators;
    setProductData({ ...product_data, producto: updatedProducts });
  };

  const handleAddProduct = () => {
    const newProduct = {
      descripcion_producto: "",
      indicadores: [
        {
          cantidad: "",
          meta_producto: "",
          indicador_linea_base: "",
        },
      ],
      nombre_entidad: "",
      descripcion_operador: "",
    };
    const updatedProducts = [...(product_data.producto || []), newProduct];
    setProductData({ ...product_data, producto: updatedProducts });
    const updatedActivities = [...activities, []];
    setActivities(updatedActivities);
  };

  const handleRemoveProduct = (productIndex) => {
    const updatedProducts = product_data.producto.filter(
      (_, index) => index !== productIndex
    );
    setProductData({ ...product_data, producto: updatedProducts });
  };

  return (
    <div className={styles.productContainer}>
      {(product_data.producto || []).map((product, productIndex) => (
        <div>
          <h2>Producto {productIndex + 1}</h2>

          <table key={productIndex} className={styles.table}>
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
              <tr>
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
                        <div className={styles.indicatorHeader}>
                          <h5
                            onClick={() =>
                              toggleIndicator(productIndex, indicatorIndex)
                            }
                            className={styles.accordeonTitle}
                          >
                            Indicador {indicatorIndex + 1}
                          </h5>
                          {indicatorIndex > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveIndicator(
                                  productIndex,
                                  indicatorIndex
                                )
                              }
                              className={styles.removeButton_añadir}
                            >
                              -
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleAddIndicator(productIndex)}
                            className={styles.buttonMain_añadir}
                          >
                            +
                          </button>
                        </div>
                        {isIndicatorOpen[
                          `${productIndex}-${indicatorIndex}`
                        ] && (
                          <div className={styles.indicatorContent}>
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
                        )}
                      </div>
                    )
                  )}
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
                    className={styles.removeButton}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
