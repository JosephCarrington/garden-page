import React, {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useLocalStorage } from "react-use";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";

import DHT22MessagesWrapper, {
  DHT22MessagesContext,
} from "./components/DHT22MessagesWrapper";

import DashboardHumidityCard from "./components/DashboardHumidityCard";
import DashboardTemperatureCard from "./components/DashboardTemperatureCard";
import DashboardCombinedCard from "./components/DashboardCombinedCard";

import { StorableDHT22Message } from "./types";

import theme from "./theme";
import PreviousDaysCard from "./components/PreviousDaysCard";

const AppWithStorage: FunctionComponent = () => {
  return (
    <DHT22MessagesWrapper>
      <App />
    </DHT22MessagesWrapper>
  );
};

const App: FunctionComponent = () => {
  const { allMessages, setMessages } = useContext(DHT22MessagesContext);
  const [socketUrl, setSocketUrl] = useState("ws://10.0.0.193/ws");
  const { lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const parsedMessage = JSON.parse(lastMessage.data);
      setMessages([
        ...allMessages,
        {
          timestamp: new Date().getTime(),
          temp: Math.round(parsedMessage.temp),
          humidity: Math.round(parsedMessage.humidity),
        },
      ]);
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  // const parsedData: { sensor: "DHT22"; temp: number; humidity: number } =
  //   JSON.parse(lastMessage?.data);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <DashboardTemperatureCard />
          </Grid>
          <Grid item xs={4}>
            <DashboardHumidityCard />
          </Grid>
          <Grid item xs={12}>
            <DashboardCombinedCard />
          </Grid>
          <Grid item xs={12}>
            {/* <PreviousDaysCard /> */}
          </Grid>
          <Grid item xs={2}>
            <Card>
              <CardHeader title="DHT22 Status" />
              <CardContent>{connectionStatus}</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default AppWithStorage;
