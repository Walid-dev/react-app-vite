import { useReducer } from "react";
import { ItemReducer, ActionTypes, INITIAL_STATE } from "./ItemReducer";
import { v4 as uuidV4 } from "uuid";
import "./item.css";

export const Item = () => {
  const [state, dispatch] = useReducer(ItemReducer, INITIAL_STATE);

  const handleFetch = () => {
    dispatch({ type: ActionTypes.FETCH_START, payload: [] });
    fetch("http://localhost:3000/items", { method: "get" })
      .then((response) => response.json())
      .then((data) => dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: data }))
      .catch((err) => dispatch({ type: ActionTypes.FETCH_ERROR, payload: [] }));
  };

  console.log(state);

  return (
    <div>
      <button onClick={handleFetch}>Get Data</button>
      {state.items.data?.map((item: any) => (
        <div key={uuidV4()} className="item-container">
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
                    <small key={uuidV4()} className="tags">
                      {tag}
                    </small>
                  );
                })}
              </div>
              <div className="color-icons-container">
                {item.colors.map((color: string) => {
                  return <span key={uuidV4()} className={`color-icon ${color}`}></span>;
                })}
              </div>
              {/* <button className="color-icon yellow"></button>
                <button className="color-icon green"></button>
                <button className="color-icon black"></button>
                <button className="color-icon white"></button>
                <button className="color-icon purple"></button>
              </div> */}
              <div className="size-icons-container">
                {item.sizes.map((size: string) => {
                  return (
                    <div key={uuidV4()} className="size-icon-box">
                      <button className="size-icon">{size}</button>
                    </div>
                  );
                })}
              </div>
              <div className="quantity-container">
                <div className="quantity">
                  <button type="button">-</button>
                  <div>Quantity</div>
                  <span>{item.quantity}</span>
                  <button type="button">+</button>
                </div>
              </div>
              <div className="prices-container">
                <div className="price">
                  <span className="currency">$</span>
                  {item.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
