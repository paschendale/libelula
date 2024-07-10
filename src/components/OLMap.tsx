import React, { useCallback, useRef, useState } from "react";
import {
  MapBrowserEvent,
  RLayerTile,
  RLayerVectorTile,
  RMap,
  ROSM,
  RStyle,
} from "rlayers";
import { useApp } from "../providers/AppProvider";
import { RView } from "rlayers/RMap";
import MVT from "ol/format/MVT";
import "ol/ol.css";
import { fromLonLat, toLonLat } from "ol/proj";
import { RCircle, RFill, RStroke } from "rlayers/style";
import { theme } from "../theme";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";

export default function OLMap() {
  const { olMapRef, viewMetadata, setViewMetadata } = useApp();
  const map = useRef<RMap>(null);
  const [hoveredFeature, setHoveredFeature] =
    useState<typeof viewMetadata.details>();

  let viewState = {
    center: fromLonLat([viewMetadata.longitude, viewMetadata.latitude]),
    zoom: viewMetadata.zoom,
  };

  function setViewState(viewState: RView) {
    const lonLat = toLonLat(viewState.center);

    setViewMetadata({
      ...viewMetadata,
      longitude: lonLat[0],
      latitude: lonLat[1],
      zoom: viewState.zoom,
      extent: olMapRef?.current?.ol
        .getView()
        .calculateExtent(map.current?.ol.getSize()) as [
        number,
        number,
        number,
        number
      ],
    });
  }

  const defaultStyle = new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({ color: theme.colors.brand["green400"] }),
      stroke: new Stroke({ color: "white", width: 3 }),
    }),
  });

  const hoverStyle = new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({ color: theme.colors.brand["green400"] }),
      stroke: new Stroke({ color: "white", width: 3 }),
      // @ts-expect-error
      shadow: new Fill({
        color: "rgba(0, 0, 0, 0.5)",
        // @ts-expect-error
        blur: 15,
        offsetX: 5,
        offsetY: 5,
      }),
    }),
  });

  const selectedStyle = new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({ color: "yellow" }),
      stroke: new Stroke({ color: "white", width: 3 }),
      // @ts-expect-error
      shadow: new Fill({
        color: "rgba(0, 0, 0, 0.5)",
        // @ts-expect-error
        blur: 15,
        offsetX: 5,
        offsetY: 5,
      }),
    }),
  });

  function styleFeature(feature: any) {
    if (feature.id_ === viewMetadata.details?.id_) {
      return selectedStyle;
    } else if (feature.id_ === hoveredFeature?.id_) {
      return hoverStyle;
    } else {
      return defaultStyle;
    }
  }

  function handlePointerMove(event: any) {
    const map = event.map;
    map.forEachFeatureAtPixel(event.pixel, function (feature: any) {
      if (hoveredFeature !== feature) {
        setHoveredFeature(feature);
      }
    });
    if (hoveredFeature) {
      map.getTargetElement().style.cursor = "pointer";
    } else {
      map.getTargetElement().style.cursor = "";
    }
  }

  function handleClick(event: any) {
    const map = event.map;
    map.forEachFeatureAtPixel(event.pixel, function (feature: any) {
      if (viewMetadata.details !== feature) {
        setViewMetadata({
          ...viewMetadata,
          details: feature,
        });
      }
    });
  }

  return (
    <RMap
      ref={olMapRef}
      width={"100%"}
      height={"100%"}
      initial={viewState}
      view={[viewState, setViewState]}
      noDefaultControls
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <RLayerTile
        url={"http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"}
      />
      <RLayerVectorTile
        url={"https://tiles.marotta.dev/data.focos/{z}/{x}/{y}.pbf?"}
        format={new MVT()}
        style={useCallback(styleFeature, [
          hoveredFeature,
          viewMetadata.details,
        ])}
      />
    </RMap>
  );
}
