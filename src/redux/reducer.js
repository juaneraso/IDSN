import { GET_TOKEN , LOGIN_DATA, TOKEN_DATA } from "./actions";

const initialState = {
  token: {},
  token_two:[],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_DATA:
      return { ...state, token: action.payload };
    case TOKEN_DATA:
      return { ...state, token_two: action.payload };
    default:
      return { ...state };
  }
};
export default rootReducer;
