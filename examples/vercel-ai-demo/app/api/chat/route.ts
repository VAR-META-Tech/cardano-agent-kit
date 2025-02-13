import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { CardanoToolKit, createVercelCardanoTools } from 'cardano-agent-kit';

const toolkit = new CardanoToolKit(
    process.env.CARDANO_PROVIDER ?? '',
    process.env.CARDANO_PROVIDER_API_KEY ?? '',
    process.env.CARDANO_NETWORK,
    process.env.CARDANO_PRIVATE_KEY
);
const aiTools = createVercelCardanoTools(toolkit);
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        system: `You are a helpful assistant`,
        messages,
        tools: aiTools,
        maxSteps: 5
    });

    return result.toDataStreamResponse();
}
