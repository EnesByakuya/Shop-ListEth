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
        assert.equal(itemCount.toNumber(), 1);
    })

    it('creates items', async () => {
        const result = await this.shoppingList.createItem('A new item')
        const itemCount = await this.shoppingList.itemCount()
        assert.equal(itemCount, 2)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, 'A new item')
        assert.equal(event.purchased, false)
    })

    it('toggles item purchased status', async () => {
        const result = await this.shoppingList.togglePurchased(1)
        const item = await this.shoppingList.items(1)
        assert.equal(item.purchased, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.purchased, true)
    })
})
