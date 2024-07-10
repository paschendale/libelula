import { Box, Button, Image, Text, keyframes } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import bgOrto from "./../../assets/bg-orto.jpg";
import droneSVG from "./../../assets/drone.svg";
import dragonflySVG from "./../../assets/dragonfly.svg";
import logo from "../../tenancy/logo";
import { theme } from "../../theme";
import environment from "../../environment";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const breathe = keyframes`
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.05); }
`;

const move = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
`;

const moveBackground = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 100vw 0; }
`;

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
