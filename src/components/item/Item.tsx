import { useReducer } from "react";
import { ItemReducer, ActionTypes, INITIAL_STATE } from "./ItemReducer";
import "./item.css";

export const Item = () => {
  const [state, dispatch] = useReducer(ItemReducer, INITIAL_STATE);

  const handleFetch = () => {
    dispatch({ type: ActionTypes.FETCH_START, payload: [] });
    fetch("http://localhost:3000/items", { method: "post" })
      .then((response) => response.json())
      .then((data) => dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: data }))
      .catch((err) => dispatch({ type: ActionTypes.FETCH_ERROR, payload: [] }));
  };

  return (
    <div className="item-container">
      <div className="item">
        <div className="name-container">
          <div className="name"></div>
        </div>
        <div className="image-container">
          <div className="image">
            <img src="https://picsum.photos/278/200" alt="random" />
          </div>
        </div>
        <div className="main-content-container">
          <div className="description-container">
            <div className="item-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.
            </div>
          </div>
          <div className="tags-container">
            <small className="tags">summer</small>
            <small className="tags">cotton</small>
            <small className="tags">streetwear</small>
            <small className="tags">organic</small>
            <small className="tags">soft</small>
          </div>
          <div className="color-icons-container">
            <button className="color-icon red"></button>
            <button className="color-icon yellow"></button>
            <button className="color-icon green"></button>
            <button className="color-icon black"></button>
            <button className="color-icon white"></button>
            <button className="color-icon purple"></button>
          </div>
          <div className="size-icons-container">
            <div className="size-icon-box">
              <button className="size-icon">XS</button>
            </div>
            <div className="size-icon-box">
              <button className="size-icon">S</button>
            </div>
            <div className="size-icon-box">
              <button className="size-icon">M</button>
            </div>
            <div className="size-icon-box">
              <button className="size-icon">L</button>
            </div>
            <div className="size-icon-box">
              <button className="size-icon">XL</button>
            </div>
            <div className="size-icon-box">
              <button className="size-icon">XXL</button>
            </div>
          </div>
          <div className="quantity-container">
            <div className="quantity">
              <button type="button">-</button>
              <div>Quantity</div>
              <span>0</span>
              <button type="button">+</button>
            </div>
          </div>
          <div className="prices-container">
            <div className="price">
              <span className="currency">$</span>9.99
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleFetch}>Get Data</button>
    </div>
  );
};
