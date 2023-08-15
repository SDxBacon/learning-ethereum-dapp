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
  * Override `decimals()` 回傳 2 代表我們的 HelloCoin 最小是 0.01 個
  */
  function decimals() public view virtual override returns (uint8) {
    return 2;
  }  
}
