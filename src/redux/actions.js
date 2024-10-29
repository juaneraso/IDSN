import axios from "axios";

export const GET_USERS = "GET_USERS";
export const GET_TOKEN = "GET_TOKEN";
export const LOGIN_DATA = "LOGIN_DATA";
export const TOKEN_DATA = "TOKEN_DATA";

// Variable de entorno

const back = import.meta.env.VITE_APP_BACK;


export const tokenData = (tokenData) => ({
  type: TOKEN_DATA,
  payload: tokenData,
});


export const loginSuccess = (userData) => ({
  type: LOGIN_DATA,
  payload: userData,
});

// export const getUsers = () => {
//   return async function (dispatch) {
//     try {
//       const apiData = await fetch(`${back}/users`);
//       if (!apiData.ok) {
//         throw new Error(`HTTP error! Status: ${apiData.status}`);
//       }

//       const users = await apiData.json();

//       dispatch({ type: GET_USERS, payload: users });
//     } catch (error) {
//       alert("algo salio mal");
//       console.log("Error", error);
//     }
//   };
// };

export const getUser = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const user = apiData.data;
    dispatch({ type: GET_TOKEN, payload: user });
  };
};
