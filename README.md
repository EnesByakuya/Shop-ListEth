I was curious how Blockchain worked. So here we go... 😅

# Shop-ListEth
A decentralized shopping list dApp built on Ethereum that lets users add items and mark them as purchased directly on the blockchain using a Solidity smart contract.

---

## Dependencies
Install these prerequisites to try out this app.
- NPM: https://nodejs.org
- Truffle framework by running `npm install -g truffle` in the terminal.
  - For more info about Truffle: https://github.com/trufflesuite/truffle
- Ganache Truffle Suite to deploy smart contracts on your local blockchain [here](https://archive.trufflesuite.com/ganache/).
  - Run Ganache when you want to verify that the smart contract is indeed there on the blockchain.
- Metamask: https://metamask.io/
  - Make sure to add a MetaMask extension to your browser as it makes the process flow smoothly regarding confirming transactions.

## Step 1: Clone the project
`git clone https://github.com/SineNomine998/Shop-ListEth.git`

## Step 2: Install dependencies
```
$ cd Shop-ListEth
$ npm install
```

## Step 3: Start Ganache
Open your Ganache app that you installed. You can select the option "Quickstart" to start your local blockchain instance. You will see a screen like below:
![image](https://github.com/user-attachments/assets/c457fc06-5050-40d3-9325-f5e875b17b85)

## Step 4: Compile & Deploy your smart contract
Run `truffle compile` to compile the code. Then, run `truffle migrate --reset` to deploy your smart contract on your local blockchain.

## Step 5: Configure MetaMask
Configure a customized network, connect MetaMask to your local Ethereum blockchain and import the account at the top that is provided by Ganache.

## Step 6: Run the Frontend
Run `npm run dev` inside the `Shop-ListEth` folder to run the frontend. This will take you to the user interface automatically. If it doesn't, you can check visit this URL in your browser: http://localhost:3002/

## Tests
- There are some integration tests written with Truffle's testing framework using Mocha as the test runner and Chai for assertions. 
- To run the tests, run the following command on your terminal inside the Shop-ListEth folder `truffle test`.

If you get stuck, feel free to send an email to `sinenomine998@gmail.com`. Good luck and have fun! 🙂
