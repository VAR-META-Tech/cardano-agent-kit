import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, ToolMessage } from "@langchain/core/messages";
import { CardanoToolKit, createLangchainCardanoTools } from "cardano-agent-kit";

// ✅ **1. Initialize CardanoToolKit at the module level**
const toolkit = new CardanoToolKit(
    process.env.CARDANO_PROVIDER || "blockfrost",
    process.env.CARDANO_PROVIDER_API_KEY || "",
    process.env.CARDANO_NETWORK || "testnet",
    process.env.CARDANO_PRIVATE_KEY || ""
);

const tools = createLangchainCardanoTools(toolkit);

// ✅ **2. Initialize OpenAI model with tool bindings**
const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
}).bindTools(tools);

// ✅ **3. Next.js API route to handle AI chat requests**
export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        console.log("📩 Received message:", message);

        // ✅ **Step 1: Invoke AI Model**
        const messages = [new HumanMessage(message)];
        const aiResponse = await model.invoke(messages);
        console.log("🤖 AI Response:", aiResponse);

        messages.push(aiResponse); // Save AI response

        // ✅ **Step 2: If AI directly responds, return it**
        if (aiResponse.content) {
            return NextResponse.json({ reply: aiResponse.content });
        }

        // ✅ **Step 3: Handle Multiple Tool Calls Dynamically**
        if ((aiResponse.tool_calls?.length ?? 0) > 0) {
            for (const toolCall of aiResponse.tool_calls ?? []) {
                console.log("🔧 Processing tool call:", toolCall);

                const toolInstance = tools.find(t => t.name === toolCall.name);
                if (!toolInstance) {
                    console.error("❌ Unknown tool call:", toolCall.name);
                    continue;
                }

                try {
                    const toolResult = await toolInstance.invoke(toolCall.args);
                    console.log(`✅ Tool ${toolCall.name} executed successfully:`, toolResult);

                    // ✅ Properly format the ToolMessage
                    messages.push(
                        new ToolMessage({
                            content: toolResult,
                            name: toolCall.name,
                            tool_call_id: toolCall.id || "default_id",
                        })
                    );
                } catch (error) {
                    console.error(`❌ Error executing tool ${toolCall.name}:`, error);
                    messages.push(
                        new ToolMessage({
                            content: `Error executing tool: ${(error as Error).message}`,
                            name: toolCall.name,
                            tool_call_id: toolCall.id || "default_id",
                        })
                    );
                }
            }

            console.log("🔄 Updated Messages:", messages);

            // ✅ **Step 4: Reinvoke AI with Tool Results**
            const finalAiResponse = await model.invoke(messages);
            return NextResponse.json({ reply: finalAiResponse.content });
        }

        // ✅ **If no valid response, return a default message**
        return NextResponse.json({ reply: "I couldn't process that request." });

    } catch (error) {
        console.error("🚨 Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
