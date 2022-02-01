import React, {
  FunctionComponent,
  useContext,
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  Crosshair,
  AreaSeries,
} from "react-vis";
import theme from "../theme";

import { DHT22MessagesContext } from "./DHT22MessagesWrapper";

const CustomCard = styled(Card)(({ theme }) => ({}));

const CustomCardHeader = styled(CardHeader)(({ theme }) => ({}));

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
      <CustomCardHeader title="Temperature & Humidity" />
      <CardContent ref={cardRef}>
        <XYPlot
          height={300}
          width={graphWidth}
          yDomain={[
            returnLowest([
              ...allMessages.map((msg) => msg.humidity),
              ...allMessages.map((msg) => msg.temp),
            ]) - 10,
            returnHighest([
              ...allMessages.map((msg) => msg.humidity),
              ...allMessages.map((msg) => msg.temp),
            ]) + 10,
          ]}
          xType="time"
        >
          <XAxis />
          <YAxis />
          <HorizontalGridLines />
          <VerticalGridLines />
          <AreaSeries
            data={allMessages.map((msg) => ({
              x: msg.timestamp,
              y: msg.temp,
            }))}
            color={theme.palette.primary.main}
          />
          <AreaSeries
            data={allMessages.map((msg) => ({
              x: msg.timestamp,
              y: msg.humidity,
            }))}
            color={theme.palette.secondary.main}
          />
        </XYPlot>
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
