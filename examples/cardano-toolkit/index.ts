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



// (async () => {

//     console.log("✅ Initializing CardanoToolKit...");
//     const toolkit = new CardanoToolKit(
//         "blockfrost",
//         "previewueSVWOXkYUQdtHQkj0CftJIibwETLjH0",
//         "testnet",
//         "xprv1mpujpqs8nv47d2atwzltun35t9fg9sm58luxytlmazkm6d5ghdvma2gtxnrtvlt739e68gppkuc9t742sz6ht84fa26v827hsuk8mamrfcdyql8eqtzx3fc379pv7qtsjtsg4ahlpcxdz89rlmd23n2y258da03d"
//     );
//     console.log("✅ CardanoToolKit initialized successfully!");

//     console.log("🔍 Fetching sender address...");
//     const senderAddress = await toolkit.getAddress();
//     console.log("✅ Sender Address:", senderAddress || "⚠️ Address Not Found!");

//     console.log("🔍 Checking wallet balance...");
//     const balance = await toolkit.getBalance();
//     console.log("✅ Wallet Balance:", balance.length ? balance : "⚠️ No funds found!");

//     console.log("Sending 1 ADA to recipient...");
//     const txHash = await toolkit.sendLovelace(TEST_RECIPIENT, "1000000"); // 1 ADA

//     console.log("✅ Transaction Sent! TX Hash:", txHash);
// })();


const processTransaction = async ({ recipient, amount }: { recipient: string, amount: string }) => {
    console.log(`Processing Lovelace transaction: ${amount} to ${recipient}`);

    try {
        console.log("✅ Initializing CardanoToolKit...");
        const toolkit = new CardanoToolKit(
            "blockfrost",
            "previewueSVWOXkYUQdtHQkj0CftJIibwETLjH0",
            "testnet",
            "xprv1mpujpqs8nv47d2atwzltun35t9fg9sm58luxytlmazkm6d5ghdvma2gtxnrtvlt739e68gppkuc9t742sz6ht84fa26v827hsuk8mamrfcdyql8eqtzx3fc379pv7qtsjtsg4ahlpcxdz89rlmd23n2y258da03d"
        );
        console.log("✅ CardanoToolKit initialized successfully!");

        console.log("🔍 Fetching sender address...");
        const senderAddress = await toolkit.getAddress();
        console.log("✅ Sender Address:", senderAddress || "⚠️ Address Not Found!");

        console.log("🔍 Checking wallet balance...");
        const balance = await toolkit.getBalance();
        console.log("✅ Wallet Balance:", balance.length ? balance : "⚠️ No funds found!");


        // Execute the transaction
        const transactionHash = await toolkit.sendLovelace(recipient, amount);

        // ✅ Return structured JSON response
        return JSON.stringify({
            success: true,
            message: "Transaction successful",
            transactionHash,
            sender: senderAddress,
            recipient,
            amount,
            unit: "Lovelace",
        });
    } catch (error: any) {
        console.error("Transaction failed:", error);
        return JSON.stringify({
            success: false,
            message: "Transaction failed",
            error: error?.message || "Unknown error",
        });
    }
};

processTransaction({ recipient: TEST_RECIPIENT, amount: "1000000" });