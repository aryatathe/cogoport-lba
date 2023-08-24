const blankState = {
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
      let newState = {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        email: action.payload.email,
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
