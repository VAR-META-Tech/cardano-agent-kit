import { z } from "zod";
import { CardanoToolKit } from "../../../tools";
import { ToolDefinition } from "../toolsFactory";

export const getBalance: ToolDefinition = {
    name: "getBalance",
    description: "Fetch the wallet balance",
    parameters: z.object({}),
    action: async (_, toolkit: CardanoToolKit) => {
        return { balance: await toolkit.getBalance() };
    },
};
