import { Box, Flex, Skeleton, Stack, Text, keyframes } from "@chakra-ui/react";
import { theme } from "../theme";
import Chart from "./Chart";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import environment from "../environment";
import { useApp } from "../providers/AppProvider";
import { StatsPonteNova } from "../interfaces";
import { get } from "http";
import getMonthName from "../utils/getMonthName";
import getGreenShades from "../utils/getGreenShades";

export default function Dashboard() {
  const { viewMetadata } = useApp();

  const [debouncedViewMetadata, setDebouncedViewMetadata] =
    useState(viewMetadata);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedViewMetadata(viewMetadata);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [viewMetadata]);

  const { isPending, isLoading, error, data } = useQuery<StatsPonteNova>({
    queryKey: [
      debouncedViewMetadata.extent,
      debouncedViewMetadata.startEpoch,
      debouncedViewMetadata.endEpoch,
    ],
    enabled: !!debouncedViewMetadata.extent,
    queryFn: () =>
      fetch(
        `${environment.apiUrl}/stats/${environment.key}/${debouncedViewMetadata.startEpoch}/${debouncedViewMetadata.endEpoch}/${debouncedViewMetadata.extent?._sw.lng}/${debouncedViewMetadata.extent?._sw.lat}/${debouncedViewMetadata.extent?._ne.lng}/${debouncedViewMetadata.extent?._ne.lat}`
      ).then((res) => res.json())
  });


  const lineChartOptions = {
    chart: {
      type: "line",
      backgroundColor: theme.colors.brand.darkgray,
      height: 220,
    },
    title: {
      text: "Focos acumulados",
      style: {
        color: "#FFFFFF",
      },
    },
    subtitle: {
      text: `entre ${getMonthName(viewMetadata.startEpoch.getMonth())}/${
        viewMetadata.startEpoch.getFullYear() - 2000
      } e ${getMonthName(viewMetadata.endEpoch.getMonth())}/${
        viewMetadata.endEpoch.getFullYear() - 2000
      }  na área enquadrada`,
      style: {
        color: "#FFFFFF",
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        style: {
          color: "#FFFFFF",
        },
      },
    },
    yAxis: {
      title: {
        text: "",
        style: {
          color: "#FFFFFF",
        },
      },
      labels: {
        style: {
          color: "#FFFFFF",
        },
      },
    },
    legend: {
      itemStyle: {
        color: "#FFFFFF",
      },
    },
    tooltip: {
      shared: true,
      backgroundColor: "#FFFFFF",
      style: {
        color: "#000000",
      },
    },
    series: [
      {
        name: "Focos acumulados",
        data: data?.focos,
        color: theme.colors.brand.lightgreen,
      },
    ],
  };

  const greenShades = data?.setores?.filter(e => e.value).map((s) => s.value) && getGreenShades(data?.setores?.filter(e => e.value).map((s) => s.value));

  const pieChartOptions = {
    chart: {
      type: "pie",
      backgroundColor: "#1f1f1f",
      height: 250,
    },
    title: {
      text: "Focos identificados por setor censitário",
      style: {
        color: "#FFFFFF",
      },
    },
    subtitle: {
      text: `entre ${getMonthName(viewMetadata.startEpoch.getMonth())}/${
        viewMetadata.startEpoch.getFullYear() - 2000
      } e ${getMonthName(viewMetadata.endEpoch.getMonth())}/${
        viewMetadata.endEpoch.getFullYear() - 2000
      }  na área enquadrada`,
      style: {
        color: "#FFFFFF",
      },
    },
    plotOptions: {
      pie: {
        innerSize: "50%",
        dataLabels: {
          enabled: true,
          style: {
            color: "#FFFFFF",
          },
        },
      },
    },
    tooltip: {
      backgroundColor: "#FFFFFF",
      style: {
        color: "#000000",
      },
    },
    series: [
      {
        name: "Focos",
        data: data?.setores.map((b: any, i: number) => ({
          name: b.name,
          y: b.value,
          color: greenShades && greenShades[i],
        })),
        showInLegend: false,
        dataLabels: {
          format: "{point.y}",
        },
      },
    ],
  };

  const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: "100%",
        backgroundColor: "brand.darkgray",
        overflowY: "auto",
      }}
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.colors.brand.lightgreen,
          borderRadius: "24px",
        },
      }}
    >
      <Stack
        sx={{
          padding: 3,
          textAlign: "left",
          lineHeight: "1.2",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          animation: `${fadeIn} 0.5s ease-in`,
        }}
      >
        <Skeleton isLoaded={!isLoading}>
          <Text
            sx={{
              color: "brand.lightgreen",
              fontSize: "5xl",
              fontWeight: "600",
              lineHeight: "1",
              animation: `${fadeIn} 0.5s ease-in`,
            }}
          >
            {data?.stats.totalFocos} focos identificados
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text
            sx={{
              fontSize: "xs",
              fontWeight: "100",
              animation: `${fadeIn} 0.5s ease-in`,
            }}
          >
            entre {getMonthName(viewMetadata.startEpoch.getMonth())}/
            {viewMetadata.startEpoch.getFullYear() - 2000} e
            {getMonthName(viewMetadata.endEpoch.getMonth())}/
            {viewMetadata.endEpoch.getFullYear() - 2000}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text
            sx={{
              fontSize: "xl",
              fontWeight: "500",
              animation: `${fadeIn} 0.5s ease-in`,
            }}
          >
            Em média {parseFloat(data?.stats.mediaFocos!).toFixed(2)} focos
            identificados por dia
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text
            sx={{
              color: "brand.green500",
              fontSize: "xl",
              fontWeight: "500",
              animation: `${fadeIn} 0.5s ease-in`,
            }}
          >
            {parseFloat(data?.stats.aumentoMesmoPeriodoPerc!).toFixed(2)}% de
            aumento em relação ao mesmo período do ano anterior
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text
            sx={{
              fontSize: "xl",
              fontWeight: "500",
              animation: `${fadeIn} 0.5s ease-in`,
            }}
          >
            O mês com maior número de focos foi{" "}
            {getMonthName(parseInt(data?.stats.mesComMaiorNumero!))}, com{" "}
            {parseInt(data?.stats.mesComMaiorNumeroQtde!)} focos identificados
          </Text>
        </Skeleton>
      </Stack>
      <Box
        sx={{
          animation: `${fadeIn} 0.5s ease-in`,
        }}
      >
        <Skeleton isLoaded={!isLoading} sx={{ margin: 3, overflowX: "hidden" }}>
          <Chart options={lineChartOptions} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} sx={{ margin: 3 }}>
          <Chart options={pieChartOptions} />
        </Skeleton>
      </Box>
    </Flex>
  );
}
