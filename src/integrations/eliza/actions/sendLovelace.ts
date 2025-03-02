// import { elizaLogger } from "@elizaos/core";
// import {
//     type ActionExample,
//     type HandlerCallback,
//     type IAgentRuntime,
//     type Memory,
//     type State,
//     type Action,
// } from "@elizaos/core";
// import { extractLovelaceTransaction, initializeCardanoToolKit } from "../utils/index";

// export const sendLovelaceAction: Action = {
//     name: "SEND_LOVELACE",
//     similes: ["TRANSFER_LOVELACE", "PAY_LOVELACE"],
//     validate: async (runtime: IAgentRuntime, message: Memory) => {
//         elizaLogger.log("✅ Validating Lovelace transfer request:", message.userId);
//         return true;
//     },
//     description: "Transfers Lovelace from the agent's wallet to a specified address",
//     handler: async (
//         runtime: IAgentRuntime,
//         message: Memory,
//         state: State | undefined,
//         _options: { [key: string]: unknown } = {},
//         callback?: HandlerCallback
//     ): Promise<boolean> => {
//         state = state ?? (await runtime.composeState(message) as State);
//         elizaLogger.log("🚀 Initiating SEND_LOVELACE handler...");
//         callback?.({ text: "Processing Lovelace transfer..." });

//         try {
//             // Ensure latest state
//             state = state ? await runtime.updateRecentMessageState(state) : (await runtime.composeState(message)) as State;

//             // Extract AI-parsed transaction details
//             const content = await extractLovelaceTransaction(runtime, state);
//             if (!content) {
//                 callback?.({ text: "⚠️ Unable to extract transaction details. Please provide recipient and amount." });
//                 return false;
//             }

//             // Initialize Cardano Provider
//             const toolkit = initializeCardanoToolKit(runtime);
//             const balance = await toolkit.getBalance();

//             callback?.({ text: `💰 Current balance: ${balance} Lovelace`, content: { balance } });

//             // Execute Transaction
//             const txHash = await toolkit.sendLovelace(content.recipient, content.amount.toString());

//             callback?.({
//                 text: `✅ Sent ${content.amount} Lovelace. Tx Hash: ${txHash}`,
//                 content: { success: true, signature: txHash, amount: content.amount, recipient: content.recipient },
//             });

//             return true;
//         } catch (error) {
//             elizaLogger.error("❌ Error in send Lovelace:", error);
//             const errorMessage = (error as Error).message;
//             callback?.({ text: `⚠️ Error processing Lovelace transfer: ${errorMessage}`, content: { error: errorMessage } });
//             return false;
//         }
//     },
//     examples: [
//         [
//             {
//                 user: "{{user1}}",
//                 content: { text: "Send 1000000 lovelace to address addr_test1xyz..." },
//             },
//             {
//                 user: "{{user2}}",
//                 content: { text: "Sending LOVELACE to addr_test1xyz...", action: "SEND_LOVELACE" },
//             },
//         ],
//     ] as ActionExample[][],
// };
