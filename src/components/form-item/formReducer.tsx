import { v4 as uuidV4 } from "uuid";
export const INITIAL_STATE = {
  id: "",
  name: "",
  desc: "",
  category: "",
  ingredients: [],
  calories: 0,
  tags: [],
  images: {
    sm: "",
    md: "",
    lg: "",
  },
  quantity: 0,
  price: 0,
};

export type State = {
  name: "";
  desc: "";
  category: "";
  ingredients: [""];
  calories: 0;
  tags: [];
  images: {
    sm: "";
    md: "";
    lg: "";
  };
  quantity: 0;
  price: 0;
};

export const formReducer = (state: State, action: any) => {
  console.log("Action", action);
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "ADD_TAG":
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case "REMOVE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };
    case "INCREASE":
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    case "DECREASE":
      return {
        ...state,
        quantity: state.quantity - 1,
      };
    case "ERROR":
      return {
        ...state,
        quantity: state.quantity - 1,
      };
    default:
      return state;
  }
};
