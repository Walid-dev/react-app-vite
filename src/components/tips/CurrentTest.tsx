import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Prev } from "react-bootstrap/esm/PageItem";

export type Person = {
  [x: string]: any;
  name: string;
  gender: string;
  age: number;
  city: string;
  country: string;
};

export type User = {
  [x: string]: any;
  name: string;
  gender: string;
  age: number;
  city: string;
  country: string;
};

export function CurrentTest() {
  ////////////////// 1 Get Data from API/Server and list items /////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    (async () => {
      try {
        console.log("UseEffect trying");
        const response = await axios.post("http://localhost:3000/array", {});
        setPersons(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////// 2 - Update Multiple States /////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [input, setInput] = useState<string>("");
  const [user, setUser] = useState<User>({
    name: "",
    gender: "",
    age: 0,
    city: "",
    country: "",
  });

  const changeUser = () => {
    setUser((prev) => ({ ...prev, name: input }));
  };

  const handleChange = (e: { target: { name: string; value: string | number } }) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(user);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////// 3 - UseMemo + UseEffect ////////////////////////////////

  const [items, setItems] = useState<[]>([]);

  useMemo(() => {
    fetch("http://localhost:3000/array", {
      method: "post",
    })
      .then((response) => response.json())
      .then((data) => setItems(data.data));
  }, []);

  console.log("UseMemo", items);

  ////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div>
        <h2>1 - Get Data from API/Server and list items</h2>
        <h3>Listing persons</h3>
        <ul>
          {persons.map((person: Person) => (
            <li key={person.id}>
              <div>
                {person.name} - {person.gender} - {person.age} - {person.city} - {person.country}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>2 -Update Multiple States</h2>
        <h3>(When all elements are strings or numbers)</h3>
        <div>
          <input onChange={handleChange} type="text" name="name" placeholder="name" />
          <input onChange={handleChange} type="text" name="gender" placeholder="gender" />
          <input onChange={handleChange} type="number" name="age" placeholder="age" />
          <input onChange={handleChange} type="text" name="city" placeholder="city" />
          <input onChange={handleChange} type="text" name="country" placeholder="country" />
        </div>

        <button onClick={changeUser}>Change User</button>
        <span>username is {user.name}</span>
      </div>
      <div>
        <h2>3 - UseMemo + UseEffect</h2>
        <div>
          <ul>
            <li>Stock list of persons</li>
            <li>Component to render unique person</li>
            <li>Add button to add person to the list</li>
            <li>Make sure to render only updated element</li>
          </ul>
        </div>
        <ul>
          {items.map((item: Person) => (
            <li key={item.id}>
              <div>
                {item.name} - {item.gender} - {item.age} - {item.city} - {item.country}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
