import { Module } from '@nestjs/common';
import { NetworkController } from './controller/network.controller';
import { NetworkService } from './network.service';
import { PolkadotModule } from './polkadot/polkadot.module';

@Module({
  imports: [PolkadotModule],
  providers: [NetworkService],
  controllers: [NetworkController],
})
export class NetworkModule {}
