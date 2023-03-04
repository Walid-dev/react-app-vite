import { useReducer } from "react";
import { MainItemReducer, INITIAL_STATE, ActionTypes } from "./MainItemReducer";

type Sandwich = {
  id: string;
  name: string;
  desc: string;
  category: string;
  ingredients: string;
  calories: number;
  tags: [];
  images: {
    sm: string;
    md: string;
    lg: string;
  };
  colors: [string];
  quantity: number;
  price: number;
};

export function MainItem() {
  const [state, dispatch] = useReducer(MainItemReducer, INITIAL_STATE);

  const handleFetch = () => {
    dispatch({
      type: ActionTypes.FETCH_START,
      payload: [],
    });
    fetch("http://localhost:3000/sandwiches", {
      method: "post",
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: data }))
      .catch((err) => {
        dispatch({
          type: ActionTypes.FETCH_ERROR,
          payload: [],
        });
      });
  };

  console.log(state);

  return (
    <div>
      <h2>Sandwiches</h2>
      <div>
        <button onClick={handleFetch}>{state.loading ? "wait" : "Fetch the post"}</button>
      </div>
      <p>{state?.post.title}</p>
      <div>{state.error && "Something went wrong"}</div>
      <div>
        <div>
          {state.post.data?.map((sandwich: Sandwich) => {
            return (
              <div key={sandwich.id}>
                <div>{sandwich.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// const [data, setData] = useState<Sandwich[]>([]);

// useEffect(() => {
//   fetch("http://localhost:3000/sandwiches", {
//     method: "post",
//   })
//     .then((response) => response.json())
//     .then((data) => setData(data.data));
// }, []);

// function handleGetData() {
//   console.log(data);
// }

{
  /* <div>
        <button onClick={handleGetData}>Get Data</button>
      </div>
      <div>
        {data?.map((sandwich) => {
          return (
            <div key={sandwich.id}>
              <div>{sandwich.name}</div>
            </div>
          );
        })}
      </div> */
}
