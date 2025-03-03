import { elizaLogger } from "@elizaos/core";
import { IAgentRuntime, State, ModelClass, composeContext, generateObjectDeprecated } from "@elizaos/core";
import { CardanoToolKit } from "cardano-agent-kit";

const sendLovelaceTemplate = `Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

Example response:
\`\`\`json
{
    "recipient": "addr_test1xyz...",
    "amount": 1000000
}
\`\`\`

{{recentMessages}}

Extract the following information about the requested Lovelace transfer:
- Recipient wallet address
- Amount of Lovelace to transfer
`;

/**
 * Extracts Lovelace transaction details from AI-generated context.
 */
export async function extractLovelaceTransaction(
    runtime: IAgentRuntime,
    state: State
): Promise<{ recipient: string; amount: number } | null> {
    elizaLogger.log("🧠 Extracting transaction details from message...");

    const context = composeContext({ state, template: sendLovelaceTemplate });

    try {
        const content = await generateObjectDeprecated({
            runtime,
            context,
            modelClass: ModelClass.LARGE,
        });

        elizaLogger.log("🔍 AI-extracted content:", content);

        if (!content || typeof content !== "object") {
            elizaLogger.warn("⚠️ AI returned an invalid format:", content);
            return null;
        }

        if (!content.recipient || typeof content.recipient !== "string") {
            elizaLogger.warn("⚠️ Missing or invalid recipient:", content.recipient);
            return null;
        }

        if (!content.amount || typeof content.amount !== "number" || content.amount <= 0) {
            elizaLogger.warn("⚠️ Missing or invalid amount:", content.amount);
            return null;
        }

        return content;
    } catch (error) {
        elizaLogger.error("❌ AI extraction failed:", error);
        return null;
    }
}

/**
 * Initializes the Cardano ToolKit with runtime settings.
 */
export function initializeCardanoToolKit(runtime: IAgentRuntime): CardanoToolKit {
    const provider = runtime.getSetting("CARDANO_PROVIDER");
    const apiKey = runtime.getSetting("CARDANO_PROVIDER_API_KEY");
    const network = runtime.getSetting("CARDANO_NETWORK");
    const privateKey = runtime.getSetting("CARDANO_PRIVATE_KEY");

    if (!provider || !apiKey || !network || !privateKey) {
        throw new Error("⚠️ Missing required Cardano provider settings.");
    }

    elizaLogger.log(`🔗 Initializing Cardano Toolkit: ${provider} (${network})`);
    return new CardanoToolKit(provider, apiKey, network, privateKey);
}
