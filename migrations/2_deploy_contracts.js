const ShoppingList = artifacts.require("ShoppingList");

module.exports = function(deployer) {
  deployer.deploy(ShoppingList);
};
