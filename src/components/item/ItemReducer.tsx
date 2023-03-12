export enum ActionTypes {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
  ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART",
  SELECT_SIZE_ITEM = "SELECT_SIZE_ITEM",
  SELECT_ITEM_COLOUR = "SELECT_ITEM_COLOUR",
}

interface Item {
  id: string;
  name: string;
  desc: string;
  type: string;
  sizes: string[];
  category: string;
  tags: string[];
  images: {
    sm: {
      one: string;
      two: string;
      three: string;
    };
    md: {
      one: string;
      two: string;
      three: string;
    };
    lg: {
      one: string;
      two: string;
      three: string;
    };
  };
  colors: string[];
  quantity: number;
  price: number;
  currency: string;
}

interface Items {
  data: Item[];
  status: string;
  message: string;
}

interface State {
  loading: boolean;
  error: boolean;
  items: Items | any;
  cart: Item[];
}
interface FetchSuccessAction {
  type: ActionTypes.FETCH_SUCCESS | ActionTypes.FETCH_START | ActionTypes.FETCH_ERROR;
  payload: [] | Item[];
}

interface QuantityAction {
  type: ActionTypes.INCREASE_QUANTITY | ActionTypes.DECREASE_QUANTITY;
  payload: string;
}

interface AddItemToCartAction {
  type: ActionTypes.ADD_ITEM_TO_CART;
  payload: string;
}

interface ItemDetailsSelectAction {
  type: ActionTypes.SELECT_SIZE_ITEM | ActionTypes.SELECT_ITEM_COLOUR;
  payload: string;
}

type Action = FetchSuccessAction | QuantityAction | AddItemToCartAction | ItemDetailsSelectAction;

export const INITIAL_STATE: State = {
  loading: false,
  error: false,
  items: { data: [], status: "", message: "" },
  cart: [],
};
export const ItemReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_START:
      return {
        loading: true,
        error: false,
        items: [],
        cart: [],
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
      const itemIdToIncrease = action.payload;
      const updatedItemsAfterIncrease = {
        ...state.items,
        data: state.items?.data.map((item: Item) => {
          if (item.id === itemIdToIncrease) {
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
        items: updatedItemsAfterIncrease,
      };
    case ActionTypes.DECREASE_QUANTITY:
      const itemIdToDecrease = action.payload;
      const updatedItemsAfterDecrease = {
        ...state.items,
        data: state.items?.data.map((item: Item) => {
          if (item.id === itemIdToDecrease && item.quantity > 1) {
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
        items: updatedItemsAfterDecrease,
      };

    case ActionTypes.SELECT_SIZE_ITEM:
      const sizeSelected = action.payload;

      return state;

    case ActionTypes.SELECT_ITEM_COLOUR:
      const colorSelected = action.payload;

      return state;

    case ActionTypes.ADD_ITEM_TO_CART:
      const itemIdToAdd = action.payload;
      const cartItemToAdd = state.items?.data.find((item: Item) => item.id === itemIdToAdd);
      const newCart = [...state.cart, cartItemToAdd];
      return {
        ...state,
        cart: newCart,
      };

    default:
      return state;
  }
};
