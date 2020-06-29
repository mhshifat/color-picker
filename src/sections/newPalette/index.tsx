import {
  AppBar,
  Button,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import { ColorPalettes, colorPalettes } from "../../seedColors";
import DraggableColorBox from "./components/draggableColorBox/index";
import "./styles.css";

interface Props {
  palettes: ColorPalettes;
  savePalette: (palette: ColorPalettes[0]) => void;
}

const NewPalette: React.FC<Props> = ({ savePalette, palettes }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState<boolean>(false);
  const [colorName, setColorName] = useState<string>("");
  const [paletteName, setPaletteName] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("teal");
  const [selectedColors, setSelectedColors] = useState<
    { name: string; value: string }[]
  >(
    colorPalettes[0].colors.map((item) => ({
      name: item.name,
      value: item.color,
    }))
  );

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorName", (value) =>
      selectedColors.every((i) => i.name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", () =>
      selectedColors.every(
        (i) => i.value.toLowerCase() !== selectedColor.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isPaletteNameUnique", () =>
      palettes.every(
        (i) => i.paletteName.toLowerCase() !== paletteName.toLowerCase()
      )
    );
  }, [paletteName, palettes, selectedColor, selectedColors]);

  return (
    <>
      <div>
        <AppBar
          position="fixed"
          color="default"
          style={{
            width: isOpen ? "calc(100% - 240px)" : "100%",
            marginLeft: isOpen ? "240px" : "0",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setIsOpen(true)}
              edge="start"
              style={{
                display: isOpen ? "none" : "",
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* Nav bar Content */}
            <div className="app-bar__btns">
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => history.push("/")}
              >
                Go Back
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsSaveModalOpen(true);
                  setPaletteName("");
                }}
              >
                Save
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={isOpen}
          className="drawer"
        >
          <div
            className="drawer-close"
            style={{
              height: "64px",
            }}
          >
            <IconButton onClick={() => setIsOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {/* Palette Form */}
          <div className="new-palette__form">
            <Typography variant="h4">Design Your Palette</Typography>
            <div className="header-btns">
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => setSelectedColors([])}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => {
                  const allColors = colorPalettes
                    .map((item) => item.colors)
                    .flat();
                  const random = Math.floor(Math.random() * allColors.length);
                  setSelectedColors([
                    ...selectedColors,
                    {
                      name: allColors[random].name,
                      value: allColors[random].color,
                    },
                  ]);
                }}
              >
                Random
              </Button>
            </div>
            <ChromePicker
              color={selectedColor}
              onChange={(color) => setSelectedColor(color.hex)}
            />
            <ValidatorForm
              onSubmit={() => {
                setSelectedColors([
                  ...selectedColors,
                  { name: colorName, value: selectedColor },
                ]);
                setColorName("");
              }}
            >
              <TextValidator
                label="Color Name"
                onChange={(e) => {
                  // @ts-ignore
                  setColorName(e.target.value);
                }}
                name="name"
                value={colorName}
                validators={["required", "isColorName", "isColorUnique"]}
                errorMessages={[
                  "This field is required!",
                  "Color name must be unique!",
                  "Color must be unique!",
                ]}
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
              />
              <Button
                className="submit-btn"
                size="large"
                variant="contained"
                type="submit"
                style={{
                  background: selectedColor,
                  color: "#fff",
                }}
                disabled={selectedColors.length >= 20}
              >
                Add Color
              </Button>
            </ValidatorForm>
          </div>
        </Drawer>
        <main
          style={{
            width: isOpen ? "calc(100% - 240px)" : "100%",
            marginLeft: isOpen ? "240px" : "0",
            marginTop: "64px",
            height: "calc(100vh - 64px)",
          }}
        >
          {/* Content */}
          {selectedColors.map((item, index) => (
            <DraggableColorBox
              key={index}
              background={item.value}
              name={item.name}
              onDelete={(name) =>
                setSelectedColors(
                  selectedColors.filter((item) => item.name !== name)
                )
              }
            />
          ))}
        </main>
      </div>
      {/* Modals */}
      <Modal
        open={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="save-palette-modal">
          <ValidatorForm
            onSubmit={() => {
              setIsSaveModalOpen(false);
              setIsEmojiModalOpen(true);
            }}
          >
            <TextValidator
              label="Palette Name"
              onChange={(e) => {
                // @ts-ignore
                setPaletteName(e.target.value);
              }}
              name="name"
              value={paletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "This field is required!",
                "Palette name must be unique!",
              ]}
              style={{
                width: "100%",
              }}
            />
            <Button
              className="submit-btn"
              size="large"
              variant="contained"
              type="submit"
              style={{
                background: selectedColor,
                color: "#fff",
              }}
            >
              Add Palette
            </Button>
          </ValidatorForm>
        </div>
      </Modal>
      <Dialog open={isEmojiModalOpen}>
        <Picker
          onSelect={(emoji: any) => {
            const newPalette: ColorPalettes[0] = {
              paletteName,
              id: paletteName.toLowerCase().replace(/ /g, "-"),
              emoji: emoji.native,
              colors: selectedColors.map((item) => ({
                color: item.value,
                name: item.name,
              })),
            };
            savePalette(newPalette);
            history.push("/");
          }}
        />
      </Dialog>
    </>
  );
};

export default NewPalette;
