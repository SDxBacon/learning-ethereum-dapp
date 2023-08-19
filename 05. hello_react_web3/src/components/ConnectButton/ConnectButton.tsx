import Button, { ButtonTypeMap } from "@mui/joy/Button";
import { Web3State } from "../../types/Web3Provider";
import { useWeb3Dispatch, useWeb3State } from "../../hooks/useWeb3Provider";
import { actions } from "../Web3Provider";

const useConnectButtonProps = (): {
  text: string;
  color: ButtonTypeMap["props"]["color"];
} => {
  const state = useWeb3State();

  if (state.connectStatus === "NOT_CONNECTED") {
    return {
      text: "Connect",
      color: "neutral",
    };
  }

  return {
    text: "Connected!",
    color: "success",
  };
};

/**
 * ConnectButton component
 */
function ConnectButton() {
  const state = useWeb3State();
  const dispatch = useWeb3Dispatch();
  const { text, color } = useConnectButtonProps();

  async function handleConnect() {
    const provider = state.provider;
    if (!provider) return;
    try {
      // 先取得 accounts 地址
      const addressList: string[] = await provider.send(
        "eth_requestAccounts",
        []
      );
      // 然後取得全部 accounts 的 balance
      const balances = await Promise.all(
        addressList.map((addr) => provider!.getBalance(addr))
      );

      // reduce accountInfoList
      const accountInfoList = addressList.reduce((acc, address, index) => {
        const balance = balances[index];
        acc.push({ address, balance });
        return acc;
      }, [] as Web3State["accountList"]);

      // update store
      dispatch(actions.updateAccountList(accountInfoList));
      dispatch(actions.updateConnectionStatus("CONNECTED"));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Button color={color} onClick={handleConnect}>
      {text}
    </Button>
  );
}

export default ConnectButton;
