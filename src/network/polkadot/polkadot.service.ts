import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { WalletBalance } from "./dto/WalletBalance.dto";


@Injectable()
export class PolkadotService implements OnModuleInit {
  DECIMAL_DIVISOR = 10000000000;
  api: ApiPromise;
  logger = new Logger(PolkadotService.name, {
    timestamp: true,
  });

  constructor() {

  }
  async onModuleInit(): Promise<void> {
    this.logger.debug("Booting up Substrate Connect");
    this.api = await this.getApi()
    this.logger.log("PolkadotService started");
  }

  getSymbol(): string {
    return "dot";
  }

  private async getApi(): Promise<ApiPromise> {
    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    const api = await ApiPromise.create({
      provider: wsProvider,
    });
    return api;
  }

  async getBalance(address: string): Promise<WalletBalance> {
    const balance = (await this.api.query.system.account(address)).toJSON();
    console.log(balance);
    const totalBalance: number = balance["data"]["free"];
    const miscFrozen: number = balance["data"]["miscFrozen"];
    const reservedBalance: number = balance["data"]["reserved"];
    const feeFrozen: number = balance["data"]["feeFrozen"];
    return {
      total: totalBalance / this.DECIMAL_DIVISOR,
      miscFrozen: (miscFrozen / this.DECIMAL_DIVISOR),
      reserved: reservedBalance / this.DECIMAL_DIVISOR,
      feeFrozen: feeFrozen / this.DECIMAL_DIVISOR,
      transferable: (totalBalance - (miscFrozen + reservedBalance + feeFrozen)) / this.DECIMAL_DIVISOR,
    }
  }
}


