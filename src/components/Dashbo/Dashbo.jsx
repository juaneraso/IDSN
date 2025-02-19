// import React, { useState, useEffect } from "react";
// import Header from "../Header/Header";
// import Sidebar from "../Sidebar/Sidebar";
// import styles from "./Dashboard.module.css";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const eventos_municipio = [
//   { mes: "LA UNION", cantidad: 10 },
//   { mes: "BUESACO", cantidad: 20 },
//   { mes: "EL TABLON", cantidad: 15 },
//   { mes: "BELEN", cantidad: 30 },
//   { mes: "SAN BERNARDO", cantidad: 25 },
//   { mes: "TANGUA", cantidad: 35 },
//   { mes: "YACUANQUER", cantidad: 40 },
// ];

// const productos_proyecto = [
//   {
//     mes: "Medicamentos-Prestación de servicios de salud con calidad para la paz",
//     cantidad: 10,
//   },
//   {
//     mes: "Salud para Población de Especial Protección para la paz",
//     cantidad: 20,
//   },
//   {
//     mes: "PAI -Prevención de enfermedades transmisibles para la paz",
//     cantidad: 15,
//   },
//   {
//     mes: "Garantía de derechos sexuales y reproductivos para la paz",
//     cantidad: 30,
//   },
//   { mes: "Atención Primaria En Salud", cantidad: 25 },
//   { mes: "Emergencias-Salud Ambiental para la Paz", cantidad: 35 },
//   { mes: "Nutrición y alimentación saludable para la Paz", cantidad: 40 },
// ];

// const operador_evento = [
//   {
//     mes: "E.S.E. Hospital San Andrés - Tumaco",
//     cantidad: 10,
//   },
//   {
//     mes: "E.S.E. Hospital el Buen Samaritano - La Cruz",
//     cantidad: 20,
//   },
//   {
//     mes: "E.S.E. Hospital Departamental de Nariño",
//     cantidad: 15,
//   },
//   {
//     mes: "E.S.E. Centro de Salud de Puerres",
//     cantidad: 30,
//   },
//   { mes: "E.S.E. Hospital Clarita Santos - Sandoná", cantidad: 25 },
//   { mes: "E.S.E. Centro de Salud de Ancuyá - Nariñoz", cantidad: 35 },
//   { mes: "E.S.E. Centro de Salud - Consacá", cantidad: 40 },
// ];

// const producto_indicador = [
//   {
//     mes: "Menos de 2 indicadores",
//     cantidad: 10,
//   },
//   {
//     mes: "Igual a 2 y menor o igual a 3 indicadores",
//     cantidad: 20,
//   },
//   {
//     mes: "Mas de tres indicadores",
//     cantidad: 30,
//   },
// ];

// const tecnologia_actividad = [
//   {
//     mes: "Redes Familiares",
//     cantidad: 10,
//   },
//   {
//     mes: "Zonas de Escucha",
//     cantidad: 12,
//   },
//   {
//     mes: "Rehabilitación",
//     cantidad: 14,
//   },
//   {
//     mes: "Tamizaje",
//     cantidad: 14,
//   },
//   {
//     mes: "Jornadas de Salud",
//     cantidad: 14,
//   },
//   {
//     mes: "Vacunación",
//     cantidad: 14,
//   },
//   {
//     mes: "Medicamentos",
//     cantidad: 14,
//   },
// ];

// const entorno_actividad = [
//   {
//     mes: "Hogar",
//     cantidad: 10,
//   },
//   {
//     mes: "Comunitario",
//     cantidad: 12,
//   },
//   {
//     mes: "Educativo",
//     cantidad: 14,
//   },
//   {
//     mes: "Laboral-Informal",
//     cantidad: 14,
//   },
//   {
//     mes: "Insitucional",
//     cantidad: 14,
//   },
// ];

// const poblacion_actividad = [
//   {
//     mes: "Familias",
//     cantidad: 10,
//   },
//   {
//     mes: "Comunidad",
//     cantidad: 12,
//   },
//   {
//     mes: "Personas",
//     cantidad: 14,
//   },
//   {
//     mes: "Estudiantes",
//     cantidad: 14,
//   },
//   {
//     mes: "Comunidad Educativa",
//     cantidad: 14,
//   },
//   {
//     mes: "Trabajadores",
//     cantidad: 14,
//   },
// ];

