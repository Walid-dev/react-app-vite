import React, { useState, useEffect, Fragment } from "react";
import axios from "axios"; // import axios
import { v4 as uuidv4 } from "uuid";

export function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Effect running");
    axios
      .get("https://swapi.dev/api/planets/3/?format=json")
      .then((res) => {
        const planets: any = [];
        planets.push(res.data);
        setPosts(planets);
        console.log(planets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      {posts?.map((p: any) => (
        <div key={uuidv4()}>
          <p>{p.name}</p>
          <p>{p.climate}</p>
          <p>{p.diameter}</p>
        </div>
      ))}
    </Fragment>
  );
}

// const [message, setMessage] = useState("");
// const [response, setResponse] = useState("");

// const handleSubmit = (e: any) => {
//   e.preventDefault();
//   if (!message) {
//     console.log("message is empty");
//     return;
//   }
//   axios
//     .post("http://localhost:3000/", { message })
//     .then((res) => {
//       if (res) {
//         setResponse(res.data.message);
//         // console.log(res.data.choices[0].text);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//       }
//     });
// };

// return (
//   <div>
//     <form onSubmit={handleSubmit}>
//       <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
//       <button type="submit">Submit</button>
//     </form>
//     <div>{response}</div>
//   </div>
// );
