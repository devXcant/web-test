import { ethers } from "hardhat";

async function main() {
  console.log("Deploying WorldCupBetting assessment contracts...");

  const ReputationSystem = await ethers.getContractFactory("ReputationSystem");
  const reputationSystem = await ReputationSystem.deploy();
  await reputationSystem.waitForDeployment();
  const repAddress = await reputationSystem.getAddress();
  console.log("ReputationSystem:", repAddress);

  const WorldCupBetting = await ethers.getContractFactory("WorldCupBetting");
  const worldCupBetting = await WorldCupBetting.deploy(repAddress);
  await worldCupBetting.waitForDeployment();
  const marketAddress = await worldCupBetting.getAddress();
  console.log("WorldCupBetting:", marketAddress);

  await reputationSystem.setPredictionMarket(marketAddress);
  console.log("Connected ReputationSystem -> WorldCupBetting");

  console.log("\n=== SUBMISSION: Deployed Contract Address ===");
  console.log(marketAddress);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
