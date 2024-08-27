import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";
import logo from "../images/logo.png";
const Homepage = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/kanaMatch", { state: { options: options, gamemode: gamemode } });
  };

  let [options, setOptions] = useState([1, -1, -1, -1]);
  let [gamemode, setGamemode] = useState(1);

  return (
    <div className="mainPage">
      <img src={logo} alt="logo"></img>

      <Options options={options} setOptions={setOptions} />
      <div className="gamemode">
        <button onClick={() => setGamemode(1)} style={{ backgroundColor: gamemode === 1 ? "orange" : "white" }}>
          あ ⟷ a
        </button>
        <button onClick={() => setGamemode(2)} style={{ backgroundColor: gamemode === 2 ? "orange" : "white" }}>
          あ → a
        </button>
        <button onClick={() => setGamemode(3)} style={{ backgroundColor: gamemode === 3 ? "orange" : "white" }}>
          あ ← a
        </button>
      </div>
      <div className="kanaMatch">
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  );
};

export default Homepage;
