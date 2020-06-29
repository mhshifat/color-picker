import chroma from "chroma-js";
import { ColorPalettes } from "../seedColors";

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
export type ScaleUnion =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

export const generatePalette = (
  starterPalette: ColorPalettes[0]
): {
  paletteName: string;
  id: string;
  emoji: string;
  colors: {
    [key in ScaleUnion]: {
      hex: string;
      id: string;
      name: string;
      rgb: string;
      rgba: string;
    }[];
  };
} => {
  let newPalette: any = {
    ...starterPalette,
    colors: {},
  };
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  for (let color of starterPalette.colors) {
    const scale: string[] = generateScale(color.color, 10).reverse();
    for (let index in scale) {
      newPalette.colors[levels[index]].push({
        name: `${color.name} ${levels[index]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[index],
        rgb: chroma(scale[index]).css(),
        rgba: chroma(scale[index])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }
  return newPalette;
};

const generateScale = (haxColor: string, numOfColors: number): string[] => {
  return chroma.scale(getRange(haxColor)).mode("lab").colors(numOfColors);
};

const getRange = (color: string): string[] => {
  const endColor = "#fff";
  return [chroma(color).darken(1.4).hex(), color, endColor];
};

export const getherShades = (palette: any, colorId: string) => {
  let shades: any[] = [];

  for (let key in palette.colors) {
    shades = shades.concat(
      palette.colors[key].filter((color: any) => color.id === colorId)
    );
  }

  return shades.slice(1);
};
