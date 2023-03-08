export enum ActionTypes {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
  ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART",
  SELECT_SIZE_ITEM = "SELECT_SIZE_ITEM",
}

interface Item {
  id?: string;
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
  [key: string]: any;
}

interface State {
  loading: boolean;
  error: boolean;
  items: Item[] | any;
  cart: Item[] | any;
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
  type: ActionTypes.SELECT_SIZE_ITEM;
  payload: string;
}

type Action = FetchSuccessAction | QuantityAction | AddItemToCartAction | ItemDetailsSelectAction;

export const INITIAL_STATE: State = {
  loading: false,
  error: false,
  items: [],
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
        data: state.items.data.map((item: Item) => {
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
        data: state.items.data.map((item: Item) => {
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

    case ActionTypes.ADD_ITEM_TO_CART:
      const itemIdToAdd = action.payload;
      const cartItemToAdd = state.items.data.find((item: Item) => item.id === itemIdToAdd);
      const newCart = [...state.cart, cartItemToAdd];
      return {
        ...state,
        cart: newCart,
      };

    case ActionTypes.SELECT_SIZE_ITEM:
      const sizeSelected = action.payload;
      console.log(sizeSelected);

    default:
      return state;
  }
};
