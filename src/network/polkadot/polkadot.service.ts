import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { WalletBalance } from './dto/WalletBalance.dto';
import { PolkadotParametes } from './PolkadotParametes';

@Injectable()
export class PolkadotService implements OnModuleInit {
  api: ApiPromise;
  logger = new Logger(PolkadotService.name, {
    timestamp: true,
  });

  async onModuleInit(): Promise<void> {
    this.logger.debug('Booting up Substrate Connect');
    this.api = await this.getApi();
    this.logger.log('PolkadotService started');
  }

  getSymbol(): string {
    return 'dot';
  }

  private async getApi(): Promise<ApiPromise> {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({
      provider: wsProvider,
    });
    return api;
  }

  async getBalance(address: string): Promise<WalletBalance> {
    const balance = (await this.api.query.system.account(address)).toJSON();
    const totalBalance: number = balance['data']['free'];
    const miscFrozen: number = balance['data']['miscFrozen'];
    const reservedBalance: number = balance['data']['reserved'];
    const feeFrozen: number = balance['data']['feeFrozen'];
    return {
      total: totalBalance / PolkadotParametes.PERCISSION,
      miscFrozen: miscFrozen / PolkadotParametes.PERCISSION,
      reserved: reservedBalance / PolkadotParametes.PERCISSION,
      feeFrozen: feeFrozen / PolkadotParametes.PERCISSION,
      transferable:
        (totalBalance - (miscFrozen + reservedBalance + feeFrozen)) /
        PolkadotParametes.PERCISSION,
    };
  }
}
