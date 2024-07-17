import { Box, Text } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

export default function Chart(props: { options: any }) {
  const elementRef = useRef<HTMLDivElement>(null);

  const { width } = useSize(elementRef) ?? { width: null };
  props.options.chart.width = width ? width : null;

  return (
    <Box
      ref={elementRef}
      sx={{
        backgroundColor: "brand.darkgray",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDir: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 3,
          width: "100%",
          '@media (max-width: 768px)': {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Text
          sx={{
            fontSize: "md",
            fontWeight: "500",
          }}
        >
          {props.options.title.text}
        </Text>
        <Text
          sx={{
            fontSize: "xs",
          }}
        >
          {props.options.subtitle.text}
        </Text>
      </Box>
      <HighchartsReact
        highcharts={Highcharts}
        options={{ ...props.options, title: undefined, subtitle: undefined }}
      />
    </Box>
  );
}
