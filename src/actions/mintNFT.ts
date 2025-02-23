import { z } from "zod";
import { CardanoToolKit } from "../tools";
import { CardanoAction } from "../types";

export const mintNFT: CardanoAction = {
    name: "mintNFT",
    description: "Mint a new NFT on the Cardano blockchain",
    parameters: z.object({
        assetName: z.string().describe("Name of the NFT asset"),
        assetQuantity: z.string().default("1").describe("Quantity of the NFT (default: 1)"),
        recipient: z.string().describe("Recipient's Cardano address"),
        metadata: z.object({
            name: z.string().describe("Human-readable name of the NFT"),
            image: z.string().describe("Image URL (IPFS preferred)"),
            mediaType: z.string().describe("MIME type of the image"),
            description: z.union([z.string(), z.array(z.string())]).describe("Description of the NFT"),
        }),
    }),
    action: async (
        { assetName, assetQuantity, recipient, metadata }:
            { assetName: string; assetQuantity: string; recipient: string; metadata: any },
        toolkit: CardanoToolKit
    ) => {
        return { txHash: await toolkit.mintNFT(assetName, assetQuantity, recipient, metadata) };
    },
};