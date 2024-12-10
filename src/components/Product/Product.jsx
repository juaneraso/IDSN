import React, { useState } from "react";
import styles from "./Product.module.css";

const Product = ({ productData, setProductData }) => {
  const handleChange = (section, field, value) => {
    setProductData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      soporte: {
        ...prevData.soporte,
        archivos: file,
      },
    }));
  };

  return (
    <div className={styles.productContainer}>
      {/* Sección Producto */}
      <div className={styles.section}>
        <h3>Producto</h3>
        <div className={styles.field}>
          <label htmlFor="descripcion_producto">Descripción del Producto</label>
          <textarea
            id="descripcion_producto"
            value={productData.producto.descripcion_producto}
            onChange={(e) =>
              handleChange("producto", "descripcion_producto", e.target.value)
            }
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="indicador_de_producto">Indicador de Producto</label>
          <input
            type="text"
            id="indicador_de_producto"
            value={productData.producto.indicador_de_producto}
            onChange={(e) =>
              handleChange("producto", "indicador_de_producto", e.target.value)
            }
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="indicador_Linea_Base">Indicador Línea Base</label>
          <input
            type="text"
            id="indicador_Linea_Base"
            value={productData.producto.indicador_Linea_Base}
            onChange={(e) =>
              handleChange("producto", "indicador_Linea_Base", e.target.value)
            }
          />
        </div>
      </div>

      {/* Sección Soporte */}
      {/* <div className={styles.section}>
        <h3>Soporte</h3>
        <div className={styles.field}>
          <label htmlFor="tipo_soporte">Tipo de Soporte</label>
          <input
            type="text"
            id="tipo_soporte"
            value={productData.soporte.tipo_soporte}
            onChange={(e) =>
              handleChange("soporte", "tipo_soporte", e.target.value)
            }
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="descripcion_soporte">Descripción</label>
          <textarea
            id="descripcion_soporte"
            value={productData.soporte.descripcion}
            onChange={(e) =>
              handleChange("soporte", "descripcion", e.target.value)
            }
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="archivo">Archivo Adjunto</label>
          <input
            type="file"
            id="archivo"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          {productData.soporte.archivos && (
            <p>Archivo seleccionado: {productData.soporte.archivos.name}</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="valor_porcentual">Valor Porcentual</label>
          <input
            type="number"
            id="valor_porcentual"
            value={productData.soporte.valor_porcentual}
            onChange={(e) =>
              handleChange("soporte", "valor_porcentual", e.target.value)
            }
          />
        </div>
      </div> */}

      {/* Sección CUPS */}
      {/* <div className={styles.section}>
        <h3>CUPS</h3>
        <div className={styles.field}>
          <label htmlFor="codigo_cups">Código</label>
          <input
            type="text"
            id="codigo_cups"
            value={productData.cups.codigo}
            onChange={(e) => handleChange("cups", "codigo", e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="subcodigo_cups">Subcódigo</label>
          <input
            type="text"
            id="subcodigo_cups"
            value={productData.cups.subcodigo}
            onChange={(e) => handleChange("cups", "subcodigo", e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="descripcion_cups">Descripción</label>
          <textarea
            id="descripcion_cups"
            value={productData.cups.descripcion}
            onChange={(e) =>
              handleChange("cups", "descripcion", e.target.value)
            }
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="valor_cups">Valor</label>
          <input
            type="number"
            id="valor_cups"
            value={productData.cups.valor}
            onChange={(e) => handleChange("cups", "valor", e.target.value)}
          />
        </div>
      </div> */}
    </div>
  );
};

export default Product;
