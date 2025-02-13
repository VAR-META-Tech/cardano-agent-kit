import { tool } from "ai";
import { z } from "zod";
import { CardanoToolKit } from "../../tools";

type ToolDefinition = {
    name: string;
    description: string;
    parameters: Record<string, any>;
    action: (params: any, toolkit: CardanoToolKit) => Promise<any>;
};

/**
 * Generates multiple AI tools dynamically for a given `CardanoToolKit` instance.
 * @param {CardanoToolKit} toolkit - User's custom toolkit instance
 * @param {ToolDefinition[]} toolsList - List of tools to create
 * @returns {Record<string, any>} - Object containing AI tools
 */
export const createVercelAITools = (toolkit: CardanoToolKit, toolsList: ToolDefinition[]) => {
    return toolsList.reduce((acc, { name, description, parameters, action }) => {
        acc[name] = tool({
            description,
            parameters: z.object(parameters),
            execute: async (params) => {
                try {
                    console.log(`🚀 Executing ${name} with params:`, params);
                    const result = await action(params, toolkit);
                    console.log(`✅ ${name} completed. Result:`, result);
                    return result;
                } catch (error) {
                    console.error(`❌ Error executing ${name}:`, error);
                    throw new Error(`Failed to execute ${name}: ${(error as Error).message}`);
                }
            },
        });
        return acc;
    }, {} as Record<string, any>);
};
