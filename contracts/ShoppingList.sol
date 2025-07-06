pragma solidity ^0.5.0;

contract ShoppingList {
    uint public itemCount = 0;
    
    struct Item {
        uint id;
        string content;
        bool purchased;
    }
    
    mapping (uint => Item) public items;

    event ItemCreated (
        uint id,
        string content,
        bool purchased
    );

    event PurchasedItem (
        uint id,
        string content,
        bool purchased
    );

    constructor() public {
        createItem("Bread");
        createItem("Milk");
        createItem("Eggs");
        createItem("Cheese");
    }

    function createItem(string memory _content) public {
        itemCount++;
        items[itemCount] = Item(itemCount, _content, false);
        emit ItemCreated(itemCount, _content, false);
    }

    function togglePurchased(uint _id) public {
        Item memory _item = items[_id];
        _item.purchased = !_item.purchased;
        items[_id] = _item;
        emit PurchasedItem(_id, _item.content, _item.purchased);
    }
}