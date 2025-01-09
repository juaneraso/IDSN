import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import imagen from "../../assets/Logo2.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const back = import.meta.env.VITE_APP_BACK;

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación de formato email
    return emailRegex.test(email);
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;

    // Actualizamos el formulario
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    // Validación en tiempo real
    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: isEmailValid(value) ? "" : "Por favor, ingresa un email válido",
      }));
    }

    if (name === "confirmPassword" || name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          name === "confirmPassword" && value !== form.password
            ? "Las contraseñas no coinciden"
            : "",
      }));
    }
  };

  const formIsDisabled =
    !form.username ||
    !form.email ||
    !isEmailValid(form.email) ||
    !form.password ||
    form.password !== form.confirmPassword;

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!isEmailValid(form.email)) {
      Swal({
        title: "Error",
        text: "Por favor, ingresa un email válido",
        icon: "error",
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      Swal({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        // "http://localhost:1337/api/auth/local/register",
        `${back}/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetch POST Response:", data);

      Swal({
        title: "Registro exitoso",
        text: "Usuario registrado correctamente",
        icon: "success",
      });

      navigate("/login"); // Redirigir a la página de login después del registro exitoso
    } catch (error) {
      console.error("Fetch POST Error:", error.message);
      Swal({
        title: "Error al registrar",
        text: "Hubo un problema al intentar registrar el usuario",
        icon: "error",
      });
    }
  };

  console.log("Form", form);

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <MDBRow className="d-flex justify-content-center align-items-center w-100">
        <MDBCol lg="6" md="8" sm="10" className="d-flex justify-content-center">
          <MDBCard className="my-5 rounded-3" style={{ maxWidth: "600px" }}>
            <MDBCardImage
              src={imagen}
              className="w-100 rounded-top"
              alt="Sample photo"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />

            <MDBCardBody className="px-5">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center">
                Registro Usuario
              </h3>

              {/* Campo de Nombre */}
              <MDBInput
                wrapperClass="mb-4"
                label="UserName"
                id="form1"
                type="text"
                value={form.username}
                onChange={changeHandler}
                name="username"
              />

              {/* Campo de Email */}
              <MDBInput
                wrapperClass="mb-3"
                label="Email"
                id="form2"
                type="email"
                value={form.email}
                onChange={changeHandler}
                name="email"
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}

              {/* Campo de Contraseña */}
              <MDBInput
                wrapperClass="mb-3"
                label="Password"
                id="form3"
                type="password"
                value={form.password}
                onChange={changeHandler}
                name="password"
              />

              {/* Campo de Confirmar Contraseña */}
              <MDBInput
                wrapperClass="mb-3"
                label="Confirm Password"
                id="form4"
                type="password"
                value={form.confirmPassword}
                onChange={changeHandler}
                name="confirmPassword"
              />
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}

              {/* Botón de Enviar */}
              <MDBBtn
                color="success"
                className="mb-4 w-100"
                size="lg"
                disabled={formIsDisabled}
                onClick={submitHandler}
              >
                Submit
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
