export enum ActionTypes {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
}

interface Item {
  id: string;
  name: string;
  desc: string;
  type: string;
  size: Array<string>;
  category: string;
  tags: Array<string>;
  image: {
    sm: Record<string, string>;
    md: Record<string, string>;
    lg: Record<string, string>;
  };
  colors: Array<string>;
  quantity: number;
  price: number;
  currency: string;
}

interface Action {
  type: ActionTypes;
  payload: [];
}

interface State {
  loading: boolean;
  error: boolean;
  post: {} | any;
}

export const INITIAL_STATE: State = {
  loading: false,
  error: false,
  post: {},
};

export const ItemReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_START:
      return {
        loading: true,
        error: false,
        post: {},
      };

    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };

    case ActionTypes.FETCH_ERROR:
      return {
        ...state,
        error: true,
        post: {},
      };
    default:
      return state;
  }
};
