import React, { createContext, FunctionComponent } from "react";
import { useLocalStorage } from "react-use";
import { StorableDHT22Message } from "../types";

interface IDHT22MessagesContext {
  allMessages: Array<StorableDHT22Message>;
  setMessages: (newMessages: Array<StorableDHT22Message>) => void;
}

export const DHT22MessagesContext = createContext<IDHT22MessagesContext>({
  allMessages: [
    {
      timestamp: new Date().getTime(),
      temp: 123,
      humidity: 234,
    },
  ],
  setMessages: (newMessages) => null,
});

const DHT22MessagesWrapper: FunctionComponent = ({ children }) => {
  const [allMessages, setAllMessages] = useLocalStorage<
    Array<StorableDHT22Message>
  >("dht22", []);
  return (
    <DHT22MessagesContext.Provider
      value={{
        allMessages: allMessages || [],
        setMessages: (newMessages) => {
          setAllMessages(newMessages);
        },
      }}
    >
      {children}
    </DHT22MessagesContext.Provider>
  );
};

export default DHT22MessagesWrapper;
