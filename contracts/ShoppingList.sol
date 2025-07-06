pragma solidity ^0.5.0;

contract ShoppingList {
    uint public itemCount = 0;
    
    struct Item {
        uint id;
        string content;
        bool purchased;
    }

    mapping (uint => Item) public items;

    constructor() public {
        createItem("Bread");
    }

    function createItem(string memory _content) public {
        itemCount++;
        items[itemCount] = Item(itemCount, _content, false);
    }
}