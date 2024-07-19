import { Box, IconButton, Text, Image } from "@chakra-ui/react";
import { useApp } from "../providers/AppProvider";
import { fadeIn } from "../utils/animations";
import { Carousel } from "react-responsive-carousel";
import detailsImage from "../assets/details-example.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { theme } from "../theme";

export default function Details() {
  const { viewMetadata, setViewMetadata } = useApp();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        "@media (max-width: 768px)": {
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          padding: 3,
          textAlign: "left",
          lineHeight: "1.2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 2.5,
          overflowY: "auto",
          maxHeight: "100%",
        }}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
            height: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.colors.brand.lightgreen,
            borderRadius: "24px",
          },
        }}
      >
        <Text
          sx={{
            color: "brand.lightgreen",
            fontSize: "5xl",
            fontWeight: "600",
            lineHeight: "1",
            animation: `${fadeIn} 0.5s ease-in`,
          }}
        >
          Foco #
          {viewMetadata.details?.id || viewMetadata.details?.properties?.id}
        </Text>
        <Text
          sx={{
            fontSize: "xs",
            fontWeight: "100",
            animation: `${fadeIn} 0.5s ease-in`,
          }}
        >
          Fonte: {viewMetadata.details?.properties?.fonte}
          Identificado em {viewMetadata.details?.properties?.data} por{" "}
          {viewMetadata.details?.properties?.agente}
        </Text>
        <Text
          sx={{
            fontSize: "xl",
            fontWeight: "500",
            animation: `${fadeIn} 0.5s ease-in`,
          }}
        >
          Foto da Identificação
        </Text>
        <Box sx={{ width: "100%", animation: `${fadeIn} 0.5s ease-in` }}>
          <Carousel>
            <Box>
              <Image src={detailsImage} alt="" />
            </Box>
            <Box>
              <Image src={detailsImage} alt="" />
            </Box>
          </Carousel>
        </Box>
        {viewMetadata.details &&
          Object.keys(
            viewMetadata.details?.properties as { [key: string]: any }
          )
            .filter((key) => !key.includes("id"))
            .map((key, i) => (
              <Box key={i}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    sx={{
                      fontSize: "xl",
                      fontWeight: "500",
                      animation: `${fadeIn} 0.5s ease-in`,
                    }}
                  >
                    {key.slice(0, 1).toUpperCase() + key.slice(1)}
                  </Text>
                  <IconButton
                    aria-label={"editar"}
                    variant={"ghost"}
                    size={"xs"}
                    sx={{
                      "@media (max-width: 768px)": {
                        transform: "rotate(90deg)",
                      },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M5 14q-.425 0-.712-.288T4 13t.288-.712T5 12h5q.425 0 .713.288T11 13t-.288.713T10 14zm0-4q-.425 0-.712-.288T4 9t.288-.712T5 8h9q.425 0 .713.288T15 9t-.288.713T14 10zm0-4q-.425 0-.712-.288T4 5t.288-.712T5 4h9q.425 0 .713.288T15 5t-.288.713T14 6zm8 13v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T15.65 20H14q-.425 0-.712-.287T13 19m7.5-5.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z"
                      />
                    </svg>
                  </IconButton>
                </Box>
                <Text
                  sx={{
                    fontSize: "lg",
                    fontWeight: "300",
                    animation: `${fadeIn} 0.5s ease-in`,
                  }}
                >
                  {viewMetadata.details?.properties![key]}
                </Text>
              </Box>
            ))}
      </Box>
    </Box>
  );
}
