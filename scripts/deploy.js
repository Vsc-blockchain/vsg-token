// scripts/deploy.js

const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
    console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.getAddress())).toString());
    // Fetch the contract to deploy
    const VSG = await hre.ethers.getContractFactory("vectorsmartgas");

    // Set constructor arguments
    const buyTax = 0; // Example value, customize as needed
    const sellTax = 0; // Example value, customize as needed
    const devSplit = 30; // Example value, customize as needed
    const marketingSplit = 70; // Example value, customize as needed
    const lpSplit = 0; // Example value, customize as needed
    const router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // Router address (e.g., Uniswap V2 Router)
    const marketingWallet = "0x13F2ee0608a94b8d49A493E0413197D076D835Df"; // Marketing wallet address
    const teamWallet = "0xC839C6778b1B890bef6F1C4336B95682a5822122"; // Team wallet address
    const initialSupply = 10000000000; // Initial supply (in tokens)
    const realOwner = "0xDC4cff383b03Bd7bd63f045952CeEB843227d75d"; // Owner address

    // Deploy the contract
    console.log("Deploying vectorsmartgas contract...");

    const vsg = await VSG.deploy(
        buyTax,
        sellTax,
        devSplit,
        marketingSplit,
        lpSplit,
        router,
        marketingWallet,
        teamWallet,
        initialSupply,
        realOwner,
    );

    console.log("vectorsmartgas deployed to:", vsg.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
