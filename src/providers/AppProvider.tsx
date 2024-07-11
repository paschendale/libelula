import {
  createContext,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { MapRef } from "react-map-gl";
import { RMap } from "rlayers";

export interface ViewMetadata {
  latitude: number;
  longitude: number;
  zoom: number;
  extent?: {
    _sw: {
      lng: number;
      lat: number;
    };
    _ne: {
      lng: number;
      lat: number;
    };
  };
  pitch: number;
  bearing: number;
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  startEpoch: Date;
  endEpoch: Date;
  currentMap: "bairros" | "points" | string;
  details?: {
    type_: string;
    flatCoordinates_: number[];
    flatInteriorPoints_?: any;
    flatMidpoints_?: any;
    ends_: number[];
    properties_: any;
    stride_: number;
    extent_: number[];
    ol_uid: string;
  };
}

export const initialView = {
  longitude: -42.901785361867894,
  latitude: -20.4100333063066,
  zoom: 15.131297713270841,
  pitch: 65,
  bearing: 0,
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  startEpoch: new Date("2023-07-09T11:13:32.976Z"),
  endEpoch: new Date("2024-07-09T11:13:32.976Z"),
  currentMap: "points",
  possibleMaps: ["bairros", "points"],
};

const AppContext = createContext<{
  mapRef: React.MutableRefObject<MapRef | null> | null;
  olMapRef: React.RefObject<RMap> | null;
  viewMetadata: ViewMetadata;
  setViewMetadata: React.Dispatch<SetStateAction<ViewMetadata>>;
}>({
  mapRef: null,
  olMapRef: null,
  viewMetadata: initialView,
  setViewMetadata: () => null,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const mapRef = useRef<MapRef>(null);
  const olMapRef = useRef<RMap>(null);
  const [viewMetadata, setViewMetadata] = useState<ViewMetadata>(initialView);
  console.log("🚀 ~ AppProvider ~ viewMetadata:", viewMetadata);

  return (
    <AppContext.Provider
      value={{
        mapRef,
        olMapRef,
        viewMetadata,
        setViewMetadata,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
