import React, { useState } from "react";
import "./App.css";
import { controls } from "./consts/controls";
import { operations } from "./consts/operations";


const reduceCalculation = (value: string): string => {
  let b = value.match(/\+|-|\*|\/|\d+/g) || "";

  let result = 0;

  for (var i = 0; i < b.length; i++) {
    if (i === 0) {
      result = parseInt(b[i]);
    }

    if (operations[b[i]]) {
      result = operations[b[i]](result, parseInt(b[i + 1]));
    }
  }
  return String(result);
};

function App() {
  const [value, setValue] = useState("");

  const onClick = (symbol: string) => {
    const lastSymbol = value[value.length - 1];
    if (operations[lastSymbol] && operations[symbol]) {
      return;
    }

    if (symbol === "c") {
      setValue((prev) => prev.slice(0, prev.length - 2));
      return;
    }

    if (symbol === "ce") {
      setValue("");
      return;
    }

    if (symbol !== "=") {
      setValue((prev) => prev + symbol);
      return;
    }

    setValue(reduceCalculation(value));
  };

  return (
    <div className="App">
      <div className="calc">
        <div className="screen">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const regExtValue: string[] =
                e.target.value.match(/\+|-|\*|\/|\d+/g) || [];

              const validate = regExtValue.reduce(
                (acc: string, v: string) => acc + v,
                ""
              );
              validate.length === e.target.value.length
                ? setValue(e.target.value)
                : setValue("value error");
            }}
            value={value}
          />
        </div>
        <div className="button-panel">
          {controls.map((value) => (
            <button
              className={`button button_${
                value === "=" ? "eq" : value === "+" ? "plus" : value
              }`}
              key={value}
              onClick={() => onClick(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
