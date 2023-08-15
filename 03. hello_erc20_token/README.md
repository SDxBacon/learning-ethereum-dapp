# 03. Hello ERC20 Token

## What

延伸自練習 02. Simple Token

嘗試用 Solidity 寫一個 ERC20 的代幣！

## How

### Step 1. Pre-configure

首先，一樣先建立基本 truffle 專案所需的 contract, migration

```sh
/path/to/folder> truffle init
/path/to/folder> truffle create contract HelloERC20Token
/path/to/folder> truffle create migration deploy_hello_erc20_token
```

接著，這邊會用到 [OpenZeppelin](https://www.openzeppelin.com/) 的 [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts) library 來建立 ERC20 合約 token

```sh
/path/to/folder> yarn init
/path/to/folder> yarn add @openzeppelin/contracts
```

### Step 2. 撰寫 HelloERC20Token.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * HelloERC2Token 合約是 extends 自 openzeppelin 提供的 ERC20 contract
 */
contract HelloERC20Token is ERC20 {
  string public _name = "HelloCoin"; // 自定義我們的幣叫做 HelloCoin
  string public _symbol = "H@";  // 自定義我們的幣代號為 H@

  uint256 public INITIAL_SUPPLY = 100000;

 /**
  * 建構元，把 _name & _symbol 代給 super constrcutor
  * 接著，產生固定的 Token 數量到合約部署者帳號內，同時擴充 totalSupply 數量
  */
  constructor() ERC20(_name, _symbol) {
    _mint(msg.sender, INITIAL_SUPPLY);
  }

 /**
  * Override `decimals()`，回傳 2 代表我們的 HelloCoin 最小是 0.01 個
  */
  function decimals() public view virtual override returns (uint8) {
    return 2;
  }
}
```

### Step 3. 設定 truffle-config.js 與 migrations scripts

基本上與 02. SimpleToken 練習相同、類似，就不多介紹了

### Step 4. Compile & Migrate

```sh
/path/to/folder> truffle compile
/path/to/folder> truffle develop
truffle(development)> migrate
```

## 與合約互動

完成 migration 後，接著用 truffle console 提供的 web3 環境與合約互動看看

首先，一樣先取得 contract、accounts、coinbase:

```sh
truffle(development)> let contract = await HelloERC20Token.deployed();
truffle(development)> let accounts = await web3.eth.getAccounts();
```

然後，我們的合約因為是繼承自 ERC20.sol，父類別中已經有定義 `.balanceOf()` 和 `.transfer()` 了。

我們來試試看呼叫父類別的這兩個函式看看。

```sh
# accounts[0] 應該有 10000 個 HelloCoin
truffle(development)> contract.balanceOf(accounts[0]);
# BN {
#   negative: 0,
#   words: [ 10000, <1 empty item> ],
#   length: 1,
#   red: null
# }


# 其餘帳戶的確沒有 HelloCoin
truffle(development)> contract.balanceOf(accounts[1]); # BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
```

沒錯，帳戶中的數值如我們預期

一樣，來轉帳看看

```sh
# 將 accounts[0] 中的 100 個 HelloCoin 轉給 accounts[1]
truffle(development)> contract.transfer(accounts[1], 100);


# 轉帳完成，查詢看看 accounts[0] 和 accounts[1] 的 HelloCoin 數量
truffle(development)> contract.balanceOf(accounts[0]); # BN { negative: 0, words: [ 99900, <1 empty item> ], length: 1, red: null }
truffle(development)> contract.balanceOf(accounts[1]); # BN { negative: 0, words: [ 100, <1 empty item> ], length: 1, red: null }
```
