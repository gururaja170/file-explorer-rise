import React from "react";
import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartTooltip,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";

const COLORS = {
  uploaded: "#B91C1C",
  analysed: "#D97706",
  notAnalysed: "#2563EB",
};

const getPercentage = (num, total) =>
  Math.round((num / total) * 100).toFixed(2);

const numUploaded = 75;
const numNotAnalysed = 24;
const numAnalysed = 51;

const imgs = [
  {
    status: "Analysed",
    value: getPercentage(numAnalysed, numUploaded),
    color: COLORS.analysed,
  },
  {
    status: "Not Analysed",
    value: getPercentage(numNotAnalysed, numUploaded),
    color: COLORS.notAnalysed,
  },
];

const renderTooltip = (context) => {
  const { category, value } = context.point || context;
  return (
    <div>
      {category}: {value}%
    </div>
  );
};

const Imgpie = () => {
  return (
    <div>
      <Chart style={{ minHeight: "20rem" }}>
        <ChartTitle text="Status - this month" />
        <ChartLegend visible={false} />
        <ChartTooltip render={renderTooltip} />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={imgs}
            categoryField="status"
            field="value"
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"
              content={(e) => e.category}
            />
          </ChartSeriesItem>
        </ChartSeries>
      </Chart>
    </div>
  );
};

export default Imgpie;
