import { Module } from '@nestjs/common';
import { PolkadotService } from './polkadot/polkadot.service';
import { NetworkController } from './controller/network.controller';

@Module({
  providers: [PolkadotService],
  controllers: [NetworkController],
})
export class NetworkModule {}
