import { Logger } from "./lib/simpleLogger";
import { ChannelStatus, LogLevel } from "./lib/types";
import type { IChannel } from "./lib/types";

export class ChannelManager {
  private channels: IChannel[];
  private activeChannel: IChannel | null = null;
  private connecting: boolean = false;

  constructor(channels: IChannel[]) {
    this.channels = channels.sort((a, b) => a.priority - b.priority);
    this.connect();
  }

  getActiveChannel() {
    return this.activeChannel;
  }

  async connect() {
    for (const ch of this.channels) {
      if (ch.status !== ChannelStatus.UNAVAILABLE) {
        try {
          const chStatus: boolean = await ch.check();

          if (chStatus) {
            if (this.activeChannel) {
              ch.status = ChannelStatus.IDLE;
              Logger(LogLevel.INFO, `Channel ${ch.id} is IDLE`);
            } else {
              const connected = await this.connectChannel(ch);

              if (connected) {
                break;
              }
            }
          }
        } catch {
          ch.status = ChannelStatus.UNAVAILABLE;
          Logger(LogLevel.WARNING, `Channel ${ch.id} is UNAVAILABLE`);
        }
      }
    }

    if (this.activeChannel == null) {
      Logger(LogLevel.FATAL, "No active channels");
    }

    this.monitor();
  }

  async connectChannel(ch: IChannel): Promise<boolean> {
    try {
      await ch.connect();
      ch.status = ChannelStatus.CONNECTED;
      this.activeChannel = ch;
      Logger(LogLevel.INFO, `Channel ${ch.id} is CONNECTED`);

      return true;
    } catch {
      ch.status = ChannelStatus.UNAVAILABLE;
      Logger(LogLevel.INFO, `Channel ${ch.id} is UNAVAILABLE in connecting`);

      return false;
    }
  }

  async monitor() {
    setInterval(async () => {
      if (this.connecting) return;
      this.connecting = true;

      try {
        if (this.activeChannel) {
          const chStatus = await this.activeChannel.check();

          if (!chStatus) {
            this.activeChannel.status = ChannelStatus.UNAVAILABLE;
            await this.activeChannel.disconnect();
            this.activeChannel = null;
            Logger(LogLevel.ERROR, `Active channel disconnected`);
            await this.connect();
          }
        }

        for (const ch of this.channels) {
          if (ch.status === ChannelStatus.UNAVAILABLE) {
            const ok = await ch.check();
            if (ok) {
              ch.status = ChannelStatus.IDLE;
              Logger(LogLevel.INFO, `Channel ${ch.id} is IDLE`);
            }
          }
        }
      } finally {
        this.connecting = false;
      }
    }, 1500);
  }
}
