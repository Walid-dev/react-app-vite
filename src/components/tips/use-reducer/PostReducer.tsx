import { ACTION_TYPES } from "./PostActionTypes";
type State = {
  loading: boolean;
  error: boolean;
  post: {};
};

export const INITIAL_STATE = {
  loading: false,
  post: {},
  error: false,
};

export const postReducer = (state: State, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        loading: true,
        error: false,
        post: {},
      };

    case ACTION_TYPES.FECTH_SUCCESS:
      //   console.log("Action", action);
      return {
        ...state,
        loading: false,
        post: action.payload,
      };

    case ACTION_TYPES.FETCH_ERROR:
      return {
        loading: false,
        error: true,
        post: {},
      };
    default:
      return state;
  }
};
