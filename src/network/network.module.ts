import { Module } from '@nestjs/common';
import { PolkadotService } from './polkadot/polkadot.service';
import { NetworkController } from './controller/network.controller';
import { NetworkService } from './network.service';

@Module({
  providers: [PolkadotService,NetworkService],
  controllers: [NetworkController]
})
export class NetworkModule {}
