import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { initialView, useApp } from "../providers/AppProvider";
import olFocosPreview from "./../assets/preview-ol-focos.png";
import mbBairrosPreview from "./../assets/preview-mb-bairros-focos.png";

export default function MapSwitcher() {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const { viewMetadata, setViewMetadata } = useApp();

  let switcherSx = {
    borderRadius: 5,
    cursor: "pointer",
    color: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 0px 5px -3px rgba(0,0,0,0.25);",
  };

  let imgSwitcherSx = {};

  function handleMapSwitch(map: string) {
    setViewMetadata({ ...viewMetadata, currentMap: map });
  }

  function mapPreview(map: string) {
    switch (map) {
      case "ol":
        return <img style={imgSwitcherSx} src={olFocosPreview} />;
      case "mb-bairros":
        return <img style={imgSwitcherSx} src={mbBairrosPreview} />;
      case "map3":
        return <>Ain't a map</>;
    }
  }

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 2,
        left: 2,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 0px 5px -3px rgba(0,0,0,0.25);",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {initialView.possibleMaps
        .filter((e) => e !== viewMetadata.currentMap)
        .map((map, index) => (
          <>
            {isHovering && (
              <Box
                key={index}
                sx={switcherSx}
                onClick={() => handleMapSwitch(map)}
              >
                {mapPreview(map)}
              </Box>
            )}
          </>
        ))}

      <Box sx={switcherSx}>{mapPreview(viewMetadata.currentMap)}</Box>
    </Box>
  );
}
