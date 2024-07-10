import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Layer, Source } from "react-map-gl";
import { useApp } from "../../../providers/AppProvider";
import environment from "../../../environment";
import { theme } from "../../../theme";

export default function MapFocosPoints() {
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

  function handleMapClick(evt: mapboxgl.MapLayerMouseEvent) {
    console.log("🚀 ~ handleMapClick ~ evt:", evt);
    evt.originalEvent.preventDefault();
  }

  const layers = mapRef?.current?.getStyle().layers;
  console.log("🚀 ~ MBMap ~ layers:", layers);

  return (
    <Map
      reuseMaps
      {...viewState}
      attributionControl={false}
      ref={mapRef}
      onMove={(evt) => {
        console.log("🚀 ~ MapFocosPoints ~ evt:", evt);
        return setViewState(evt.viewState);
      }}
      onClick={(evt) => {
        console.log("🚀 ~ MapFocosPoints ~ evt:", evt);
        return handleMapClick(evt);
      }}
      mapboxAccessToken={environment.mapboxToken}
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle={environment.mapboxStyle}
    >
      <Source
        id="focos"
        name="focos"
        type="vector"
        url={`${environment.vectorTilesApiUrl}/focos`}
      >
        <Layer
          {...{
            id: "focos-points",
            type: "circle",
            source: "focos",
            "source-layer": "focos",
            paint: {
              "circle-color": theme.colors.brand["green400"],
              "circle-radius": 8,
              "circle-stroke-color": "white",
              "circle-stroke-width": 3,
            },
          }}
        />
      </Source>
      <Source
        id="drone-tiles"
        type="raster"
        tiles={["http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"]}
      >
        <Layer
          {...{
            id: "drone-tiles-layer",
            type: "raster",
            source: "drone-tiles",
            beforeId: "land-structure-polygon",
            minzoom: 10,
            maxzoom: 21,
          }}
        />
      </Source>
    </Map>
  );
}
