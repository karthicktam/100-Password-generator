import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

export default function App() {
  const [password, setPassword] = useState("");
  const [lengthVal, setLengthVal] = useState(20);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);

  const passRef = useRef(null);

  const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };

  const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  };

  const getRandmNumber = () => {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  };

  const getRandomSymbol = () => {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandmNumber,
    symbol: getRandomSymbol
  };

  const generatedPassword = (lower, upper, number, symbol, length) => {
    let genPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (!typesCount || length === 0 || length >= 25) {
      alert(
        "Please check any of the boxes below or increase password length from 0 or decrease password length less than 25"
      );
      return;
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        genPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = genPassword.slice(0, length);

    return finalPassword;
  };

  const generatePasswordHandler = () => {
    const length = +lengthVal;
    const hasUpper = upperCase;
    const hasLower = lowerCase;
    const hasNumber = number;
    const hasSymbol = symbol;

    setPassword(
      generatedPassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
    );
  };

  const clipboardHandler = () => {
    if (!password) {
      return;
    }

    passRef.current.select();
    document.execCommand("copy");
  };

  const changeHandler = (e, val) => {
    setPassword("");
    if (val === "length") {
      setLengthVal(e.target.value);
    } else if (val === "upper") {
      setUpperCase(!upperCase);
    } else if (val === "lower") {
      setLowerCase(!lowerCase);
    } else if (val === "number") {
      setNumber(!number);
    } else if (val === "symbol") {
      setSymbol(!symbol);
    }
  };

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="result-container">
        <input
          ref={passRef}
          value={password}
          type="text"
          readOnly
          id="result"
          onChange={() => {}}
        />
        <button className="btn" onClick={clipboardHandler}>
          <FontAwesomeIcon icon={faClipboard} />
        </button>
      </div>
      <div className="settings">
        <div className="setting">
          <label>Password length</label>
          <input
            onChange={(e) => changeHandler(e, "length")}
            type="number"
            min="4"
            max="20"
            value={lengthVal}
          />
        </div>
        <div className="setting">
          <label>Include uppercase letters</label>
          <input
            onChange={(e) => changeHandler(e, "upper")}
            type="checkbox"
            checked={upperCase}
          />
        </div>
        <div className="setting">
          <label>Include lowercase letters</label>
          <input
            onChange={(e) => changeHandler(e, "lower")}
            type="checkbox"
            checked={lowerCase}
          />
        </div>
        <div className="setting">
          <label>Include numbers</label>
          <input
            onChange={(e) => changeHandler(e, "number")}
            type="checkbox"
            checked={number}
          />
        </div>
        <div className="setting">
          <label>Include symbols</label>
          <input
            onChange={(e) => changeHandler(e, "symbol")}
            type="checkbox"
            checked={symbol}
          />
        </div>
      </div>
      <button className="btn btn-large" onClick={generatePasswordHandler}>
        Generate password
      </button>
    </div>
  );
}
