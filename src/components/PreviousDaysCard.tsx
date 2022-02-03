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
  ContourSeries,
} from "react-vis";
import theme from "../theme";

import { DHT22MessagesContext } from "./DHT22MessagesWrapper";

const CustomCard = styled(Card)(({ theme }) => ({}));

const CustomCardHeader = styled(CardHeader)(({ theme }) => ({}));
const twentyFourHoursAgo = ((d) => new Date(d.setDate(d.getDate() - 1)))(
  new Date()
);

const PreviousDaysCard: FunctionComponent = () => {
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
        <XYPlot height={300} width={graphWidth}>
          <XAxis />
          <YAxis />
          <HorizontalGridLines />
          <VerticalGridLines />
          <ContourSeries
            data={allMessages.map((msg) => ({
              x: msg.humidity,
              y: msg.temp,
              size: 5,
            }))}
            color={theme.palette.primary.main}
          />
        </XYPlot>
      </CardContent>
    </CustomCard>
  );
};

export default PreviousDaysCard;
