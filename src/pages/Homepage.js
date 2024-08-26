import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";

const Homepage = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/kanaMatch", { state: { options: options, gamemode: gamemode } });
  };

  let [options, setOptions] = useState([1, -1, -1, -1]);
  let [gamemode, setGamemode] = useState(1);

  return (
    <div style={{ minHeight: "86vh" }}>
      <div className="demo">あ</div>
      <div className="rightSide">
        <Options options={options} setOptions={setOptions} />
        <div className="gamemode">
          <button onClick={() => setGamemode(1)}>あ ⟷ a</button>
          <button onClick={() => setGamemode(2)}>あ → a</button>
          <button onClick={() => setGamemode(3)}>あ ← a</button>
        </div>
        <div className="kanaMatch">
          <button onClick={handleStart}>Start</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