// const mes_actividad = [
//   { mes: "Enero", cantidad: 10 },
//   { mes: "Febrero", cantidad: 12 },
//   { mes: "Marzo", cantidad: 14 },
//   { mes: "Abril", cantidad: 16 },
//   { mes: "Mayo", cantidad: 18 },
//   { mes: "Junio", cantidad: 20 },
//   { mes: "Julio", cantidad: 22 },
//   { mes: "Agosto", cantidad: 24 },
//   { mes: "Septiembre", cantidad: 26 },
//   { mes: "Octubre", cantidad: 28 },
//   { mes: "Noviembre", cantidad: 30 },
//   { mes: "Diciembre", cantidad: 32 },
// ];

// const check_soporte = [
//   {
//     mes: "Aprobado",
//     cantidad: 10,
//   },
//   {
//     mes: "No aprobado",
//     cantidad: 12,
//   },
//   {
//     mes: "Aprobado Soporte Físico",
//     cantidad: 14,
//   },
//   {
//     mes: "No Aprobado Soporte Físico",
//     cantidad: 14,
//   },
// ];

// const Dashbo = () => {
//   const back = import.meta.env.VITE_APP_BACK;
//   const url_usuarios = `${back}/api/users/me?pLevel=2`;
//   const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
//   const token = token_object.token;

//   const [usuario_dos, setUsuario_dos] = useState(null);
//   const [super_usuario, setSuper] = useState(null);
//   // let super_usuario = false;
//   const colors = [
//     "#6652dc", // Azul violeta
//     "#1cb36a", // Verde lima
//     "#ca6820", // Naranja rojizo
//     "#267b52", // Verde lima
//     "#156784", // Azul dodger
//     "#7727b8", // Rosa fuerte
//     "#c2a42b", // Dorado
//   ];

//   useEffect(() => {
//     const fetch_user = async () => {
//       try {
//         const response = await fetch(`${url_usuarios}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error("Error al obtener usuarios.");

//         const data = await response.json();
//         const datos = {
//           usuario: data.custom_roles[0].name,
//         };

//         if (data.custom_roles.length > 1) {
//           setSuper(true);
//         }

//         console.log("data_usuario", data);
//         console.log("datos", datos);
//         sessionStorage.setItem("usuario", JSON.stringify(datos));
//         setUsuario_dos(datos.usuario);
//         console.log("super_user", super_usuario);
//         //setSubregions(data.data);
//         // setMunicipios(data.data);
//       } catch (error) {
//         console.error("Error fetching subregions:", error);
//       }
//     };

//     fetch_user();
//   }, [token]);

//   const usuario_object = JSON.parse(sessionStorage.getItem("usuario")) || {};

//   const usuario = usuario_object.usuario;

//   console.log("usuario_rol", usuario);

//   return (
//     <div className={styles.dashboard}>
//       <Header />
//       <div className={styles.main}>
//         <Sidebar usuario_dos={usuario_dos} super_usuario={super_usuario} />
//         {/* <div className={styles.content}> */}

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(2, 1fr)", // 2 columnas
//             gap: "10px",
//             justifyContent: "center",
//             width: "100%",
//             background: "#ecf0f1",
//           }}
//         >
//           {/* Contenedor para la gráfica */}
//           <div style={{ width: "100%", height: 300, marginBottom: "40px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               {/* <BarChart width={800} height={300} data={eventos_municipio}> */}
//               <BarChart data={eventos_municipio}>
//                 <defs>
//                   <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <text
//                   x="48%"
//                   y={15}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize={16}
//                   fontWeight="bold"
//                 >
//                   Cantidad de Eventos Según Municipio
//                 </text>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mes" angle={-15} textAnchor="end" />
//                 <YAxis />
//                 <Tooltip />
//                 {/* <Bar dataKey="cantidad" fill="#8884d8" barSize={60} /> */}
//                 <Bar dataKey="cantidad" fill="url(#colorUv)" barSize={50} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div style={{ width: "100%", height: 400, marginTop: "30px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               {/* <PieChart width={800} height={300}> */}
//               <PieChart>
//                 <Pie
//                   data={productos_proyecto}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="cantidad"
//                   label={({ cantidad }) => cantidad} // Muestra el nombre del producto
//                 >
//                   {productos_proyecto.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={colors[index % colors.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <text
//                   x="50%"
//                   y={10}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize={16}
//                   fontWeight="bold"
//                 >
//                   Cantidad de Productos Según Proyecto
//                 </text>

//                 <Tooltip
//                   formatter={(value, name, entry) => [`${entry.payload.mes}`]}
//                 />

