import React from "react";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt="" />
      </div>
      <p>
        Download Here{" "}
        <a target="_blank" href={data.src.large}>
          Click
        </a>
      </p>
    </div>
  );
};

export default Picture;
