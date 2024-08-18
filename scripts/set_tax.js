const hre = require("hardhat");
const readline = require("readline");

// scripts/deploy.js

const contractAddress = "0x58aEA10748a00D1781D6651f9d78A414EA32CA46";

async function main() {
  const token = await hre.ethers.getContractFactory("vectorsmartgas");
  const contract = await token.attach(contractAddress);

  const isBuyTax = await prompUserForIsBuyTax();
  const taxPercentage = await promptUserForTax();

  // Call the setBuyTax endpoint of the contract
  if (isBuyTax) {
    await contract.setBuyTax(taxPercentage);
    console.log("Buy tax set successfully!");
  } else { 
    await contract.setSellTax(taxPercentage);
    console.log("Sell tax set successfully!");
  }

}

async function promptUserForTax() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question("Enter the buy tax percentage: ", (answer) => {
      rl.close();
      const buyTaxPercentage = parseInt(answer);
      if (isNaN(buyTaxPercentage)) {
        reject(new Error("Invalid buy tax percentage. Please enter a valid number (in 0.01%)."));
      } else {
        resolve(buyTaxPercentage);
      }
    });
  });
}

async function prompUserForIsBuyTax() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question("Is this a buy tax? (y/n): ", (answer) => {
      rl.close();
      if (answer === "y") {
        resolve(true);
      } else if (answer === "n") {
        resolve(false);
      } else {
        reject(new Error("Invalid input. Please enter 'y' or 'n'."));
      }
    });
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("setting tax failed:", error);
    process.exit(1);
  });