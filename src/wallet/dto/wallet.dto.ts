import { ApiProperty } from '@nestjs/swagger';
import { WalletType } from '../wallet.type';

export class Wallet {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty({ enum: WalletType })
  type: WalletType;
}
