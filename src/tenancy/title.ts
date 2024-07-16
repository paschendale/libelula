import environment from "../environment";

export default function title() {
  switch (environment.key) {
    case "portfolio":
      return "Libelula";
    default:
      return "GeoDengue";
  }
}
