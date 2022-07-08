import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Wallet } from '../dto/wallet.dto';
import { IWallet } from '../wallet.interface';
import { WalletService } from '../services/wallet.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post()
  async createWallet(@Body() wallet: Wallet): Promise<IWallet> {
    return this.walletService.createWallet(wallet);
  }

  @Get()
  async readAllWallets(): Promise<IWallet[]> {
    return this.walletService.readAllWallets();
  }

  @Get(':id')
  async readWallet(@Param('id') id: string): Promise<IWallet> {
    return this.walletService.readWallet(id);
  }

  @Put(':id')
  async updateWallet(
    @Param('id') id: string,
    @Body() newWalletInfo: Wallet,
  ): Promise<IWallet> {
    return this.walletService.updateWallet(id, newWalletInfo);
  }

  @Delete(':id')
  async deleteWallet(@Param('id') id: string): Promise<IWallet> {
    return this.walletService.deleteWallet(id);
  }
}
