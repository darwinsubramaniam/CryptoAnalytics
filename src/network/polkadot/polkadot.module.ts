import { Module } from '@nestjs/common';
import { PolkadotService } from './services/polkadot.service';

@Module({
  exports: [PolkadotService],
  providers: [PolkadotService],
})
export class PolkadotModule {}
