import { RLayerTile, RLayerVectorTile, RMap, ROSM, RStyle } from "rlayers";
import { useApp } from "../providers/AppProvider";
import { RView } from "rlayers/RMap";
import MVT from "ol/format/MVT";
import "ol/ol.css";
import { fromLonLat, toLonLat } from "ol/proj";
import { RCircle, RFill, RStroke } from "rlayers/style";
import { theme } from "../theme";

export default function OLMap() {
  const { viewMetadata, setViewMetadata } = useApp();

  let viewState: RView = {
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
    });
  }

  return (
    <RMap
      width={"100%"}
      height={"100%"}
      initial={viewState}
      view={[viewState, setViewState]}
      noDefaultControls
    >
      {/* <RLayerTile
        url={"http://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"}
      /> */}
      <RLayerTile
        url={"http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"}
      />
      <RLayerVectorTile
        url={"https://tiles.marotta.dev/data.focos/{z}/{x}/{y}.pbf?"}
        format={new MVT()}
      >
        <RStyle.RStyle>
          <RStroke color={"white"} width={3} />
          <RCircle radius={6}>
            <RFill color={theme.colors.brand["green400"]} />
          </RCircle>
        </RStyle.RStyle>
      </RLayerVectorTile>
    </RMap>
  );
}
