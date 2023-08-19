import { AnyAction } from "@reduxjs/toolkit";
import { BrowserProvider } from "ethers";

export type MetaMaskConnectionStatus = "NOT_CONNECTED" | "CONNECTED";

/**
 * Web3State
 */
export type Web3State = {
  /** 是否有 metamask */
  web3: boolean;
  /** BrowserProvider */
  provider: BrowserProvider | undefined;
  /** Metamask 連結狀態 */
  connectStatus: MetaMaskConnectionStatus;
  /** 使用者當前帳號資訊 */
  signer: AccountInfo | null;
  /** 使用者帳號資訊列表 */
  accountList: AccountInfo[];
};

/**
 * AccountInfo 型態
 */
export type AccountInfo = {
  /** 帳號 address*/
  address: string;
  /** 帳號 ETH 餘額 */
  balance: bigint;
};
