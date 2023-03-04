import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import debounce from "lodash.debounce";
import { Options } from "../../Api";

export type Planet = {
  id: string;
  name: string;
  temperature: string;
  radius: string;
  discovered_by: string;
};

interface PlanetsProps {
  data: Planet;
}

type Events = {
  target: {
    name: string;
    value: string;
  };
};

export function Work2() {
  const [input, setInput] = useState("");
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [newPlanet, setNewPlanet] = useState<Planet>({
    id: "",
    name: "",
    temperature: "",
    radius: "",
    discovered_by: "",
  });

  useEffect(() => {
    console.log("UseEffect 1 running");
    let isCancelled = false;

    fetch("http://localhost:3000/planets")
      .then((response) => response.json())
      .then((data) => {
        if (!isCancelled) {
          setPlanets(data.data);
          console.log("First planets fetch", planets);
        }
      });

    return () => {
      console.log("cancelled");
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    console.log("UseEffect 2 running");
  }, [planets]);

  const handleUpdatePlanet = (ev: Events, id: string) => {
    setPlanets((prev) => {
      return prev.map((planet: Planet) => {
        if (planet.id === id) {
          return { ...planet, [ev.target.name]: ev.target.value };
        } else {
          return planet;
        }
      });
    });
  };

  console.log(planets);

  // const debouncedUpdatePlanet2 = useCallback(debounce(handleUpdatePlanet, 300), []);

  const debouncedUpdatePlanet = useMemo(() => debounce(handleUpdatePlanet, 350), []);

  return (
    <div>
      <h3>Work 2</h3>
      <div>
        {planets.map((planetObj) => {
          return (
            <div key={planetObj.id}>
              <ul>
                <li>Name: {planetObj.name}</li>
                <li>Temperature: {planetObj.temperature}</li>
                <li>Radius: {planetObj.radius}</li>
                <li>Discovered by: {planetObj.discovered_by}</li>
              </ul>
              <div>
                <input type="text" onChange={(e) => debouncedUpdatePlanet(e, planetObj.id)} name="name" placeholder="name" />
                <input
                  type="text"
                  onChange={(e) => debouncedUpdatePlanet(e, planetObj.id)}
                  name="temperature"
                  placeholder="temperature"
                />
                <input type="text" onChange={(e) => debouncedUpdatePlanet(e, planetObj.id)} name="radius" placeholder="radius" />
                <input
                  type="text"
                  onChange={(e) => debouncedUpdatePlanet(e, planetObj.id)}
                  name="discovered_by"
                  placeholder="Discovered by"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
