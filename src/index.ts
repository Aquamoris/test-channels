import { ChannelManager } from "./ChannelManager";
import { channels } from "./lib/channels";
import { Logger } from "./lib/simpleLogger";
import { LogLevel } from "./lib/types";

function main() {
  const chManager = new ChannelManager(channels);

  setInterval(() => {
    Logger(LogLevel.INFO, `MAIN Active is ${chManager.getActiveChannel()?.id}`);
  }, 1000);
}

main();
