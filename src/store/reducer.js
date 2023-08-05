const blankState = {
  isLoggedIn: false,
  token: "",
  id: null,
  email: "",
};
const initialState =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : blankState;
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      console.log(action.payload);
      let newState = {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        email: action.payload.email,
        id: action.payload.id,
      };
      localStorage.setItem("user", JSON.stringify(newState));
      return newState;
    }
    case "LOGOUT": {
      console.log(action.payload);
      localStorage.setItem("user", JSON.stringify(blankState));
      return blankState;
    }
    default:
      return state;
  }
};
export default reducer;
