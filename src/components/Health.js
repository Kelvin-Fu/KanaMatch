import React from "react";
import heart1 from "../images/heart (1).png";
import heart2 from "../images/heart (2).png";

const Health = ({ health }) => {
  const printHeart = () => {
    let emptyHeart = 3 - health;
    let result = [];
    for (let i = 0; i < health; i++) {
      result.push(<img key={i} src={heart1} alt="heart" />);
    }
    for (let i = 0; i < emptyHeart; i++) {
      result.push(<img key={i + health + 1} src={heart2} alt="emptyHeart" />);
    }
    return result;
  };
  return <div className="Hearts">{printHeart()}</div>;
};

export default Health;