//                 <Legend
//                   formatter={(value, entry) => {
//                     const { payload } = entry;
//                     return `${payload.cantidad}`; // Solo muestra la cantidad
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           <div style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={operador_evento}>
//                 <text
//                   x="50%"
//                   y={15}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize={16}
//                   fontWeight="bold"
//                 >
//                   Número de Eventos Según Operador
//                 </text>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mes" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="cantidad" fill="#8884d8" barSize={60} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div style={{ width: "100%", height: 300, marginTop: "30px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={producto_indicador}>
//                 <text
//                   x="50%"
//                   y={10}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize={16}
//                   fontWeight="bold"
//                 >
//                   Número de Productos Según Indicador
//                 </text>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mes" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="cantidad" fill="#8884d8" barSize={60} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div style={{ width: "100%", height: 300, marginTop: "30px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={tecnologia_actividad}>
//                 <text
//                   x="50%"
//                   y={10}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize={16}
//                   fontWeight="bold"
//                 >
//                   Número de Actividades Según Tecnología
//                 </text>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mes" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="cantidad" fill="#8884d8" barSize={60} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//           <div style={{ width: "100%", height: 300, marginTop: "30px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={entorno_actividad}>
//                 <text
//                   x="50%"
//                   y={10}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize={16}
//                   fontWeight="bold"
//                 >
//                   Número de Actividades Según Entorno
//                 </text>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mes" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="cantidad" fill="#8884d8" barSize={60} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//           <div style={{ width: "100%", height: 300, marginTop: "30px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={poblacion_actividad}>
//                 <text
//                   x="50%"
//                   y={10}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize={16}
//                   fontWeight="bold"
//                 >
//                   Número de Actividades Según Población
//                 </text>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mes" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="cantidad" fill="#8884d8" barSize={60} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//           <div style={{ width: "100%", height: 300, marginTop: "30px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={mes_actividad}>
//                 <text
//                   x="50%"
//                   y={10}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize={16}
//                   fontWeight="bold"
//                 >
//                   Número de Actividades Cada Mes
//                 </text>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mes" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="cantidad" fill="#8884d8" barSize={60} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//           <div style={{ width: "100%", height: 300, marginTop: "30px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={check_soporte}>
//                 <text
//                   x="50%"
//                   y={10}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize={16}
//                   fontWeight="bold"
//                 >
//                   Número de Soportes Según Check
//                 </text>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mes" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="cantidad" fill="#8884d8" barSize={60} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
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
import { Card, CardContent, Typography } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const eventos_municipio = [
  { mes: "LA UNION", cantidad: 10 },
  { mes: "BUESACO", cantidad: 20 },
  { mes: "EL TABLON", cantidad: 15 },
  { mes: "BELEN", cantidad: 30 },
  { mes: "SAN BERNARDO", cantidad: 25 },
  { mes: "TANGUA", cantidad: 35 },
  { mes: "YACUANQUER", cantidad: 40 },
];

const productos_proyecto = [
  {
    mes: "Medicamentos-Prestación de servicios de salud con calidad para la paz",
    cantidad: 10,
  },
  {
    mes: "Salud para Población de Especial Protección para la paz",
    cantidad: 20,
  },
  {
    mes: "PAI -Prevención de enfermedades transmisibles para la paz",
    cantidad: 15,
  },
  {
    mes: "Garantía de derechos sexuales y reproductivos para la paz",
    cantidad: 30,
  },
  { mes: "Atención Primaria En Salud", cantidad: 25 },
  { mes: "Emergencias-Salud Ambiental para la Paz", cantidad: 35 },
  { mes: "Nutrición y alimentación saludable para la Paz", cantidad: 40 },
];

const operador_evento = [
  {
    mes: "E.S.E. Hospital San Andrés - Tumaco",
    cantidad: 10,
  },
  {
    mes: "E.S.E. Hospital el Buen Samaritano - La Cruz",
    cantidad: 20,
  },
  {
    mes: "E.S.E. Hospital Departamental de Nariño",
    cantidad: 15,
  },
  {
    mes: "E.S.E. Centro de Salud de Puerres",
    cantidad: 30,
  },
  { mes: "E.S.E. Hospital Clarita Santos - Sandoná", cantidad: 25 },
  { mes: "E.S.E. Centro de Salud de Ancuyá - Nariñoz", cantidad: 35 },
  { mes: "E.S.E. Centro de Salud - Consacá", cantidad: 40 },
];

const producto_indicador = [
  {
    mes: "Menos de 2 indicadores",
    cantidad: 10,
  },
  {
    mes: "Igual a 2 y menor o igual a 3 indicadores",
    cantidad: 20,
  },
  {
    mes: "Mas de tres indicadores",
    cantidad: 30,
  },
];

