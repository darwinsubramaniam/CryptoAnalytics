import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NetworkService } from '../network.service';
import { WalletBalance } from '../polkadot/dto/WalletBalance.dto';
import { SupportedNetworkNames } from '../supported_network';

@Controller('network')
@ApiTags('Network')
export class NetworkController {
  constructor(private networkServices: NetworkService) {}

  @Get(':address/:network')
  async getBalances(
    @Param('address') address: string,
    @Param('network') network: SupportedNetworkNames,
  ): Promise<WalletBalance> {
    try {
      return await this.networkServices.getBalance(address, network);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
