import { z } from "zod";
import { CardanoToolKit } from "../../../tools";
import { ToolDefinition } from "../toolsFactory";

export const sendLovelace: ToolDefinition = {
    name: "sendLovelace",
    description: "Send Lovelace (ADA smallest unit) to a given Cardano address",
    parameters: z.object({
        address: z.string().describe("The recipient's Cardano address"),
        amount: z.string().describe("Amount of Lovelace to send (1 ADA = 1,000,000 Lovelace)"),
    }),
    action: async ({ address, amount }: { address: string; amount: string },
        toolkit: CardanoToolKit) => {
        return { txHash: await toolkit.sendLovelace(address, amount) };
    },
};
