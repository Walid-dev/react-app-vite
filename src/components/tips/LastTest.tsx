import React, { useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { debounce } from "lodash";

export type Person = {
  [x: string]: any;
  id: string;
  name: string;
  gender: string;
  age: number;
  city: string;
  country: string;
};

interface PersonProps {
  person: Person;
  onUpdate: (event: string) => void;
}

const Person: React.FC<PersonProps> = ({ person, onUpdate }) => {
  return (
    <div>
      {/* <input name="name" placeholder="name" defaultValue={person.name} onChange={(ev) => updatePerson(ev, person.id)} /> */}
      <input
        name="name"
        placeholder="name"
        value={person.name}
        onChange={(ev) => {
          onUpdate(ev.target.value);
        }}
      />
      <input name="gender" placeholder="gender" defaultValue={person.gender} />
      <input name="age" placeholder="age" defaultValue={person.age} />
      <input name="city" placeholder="city" defaultValue={person.city} />
      <input name="country" placeholder="country" defaultValue={person.country} />
      <button>Update</button>
    </div>
  );
};

export function LastTest() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newPerson, setNewPerson] = useState<Person>({ id: "", name: "", gender: "", age: 0, city: "", country: "" });

  const updatePerson = (ev: any, id: any) => {
    setPersons((prev) => {
      return prev.map((person: any) => {
        if (person.id === id) {
          return { ...person, [ev.target.name]: ev.target.value };
        } else {
          return person;
        }
      });
    });
  };

  useEffect(() => {
    fetch("http://localhost:3000/array", {
      method: "post",
    })
      .then((response) => response.json())
      .then((data) => setPersons(data.data));
  }, []);

  useEffect(() => {
    console.log("Items state updated", persons);
  }, [persons]);

  const handleChange = (e: { target: { name: string; value: string | number } }) => {
    setNewPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("HandleChange active");
  };

  return (
    <div className="">
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
          {persons.map((person) => (
            <li key={person.id}>
              <Person
                person={person}
                onUpdate={(ev) => {
                  person.name = ev;
                  setPersons([...persons]);
                }}
              />
            </li>
          ))}
        </ul>
        <div>
          <h2>Add Person</h2>
          <input value={newPerson.name} name="name" onChange={handleChange} placeholder="name" />
          <input value={newPerson.gender} name="gender" onChange={handleChange} placeholder="gender" />
          <input value={newPerson.age} name="age" onChange={handleChange} placeholder="age" />
          <input value={newPerson.city} name="city" onChange={handleChange} placeholder="city" />
          <input value={newPerson.country} name="country" onChange={handleChange} placeholder="country" />
        </div>
        <button onClick={() => setPersons([...persons, { ...newPerson, id: uuidV4() }])}>Add Person</button>
      </div>
    </div>
  );
}
