import { Module } from '@nestjs/common';

import { WalletModule } from './wallet/wallet.module';
import { NetworkModule } from './network/network.module';

@Module({
  imports: [WalletModule, NetworkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
