import { useReducer, useRef } from "react";
import { INITIAL_STATE, formReducer } from "./formReducer";
import { v4 as uuidV4 } from "uuid";
import { Sandwich } from "../main-item/MainItem";

export const Form = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const tagRef = useRef<any>();

  const handleChange = (e: any) => {
    console.log(e.target.value);
    dispatch({ type: "CHANGE_INPUT", payload: { name: e.target.name, value: e.target.value } });
  };

  const handleIncrease = () => {
    dispatch({ type: "INCREASE" });
  };

  const handleDecrease = () => {
    if (state.quantity > 0) {
      console.log(state.quantity);
      dispatch({ type: "DECREASE" });
    }
  };

  const handleTag = () => {
    const previousTags = state.tags;
    const newTags = tagRef.current.value.split(",");

    // Compare Tags and state.tags and return only the unmatched values

    const setPreviousTags = new Set(previousTags);
    const setNewTags = new Set(newTags);

    const tags = [...setNewTags].filter((element) => !setPreviousTags.has(element));

    tags.forEach((tag: any) => {
      if (tag.length > 2) {
        dispatch({ type: "ADD_TAG", payload: tag });
        tagRef.current.value = "";
      }
    });
  };

  const handleRemoveTad = () => {};

  return (
    <div>
      <form>
        <h4>Sandwiches Form</h4>
        <input onChange={handleChange} name="name" type="text" placeholder="name" />
        <input onChange={handleChange} name="desc" type="text" placeholder="desc" />
        <select onChange={handleChange} name="category">
          <option value="Haut de gamme">Haut de gamme</option>
          <option value="Végétariens">Végétariens</option>
          <option value="jeans">Légers</option>
          <option value="jeans">Traditionnels</option>
        </select>
        <textarea placeholder="Seperate ingredients with commas..."></textarea>
        <button type="button">Add Ingredient</button>
        <div>
          {state.ingredients.map((ingredient: string) => {
            <small key={ingredient}>{ingredient}</small>;
          })}
        </div>
        <input onChange={handleChange} name="calories" type="number" placeholder="calories" />
        <textarea ref={tagRef} placeholder="Seperate tags with commas..."></textarea>
        <button onClick={handleTag} type="button">
          Add Tags
        </button>
        <div>
          {state.tags.map((tag: string) => (
            <small onClick={() => dispatch({ type: "REMOVE_TAG", payload: tag })} key={uuidV4()}>
              {tag}
            </small>
          ))}
        </div>
        <div className="quantity">
          <button onClick={handleDecrease} type="button">
            -
          </button>
          <div>Quantity</div>
          <span>{state.quantity}</span>
          <button onClick={handleIncrease} type="button">
            +
          </button>
        </div>
        <div>{}</div>
        <input onChange={handleChange} name="price" type="number" placeholder="price" />
      </form>
    </div>
  );
};
