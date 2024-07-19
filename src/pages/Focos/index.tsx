import { Box, Flex, IconButton } from "@chakra-ui/react";
import Dashboard from "../../components/Dashboard";
import Layout from "../Layout";
import MapSwitcher from "../../components/MapSwitcher";
import { useApp } from "../../providers/AppProvider";
import Details from "../../components/Details";
import Maps from "../../components/Maps";
import { fadeIn } from "../../utils/animations";

export default function Focos() {
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
              position: "relative",
              "@media (max-width: 768px)": {
                flex: "none",
                flexDirection: "column",
                height: "80vh",
              },
            }}
          >
            {viewMetadata.details && (
              <IconButton
                variant={"solid"}
                size={"sm"}
                background={"brand.darkgray"}
                onClick={() =>
                  setViewMetadata({ ...viewMetadata, details: undefined })
                }
                aria-label="Close"
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  zIndex: 1000,
                  animation: `${fadeIn} 0.5s ease-in`,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="m190.06 414l163.12-139.78a24 24 0 0 0 0-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18"
                  />
                </svg>
              </IconButton>
            )}
            <Maps />
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
                zIndex: 1000,
                animation: `${fadeIn} 0.5s ease-in`,
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
              zIndex: 1000,
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
