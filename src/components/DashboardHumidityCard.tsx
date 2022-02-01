import React, { FunctionComponent, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import theme from "../theme";

import { DHT22MessagesContext } from "./DHT22MessagesWrapper";

const CustomCard = styled(Card)(({ theme }) => ({
  background: theme.palette.secondary.main,
}));

const CustomCardHeader = styled(CardHeader)(({ theme }) => ({}));

const DashboardHumidityCard: FunctionComponent = () => {
  const { allMessages } = useContext(DHT22MessagesContext);
  return (
    <CustomCard>
      <CustomCardHeader
        subheader="Humidity"
        avatar={
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: theme.palette.secondary.dark,
            }}
          >
            {Math.round(allMessages[allMessages.length - 1].humidity)}%
          </Avatar>
        }
      />
    </CustomCard>
  );
};

export default DashboardHumidityCard;
