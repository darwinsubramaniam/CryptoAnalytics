import { Inject, Injectable } from "@nestjs/common";
import { WalletBalance } from "./polkadot/dto/WalletBalance.dto";
import { PolkadotService } from "./polkadot/polkadot.service";
import { SupportedNetworkNames } from "./supported_network";

@Injectable()
export class NetworkService{

    constructor(private polkadotService:PolkadotService) {}

    async getBalance(address:string, network:SupportedNetworkNames): Promise<WalletBalance> {
        switch(network){
            case SupportedNetworkNames.POLKADOT:
                return await this.polkadotService.getBalance(address);
            default:
                throw new Error(`Network ${network} is not supported`);
        }
    }
}