import { IconButton, MenuItem, Select, Snackbar } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ScaleUnion } from "../../../helpers/index";
import "./styles.css";

interface Props {
  colorLevel: ScaleUnion;
  handleColorLevelState: (level: ScaleUnion) => void;
  colorFormat: "hex" | "rgb" | "rgba";
  handleColorFormatState: (format: "hex" | "rgb" | "rgba") => void;
  showSlider?: boolean;
}

const Navbar: React.FC<Props> = ({
  colorLevel,
  handleColorLevelState,
  colorFormat,
  handleColorFormatState,
  showSlider,
}) => {
  const [snackbarState, setSnackbarState] = useState<boolean>(false);

  const onchange = (e: any) => {
    if (e) {
      handleColorFormatState(e.target.value);
      handleSnackbarOpenState();
    }
  };
  const handleSnackbarOpenState = () => {
    setSnackbarState(true);
  };
  const handleSnackbarCloseState = () => {
    setSnackbarState(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">ColorPicker</Link>
      </div>

      {showSlider && (
        <div className="slider-container">
          <span>Level: {colorLevel}</span>
          <div className="slider">
            {/* @ts-ignore */}
            <RcSlider
              defaultValue={colorLevel}
              min={100}
              max={900}
              step={100}
              onAfterChange={handleColorLevelState}
            />
          </div>
        </div>
      )}

      <div className="select-container">
        <Select value={colorFormat} onChange={onchange}>
          <MenuItem value="hex">HEX - #fff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarState}
        autoHideDuration={3000}
        message={
          <span id="message-id">
            Format Changed To {colorFormat.toUpperCase()}!
          </span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClose={handleSnackbarCloseState}
        action={[
          <IconButton
            onClick={handleSnackbarCloseState}
            color="inherit"
            key="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </nav>
  );
};

export default Navbar;
