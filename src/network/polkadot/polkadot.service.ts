import { Injectable, Logger } from '@nestjs/common';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { PolkadotParametes } from './PolkadotParametes';
import { PolkadotSubQueryService } from './subquery.service';

@Injectable()
export class PolkadotService {
  private POLKADOT_PARAM = new PolkadotParametes();
  private api: ApiPromise;

  logger = new Logger(PolkadotService.name, {
    timestamp: true,
  });

  constructor(private subqueryService: PolkadotSubQueryService) {
    this.getApi().then((api) => {
      this.api = api;
      this.logger.log('Polkadot API connected');
    });
    this.isReady();
  }

  async isReady(): Promise<boolean> {
    while (this.api === undefined) {
      this.logger.debug('Waiting for Polkadot API to connect...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return this.api.isConnected;
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

  /**
   * Get the transferable balance of an address.
   * @param address polkadot address
   * @returns transferable balance
   */
  async getTransferableBalance(address: string): Promise<number> {
    if ((await this.isReady()) === false) {
      throw new Error('Polkadot API is not ready');
    }
    const balance = (await this.api.query.system.account(address)).toJSON();
    console.log(balance);
    const freeBalance: number = balance['data']['free'];
    const lockedBalance: number = balance['data']['miscFrozen'];
    const transferableBalance = freeBalance - lockedBalance;
    return transferableBalance / this.POLKADOT_PARAM.PERCISSION;
  }
}
