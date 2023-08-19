import { ethers } from "ethers";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useMemo, useReducer, createContext, useLayoutEffect } from "react";
// types
import { Draft } from "immer";
import { Web3State } from "../../types/Web3Provider";

const initialState: Web3State = {
  web3: typeof window.ethereum !== "undefined",
  connectStatus: "NOT_CONNECTED",
  provider: undefined,
  signer: null,
  accountList: [],
};

// using @reduxjs/toolkit createSlice to create reducer and actions
const { reducer, actions } = createSlice({
  name: "web3",
  initialState,
  reducers: {
    // initial provider
    initialProvider: (state: Draft<Web3State>) => {
      if (state.provider === undefined)
        state.provider = new ethers.BrowserProvider(window.ethereum!);
    },
    //
    updateConnectionStatus: (
      state: Draft<Web3State>,
      { payload }: PayloadAction<Web3State["connectStatus"]>
    ) => {
      state.connectStatus = payload;
    },
    // update account list
    updateAccountList: (
      state: Draft<Web3State>,
      { payload }: PayloadAction<Web3State["accountList"]>
    ) => {
      state.accountList = payload;
    },
  },
});

// Web3ProviderContext
export const Web3ProviderContext = createContext<
  { state: Web3State; dispatch: React.Dispatch<any> } | undefined
>(undefined);

/**
 * Web3Provider HOC component
 */
const Web3Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  // Run once when Web3Provider is mounted.
  // In order to hook ethers with metamask and create browserProvider
  useLayoutEffect(() => {
    dispatch(actions.initialProvider);
  }, []);

  return (
    <Web3ProviderContext.Provider value={value}>
      {children}
    </Web3ProviderContext.Provider>
  );
};

// export actions
export { actions };
// export default: Web3Provider
export default Web3Provider;
