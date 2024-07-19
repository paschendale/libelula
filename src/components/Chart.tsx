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
    <HighchartsReact
      highcharts={Highcharts}
      options={{ ...props.options, title: undefined, subtitle: undefined }}
    />
  );
}
