import React, { useState } from "react";
import axios from "axios";

// Replace getData by useEffect
// Stock list of persons
// Component to render unique person
// Add button to add person to the list
// Make sure to render only updated element

export function GetApiData() {
  const [data, setData] = useState<any[]>([]);
  async function fetchData() {
    try {
      const response = await axios.post("http://localhost:3000/array", {});
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name} - {item.gender} - {item.age} - {item.city} - {item.country}
          </li>
        ))}
      </ul>
    </div>
  );
}
