import type { Plugin } from "@elizaos/core";
import { initCardanoAction } from "./actions/initCardano.ts";
import { sendLovelaceAction } from "./actions/sendLovelace.ts";

export * as actions from "./actions/index.ts";

export const cardanoAgentKitPlugin: Plugin = {
    name: "cardanoAgentKit",
    description: "Agent cardanoAgentKit with basic actions and evaluators",
    actions: [
        initCardanoAction,
        sendLovelaceAction
    ],
};
export default cardanoAgentKitPlugin;
