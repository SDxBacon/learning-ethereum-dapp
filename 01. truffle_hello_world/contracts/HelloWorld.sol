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
