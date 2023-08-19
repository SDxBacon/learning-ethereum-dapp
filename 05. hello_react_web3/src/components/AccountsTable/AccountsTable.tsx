import Table from "@mui/joy/Table";
import { styled } from "styled-components";
import useWeb3Provider from "../../hooks/useWeb3Provider";
import { ethers } from "ethers";

const Wrapper = styled.div`
  margin: 50px;

  * {
    text-align: left;
  }
`;

/**
 * AccountsTable component
 */
function AccountsTable() {
  const { state } = useWeb3Provider()!;

  return (
    <Wrapper>
      <Table aria-label="basic table" color="neutral" size="lg" variant="soft">
        <thead>
          <tr>
            <th>Index</th>
            <th>Address</th>
            <th>ETH</th>
          </tr>
        </thead>
        <tbody>
          {state.accountList.map((accountInfo, index) => {
            return (
              <tr key={accountInfo.address}>
                <td>{index}</td>
                <td>{accountInfo.address}</td>
                <td>{ethers.formatEther(accountInfo.balance)} ETH</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default AccountsTable;
