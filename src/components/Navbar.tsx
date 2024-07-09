import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

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
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
        justifyContent: "space-between",
        width: "100%",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
        "@media (max-width: 768px)": {
          justifyContent: "center",
        },
      }}
    >
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
