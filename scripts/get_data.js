const hre = require("hardhat");
const readline = require("readline");

const contractAddress = "0x58aEA10748a00D1781D6651f9d78A414EA32CA46";

async function main() {
  const token = await hre.ethers.getContractFactory("vectorsmartgas");
  const contract = await token.attach(contractAddress);
  
  const sellTax = await contract.sellTax();
  console.log("sell tax: ", sellTax);
  
  const buyTax = await contract.buyTax();
  console.log("buy tax: ", buyTax);

  const devSplit = await contract.devSplit();
  console.log("dev split: ", devSplit);

  const marketingSplit = await contract.marketingSplit();
  console.log("marketing split: ", marketingSplit);

  const lpSplit = await contract.lpSplit();
  console.log("lp split: ", lpSplit);

  const swapAtAmount = await contract.swapAtAmount();
  console.log("swap at amount: ", swapAtAmount);

  const marketingWallet = await contract.marketingWallet()
  console.log("marketing wallet: ", marketingWallet);

  const teamWallet = await contract.teamWallet();
  console.log("team wallet: ", teamWallet);

  const swapPair = await contract.swapPair();
  console.log("swap pair: ", swapPair);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Query failed:", error);
    process.exit(1);
  });