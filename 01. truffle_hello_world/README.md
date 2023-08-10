# 01. truffle-hello-world

## Introduction

Hello World!  
這是一隻 truffle 的 Hello World 程式。
首先基本環境設立，以及用 Solidity 編寫第一隻 HelloWorld 合約，接站編譯並遷移、部署與互動。

## Requirements

1. 安裝 truffle

```sh
yarn global add truffle
```

2. (**Optional**) 安裝 ganache-cli
   > 不喜歡使用 cli 版本，ganache 可以到官網下載 GUI 版，沒什麼差異

```sh
yarn global add ganache-cli
```

## Step by step

### Step 1. 初始化專案 Initializing

```sh
/path/to/folder> truffle init
```

### Step 2. 產生 HelloWorld 合約 _Create Contract_

```sh
/path/to/folder> truffle create contract HelloWorld
```

### Step 3. 產生 deploy migration

```sh
/path/to/folder> truffle create migration deploy_hello_world
```

**/path/to/folder/migrations/xxxxxxxxxx_deploy_hello_world.js**

```js
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(artifacts.require("HelloWorld"));
};
```

### Step 4. 撰寫 HelloWorld.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
  /**
   * sayHello
   */
  function sayHello() public pure returns (string memory) {
    return "Hello World!";
  }

  /**
   * repeatWords method
   *  - If input empty string, return "You are not saying anything."
   *  - Otherwise, output what inputed.
   */
  function repeatWords(string memory words) public pure returns (string memory) {
    if (bytes(words).length != 0) {
      return words;
    } else {
      return "You are not saying anything.";
    }
  }
}
```

### Step 5. Compile & Migrate

```sh
/path/to/folder> truffle compile
/path/to/folder> truffle develop

truffle(develop)> migrate
```

### Step 6. 與合約互動

```sh
truffle(develop)> let contract
truffle(develop)> HelloWorld.deployed().then(instance => contract = instance)

truffle(develop)> contract.sayHello() // Hello World!

truffle(develop)> contract.repeatWords('foobar') // output: "foobar"
truffle(develop)> contract.repeatWords('') // output: "You are not saying anything."
```
