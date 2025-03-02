import type { Plugin } from "@elizaos/core";
import { initCardanoAction } from "./actions/initCardano";
import { sendLovelaceAction } from "./actions/sendLovelace";

export * as actions from "./actions/index";

export const cardanoAgentKitPlugin: Plugin = {
    name: "cardanoAgentKit",
    description: "Agent cardanoAgentKit with basic actions and evaluators",
    actions: [
        initCardanoAction,
        sendLovelaceAction
    ],
};
export default cardanoAgentKitPlugin;
