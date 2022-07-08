import { WalletType } from './wallet.type';
export interface IWallet {
  id: string;
  name: string;
  address: string;
  type: WalletType;
}
