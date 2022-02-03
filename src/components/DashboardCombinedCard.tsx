import React, {
  FunctionComponent,
  useContext,
  useRef,
  useLayoutEffect,
  useState,
} from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  TimeScale,
  Filler,
} from "chart.js";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";

import theme from "../theme";

import { DHT22MessagesContext } from "./DHT22MessagesWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  TimeScale,
  Filler
);

const CustomCard = styled(Card)(({ theme }) => ({}));

const CustomCardHeader = styled(CardHeader)(({ theme }) => ({}));
const twentyFourHoursAgo = ((d) => new Date(d.setDate(d.getDate() - 1)))(
  new Date()
);

const DashboardCombinedCard: FunctionComponent = () => {
  const { allMessages } = useContext(DHT22MessagesContext);
  const cardRef = useRef<HTMLDivElement>(null);
  const [graphWidth, setGraphWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (cardRef.current) {
      const styles = getComputedStyle(cardRef.current);
      setGraphWidth(
        cardRef.current.clientWidth -
          parseFloat(styles.paddingLeft) -
          parseFloat(styles.paddingRight)
      );
    }
  });
  return (
    <CustomCard>
      <CustomCardHeader title="Temperature & Humidity (Last 24 Hours)" />
      <CardContent ref={cardRef}>
        <Line
          height={100}
          options={{
            interaction: {
              intersect: false,
              mode: "index",
            },
            normalized: true,
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
            },
            scales: {
              x: {
                type: "time",
                display: true,
                title: {
                  display: true,
                  text: "Time",
                },
                ticks: {
                  autoSkip: false,
                  major: {
                    enabled: true,
                  },
                },
              },
            },
          }}
          data={{
            labels: allMessages
              .filter((msg) => msg.timestamp >= twentyFourHoursAgo.getTime())
              .map((msg) => msg.timestamp),
            datasets: [
              {
                label: "Temperature",
                data: allMessages
                  .filter(
                    (msg) => msg.timestamp >= twentyFourHoursAgo.getTime()
                  )
                  .map((msg) => msg.temp),
                spanGaps: true,
                pointRadius: 0,
                fill: 1,
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.main,
                borderWidth: 1,
              },
              {
                label: "Humidity",
                data: allMessages
                  .filter(
                    (msg) => msg.timestamp >= twentyFourHoursAgo.getTime()
                  )
                  .map((msg) => msg.humidity),
                spanGaps: true,
                pointRadius: 0,
                fill: true,
                borderColor: theme.palette.secondary.dark,
                backgroundColor: theme.palette.secondary.main,
                borderWidth: 1,
              },
            ],
          }}
        />
        {/* <AreaChart
          height={300}
          width={graphWidth}
          data={allMessages.filter(
            (msg) => msg.timestamp >= twentyFourHoursAgo.getTime()
          )}
        >
          <Legend verticalAlign="top" height={36} />

          <CartesianGrid />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={["dataMin", "dataMax"]}
            scale="time"
            tickFormatter={(timestamp) =>
              new Date(timestamp)
                .toLocaleTimeString()
                .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1")
            }
            interval="preserveEnd"
          />
          <YAxis />
          <Area
            type="monotone"
            dataKey="temp"
            stroke={theme.palette.primary.dark}
            fill={theme.palette.primary.main}
          />
          <Area
            type="monotone"
            dataKey="humidity"
            stroke={theme.palette.secondary.dark}
            fill={theme.palette.secondary.main}
          />
          <Tooltip />
        </AreaChart> */}
      </CardContent>
    </CustomCard>
  );
};

const returnLowest: (values: Array<number>) => number = (values) => {
  const sortedNumbers = [...values].sort((a, b) => a - b);
  return sortedNumbers.at(0) || 0;
};

const returnHighest: (values: Array<number>) => number = (values) => {
  const sortedNumbers = [...values].sort((a, b) => a - b);
  return sortedNumbers.at(-1) || 0;
};

export default DashboardCombinedCard;
