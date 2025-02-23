import { z } from "zod";
import { CardanoToolKit } from "../tools";
import { CardanoAction } from "../types";

export const createWallet: CardanoAction = {
    name: "createWallet",
    description: "Generate a new Cardano wallet mnemonic",
    parameters: z.object({}),
    action: async (_params, _toolkit: CardanoToolKit) => {
        const mnemonic = CardanoToolKit.createWallet();
        return { mnemonic };
    },
};