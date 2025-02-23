import { z } from "zod";
import { CardanoToolKit } from "../tools";
import { CardanoAction } from "../types";

export const getAddress: CardanoAction = {
    name: "getAddress",
    description: "Fetch the current Cardano wallet address",
    parameters: z.object({}),
    action: async (_, toolkit: CardanoToolKit) => {
        return { address: await toolkit.getAddress() };
    },
};
