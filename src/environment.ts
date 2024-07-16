const environments: {
  [key: string]: {
    key: string;
    name: string;
    url: string;
    mapboxStyle: { [key: string]: string };
    mapboxToken: string;
    vectorTilesApiUrl: string;
    apiUrl: string;
  };
} = {
  portfolio: {
    key: "portfolio",
    name: "Ponte Nova",
    url: "https://libelula.marotta.dev",
    mapboxStyle: {
      bairros: "mapbox://styles/paschendale/clyg7yap901gc01qod0v76m6p",
      points: "mapbox://styles/paschendale/clxogcm4302x701qm8mlg7ycx",
    },
    mapboxToken: process.env.REACT_APP_MAPBOX_TOKEN!,
    vectorTilesApiUrl: "https://tiles.marotta.dev",
    apiUrl: "https://api-libelula.marotta.dev",
  },
  pontenova: {
    key: "pontenova",
    name: "Ponte Nova",
    url: "https://pontenova.gestaoengenharia.dev",
    mapboxStyle: {
      bairros: "mapbox://styles/paschendale/clyg7yap901gc01qod0v76m6p",
      points: "mapbox://styles/paschendale/clxogcm4302x701qm8mlg7ycx",
    },
    mapboxToken: process.env.REACT_APP_MAPBOX_TOKEN!,
    vectorTilesApiUrl: "https://tiles-libelula-pontenova.gestaoengenharia.dev",
    apiUrl: "https://tiles-api-pontenova.gestaoengenharia.dev",
  },
};

export default environments[process.env.REACT_APP_ENVIRONMENT || "portfolio"];
