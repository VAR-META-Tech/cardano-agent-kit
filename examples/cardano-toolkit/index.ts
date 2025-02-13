import { helloCardano, CardanoToolKit } from "cardano-agent-kit";

console.log(helloCardano("Ngoc"));

const API_KEY = "previewueSVWOXkYUQdtHQkj0CftJIibwETLjH0";
const TEST_RECIPIENT = "addr_test1qqpnp9n7274je4mugywj890pp9w6hexceedhvryfrgs7gqxl9g3ghpcdgv2j58fe7yvpwt6nqc2ylzjr4k8zldetjlvq80w9t3";
const STACK_POOL_ID = "pool1a7h89sr6ymj9g2a9tm6e6dddghl64tp39pj78f6cah5ewgd4px0";

const TEST_MNEMONIC = [
    "churn", "analyst", "debate", "million", "tattoo", "enlist",
    "crystal", "slide", "gallery", "airport", "squeeze", "live",
    "dinosaur", "rough", "first", "south", "cave", "clerk",
    "divorce", "attend", "topic", "idea", "finger", "verify"
];

(async () => {
    let toolkit = new CardanoToolKit("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);

    console.log("Fetching sender address...");
    const senderAddress = await toolkit.getAddress();
    console.log("Sender Address:", senderAddress);

    console.log("Checking balance...");
    const balance = await toolkit.getBalance();
    console.log("Wallet Balance:", balance);

    console.log("Sending 1 ADA to recipient...");
    const txHash = await toolkit.sendLovelace(TEST_RECIPIENT, "1000000"); // 1 ADA

    console.log("✅ Transaction Sent! TX Hash:", txHash);
})();
