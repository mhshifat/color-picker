import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import ColorPage from "../sections/colorPage";
import NewPalette from "../sections/newPalette";
import Palette from "../sections/palette";
import PaletteList from "../sections/paletteList";
import { colorPalettes, ColorPalettes } from "../seedColors";

const Routes = () => {
  const [palettes, setPalettes] = useState(colorPalettes);

  const findPalette = (id: string) => {
    return palettes.find((item) => item.id === id);
  };

  const savePalette = (palette: ColorPalettes[0]) => {
    setPalettes([...palettes, palette]);
  };

  const onPaletteDelete = (paletteId: string) => {
    setPalettes(palettes.filter((item) => item.id !== paletteId));
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <PaletteList palettes={palettes} onPaletteDelete={onPaletteDelete} />
        )}
      />
      <Route
        exact
        path="/palette/new"
        render={() => (
          <NewPalette savePalette={savePalette} palettes={palettes} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={(props) => (
          <Palette
            palette={findPalette(props.match.params.id) || palettes[0]}
          />
        )}
      />
      <Route
        path="/palette/:paletteId/:colorId"
        render={(props) => (
          <ColorPage
            palette={findPalette(props.match.params.paletteId) || palettes[0]}
            colorId={props.match.params.colorId}
          />
        )}
      />
    </Switch>
  );
};

export default Routes;
