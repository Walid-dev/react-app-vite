import { useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { v4 as uuidV4 } from "uuid";

type Planets = {
  [x: string]: any;
  id: string;
  name: string;
  mass: string;
};

export function Work(): any {
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState("");
  const [planet, setPlanets] = useState<Planets>({
    name: "",
    id: "",
    mass: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/planets", { method: "get" })
      .then((response) => response.json())
      .then((data) => setPlanets(data.data[0]));
  }, []);

  console.log(planet);

  const handleUpdateName = () => {
    setPlanets((prev) => ({ ...prev, name: input }));
  };

  const handleAddPlanet = () => {
    setPlanets({ id: uuidV4(), name: "new planet", mass: "300km" });
  };

  return (
    <div className="test-box">
      <h4>Update Name</h4>
      <div>{planet.name}</div>
      <div>{planet.id}</div>
      <button onClick={() => console.log(planet?.id)}>Get ID</button>
      <div>
        <input onChange={(e) => setInput(e.target.value)} type="text" />
        <button id={planet.id} onClick={handleUpdateName}>
          Update Name
        </button>
      </div>
      <div>
        <h4>Add Planet</h4>
        <input name="name" type="text" />
        <input name="mass" type="text" />
        <button onClick={handleAddPlanet}>Add Planet</button>
      </div>
    </div>
  );
}
