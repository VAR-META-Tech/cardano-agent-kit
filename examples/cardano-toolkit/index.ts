import { helloCardano, CardanoToolKit } from "cardano-agent-kit";

console.log(helloCardano("Ngoc"));

const API_KEY = "previewueSVWOXkYUQdtHQkj0CftJIibwETLjH0";
const TEST_MNEMONIC = [
    "churn", "analyst", "debate", "million", "tattoo", "enlist",
    "crystal", "slide", "gallery", "airport", "squeeze", "live",
    "dinosaur", "rough", "first", "south", "cave", "clerk",
    "divorce", "attend", "topic", "idea", "finger", "verify"
];

async function main() {
    try {
        console.log("✅ Initializing CardanoToolKit...");
        const toolkit = new CardanoToolKit("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);
        console.log("✅ CardanoToolKit initialized successfully!");

        console.log("🔍 Fetching sender address...");
        const senderAddress = await toolkit.getAddress();
        if (!senderAddress) {
            console.error("❌ Address Not Found! Make sure your wallet is properly initialized.");
            return;
        }
        console.log("✅ Sender Address:", senderAddress);

        console.log("🔍 Checking wallet balance...");
        const balance = await toolkit.getBalance();
        if (!balance.length) {
            console.warn("⚠️ No funds found in the wallet.");
        } else {
            const formattedBalance = balance.map(asset => ({
                asset: asset.assetName || "ADA",
                quantity: asset.quantity
            }));
            console.log("✅ Wallet Balance:", formattedBalance);
        }

        console.log("🔍 Fetching Transaction History...");
        const transactions = await toolkit.getTransactionHistory();

        if (!transactions.length) {
            console.warn("⚠️ No transactions found.");
        } else {


            console.log("✅ Transaction History:", transactions);
        }
    } catch (error) {
        console.error("🔥 Error:", error instanceof Error ? error.message : error);
    }
}

main();
