import { Box } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import title from "../tenancy/title";
import { Helmet } from "react-helmet";

export default function Layout(props: { children: ReactNode }) {
  useEffect(() => {
    document.title = title();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "brand.darkgray",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title>{title()}</title>
        <meta name="description" content={title()} />
      </Helmet>
      <Navbar />
      {props.children}
    </Box>
  );
}
