import React, { useState } from "react";
import axios from "axios"; // import axios

export function OpenAPI() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!message) {
      console.log("message is empty");
      return;
    }
    axios
      .post("http://localhost:3000/", { message })
      .then((res) => {
        if (res) {
          setResponse(res.data.message);
          // console.log(res.data.choices[0].text);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        <button type="submit">Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}
