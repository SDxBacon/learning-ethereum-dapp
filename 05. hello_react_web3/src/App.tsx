// types
import "./types/App.d";
// componenets
import ConnectButton from "./components/ConnectButton";
import AccountsTable from "./components/AccountsTable/AccountsTable";
import NoEthereum from "./components/NoEthereum/NoEthereum";
// css
import "./styles/App.css";
import useWeb3Provider from "./hooks/useWeb3Provider";

function App() {
  const { state } = useWeb3Provider();

  /**
   * 沒有 metamask
   */
  if (!state.web3)
    return (
      <div className="App">
        <NoEthereum />
      </div>
    );

  /**
   *
   */
  return (
    <div className="App">
      <div style={{ margin: "auto 0" }}>
        <ConnectButton />
        <AccountsTable />
      </div>
    </div>
  );
}

export default App;
