import { z } from "zod";
import { CardanoToolKit } from "../tools";
import { CardanoAction } from "../types";


export const getBalance: CardanoAction = {
    name: "getBalance",
    description: "Fetch the wallet balance",
    parameters: z.object({}),
    action: async (_, toolkit: CardanoToolKit) => {
        return { balance: await toolkit.getBalance() };
    },
};
