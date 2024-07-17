import { Box, Button, Image, Text, keyframes } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import bgOrto from "./../../assets/bg-orto.jpg";
import logo from "../../tenancy/logo";
import geodengue from "./../../assets/geodengue.svg";
import environment from "../../environment";
import { fadeIn, breathe, move, moveBackground } from "../../utils/animations";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box
        sx={{
          height: "100vh",
          animation: `${fadeIn} 0.3s ease-in`,
        }}
      >
        {/* Página 1 */}
        <Box
          sx={{
            padding: 6,
            display: "flex",
            flexDir: "column",
            width: "70%",
            "@media (max-width: 768px)": {
              width: "80%",
            },
            height: "100%",
            justifyContent: "center",
            gap: 2,
            animation: `${fadeIn} 0.3s ease-in`,
          }}
        >
          {environment.key !== "portfolio" && (
            <Box
              sx={{
                display: "flex",
                flexDir: "row",
                justifyContent: "flex-start",
                overflow: "hidden",
              }}
            >
              <Image
                src={geodengue}
                sx={{
                  width: "80%",
                  zIndex: 2,
                }}
              />
            </Box>
          )}
          <Text
            sx={{
              fontSize: "6xl",
              fontWeight: "400",
              zIndex: 10,
              "@media (max-width: 768px)": {
                fontSize: "4xl",
                fontWeight: "400",
              },
              animation: `${fadeIn} 0.3s ease-in`,
            }}
          >
            Monitore arboviroses em {environment.name}
          </Text>
          <Text
            sx={{
              fontSize: "xl",
              zIndex: 10,
              "@media (max-width: 768px)": {
                fontSize: "md",
                fontWeight: "400",
              },
              animation: `${fadeIn} 0.3s ease-in`,
            }}
          >
            Acompanhe a dinâmica de casos e focos de dengue, chikungunya e Zika
            com estatísticas, gráficos e informações geoespaciais
          </Text>

          <Image
            src={logo()}
            sx={{
              position: "fixed",
              height: "40%",
              left: "80%",
              transform: "translateX(-50%)",
              zIndex: 2,
              animation: `${fadeIn} 0.5s ease-in, ${breathe} 5s ease-in-out infinite, ${move} 5s ease-in-out infinite`,
            }}
          />
          <Box
            sx={{
              position: "fixed",
              minHeight: "100%",
              minWidth: "100%",
              right: "0",
              zIndex: 1,
              display: "flex",
              flexDir: "row",
              justifyContent: "flex-end",
              paddingRight: "20%",
              overflow: "hidden",
              animation: `${fadeIn} 0.3s ease-in`,
            }}
          >
            <Box
              sx={{
                backgroundColor: "brand.darkgray",
                width: "100vw",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                transform: "skew(-10deg)",
              }}
            />
          </Box>
          <Box
            sx={{
              position: "fixed",
              minHeight: "100%",
              minWidth: "100%",
              background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${bgOrto})`,
              backgroundSize: "cover",
              zIndex: 0,
              animation: `${fadeIn} 0.3s ease-in, ${moveBackground} 60s linear infinite`,
            }}
          ></Box>
          <Box
            sx={{
              zIndex: 10,
              animation: `${fadeIn} 0.3s ease-in`,
            }}
          >
            <Button
              variant={"outline"}
              sx={{
                color: "white",
                marginTop: 2,
                animation: `${fadeIn} 0.5s ease-in`,
              }}
              onClick={() => navigate("/focos")}
            >
              Acesso cidadão
            </Button>
            <br />
            <Button
              variant={"outline"}
              sx={{
                color: "white",
                marginTop: 2,
                animation: `${fadeIn} 0.5s ease-in`,
              }}
              onClick={() => navigate("/focos")}
            >
              Acesso restrito
            </Button>
          </Box>
        </Box>
        {/* Página 2 */}
      </Box>
    </Layout>
  );
}