const tecnologia_actividad = [
  {
    mes: "Redes Familiares",
    cantidad: 10,
  },
  {
    mes: "Zonas de Escucha",
    cantidad: 12,
  },
  {
    mes: "Rehabilitación",
    cantidad: 14,
  },
  {
    mes: "Tamizaje",
    cantidad: 14,
  },
  {
    mes: "Jornadas de Salud",
    cantidad: 14,
  },
  {
    mes: "Vacunación",
    cantidad: 14,
  },
  {
    mes: "Medicamentos",
    cantidad: 14,
  },
];

const entorno_actividad = [
  {
    mes: "Hogar",
    cantidad: 10,
  },
  {
    mes: "Comunitario",
    cantidad: 12,
  },
  {
    mes: "Educativo",
    cantidad: 14,
  },
  {
    mes: "Laboral-Informal",
    cantidad: 14,
  },
  {
    mes: "Insitucional",
    cantidad: 14,
  },
];

const poblacion_actividad = [
  {
    mes: "Familias",
    cantidad: 10,
  },
  {
    mes: "Comunidad",
    cantidad: 12,
  },
  {
    mes: "Personas",
    cantidad: 14,
  },
  {
    mes: "Estudiantes",
    cantidad: 14,
  },
  {
    mes: "Comunidad Educativa",
    cantidad: 14,
  },
  {
    mes: "Trabajadores",
    cantidad: 14,
  },
];

const mes_actividad = [
  { mes: "Enero", cantidad: 10 },
  { mes: "Febrero", cantidad: 12 },
  { mes: "Marzo", cantidad: 14 },
  { mes: "Abril", cantidad: 16 },
  { mes: "Mayo", cantidad: 18 },
  { mes: "Junio", cantidad: 20 },
  { mes: "Julio", cantidad: 22 },
  { mes: "Agosto", cantidad: 24 },
  { mes: "Septiembre", cantidad: 26 },
  { mes: "Octubre", cantidad: 28 },
  { mes: "Noviembre", cantidad: 30 },
  { mes: "Diciembre", cantidad: 32 },
];

const check_soporte = [
  {
    mes: "Aprobado",
    cantidad: 10,
  },
  {
    mes: "No aprobado",
    cantidad: 12,
  },
  {
    mes: "Aprobado Soporte Físico",
    cantidad: 14,
  },
  {
    mes: "No Aprobado Soporte Físico",
    cantidad: 14,
  },
];

const Dashbo = () => {
  const back = import.meta.env.VITE_APP_BACK;
  const url_usuarios = `${back}/api/users/me?pLevel=2`;
  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;

  const [usuario_dos, setUsuario_dos] = useState(null);
  const [super_usuario, setSuper] = useState(null);
  // let super_usuario = false;

  const barData = {
    labels: eventos_municipio.map((item) => item.mes),
    datasets: [
      {
        label: "Cantidad",
        data: eventos_municipio.map((item) => item.cantidad),
        backgroundColor: "rgba(22, 111, 171, 0.5)",
        barPercentage: 0.7, // Controla el ancho relativo de cada barra (1 = ancho completo, 0.1 = muy delgado)
        categoryPercentage: 0.8, // Controla el espacio entre barras (1 = juntas, 0.1 = mucho espacio)
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Cantidad de Productos por Proyecto",
      },
    },
  };

  const pieData = {
    labels: productos_proyecto.map((item) => item.mes),
    datasets: [
      {
        data: productos_proyecto.map((item) => item.cantidad),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
        ],
        hoverBackgroundColor: [
          "#FF6384CC",
          "#36A2EBCC",
          "#FFCE56CC",
          "#4BC0C0CC",
          "#9966FFCC",
          "#FF9F40CC",
          "#C9CBCFCC",
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start", // Alinea los elementos del legend a la izquierda
      },
      title: {
        display: true,
        text: "Cantidad de Productos Según Proyecto",
        font: {
          size: 15, // Ajusta el tamaño del texto
          weight: "bold", // Opcional: hace el texto más grueso
        },
        padding: {
          top: 10,
          bottom: 8, // Espacio debajo del título
        },
      },
    },
  };

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
        {/* <div className={styles.content}> */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // 3 columnas
            gap: "10px",
            justifyContent: "center",
            width: "100%",
            background: "#ecf0f1",
          }}
        >
          <div style={{ width: "600px" }}>
            <Card sx={{ minWidth: 200, textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  {"Total de Municipios con Eventos"}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {20}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div style={{ width: "600px" }}>
            <Card sx={{ minWidth: 200, textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  {"Total Municipios"}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {60}
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div style={{ width: "600px" }}>
            <Bar data={barData} options={barOptions} />
          </div>
          <div style={{ width: "450px", marginLeft: "20px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>

          <div style={{ width: "600px" }}>
            <Bar data={barData} options={barOptions} />
          </div>

          <div style={{ width: "600px" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbo;
