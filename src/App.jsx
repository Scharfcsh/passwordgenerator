import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const copypassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className=" max-w-md mx-auto  shadow-md rounded-lg px-4 my-8 bg-gray-800">
        <h1 className="text-center text-white text-2xl"> Password Generator</h1>
        <div className="flex shadow rounded-md gap-2 overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className=" px-4 py-3 w-full outline-none rounded-lg"
            ref={passwordRef}
          />
          <button
            onClick={copypassword}
            className=" outline-none rounded-lg bg-green-600 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-3">
          <div className="flex items-center gap-x-1 text-white">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label> Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 text-white">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
              className="cursor-pointer "
            />
            <label htmlFor="numberInput"> Numbers {numberAllowed}</label>
          </div>
          <div className="flex items-center gap-x-1 text-white">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
              className="cursor-pointer "
            />
            <label htmlFor="charInput"> Characters {charAllowed}</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
