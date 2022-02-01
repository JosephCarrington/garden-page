interface StorableMessage {
  timestamp: number;
}

export interface StorableDHT22Message extends StorableMessage {
  temp: number;
  humidity: number;
}
