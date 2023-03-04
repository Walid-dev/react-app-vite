import { useEffect, useState } from "react";

export function UseEffectCleanUpTips() {
  const [toggle, setToggle] = useState(false);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("effect runs");
    return () => {
      console.log("Wait before running the effect, I should cleanUp my function");
      // clear something fro the previous effect
      console.log("Ok done! You can run the effect now");
    };
  }, [toggle]);

  useEffect(() => {
    const intervale = setInterval(() => {
      setNumber((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(intervale);
      console.log("Cleanup called");
    };
  }, []);

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <div>{number}</div>
    </div>
  );
}

//
