import { Box, Flex, Skeleton, Stack, Text, keyframes } from "@chakra-ui/react";
import { theme } from "../theme";
import Chart from "./Chart";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import environment from "../environment";
import { useApp } from "../providers/AppProvider";

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

  const { isPending, isLoading, error, data } = useQuery({
    queryKey: [
      debouncedViewMetadata.extent,
      debouncedViewMetadata.startEpoch,
      debouncedViewMetadata.endEpoch,
    ],
    queryFn: () =>
      fetch(
        `${environment.apiUrl}/stats/${environment.key}/${debouncedViewMetadata.startEpoch}/${debouncedViewMetadata.endEpoch}/${debouncedViewMetadata.extent?._sw.lng}/${debouncedViewMetadata.extent?._sw.lat}/${debouncedViewMetadata.extent?._ne.lng}/${debouncedViewMetadata.extent?._ne.lat}`
      ).then((res) => res.json()),
  });

  const today = new Date();

  function generateRandomData() {
    const data = [];
    const startDate = Date.UTC(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );
    const oneDay = 24 * 3600 * 1000;
    let value = 0;

    for (let i = 0; i < 365; i++) {
      value += Math.round(Math.random() * 1);
      data.push([startDate + i * oneDay, value]);
    }

    return data;
  }
  // Calculate the yearly statistics
  let total = 0;
  let monthlyCases = new Array(12).fill(0);

  data?.focos.forEach((point: any) => {
    const date = new Date(point[0]);
    const month = date.getUTCMonth();
    total += point[1];
    monthlyCases[month] += point[1];
  });

  const maxCases = Math.max(...monthlyCases);
  const monthIndex = monthlyCases.indexOf(maxCases);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const averageCases = total / data?.focos.length;

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
      text: `entre ${monthNames[today.getMonth()]}/${
        today.getFullYear() - 2000
      } e ${monthNames[today.getMonth()]}/${today.getFullYear() - 2000}`,
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

  const pieChartOptions = {
    chart: {
      type: "pie",
      backgroundColor: "#1f1f1f",
      height: 250,
    },
    title: {
      text: "Focos identificados",
      style: {
        color: "#FFFFFF",
      },
    },
    subtitle: {
      text: "por bairro",
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
        data: data?.bairros.map((b: any, i: number) => ({
          name: b.name,
          y: b.value,
          color: theme.colors.brand["green" + (i + 1) * 100],
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
            {total} focos identificados
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
            entre {monthNames[today.getMonth()]}/{today.getFullYear() - 2000} e{" "}
            {monthNames[today.getMonth()]}/{today.getFullYear() - 2000}
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
            Em média {averageCases.toFixed(2)} focos identificados por dia
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
            36,9% de aumento em relação ao mesmo período do ano anterior
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
            O mês com maior número de focos foi {monthNames[monthIndex]}, com{" "}
            {maxCases} focos identificados
          </Text>
        </Skeleton>
      </Stack>
      <Box
        sx={{
          overflowY: "auto",
          height: `100%`,
          animation: `${fadeIn} 0.5s ease-in`,
        }}
      >
        <Skeleton isLoaded={!isLoading} sx={{ margin: 3 }}>
          <Chart options={lineChartOptions} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} sx={{ margin: 3 }}>
          <Chart options={pieChartOptions} />
        </Skeleton>
      </Box>
    </Flex>
  );
}
