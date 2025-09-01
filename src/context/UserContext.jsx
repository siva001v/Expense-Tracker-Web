import { useReducer } from "react";
import { UserContext } from "./useUser";

const intialState = {
  name: "",
  email: "",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...action.payload };

    case "UPDATE_USER":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };

    case "CLEAR_USER":
      return {
        name: "",
        email: "",
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem("user")) || intialState;

  const [state, dispatch] = useReducer(userReducer, localUser);

  return (
    <UserContext.Provider value={{ user: state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
