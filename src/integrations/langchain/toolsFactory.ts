import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { CardanoToolKit } from "../../tools";
import { CardanoAction } from "../types";

/**
 * Generates an array of AI tools dynamically for a given `CardanoToolKit` instance.
 * @param {CardanoToolKit} toolkit - User's custom toolkit instance.
 * @param {ToolDefinition[]} toolsList - List of tool definitions.
 * @returns {Array<any>} - Array containing AI tools.
 */
export const createLangchainTools = (toolkit: CardanoToolKit, toolsList: CardanoAction[]) => {
    return toolsList.map(({ name, description, parameters, action }) =>
        tool(
            async (params) => {
                try {
                    console.log(`🚀 Executing "${name}" with params:`, params);

                    // Validate input parameters
                    const parsedParams = parameters.safeParse(params);
                    if (!parsedParams.success) {
                        throw new Error(
                            `Invalid parameters for "${name}": ${JSON.stringify(parsedParams.error.format())}`
                        );
                    }

                    const result = await action(parsedParams.data, toolkit);
                    console.log(`✅ "${name}" completed. Result:`, result);

                    return JSON.stringify(result);
                } catch (error) {
                    console.error(`❌ Error executing "${name}":`, error);
                    throw new Error(`Failed to execute "${name}": ${(error as Error).message}`);
                }
            },
            {
                name,
                description,
                schema: parameters,
            }
        )
    );
};
