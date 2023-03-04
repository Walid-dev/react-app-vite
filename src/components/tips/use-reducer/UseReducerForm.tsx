import { useReducer, useRef } from "react";
import FormReducer from "./FormReducer";
// import { formReducer, INITIAL_STATE } from "./formReducer";
import { INITIAL_STATE } from "./FormReducer";
import "./UseReducerFormCSS.css";
import { v4 as uuidV4 } from "uuid";

export default function UseReducerForm() {
  const [state, dispatch] = useReducer(FormReducer, INITIAL_STATE);
  const tagRef = useRef<any>();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    dispatch({ type: "CHANGE_INPUT", payload: { name: e.target.name, value: e.target.value } });
  };

  const handleTags = () => {
    const tags = tagRef.current.value.split(",");
    // const tags = Array.from(new Set(tagsE));
    //  var unique = Array.from(new Set(tags));
    //   console.log("Unique array", unique);

    tags.forEach((tag: string) => {
      if (tag.length > 1) {
        dispatch({ type: "ADD_TAG", payload: tag });
      }
    });
  };

  console.log(state);

  return (
    //USING USEREDUCER

    <div>
      <h2>UseReducer Form</h2>
      <form>
        <input type="text" placeholder="Title" onChange={handleChange} name="title" />
        <input type="text" placeholder="Desc" onChange={handleChange} name="desc" />
        <input type="number" placeholder="Price" onChange={handleChange} name="price" />
        <p>Category:</p>
        <select onChange={handleChange} name="category">
          <option value="sneakers">Sneakers</option>
          <option value="tshirts">T-shirts</option>
          <option value="jeans">Jeans</option>
        </select>
        <p>Tags:</p>
        <textarea ref={tagRef} placeholder="Seperate tags with commas..."></textarea>
        <button onClick={handleTags} type="button">
          Add Tags
        </button>
        <div className="tags">
          {state.tags.map((tag: string) => (
            <small onClick={() => dispatch({ type: "REMOVE_TAG", payload: tag })} key={uuidV4()}>
              {tag}
            </small>
          ))}
        </div>
        <div className="quantity">
          <button onClick={() => dispatch({ type: "DECREASE" })} type="button">
            -
          </button>
          <span>Quantity ({state.quantity})</span>
          <button onClick={() => dispatch({ type: "INCREASE" })} type="button">
            +
          </button>
        </div>
      </form>
    </div>
  );
}
