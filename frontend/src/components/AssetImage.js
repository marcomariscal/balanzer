import React from "react";
import { Image } from "react-bootstrap";
import "./AssetImage.scss";

const AssetImage = ({ symbol }) => {
  const svgLink = `/crypto-logos/${symbol}.svg`;
  const pngLink = `/crypto-logos/${symbol}.svg`;
  const defaultImg = "/crypto-logos/cc.svg";

  return (
    <Image
      className="mx-2"
      src={svgLink || pngLink}
      alt={symbol}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = defaultImg;
      }}
    />
  );
};

export default AssetImage;
