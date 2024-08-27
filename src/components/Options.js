import React from "react";

const Options = ({ options, setOptions }) => {
  const changeOption = (opt) => {
    let newOptions = [...options];
    newOptions[opt - 1] *= -1;
    setOptions(newOptions);
    console.log(newOptions);
  };
  return (
    <div className="gameOption">
      <button
        onClick={() => {
          changeOption(1);
        }}
        style={{ backgroundColor: options[0] === 1 ? "#55c2da" : "" }}
      >
        Hiragana
      </button>
      <button
        onClick={() => {
          changeOption(2);
        }}
        style={{ backgroundColor: options[1] === 1 ? "#55c2da" : "" }}
      >
        Katakana
      </button>
      <button
        onClick={() => {
          changeOption(3);
        }}
        style={{ backgroundColor: options[2] === 1 ? "#55c2da" : "" }}
      >
        Dakuon
      </button>
      <button
        onClick={() => {
          changeOption(4);
        }}
        style={{ backgroundColor: options[3] === 1 ? "#55c2da" : "" }}
      >
        Yōon
      </button>
    </div>
  );
};

export default Options;
