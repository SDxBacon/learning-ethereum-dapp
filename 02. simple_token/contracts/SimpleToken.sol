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

  // 取得特定位址的 SimpleToken 數量
  function balanceOf(address _owner) public view returns (uint) {
    return balances[_owner];
  }
}
