import clsx from "clsx";
import { useState } from "react";

export const VALUES: string[][] = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", "C", "=", "+"],
];
export const OPERATORS: string[] = ["+", "-", "*", "/"];

export const Calculator = () => {
  const [resultValue, setResultValue] = useState<string>("");
  const [error, setError] = useState<boolean>();

  const handleClick = (value: string) => {
    if (value === "=") {
      try {
        setResultValue(String(new Function("return " + resultValue)()));
      } catch (e) {
        setError(true);
      }
      return;
    }

    setError(false);

    if (value === "C") setResultValue("");
    else setResultValue(resultValue.concat(value));
  };

  return (
    <div className="calculator-grid">
      <div className="relative">
        <input
          name="input-result"
          id="input-result"
          aria-label="input-result"
          className={clsx("input-result")}
          value={resultValue}
          placeholder="App Calculator"
          onChange={(e) => setResultValue(e.currentTarget.value)}
        />
        {error && <span className={clsx("error")}>Operation error</span>}

        <div className="buttons">
          {VALUES.map((rows) =>
            rows.map((value, index) => (
              <button
                key={index}
                className={clsx(
                  "button",
                  value === "C" && "button--clear",
                  value === "=" && "button--result",
                  /!?(\D+)/.test(value) && "button--operator"
                )}
                onClick={() => handleClick(value)}
              >
                {value}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
