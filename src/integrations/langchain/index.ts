import { createLangchainTools } from "./toolsFactory";
import * as actions from "./actions";
import { CardanoToolKit } from "../../tools";

export * from "./actions";
/**
 * Create AI-powered blockchain tools for a custom toolkit instance.
 */
export const createLangChainCardanoTools = (toolkit: CardanoToolKit) =>
    createLangchainTools(toolkit, Object.values(actions));
