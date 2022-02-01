import React, { FunctionComponent, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { XYPlot, LineSeries, XAxis, YAxis } from "react-vis";
import theme from "../theme";

import { DHT22MessagesContext } from "./DHT22MessagesWrapper";

const CustomCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const CustomCardHeader = styled(CardHeader)(({ theme }) => ({}));

const DashboardTemperatureCard: FunctionComponent = () => {
  const { allMessages } = useContext(DHT22MessagesContext);
  return (
    <CustomCard>
      <CustomCardHeader
        subheader="Temperature"
        avatar={
          <Avatar
            sx={{ width: 64, height: 64, bgcolor: theme.palette.primary.dark }}
          >
            {Math.round(allMessages[allMessages.length - 1].temp)}°F
          </Avatar>
        }
      />
      {/* <XYPlot height={200} width={300} yDomain={[60, 100]} xType="time">
        <XAxis />
        <YAxis />
        <LineSeries
          data={allMessages.map((msg) => ({
            x: msg.timestamp,
            y: msg.temp,
          }))}
        />
      </XYPlot> */}
    </CustomCard>
  );
};

export default DashboardTemperatureCard;
