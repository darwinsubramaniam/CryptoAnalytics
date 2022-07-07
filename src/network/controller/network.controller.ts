import { Controller, Get, Param } from '@nestjs/common';
import { PolkadotService } from '../polkadot/polkadot.service';

@Controller('network')
export class NetworkController {
  constructor(private networkServices: PolkadotService) {}

  @Get(':address')
  async getBalances(@Param('address') address: string): Promise<number> {
    return await this.networkServices.getTransferableBalance(address);
  }
}
