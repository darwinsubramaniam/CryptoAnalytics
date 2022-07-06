import { Injectable, Logger } from '@nestjs/common';
import {ApiPromise, WsProvider} from '@polkadot/api';

@Injectable()
export class PolkadotService {
    DECIMAL_DIVISOR = 10000000000;
    api:ApiPromise;
    logger = new Logger(PolkadotService.name, {
        timestamp: true,
    });

    constructor() {
        this.getApi().then(api => {
            this.api = api;
            this.logger.log('Polkadot API connected');
        });
        this.isReady();
    }

    async isReady(): Promise<boolean> {
        while (this.api === undefined) {
            this.logger.debug("Waiting for Polkadot API to connect...");
            await new Promise(resolve => setTimeout(resolve, 1000));
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

    async getTransferableBalance(address: string): Promise<number> {
        if(await this.isReady() === false){
            throw new Error('Polkadot API is not ready');
            
        }
        const balance = (await this.api.query.system.account(address)).toJSON();
        console.log(balance);
        const freeBalance: number  = balance["data"]["free"];
        const lockedBalance: number = balance["data"]["miscFrozen"];
        const transferableBalance = freeBalance - lockedBalance;
        return transferableBalance / this.DECIMAL_DIVISOR;
    }
}
