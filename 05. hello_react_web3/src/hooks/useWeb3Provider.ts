import { useContext } from "react";
import { Web3ProviderContext } from "../components/Web3Provider";

export function useWeb3Dispatch() {
  return useWeb3Provider().dispatch;
}

export function useWeb3State() {
  return useWeb3Provider().state;
}

const useWeb3Provider = () => {
  return useContext(Web3ProviderContext)!;
};

export default useWeb3Provider;
