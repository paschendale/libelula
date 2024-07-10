import environment from "../environment";
import dragonflySVG from "./../assets/dragonfly.svg";
import droneSVG from "./../assets/drone.svg";

export default function logo() {
  switch (environment.key) {
    case "portfolio":
      return dragonflySVG;
    default:
      return droneSVG;
  }
}
