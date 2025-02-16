// import React from "react";
// import Header from "../Header/Header";
// import Sidebar from "../Sidebar/Sidebar";
// import styles from "./Dashboard.module.css";

// const Dashbo = () => {
//   return (
//     <div className={styles.dashboard}>
//       <Header />
//       <div className={styles.main}>
//         <Sidebar />
//         <div className={styles.content}>
//           <h2>Bienvenido al Dashboard</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashbo;

import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Dashboard.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const cronograma = [
  { mes: "Ene", peso: 10 },
  { mes: "Feb", peso: 20 },
  { mes: "Mar", peso: 15 },
  { mes: "Abr", peso: 30 },
  { mes: "May", peso: 25 },
  { mes: "Jun", peso: 35 },
  { mes: "Jul", peso: 40 },
  { mes: "Ago", peso: 20 },
  { mes: "Sept", peso: 15 },
  { mes: "Oct", peso: 50 },
  { mes: "Nov", peso: 30 },
  { mes: "Dic", peso: 45 },
];

const Dashbo = () => {
  const back = import.meta.env.VITE_APP_BACK;
  const url_usuarios = `${back}/api/users/me?pLevel=2`;
  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;

  const [usuario_dos, setUsuario_dos] = useState(null);
  const [super_usuario, setSuper] = useState(null);
  // let super_usuario = false;

  useEffect(() => {
    const fetch_user = async () => {
      try {
        const response = await fetch(`${url_usuarios}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener usuarios.");

        const data = await response.json();
        const datos = {
          usuario: data.custom_roles[0].name,
        };

        if (data.custom_roles.length > 1) {
          setSuper(true);
        }

        console.log("data_usuario", data);
        console.log("datos", datos);
        sessionStorage.setItem("usuario", JSON.stringify(datos));
        setUsuario_dos(datos.usuario);
        console.log("super_user", super_usuario);
        //setSubregions(data.data);
        // setMunicipios(data.data);
      } catch (error) {
        console.error("Error fetching subregions:", error);
      }
    };

    fetch_user();
  }, [token]);

  const usuario_object = JSON.parse(sessionStorage.getItem("usuario")) || {};

  const usuario = usuario_object.usuario;

  console.log("usuario_rol", usuario);

  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.main}>
        <Sidebar usuario_dos={usuario_dos} super_usuario={super_usuario} />
        <div className={styles.content}>
          <h2>Bienvenido al Dashboard</h2>

          {/* Contenedor para la gráfica */}
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cronograma}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="peso" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbo;
