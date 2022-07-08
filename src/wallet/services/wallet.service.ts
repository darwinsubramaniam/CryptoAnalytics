import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Wallet } from '../dto/wallet.dto';
import { IWallet } from '../wallet.interface';

@Injectable()
export class WalletService {
  private wallets: IWallet[] = [];

  async createWallet(wallet: Wallet): Promise<IWallet> {
    const newWallet: IWallet = {
      id: v4(),
      name: wallet.name,
      address: wallet.address,
      type: wallet.type,
    };
    this.wallets.push(newWallet);
    return newWallet;
  }

  async readWallet(id: string): Promise<IWallet> {
    return this.wallets.find((wallet) => wallet.id === id);
  }

  async readAllWallets(): Promise<IWallet[]> {
    return this.wallets;
  }

  async updateWallet(
    wallet_id: string,
    newWalletInfo: Wallet,
  ): Promise<IWallet> {
    this.wallets.find((wallet) => wallet.id === wallet_id).name =
      newWalletInfo.name;
    this.wallets.find((wallet) => wallet.id === wallet_id).address =
      newWalletInfo.address;
    this.wallets.find((wallet) => wallet.id === wallet_id).type =
      newWalletInfo.type;
    return this.wallets.find((wallet) => wallet.id === wallet_id);
  }

  async deleteWallet(id: string): Promise<IWallet> {
    const index = this.wallets.findIndex((wallet) => wallet.id === id);
    if (index !== -1) {
      return this.wallets.splice(index, 1)[0];
    }
    throw new Error('Wallet not found');
  }
}
