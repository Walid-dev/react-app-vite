export enum ActionTypes {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
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

interface State {
  loading: boolean;
  error: boolean;
  items: Item[] | any;
}

interface FetchSuccessAction {
  type: ActionTypes.FETCH_SUCCESS | ActionTypes.FETCH_START | ActionTypes.FETCH_ERROR;
  payload: [] | Item[];
}

interface QuantityAction {
  type: ActionTypes.INCREASE_QUANTITY | ActionTypes.DECREASE_QUANTITY;
  payload: string;
}

type Action = FetchSuccessAction | QuantityAction;

export const INITIAL_STATE: State = {
  loading: false,
  error: false,
  items: [],
};

export const ItemReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_START:
      return {
        loading: true,
        error: false,
        items: [],
      };

    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case ActionTypes.FETCH_ERROR:
      return {
        ...state,
        error: true,
        items: [],
      };
    case ActionTypes.INCREASE_QUANTITY:
      const itemId = action.payload;
      const updatedItems = {
        ...state.items,
        data: state.items.data.map((item: Item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
      return {
        ...state,
        items: updatedItems,
      };
    case ActionTypes.DECREASE_QUANTITY:
      const itemId2 = action.payload;

      const updatedItems2 = {
        ...state.items,
        data: state.items.data.map((item: Item) => {
          if (item.id === itemId2 && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        }),
      };
      return {
        ...state,
        items: updatedItems2,
      };
    default:
      return state;
  }
};
