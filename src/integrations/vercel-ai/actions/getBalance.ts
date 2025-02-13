import { CardanoToolKit } from "../../../tools";

export const getBalance = {
    name: "getBalance",
    description: "Fetch the wallet balance",
    parameters: {},
    action: async (_: any, toolkit: CardanoToolKit) => {
        return { balance: await toolkit.getBalance() };
    },
};
