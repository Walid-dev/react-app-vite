import { useEffect, useMemo, useState } from "react";

export function UseEffectUseMemoTips() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");
  const [state, setState] = useState({
    name: "",
    selected: false,
  });

  // Always be aware of the type of the dependency ex [number] [perso.age] and [] if we want it to run only once
  // Attention primitive and non primitive data types for useEffects Ex: number = primitive / object = non primitive

  const user = useMemo(
    () => ({
      name: state.name,
      selected: state.selected,
    }),
    [state.name, state.selected]
  );

  /* Can use UseMemo and add the value in the useEffect dependency. Here user or
  Or can add manually every single primitive variable in the useEffect dependency Ex: state.name, state.selected */

  useEffect(() => {
    console.count("UseEffect runs");
    document.title = `${name} You clicked ${number} times`;
    return () => {};
  }, [user]);

  const handleAdd = () => {
    setState((prev) => ({ ...prev, name }));
  };

  const handleSelect = () => {
    setState((prev) => ({ ...prev, selected: true }));
  };

  useEffect(() => {
    console.log("The state name has changed! Effect runs");
    return () => {};
  }, [state.name]);

  // useMemo stock a value

  const stock = useMemo(() => {
    console.log("Stock updated");
    return state.name.toUpperCase();
  }, [state.name]);

  //   console.log("Render", stock);

  return (
    <>
      <button onClick={() => setNumber((number) => number + 1)}>Increase</button>
      <span> You clicked {number} times</span>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add Name</button>
      <button onClick={handleSelect}>Select</button>
      {`{
          name: ${state.name},
          selected: ${state.selected.toString()}
      }`}
    </>
  );
}
