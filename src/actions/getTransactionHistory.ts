import { z } from "zod";
import { CardanoToolKit } from "../tools";
import { CardanoAction } from "../types";

export const getTransactionHistory: CardanoAction = {
    name: "getTransactionHistory",
    description: "Retrieve the transaction history of the connected wallet",
    parameters: z.object({}),
    action: async (_params, toolkit: CardanoToolKit) => {
        return await toolkit.getTransactionHistory();
    },
};