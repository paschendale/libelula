import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  GeolocateControl,
  Layer,
  MapboxGeoJSONFeature,
  NavigationControl,
  ScaleControl,
  Source,
} from "react-map-gl";
import { useApp } from "./../providers/AppProvider";
import environment from "./../environment";
import { theme } from "./../theme";
import { setoresCensitarios } from "../assets/setores_censitarios";
import { useCallback, useEffect, useState } from "react";

export default function Maps() {
  const { mapRef, viewMetadata, setViewMetadata } = useApp();
  const [cursor, setCursor] = useState<string>("");

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

  useEffect(() => {
    if (!viewMetadata.extent) {
      setViewMetadata({
        ...viewMetadata,
        extent: mapRef?.current?.getBounds() as typeof viewMetadata.extent,
      });
    }

    if (mapRef?.current) {
      mapRef?.current.resize();
    }
  }, [viewMetadata, mapRef]);

  function setViewState(viewState: MapBoxViewState) {
    setViewMetadata({
      ...viewMetadata,
      longitude: viewState.longitude,
      latitude: viewState.latitude,
      zoom: viewState.zoom,
      pitch: viewState.pitch,
      bearing: viewState.bearing,
      extent: mapRef?.current?.getBounds() as typeof viewMetadata.extent,
      padding: {
        top: viewState.padding.top,
        bottom: viewState.padding.bottom,
        left: viewState.padding.left,
        right: viewState.padding.right,
      },
    });

    localStorage.setItem("viewMetadata", JSON.stringify(viewMetadata));
  }

  function handleMapClick(evt: mapboxgl.MapLayerMouseEvent) {
    let map = mapRef?.current;

    if (!map) return;

    let features = map?.queryRenderedFeatures(evt.point, {
      layers: ["focos-points"],
    });

    if (features?.length) {
      map.flyTo({
        //@ts-expect-error
        center: features[0].geometry.coordinates,
        zoom: 18,
      });
      map.setFeatureState(
        {
          source: "focos",
          id: features[0].properties!.id,
        },
        {
          hover: true,
        }
      );
      setViewMetadata({
        ...viewMetadata,
        details: features[0] as MapboxGeoJSONFeature,
      });
    }

    evt.originalEvent.preventDefault();
  }

  function handleMapMouseMouve(evt: mapboxgl.MapLayerMouseEvent) {
    let map = mapRef?.current;

    if (!map) return;

    let features = map?.queryRenderedFeatures(evt.point, {
      layers: ["focos-points"],
    });

    if (features?.length) {
      setCursor("pointer");
    } else {
      setCursor("");
    }

    evt.originalEvent.preventDefault();
  }

  function mapStyle() {
    return environment.mapboxStyle[viewMetadata.currentMap];
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

  return (
    <Map
      reuseMaps
      {...viewState}
      attributionControl={false}
      ref={mapRef}
      onMove={(evt) => {
        return setViewState(evt.viewState);
      }}
      onClick={(evt) => {
        return handleMapClick(evt);
      }}
      onMouseMove={useCallback((evt: mapboxgl.MapLayerMouseEvent) => {
        return handleMapMouseMouve(evt);
      }, [])}
      cursor={cursor}
      mapboxAccessToken={environment.mapboxToken}
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle={mapStyle()}
    >
      <NavigationControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />
      {viewMetadata.currentMap === "points" && (
        <Source
          id="focos"
          name="focos"
          type="vector"
          tiles={[`${environment.vectorTilesApiUrl}/focos/{z}/{x}/{y}`]}
        >
          <Layer
            {...{
              id: "focos-points",
              type: "circle",
              source: "focos",
              "source-layer": "focos",
              paint: {
                "circle-color": [
                  "case",
                  ["boolean", ["feature-state", "hover"], true],
                  theme.colors.brand["green400"],
                  "yellow",
                ],
                "circle-radius": 8,
                "circle-stroke-color": "white",
                "circle-stroke-width": 3,
              },
            }}
          />
        </Source>
      )}
      {/* {viewMetadata.currentMap === 'points' && <Source
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
      </Source>} */}
      {viewMetadata.currentMap === "bairros" && (
        <Source id="setores" type="geojson" data={setoresCensitarios as any}>
          <Layer
            {...{
              id: "setores-fill",
              type: "fill",
              beforeId: "road-label-simple",
              source: "setores",
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
          />
        </Source>
      )}
    </Map>
  );
}
