import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { generatePalette, getherShades, ScaleUnion } from "../../helpers/index";
import { ColorPalettes } from "../../seedColors";
import Footer from "../layouts/footer";
import Navbar from "../layouts/navbar";
import ColorBox from "../palette/components/colorBox";
import "./styles.css";

interface Props {
  colorId: string;
  palette: ColorPalettes[0];
}

const ColorPage: React.FC<Props> = ({ colorId, palette }) => {
  const [colorLevel, setColorLevel] = useState<ScaleUnion>(500);
  const [colorFormat, setColorFormat] = useState<"hex" | "rgb" | "rgba">("hex");
  const history = useHistory();

  const newPalette = generatePalette(palette);
  const shades = getherShades(newPalette, colorId);
  const handleColorFormatState = (format: "hex" | "rgb" | "rgba") => {
    setColorFormat(format);
  };
  const handleColorLevelState = (level: ScaleUnion) => {
    setColorLevel(level);
  };

  return (
    <div className="ColorPage Palette">
      {/* Navbar Goes Here... */}
      <Navbar
        colorLevel={colorLevel}
        handleColorLevelState={handleColorLevelState}
        colorFormat={colorFormat}
        handleColorFormatState={handleColorFormatState}
      />
      <div className="Palette-colors">
        {shades.map((item) => (
          <ColorBox
            background={item[colorFormat]}
            name={item.name}
            key={item.name}
          />
        ))}
        <div className="go-back ColorBox">
          <button
            className="back-btn copy-btn"
            onClick={() => history.push(`/palette/${newPalette.id}`)}
          >
            Go Back
          </button>
        </div>
      </div>
      {/* Footer Goes Here... */}
      <Footer paletteName={newPalette.paletteName} emoji={newPalette.emoji} />
    </div>
  );
};

export default ColorPage;
