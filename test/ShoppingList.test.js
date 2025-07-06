const { assert } = require("chai");

const ShoppingList = artifacts.require("ShoppingList");

contract("ShoppingList", (accounts) => {
    before(async () => {
        this.shoppingList = await ShoppingList.deployed();
    })

    it("deploys successfully", async () => {
        const address = await this.shoppingList.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    })

    it("lists items", async () => {
        const itemCount = await this.shoppingList.itemCount();
        const item = await this.shoppingList.items(itemCount);
        assert.equal(item.id.toNumber(), itemCount.toNumber());
        assert.equal(item.purchased, false);
        assert.equal(itemCount.toNumber(), 4);
    })
})
