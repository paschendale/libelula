import { Box, Tab, TabList, Tabs, Image, Divider } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import logomarca from "../tenancy/logomarca";
import environment from "../environment";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = location.pathname;

  function getIndexFromPath(path: string) {
    switch (path) {
      case "/":
        return 0;
      case "/focos":
        return 1;
      case "/casos":
        return 2;
      default:
        return 0;
    }
  }

  const currentIndex = getIndexFromPath(currentLocation);

  function handleNavigation(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any,
    destination: string
  ) {
    e.preventDefault();
    navigate(destination);
  }

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 999,
        padding: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        background:
          location.pathname === "/"
            ? "#00000000"
            : "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)",
        "@media (max-width: 768px)": {
          justifyContent: "center",
        },
      }}
    >
      {location.pathname !== "/" && environment.key !== "portfolio" && (
        <Image
          src={logomarca()}
          sx={{
            height: "25px",
            cursor: "pointer",
          }}
          onClick={(e) => handleNavigation(e, "/")}
        />
      )}
      {location.pathname !== "/" && environment.key !== "portfolio" && (
        <Divider
          orientation="vertical"
          sx={{ height: "30px", marginLeft: "15px", marginRight: "0px" }}
        />
      )}
      <Tabs
        index={currentIndex}
        sx={{
          backgroundColor: "#00000000",
        }}
      >
        <TabList
          sx={{
            border: "none",
          }}
        >
          <Tab onClick={(e) => handleNavigation(e, "/")}>Home</Tab>
          <Tab onClick={(e) => handleNavigation(e, "/focos")}>Focos</Tab>
          {/* <Tab onClick={(e) => handleNavigation(e, "/casos")}>Casos</Tab> */}
        </TabList>
      </Tabs>
    </Box>
  );
}
