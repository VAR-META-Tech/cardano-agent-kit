import { createVercelAITools } from "./toolsFactory";
import * as actions from "./actions";
import { CardanoToolKit } from "../../tools";

export * from "./actions";
export { createVercelAITools } from "./toolsFactory";
/**
 * Create AI-powered blockchain tools for a custom toolkit instance.
 */
export const createVercelCardanoTools = (toolkit: CardanoToolKit) =>
    createVercelAITools(toolkit, Object.values(actions));
