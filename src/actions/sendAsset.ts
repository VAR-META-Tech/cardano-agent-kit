import { z } from "zod";
import { CardanoToolKit } from "../tools";
import { CardanoAction } from "../types";


export const sendAsset: CardanoAction = {
    name: "sendAsset",
    description: "Transfer a Cardano asset (NFT or token) to another address",
    parameters: z.object({
        recipient: z.string().describe("Recipient's Cardano address"),
        assetUnit: z.string().describe("Unique asset unit (policyId + assetNameHex)"),
        assetQuantity: z.string().describe("Amount of the asset to send"),
    }),
    action: async (
        { recipient, assetUnit, assetQuantity }:
            { recipient: string; assetUnit: string; assetQuantity: string },
        toolkit: CardanoToolKit
    ) => {
        return { txHash: await toolkit.sendAsset(recipient, assetUnit, assetQuantity) };
    },
};
