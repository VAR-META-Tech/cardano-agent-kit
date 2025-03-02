import type {
    ActionExample,
    IAgentRuntime,
    Memory,
    Action,
    State,
    HandlerCallback,
} from "@elizaos/core";

export const initCardanoAction: Action = {
    name: "INIT_CARDANO",
    similes: [
        "INIT_CARDANO_INSTANCE",
        "START_CARDANO",
    ],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description:
        "Initialize Cardano instance",
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: any },
        _callback: HandlerCallback
    ): Promise<boolean> => {
        const initCardano = 'Initializing Cardano instance with send lovelace...';
        _callback({ text: initCardano });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "Init Cardano" },
            },
            {
                user: "{{user2}}",
                content: { text: "Initializing Cardano", action: "INIT_CARDANO" },
            },
        ],

    ] as ActionExample[][],
} as Action;
