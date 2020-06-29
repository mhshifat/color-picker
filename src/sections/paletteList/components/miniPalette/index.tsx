import { Delete as DeleteIcon } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { ColorPalettes } from "../../../../seedColors";
import "./styles.css";

interface Props {
  palette: ColorPalettes[0];
  onDelete: (paletteId: string) => void;
}

const MiniPalette: React.FC<Props> = ({ palette, onDelete }) => {
  const history = useHistory();

  const handleGoToPalette = (id: string) => () => {
    history.push(`/palette/${id}`);
  };

  return (
    <div className="mini-palette" onClick={handleGoToPalette(palette.id)}>
      <div className="mini-palette__close">
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            onDelete(palette.id);
          }}
        />
      </div>
      <div className="mini-palette__colors">
        {palette.colors.map((item) => (
          <div
            key={item.name}
            className="mini-color"
            style={{
              background: item.color,
            }}
          />
        ))}
      </div>
      <h5 className="mini-palette__title">
        {palette.paletteName}{" "}
        <span className="mini-palette__emoji">{palette.emoji}</span>
      </h5>
    </div>
  );
};

export default MiniPalette;
