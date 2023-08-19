import styled from "styled-components";

const Wrapper = styled.div`
  align-self: center;

  h1 {
    color: red;
  }
`;

/**
 * NoEthereum component
 */
function NoEthereum() {
  return (
    <Wrapper>
      <h1>Metamask 錢包未檢測到。請確保已安裝 Metamask 並在瀏覽器中啟用它。</h1>
    </Wrapper>
  );
}

export default NoEthereum;
