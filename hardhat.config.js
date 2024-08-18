require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const sepoliaPriv = process.env.SEPOLIA_PRIV;
const sepoliaUrl = String(process.env.SEPOLIA_URL);

console.log(sepoliaUrl);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com/",
      accounts: [sepoliaPriv],
    },
    mainnet: {
      url: "https://ethereum-rpc.publicnode.com",
      accounts: [sepoliaPriv],
    }
  }
};
