import React, { useState } from "react";
import "./App.css";
import { controls } from "./consts/controls";
import { operations } from "./consts/operations";
import { INTL } from "./consts/INTL";
import { Groups, REG_EXPS } from "./consts/regExps";

export const reduceCalculation = (value: string): string => {
  const priority = [
    {
      regExp: new RegExp(REG_EXPS.MULT),
      getOperation: (operation: string) =>
        operation === "mult" ? operations["*"] : operations["/"],
    },
    {
      regExp: new RegExp(REG_EXPS.SUM),
      getOperation: (operation: string) =>
        operation === "plus" ? operations["+"] : operations["-"],
    },
  ];

  function handleParseCalculation(value: string): string {
    if (/Infinity/.test(value)) return "Infinity";
    let updateCalculation = value;
    let isHasOnce = false;
    for (let i = 0; i < priority.length; i++) {
      const isHasOperation = priority[i].regExp.test(updateCalculation);
      if (isHasOperation) {
        updateCalculation = updateCalculation.replace(
          priority[i].regExp,
          (val: string, ...args) => {
            const groupName: Groups = args.find((e) => typeof e === "object");

            const fillGroup = Object.keys(groupName).find(
              (v) => groupName[v as keyof Groups]
            );
            const numbs = val.match(/([0-9]+)([.,]?)([0-9]*)/g) as [
              string,
              string
            ];
            return String(
              priority[i].getOperation(fillGroup ? fillGroup : "")(
                +numbs[0],
                +numbs[1]
              )
            );
          }
        );
        isHasOnce = true;
        break;
      }
    }

    return isHasOnce
      ? handleParseCalculation(updateCalculation)
      : isNaN(+updateCalculation)
      ? INTL.VALUE_ERROR
      : updateCalculation;
  }

  return handleParseCalculation(value);
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

  const onChangeValue = (value: string) => {
    const regExtValue: string[] = value.match(/\+|-|\*|\/|\d+/g) || [];

    const validate = regExtValue.reduce(
      (acc: string, v: string) => acc + v,
      ""
    );
    validate.length === value.length
      ? setValue(value)
      : setValue(INTL.VALUE_ERROR);
  };

  return (
    <div className="App">
      <div className="calc">
        <div className="screen">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeValue(e.target.value)
            }
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
