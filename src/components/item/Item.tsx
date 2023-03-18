import { useReducer, useEffect } from "react";
import { ItemReducer, ActionTypes, INITIAL_STATE } from "./ItemReducer";
import { v4 as uuidV4 } from "uuid";
import "./item.css";

export const Item = () => {
  const [state, dispatch] = useReducer(ItemReducer, INITIAL_STATE);

  // UseEffet Fetch

  const handleFetch = () => {
    dispatch({ type: ActionTypes.FETCH_START, payload: [] });
    fetch("http://localhost:3000/items", { method: "get" })
      .then((response) => response.json())
      .then((data) => dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: data }))
      .catch((err) => dispatch({ type: ActionTypes.FETCH_ERROR, payload: [] }));
  };

  useEffect(handleFetch, []);

  console.log(state);

  return (
    <div>
      <div>{state.cart.length > 0 && "Cart Items: " + state.cart.length}</div>
      {state.items.data?.map((item: any) => (
        <form key={uuidV4()} className="item-container">
          <div className="item">
            <div className="name-container">
              <div className="name">{item.name}</div>
            </div>
            <div className="image-container">
              <div className="image">
                <img src={item.images.sm.one} alt={item.name} />
              </div>
            </div>
            <div className="main-content-container">
              <div className="description-container">
                <div className="item-description">{item.desc}</div>
              </div>
              <div className="tags-container">
                {item.tags.map((tag: string) => {
                  return (
                    <small
                      onClick={(e: any) =>
                        dispatch({
                          type: ActionTypes.SELECT_ITEM_TO_ADD_DETAILS,
                          payload: {
                            item: item,
                            id: item.id,
                            type: e.target.attributes.getNamedItem("data-type").value,
                            value: e.target.attributes.getNamedItem("data-value").value,
                          },
                        })
                      }
                      key={uuidV4()}
                      data-type="selected-tag"
                      data-value={tag}
                      className="tags">
                      {tag}
                    </small>
                  );
                })}
              </div>
              <div className="color-icons-container">
                {item.available_colours?.map((colour: string) => {
                  return (
                    <small
                      onClick={(e: any) =>
                        dispatch({
                          type: ActionTypes.SELECT_ITEM_TO_ADD_DETAILS,
                          payload: {
                            item: item,
                            id: item.id,
                            type: e.target.attributes.getNamedItem("data-type").value,
                            value: e.target.attributes.getNamedItem("data-value").value,
                          },
                        })
                      }
                      data-type="selected-colour"
                      data-value={colour}
                      key={uuidV4()}
                      className={`color-icon ${colour}`}></small>
                  );
                })}
              </div>
              <div className="size-icons-container">
                {item.sizes.map((size: string) => {
                  return (
                    <div key={uuidV4()} className="size-icon-box">
                      <small
                        onClick={(e: any) =>
                          dispatch({
                            type: ActionTypes.SELECT_ITEM_TO_ADD_DETAILS,
                            payload: {
                              item: item,
                              id: item.id,
                              type: e.target.attributes.getNamedItem("data-type").value,
                              value: e.target.attributes.getNamedItem("data-value").value,
                            },
                          })
                        }
                        data-type="selected-size"
                        data-value={size}
                        className="size-icon">
                        {size}
                      </small>
                    </div>
                  );
                })}
              </div>
              <div className="quantity-container">
                <div className="quantity">
                  <button onClick={() => dispatch({ type: ActionTypes.DECREASE_QUANTITY, payload: item.id })} type="button">
                    -
                  </button>
                  <div>Quantity</div>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch({ type: ActionTypes.INCREASE_QUANTITY, payload: item.id })} type="button">
                    +
                  </button>
                </div>
              </div>
              <div className="prices-container">
                <div className="price">
                  <span className="currency">$</span>
                  {item.quantity * item.price}
                </div>
                <div className="">
                  <button onClick={() => dispatch({ type: ActionTypes.ADD_ITEM_TO_CART, payload: item.id })}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ))}
    </div>
  );
};
