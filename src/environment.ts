const environments: {
  [key: string]: {
    key: string;
    name: string;
    url: string;
    mapboxStyle: string;
    mapboxToken: string;
    vectorTilesApiUrl: string;
    apiUrl: string;
    adminUrl: string;
  };
} = {
  portfolio: {
    key: "portfolio",
    name: "Ponte Nova",
    url: "https://libelula.marotta.dev",
    mapboxStyle: process.env.REACT_APP_MAPBOX_STYLE!,
    mapboxToken: process.env.REACT_APP_MAPBOX_TOKEN!,
    vectorTilesApiUrl: "https://tiles.marotta.dev/",
    apiUrl: "https://api-libelula.marotta.dev",
    adminUrl: "https://admin-libelula.marotta.dev",
  },
};

export default environments[process.env.REACT_APP_ENVIRONMENT || "portfolio"];
