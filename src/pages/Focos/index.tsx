import { Box, Flex } from "@chakra-ui/react";
import Dashboard from "../../components/Dashboard";
import Layout from "../Layout";
import MapSwitcher from "../../components/MapSwitcher";
import OLMap from "../../components/OLMap";
import { useApp } from "../../providers/AppProvider";
import Details from "../../components/Details";
import MapFocosBairros from "../../components/Maps/Focos/Bairros";
import MapFocosPoints from "../../components/Maps/Focos/Points";

export default function App() {
  const { viewMetadata, setViewMetadata } = useApp();

  return (
    <Layout>
      <Box textAlign="center" fontSize="xl">
        <Flex
          sx={{
            minHeight: "100vh",
            flexDirection: "row",
            minWidth: "100vw",
            maxWidth: "100vw",
            justifyContent: "space-between",
            zIndex: 1,
            maxHeight: "100vh",
            "@media (max-width: 768px)": {
              flexDirection: "column",
              maxHeight: "none",
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
              "@media (max-width: 768px)": {
                flex: "none",
                flexDirection: "column",
                height: "80vh",
              },
            }}
          >
            {viewMetadata?.currentMap === "bairros" && <MapFocosBairros />}
            {viewMetadata?.currentMap === "points" && <MapFocosPoints />}
            <MapSwitcher />
          </Box>
          {viewMetadata.details && (
            <Box
              sx={{
                borderRadius: "5px 0 0 5px",
                boxShadow: "-12px 0px 5px -3px rgba(0,0,0,0.25);",
                width: viewMetadata.details ? "400px" : "0px",
                maxWidth: "30vw",
                flex: 1,
                zIndex: 2,
                "@media (max-width: 768px)": {
                  w: "auto",
                  maxWidth: "100vw",
                  flex: "none",
                  flexDirection: "column",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  boxShadow: "0px -10px 5px -3px rgba(0,0,0,0.25);",
                },
              }}
            >
              <Details />
            </Box>
          )}
          <Box
            sx={{
              borderRadius: "5px 0 0 5px",
              boxShadow: "-12px 0px 5px -3px rgba(0,0,0,0.25);",
              width: "400px",
              maxWidth: "30vw",
              flex: 1,
              zIndex: 2,
              "@media (max-width: 768px)": {
                w: "auto",
                maxWidth: "100vw",
                flex: "none",
                flexDirection: "column",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                boxShadow: "0px -10px 5px -3px rgba(0,0,0,0.25);",
              },
            }}
          >
            <Dashboard />
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}
