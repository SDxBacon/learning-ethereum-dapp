# 02. Simple Token

## What

嘗試用 Solidity 寫一個簡單的 Token 合約，並具有查詢餘額、轉帳的功能。

## How

### Step 1. 初始化專案和產生合約、migration

```sh
/path/to/folder> truffle init
/path/to/folder> truffle create contract SimpleToken
/path/to/folder> truffle create migration deploy_simple_token
```

### Step 2. 撰寫 SimpleToken.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleToken {

  uint INITIAL_SUPPLY = 10000;

  mapping(address => uint) balances;

  constructor() {
    // msg.sender表示用作呼叫當前函式的帳戶。
    // 又因為 constructor 只有在合約部署時會被執行，因此這邊的msg.sender，就代表著用來部署這個合約的帳戶。
    // 所以合約部署上鏈後，部署合約的帳戶，會得到 10000 個 SimpleToken 在帳戶裡面。
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  // 轉帳 _amount 數量的 SimpleToken 到 _to 位址
  function transfer(address _to, uint _amount) public {
    require(balances[msg.sender] > _amount);
    balances[msg.sender] -= _amount;
    balances[_to] += _amount;
  }

  // 取得特定 account 位址擁有的 SimpleToken 數量
  function balanceOf(address _owner) public view returns (uint) {
    return balances[_owner];
  }
}
```

### Step 4. 設定 truffle-config.js 與 migrations/deploy_simple_token

_**truffle-config**_

```js
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.19", // 這個下面 Trouble Shooting 會提到
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200, // Default: 200
        },
      },
    },
  },
};
```

_**migrations/deploy_simple_token**_

```js
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(artifacts.require("SimpleToken"));
};
```

### Step 5. Compile & Migrate

```sh
/path/to/folder> truffle compile
/path/to/folder> truffle develop
truffle(development)> migrate
```

## 與合約互動

完成 migration 後，接著嘗試用 truffle console 提供的 web3 環境與合約互動吧！

首先，一樣建立 SimpleToken contract 的 instance:

```sh
truffle(development)> let contract = await SimpleToken.deployed();
```

接著，先取得全部的 accounts:

```sh
truffle(development)> let accounts = await web3.eth.getAccounts();
```

然後，我們用合約中的 `.balanceOf()` 看看每個帳號中所擁有的 SimpleToken 為多少，

因為合約的建構元只會在部署合約時觸發，所以部署者（這邊預設 accounts[0]) 會得到 100000 個 SimpleToken，

而其他帳戶應該維持 0 個

```sh
truffle(development)> contract.balanceOf(accounts[0]);
# BN {
#   negative: 0,
#   words: [ 10000, <1 empty item> ],
#   length: 1,
#   red: null
# }

# 其餘帳戶的確沒有 SimpleToken
truffle(development)> contract.balanceOf(accounts[1]); # BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> contract.balanceOf(accounts[2]); # BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
# ...
truffle(development)> contract.balanceOf(accounts[9]); # BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
```

沒錯，的確如我們所預期的！
那麼來轉帳看看吧

```sh
# 將 accounts[0] 中的 123 個 SimpleToken 轉給 accounts[1]
truffle(development)> contract.transfer(accounts[1], 123);


# 轉帳完成，查詢看看 accounts[0] 和 accounts[1] 的 SimpleToken 數量
truffle(development)> contract.balanceOf(accounts[0]); # BN { negative: 0, words: [ 9877, <1 empty item> ], length: 1, red: null }
truffle(development)> contract.balanceOf(accounts[1]); # BN { negative: 0, words: [ 123, <1 empty item> ], length: 1, red: null }
```

可以看到:

1. accounts[0] 少了 123 個 SimpleToken
2. accounts[1] 多了 123 個 SimpleToken

到這邊，我們就完成第一個簡單 Token 的合約啦！

## Troble Shooting

在執行 `truffle migrate` 時，很多人遇到 truffle 吐出警告，告訴你 Deploy 失敗。

```sh
Error: *** Deployment Failed ***

"SimpleToken" hit an invalid opcode while deploying. Try:

  - Verifying that your constructor params satisfy all assert conditions.
  - Verifying your constructor code doesn't access an array out of bounds.
  - Adding reason strings to your assert statements.
```

但是我們的合約就這麼簡單，反覆排查 SimpleToken.sol 也看不出個所以然來。

最後在 StackOverflow 上爬了一下，發現很多人的 sol compiler 版本設定在 `0.8.20` 會出現此問題，

解法就是把 solidity compiler 版本降版就好。

_**truffle-config.js**_

```js
module.exports = {
  compilers: {
    solc: {
      version: "0.8.19", // 更改這邊
    },
  },
};
```

這邊先不將重點放在此 issue 上，先將心力專注在學習 contract 上！
