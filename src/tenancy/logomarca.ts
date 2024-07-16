import environment from "../environment";
import logomarcaSVG from "./../assets/logomarca.svg";

export default function logomarca() {
  switch (environment.key) {
    case "portfolio":
      return "";
    default:
      return logomarcaSVG;
  }
}
