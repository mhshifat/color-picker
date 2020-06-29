import React, { useState } from "react";
import { generatePalette, ScaleUnion } from "../../helpers/index";
import { ColorPalettes } from "../../seedColors";
import Footer from "../layouts/footer";
import Navbar from "../layouts/navbar";
import ColorBox from "./components/colorBox";
import "./styles.css";

interface Props {
  palette: ColorPalettes[0];
}

const Palette: React.FC<Props> = ({ palette }) => {
  const [colorLevel, setColorLevel] = useState<ScaleUnion>(500);
  const [colorFormat, setColorFormat] = useState<"hex" | "rgb" | "rgba">("hex");

  const newPalette = generatePalette(palette);

  const handleColorFormatState = (format: "hex" | "rgb" | "rgba") => {
    setColorFormat(format);
  };
  const handleColorLevelState = (level: ScaleUnion) => {
    setColorLevel(level);
  };
  const colorBoxesElements = newPalette.colors[colorLevel].map((item) => (
    <ColorBox
      key={item.name}
      background={item[colorFormat]}
      name={item.name}
      moreUrl={`/palette/${palette.id}/${item.id}`}
    />
  ));
  return (
    <div className="Palette">
      {/* Navbar Goes Here... */}
      <Navbar
        colorLevel={colorLevel}
        handleColorLevelState={handleColorLevelState}
        colorFormat={colorFormat}
        handleColorFormatState={handleColorFormatState}
        showSlider
      />
      <div className="Palette-colors">{colorBoxesElements}</div>
      {/* Footer Goes Here... */}
      <Footer paletteName={newPalette.paletteName} emoji={newPalette.emoji} />
    </div>
  );
};

export default Palette;
