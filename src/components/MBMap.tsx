import { keyframes } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Map, { Layer, Source } from "react-map-gl";
import { setoresCensitarios } from "../assets/setores_censitarios";
import { useApp } from "../providers/AppProvider";
import { theme } from "../theme";

export default function MBMap() {
  const { mapRef, viewMetadata, setViewMetadata } = useApp();

  interface MapBoxViewState {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
    padding: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  }

  let viewState: MapBoxViewState = {
    longitude: viewMetadata.longitude,
    latitude: viewMetadata.latitude,
    zoom: viewMetadata.zoom,
    pitch: viewMetadata.pitch,
    bearing: viewMetadata.bearing,
    padding: {
      top: viewMetadata.padding.top,
      bottom: viewMetadata.padding.bottom,
      left: viewMetadata.padding.left,
      right: viewMetadata.padding.right,
    },
  };

  function setViewState(viewState: MapBoxViewState) {
    setViewMetadata({
      ...viewMetadata,
      longitude: viewState.longitude,
      latitude: viewState.latitude,
      zoom: viewState.zoom,
      pitch: viewState.pitch,
      bearing: viewState.bearing,
      padding: {
        top: viewState.padding.top,
        bottom: viewState.padding.bottom,
        left: viewState.padding.left,
        right: viewState.padding.right,
      },
    });
  }

  function getColorStops() {
    return [
      [0, theme.colors.brand["green100"]],
      [30, theme.colors.brand["green200"]],
      [60, theme.colors.brand["green300"]],
      [90, theme.colors.brand["green400"]],
      [120, theme.colors.brand["green500"]],
      [150, theme.colors.brand["green600"]],
      [180, theme.colors.brand["green700"]],
      [210, theme.colors.brand["green800"]],
      [240, theme.colors.brand["green900"]],
      [270, theme.colors.brand["green900"]],
      [300, theme.colors.brand["green900"]],
    ];
  }

  const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

  return (
    <Map
      reuseMaps
      {...viewState}
      attributionControl={false}
      ref={mapRef}
      onMove={(evt) => setViewState(evt.viewState)}
      mapboxAccessToken="pk.eyJ1IjoicGFzY2hlbmRhbGUiLCJhIjoiY2x4bG1haThnMDFrMDJrcHpnbThqOGd2diJ9.S9-iSawymgjbPoxSc7gWtg"
      style={{
        width: "100%",
        height: "100%",
        animation: `${fadeIn} 0.3s ease-in`,
      }}
      mapStyle="mapbox://styles/paschendale/clxlmdqkh020k01qm8vsvexzm"
    >
      <Source id="setores" type="geojson" data={setoresCensitarios as any}>
        <Layer
          {...{
            id: "setores-fill",
            type: "fill",
            source: "setores", // reference the data source
            layout: {},
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", "casos"],
                ...getColorStops().flat(),
              ],
              "fill-opacity": 0.8,
              "fill-opacity-transition": { duration: 500 },
              "fill-outline-color": theme.colors.brand["lightgreen"],
            },
          }}
        ></Layer>
      </Source>
    </Map>
  );
}
