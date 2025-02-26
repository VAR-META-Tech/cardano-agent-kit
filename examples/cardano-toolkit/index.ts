import { helloCardano, CardanoToolKit } from "cardano-agent-kit";

console.log(helloCardano("Ngoc"));

const API_KEY = "previewueSVWOXkYUQdtHQkj0CftJIibwETLjH0";
const TEST_RECIPIENT = "addr_test1qqpnp9n7274je4mugywj890pp9w6hexceedhvryfrgs7gqxl9g3ghpcdgv2j58fe7yvpwt6nqc2ylzjr4k8zldetjlvq80w9t3";
const STACK_POOL_ID = "pool18pn6p9ef58u4ga3wagp44qhzm8f6zncl57g6qgh0pk3yytwz54h";

const TEST_MNEMONIC = [
    "churn", "analyst", "debate", "million", "tattoo", "enlist",
    "crystal", "slide", "gallery", "airport", "squeeze", "live",
    "dinosaur", "rough", "first", "south", "cave", "clerk",
    "divorce", "attend", "topic", "idea", "finger", "verify"
];

async function main() {
    try {
        console.log("✅ Initializing CardanoToolKit...");
        const toolkit = new CardanoToolKit(
            "blockfrost",
            API_KEY,
            "testnet",
            TEST_MNEMONIC
        );
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
    } catch (error) {
        console.error("🔥 Error:", error instanceof Error ? error.message : error);
    }
}

main();
