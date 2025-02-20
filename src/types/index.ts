import { z } from "zod";
import { CardanoToolKit } from "../tools";

export type CardanoAction = {
    name: string;
    description: string;
    parameters: z.ZodType<any>;
    action: (params: any, toolkit: CardanoToolKit) => Promise<any>;
};