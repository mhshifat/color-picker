import React from "react";
import { Link } from "react-router-dom";
import { ColorPalettes } from "../../seedColors";
import MiniPalette from "./components/miniPalette";
import "./styles.css";

interface Props {
  palettes: ColorPalettes;
  onPaletteDelete: (paletteId: string) => void;
}

const PaletteList: React.FC<Props> = ({ palettes, onPaletteDelete }) => {
  return (
    <div className="palette-list">
      <div className="container">
        <nav className="palette-list__nav">
          <h1>Palettes</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>

        <div className="palettes">
          {palettes.map((item) => (
            <MiniPalette
              key={item.id}
              palette={item}
              onDelete={onPaletteDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteList;
