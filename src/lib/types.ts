export enum ChannelStatus {
  IDLE = "idle",
  CONNECTED = "connected",
  UNAVAILABLE = "unavailable",
}

export enum LogLevel {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  FATAL = "FATAL",
}

export interface IChannel {
  id: number;
  check(): Promise<boolean>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  status: ChannelStatus;
  priority: number;
}
