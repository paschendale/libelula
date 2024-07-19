import {
  Box,
  Divider,
  Flex,
  Skeleton,
  Stack,
  Text,
  keyframes,
} from "@chakra-ui/react";
import { theme } from "../theme";
import Chart from "./Chart";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import environment from "../environment";
import { useApp } from "../providers/AppProvider";
import { StatsPonteNova } from "../interfaces";
import getMonthName from "../utils/getMonthName";
import getGreenShades from "../utils/getGreenShades";
import { fadeIn } from "../utils/animations";

export default function Dashboard() {
  const { viewMetadata } = useApp();

  const [debouncedViewMetadata, setDebouncedViewMetadata] =
    useState(viewMetadata);
  const [chartData, setChartData] = useState<StatsPonteNova | undefined>(
    undefined
  );

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
      ).then(async (res) => {
        setChartData(await res.json());
        return res.json();
      }),
  });

  const chart1Options = {
    chart: {
      type: "line",
      backgroundColor: theme.colors.brand.darkgray,
      height: 220,
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
        name: "Focos acumulados até o momento",
        data: chartData?.focos,
        color: theme.colors.brand.lightgreen,
      },
    ],
  };

  const greenShades =
    chartData?.setores?.filter((e) => e.value).map((s) => s.value) &&
    getGreenShades(
      chartData?.setores?.filter((e) => e.value).map((s) => s.value)
    );

  const chart2Options = {
    chart: {
      type: "bar",
      backgroundColor: "#1f1f1f",
      height: 250,
    },
    plotOptions: {
      series: {
        pointPadding: 0.03,
        groupPadding: 0.03,
      },
      bar: {
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
    legend: {
      enabled: true,
      labelFormatter: function () {
        return "Focos acumulados";
      },

      itemStyle: {
        color: "#FFFFFF",
      },
    },

    xAxis: {
      categories: chartData?.setores.map((b: any) => b.name),
      labels: {
        style: {
          color: "#FFFFFF",
        },
      },
      title: {
        text: null,
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          color: "#FFFFFF",
        },
      },
    },
    series: [
      {
        name: "Focos",
        data: chartData?.setores.map((b: any, i: number) => ({
          name: b.name,
          y: b.value,
          color: theme.colors.brand.lightgreen,
        })),
        color: theme.colors.brand.lightgreen,
        showInLegend: true,
        dataLabels: {
          format: "{point.y}",
        },
      },
    ],
  };

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
        <Skeleton isLoaded={chartData !== undefined}>
          <Text
            sx={{
              color: "brand.lightgreen",
              fontSize: "5xl",
              fontWeight: "600",
              lineHeight: "1",
              animation: `${fadeIn} 0.5s ease-in`,
            }}
          >
            {chartData?.stats.totalFocos} focos identificados
          </Text>
        </Skeleton>
        <Skeleton isLoaded={chartData !== undefined}>
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
        <Skeleton isLoaded={chartData !== undefined}>
          <Text
            sx={{
              fontSize: "xl",
              fontWeight: "500",
              animation: `${fadeIn} 0.5s ease-in`,
            }}
          >
            Em média {parseFloat(chartData?.stats.mediaFocos!).toFixed(2)} focos
            identificados por dia
          </Text>
        </Skeleton>
        <Skeleton isLoaded={chartData !== undefined}>
          <Text
            sx={{
              color: "brand.green500",
              fontSize: "xl",
              fontWeight: "500",
              animation: `${fadeIn} 0.5s ease-in`,
            }}
          >
            {parseFloat(chartData?.stats.aumentoMesmoPeriodoPerc!).toFixed(2)}%
            de aumento em relação ao mesmo período do ano anterior
          </Text>
        </Skeleton>
        <Skeleton isLoaded={chartData !== undefined}>
          <Text
            sx={{
              fontSize: "xl",
              fontWeight: "500",
              animation: `${fadeIn} 0.5s ease-in`,
            }}
          >
            O mês com maior número de focos foi{" "}
            {getMonthName(parseInt(chartData?.stats.mesComMaiorNumero!))}, com{" "}
            {parseInt(chartData?.stats.mesComMaiorNumeroQtde!)} focos
            identificados
          </Text>
        </Skeleton>
      </Stack>
      <Divider />
      <Box
        sx={{
          animation: `${fadeIn} 0.5s ease-in`,
        }}
      >
        <Skeleton
          isLoaded={chartData !== undefined}
          sx={{ margin: 3, overflowX: "hidden" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDir: "column",
              alignItems: "flex-start",
              paddingBottom: 3,
              width: "100%",
              "@media (max-width: 768px)": {
                flexDirection: "column",
                alignItems: "center",
              },
            }}
          >
            <Text
              sx={{
                fontSize: "xl",
                fontWeight: "500",
              }}
            >
              Focos acumulados
            </Text>
            <Text
              sx={{
                fontSize: "xs",
              }}
            >
              na área enquadrada entre{" "}
              {getMonthName(viewMetadata.startEpoch.getMonth())}/
              {viewMetadata.startEpoch.getFullYear() - 2000} e{" "}
              {getMonthName(viewMetadata.endEpoch.getMonth())}/
              {viewMetadata.endEpoch.getFullYear() - 2000}
            </Text>
          </Box>
          <Chart options={chart1Options} />
        </Skeleton>
        <Divider />
        <Skeleton
          isLoaded={chartData !== undefined}
          sx={{ margin: 3, overflowX: "hidden" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDir: "column",
              alignItems: "flex-start",
              paddingBottom: 3,
              width: "100%",
              "@media (max-width: 768px)": {
                flexDirection: "column",
                alignItems: "center",
              },
            }}
          >
            <Text
              sx={{
                fontSize: "xl",
                fontWeight: "500",
              }}
            >
              Focos identificados por território
            </Text>
            <Text
              sx={{
                fontSize: "xs",
              }}
            >
              na área enquadrada entre{" "}
              {getMonthName(viewMetadata.startEpoch.getMonth())}/
              {viewMetadata.startEpoch.getFullYear() - 2000} e{" "}
              {getMonthName(viewMetadata.endEpoch.getMonth())}/
              {viewMetadata.endEpoch.getFullYear() - 2000}
            </Text>
          </Box>
          <Chart options={chart2Options} />
        </Skeleton>
      </Box>
    </Flex>
  );
}
