

import { z } from "zod";
import { CardanoToolKit } from "../tools";
import { CardanoAction } from "../types";

export const burnAsset: CardanoAction = {
    name: "burnAsset",
    description: "Burn an existing asset (NFT or token) on the Cardano blockchain",
    parameters: z.object({
        assetUnit: z.string().describe("The asset unit (policy ID + asset name)"),
        quantity: z.string().describe("Quantity to burn"),
    }),
    action: async ({ assetUnit, quantity }: { assetUnit: string; quantity: string }, toolkit: CardanoToolKit) => {
        return { txHash: await toolkit.burnAsset(assetUnit, quantity) };
    },
};