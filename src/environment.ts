const environments: {
  [key: string]: {
    key: string;
    name: string;
    url: string;
    mapboxToken: string;
    pgTilesUrl: string;
    apiUrl: string;
    adminUrl: string;
  };
} = {
  portfolio: {
    key: "portfolio",
    name: "Ponte Nova",
    url: "https://libelula.marotta.dev",
    mapboxToken:
      "pk.eyJ1IjoicGFzY2hlbmRhbGUiLCJhIjoiY2x4bG1haThnMDFrMDJrcHpnbThqOGd2diJ9.S9-iSawymgjbPoxSc7gWtg",
    pgTilesUrl: "https://tiles.marotta.dev/",
    apiUrl: "https://api-libelula.marotta.dev/",
    adminUrl: "https://admin-libelula.marotta.dev/",
  },
  pontenova: {
    key: "pontenova",
    name: "Ponte Nova",
    url: "https://libelula.marotta.dev",
    mapboxToken:
      "pk.eyJ1IjoicGFzY2hlbmRhbGUiLCJhIjoiY2x4bG1haThnMDFrMDJrcHpnbThqOGd2diJ9.S9-iSawymgjbPoxSc7gWtg",
    pgTilesUrl: "https://tiles.marotta.dev/",
    apiUrl: "https://api-libelula.marotta.dev/",
    adminUrl: "https://admin-libelula.marotta.dev/",
  },
};

export default environments[process.env.REACT_APP_ENVIRONMENT || "portfolio"];
