import { MetaMaskInpageProvider } from "@metamask/providers";

/**
 * extend window.ethereum
 */
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
