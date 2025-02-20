import { createLangchainTools } from "./toolsFactory";
import * as actions from "../actions";
import { CardanoToolKit } from "../../tools";

/**
 * Create AI-powered blockchain tools for a custom toolkit instance.
 */
export const createLangchainCardanoTools = (toolkit: CardanoToolKit) =>
    createLangchainTools(toolkit, Object.values(actions));
