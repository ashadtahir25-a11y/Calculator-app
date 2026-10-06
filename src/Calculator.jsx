import { useState } from "react";
import "./App.css";

function Calculator() {
  const [input, setInput] = useState("");

  const formatDisplay = (val) => {
    if (val === "" || val === "-") return "0";
    if (val === "Error") return "Error";

    // Agar operator par khatam ho raha hai (jaise "5+"), last complete number format karo
    const parts = val.split(/([+\-*/])/);
    const lastPart = parts[parts.length - 1];

    if (lastPart === "" || isNaN(lastPart)) return val;

    const [intPart, decPart] = lastPart.split(".");
    if (intPart === "" || intPart === "-") return val;

    const formattedInt = Number(intPart).toLocaleString("en-US");
    const formattedLast =
      decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;

    parts[parts.length - 1] = formattedLast;
    return parts.join("");
  };

  const handleClick = (value) => {
    if (input === "Error") {
      setInput(value);
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  const handleToggleSign = () => {
    if (!input || input === "Error") return;
    setInput(input.startsWith("-") ? input.slice(1) : "-" + input);
  };

  const handlePercent = () => {
    try {
      // eslint-disable-next-line no-eval
      setInput((eval(input) / 100).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleEqual = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(input);
      setInput(
        Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, "")
      );
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="display">{formatDisplay(input)}</div>

      <div className="buttons">
        <button className="btn function" onClick={handleClear}>
          {input && input !== "Error" ? "C" : "AC"}
        </button>
        <button className="btn function" onClick={handleToggleSign}>
          +/-
        </button>
        <button className="btn function" onClick={handlePercent}>
          %
        </button>
        <button className="btn operator" onClick={() => handleClick("/")}>
          ÷
        </button>

        <button className="btn number" onClick={() => handleClick("7")}>7</button>
        <button className="btn number" onClick={() => handleClick("8")}>8</button>
        <button className="btn number" onClick={() => handleClick("9")}>9</button>
        <button className="btn operator" onClick={() => handleClick("*")}>×</button>

        <button className="btn number" onClick={() => handleClick("4")}>4</button>
        <button className="btn number" onClick={() => handleClick("5")}>5</button>
        <button className="btn number" onClick={() => handleClick("6")}>6</button>
        <button className="btn operator" onClick={() => handleClick("-")}>−</button>

        <button className="btn number" onClick={() => handleClick("1")}>1</button>
        <button className="btn number" onClick={() => handleClick("2")}>2</button>
        <button className="btn number" onClick={() => handleClick("3")}>3</button>
        <button className="btn operator" onClick={() => handleClick("+")}>+</button>

        <button className="btn number zero" onClick={() => handleClick("0")}>0</button>
        <button className="btn number" onClick={() => handleClick(".")}>.</button>
        <button className="btn operator" onClick={handleEqual}>=</button>
      </div>
    </div>
  );
}

export default Calculator;