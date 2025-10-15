import type { IChannel } from "./types";
import { ChannelStatus } from "./types";

export const channels: IChannel[] = [
  {
    id: 1,
    status: ChannelStatus.IDLE,
    check: async () => {
      return Math.random() > 0.2;
    },
    connect: async () => {
      console.log("Channel 1 connected with code 200");
    },
    disconnect: async () => {
      console.log("Channel 1 disconnected");
    },
    priority: 2,
  },
  {
    id: 2,
    status: ChannelStatus.IDLE,
    check: async () => {
      return Math.random() > 0.2;
    },
    connect: async () => {
      console.log("Channel 2 connected with code 200");
    },
    disconnect: async () => {
      console.log("Channel 2 disconnected");
    },
    priority: 1,
  },
  {
    id: 3,
    status: ChannelStatus.UNAVAILABLE,
    check: async () => {
      return Math.random() > 0.2;
    },
    connect: async () => {
      console.log("Channel 3 connected with code 200");
    },
    disconnect: async () => {
      console.log("Channel 3 disconnected");
    },
    priority: 3,
  },
];
