import {
  createContext,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { MapRef } from "react-map-gl";

export interface ViewMetadata {
  latitude: number;
  longitude: number;
  zoom: number;
  extent?: [number, number, number, number];
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
  currentMap: "mb-bairros" | "mb-heatmap" | "mb-3d" | "ol" | string;
}

export const initialView = {
  longitude: -42.90748652643276,
  latitude: -20.40436261357887,
  zoom: 11.181550333109245,
  pitch: 0,
  bearing: 0,
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  startEpoch: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  endEpoch: new Date(),
  currentMap: "ol",
  possibleMaps: ["mb-bairros", "ol"],
};

const AppContext = createContext<{
  mapRef: React.MutableRefObject<MapRef | null> | null;
  viewMetadata: ViewMetadata;
  setViewMetadata: React.Dispatch<SetStateAction<ViewMetadata>>;
}>({
  mapRef: null,
  viewMetadata: initialView,
  setViewMetadata: () => null,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const mapRef = useRef<MapRef>(null);
  const [viewMetadata, setViewMetadata] = useState<ViewMetadata>(initialView);
  console.log("🚀 ~ AppProvider ~ viewMetadata:", viewMetadata);

  return (
    <AppContext.Provider
      value={{
        mapRef,
        viewMetadata,
        setViewMetadata,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
