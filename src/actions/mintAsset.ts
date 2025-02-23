import { z } from "zod";
import { CardanoToolKit } from "../tools";
import { CardanoAction } from "../types";

export const mintAsset: CardanoAction = {
    name: "mintAsset",
    description: "Mint a new asset (NFT or token) on the Cardano blockchain",
    parameters: z.object({
        assetName: z.string().describe("Name of the asset (NFT or token)"),
        assetQuantity: z.string().default("1").describe("Quantity of the asset"),
        recipient: z.string().describe("Recipient's Cardano address"),
        metadata: z.object({
            name: z.string().describe("Human-readable name of the asset"),
            image: z.string().describe("Image URL (IPFS preferred)"),
            mediaType: z.string().describe("MIME type of the image"),
            description: z.union([z.string(), z.array(z.string())]).describe("Description of the asset"),
        }),
        label: z.enum(["721", "20"]).default("721").describe("Asset label: '721' for NFTs, '20' for fungible tokens"),
    }),
    action: async (
        { assetName, assetQuantity, recipient, metadata, label }:
            { assetName: string; assetQuantity: string; recipient: string; metadata: any; label: "721" | "20" },
        toolkit: CardanoToolKit
    ) => {
        return { txHash: await toolkit.mintAsset(assetName, assetQuantity, recipient, metadata, label) };
    },
};
