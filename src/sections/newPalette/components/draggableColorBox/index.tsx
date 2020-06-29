import { Delete as DeleteIcon } from "@material-ui/icons";
import React from "react";
import "./styles.css";

interface Props {
  background: string;
  name: string;
  onDelete: (colorName: string) => void;
}

const DraggableColorBox: React.FC<Props> = ({ background, name, onDelete }) => {
  return (
    <div className="draggable-color-box" style={{ background }}>
      <div className="draggable-color-box__footer">
        <span className="draggable-color-box__title">{name}</span>
        <DeleteIcon
          className="draggable-color-box__icon"
          onClick={() => onDelete(name)}
        />
      </div>
    </div>
  );
};

export default DraggableColorBox;
