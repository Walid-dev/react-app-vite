import React, { useState } from "react";
import axios from "axios";

interface ApiResponse {
  [x: string]: any;
  // Response shape here
}

export interface Person {
  gender: string;
  email: string;
}

export interface Options {
  method: any;
  url: any;
}

export function Api() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [person, setPerson] = useState<Person | null>(null);

  function getData() {
    const options: Options = {
      method: "GET",
      url: "https://randomuser.me/api",
    };

    axios
      .request(options)
      .then((response) => {
        setData(response.data);
        setPerson({ gender: response.data.results[0].gender, email: response.data.results[0].email });
        console.log(response.data.results[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <div>
        <button onClick={getData}>Fetch Data</button>
      </div>
      <div>{person != null && <div>Email: {person.email}</div>}</div>
    </div>
  );
}

export default Api;
