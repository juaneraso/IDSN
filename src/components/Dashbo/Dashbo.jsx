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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

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

const Dashbo = () => {
  const back = import.meta.env.VITE_APP_BACK;
  const url_usuarios = `${back}/api/users/me?pLevel=2`;
  const token_object = JSON.parse(sessionStorage.getItem("token")) || {};
  const token = token_object.token;

  const [usuario_dos, setUsuario_dos] = useState(null);
  const [super_usuario, setSuper] = useState(null);
  // let super_usuario = false;
  const colors = [
    "#6652dc", // Azul violeta
    "#1cb36a", // Verde lima
    "#ca6820", // Naranja rojizo
    "#267b52", // Verde lima
    "#156784", // Azul dodger
    "#7727b8", // Rosa fuerte
    "#c2a42b", // Dorado
  ];

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
          {/* <h2>Bienvenido al Dashboard</h2> */}
          {/* Contenedor para la gráfica */}
          <div style={{ width: "100%", height: 300, marginBottom: "40px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventos_municipio}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <text
                  x="48%"
                  y={15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={16}
                  fontWeight="bold"
                >
                  Cantidad de Productos Según Municipio
                </text>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" angle={-15} textAnchor="end" />
                <YAxis />
                <Tooltip />
                {/* <Bar dataKey="cantidad" fill="#8884d8" barSize={60} /> */}
                <Bar dataKey="cantidad" fill="url(#colorUv)" barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ width: "100%", height: 400, marginTop: "30px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productos_proyecto}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cantidad"
                  label={({ mes }) => mes} // Muestra el nombre del producto
                >
                  {productos_proyecto.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y={10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={16}
                  fontWeight="bold"
                >
                  Cantidad de Productos Según Proyecto
                </text>
                <Tooltip
                  formatter={(cantidad, name, entry) => [cantidad, entry.mes]}
                />

                <Legend
                  formatter={(value, entry) => {
                    const { payload } = entry;
                    return `${payload.cantidad}`; // Solo muestra la cantidad
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operador_evento}>
                <text
                  x="50%"
                  y={15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={16}
                  fontWeight="bold"
                >
                  Número de Eventos Según Operador
                </text>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#8884d8" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbo;
