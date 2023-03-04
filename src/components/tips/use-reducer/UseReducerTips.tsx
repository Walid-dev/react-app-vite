import { useState, useReducer } from "react";
import { INITIAL_STATE, postReducer } from "./PostReducer";

export const UseReducerTips = () => {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  const handleFetch = () => {
    dispatch("FETCH_START");
    fetch("http://localhost:3000/planets")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log(data);
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR" });
      });
  };

  return (
    <div>
      <h3>UseReducerTips</h3>
      <button onClick={handleFetch}>{state.loading ? "Wait..." : "Fetch post"}</button>
      <div>
        {/* {state.post.map((planetObj: any) => {
          return (
            <div key={planetObj.id}>
              <ul>
                <li>Name: {planetObj.name}</li>
              </ul>
            </div>
          );
        })} */}
      </div>
      <span>{state.error && "Something went wrong"}</span>
    </div>
  );
};
