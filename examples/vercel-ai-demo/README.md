# **Cardano Agent Kit - AI Chat Assistant Example 🚀**  
> This is an example of how to use **Cardano Agent Kit** to integrate AI-powered chat with **Cardano blockchain** functionalities.

---

## 📌 **Overview**
This example demonstrates how to:
- Use **Cardano Agent Kit** to interact with the **Cardano blockchain**.
- Integrate **OpenAI GPT-4o** for an **AI-powered chatbot**.
- Enable real-time **Cardano transactions** (send ADA, fetch balance, get transaction history).
- Create **dynamic AI tools** using `createVercelCardanoTools()`.

---

## 📦 **Installation**
```sh
npm install cardano-agent-kit @ai-sdk/openai @ai-sdk/react
```

---

## 🛠 **How It Works**
### **1️⃣ Backend - AI & Cardano Integration**
```ts
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

export async function POST(req: Request) {
    const { messages } = await req.json();
    return streamText({
        model: openai('gpt-4o-mini'),
        messages,
        tools: aiTools,
        maxSteps: 5
    }).toDataStreamResponse();
}
```

### **2️⃣ Frontend - AI Chat UI**
```tsx
import { useChat } from '@ai-sdk/react';

export default function Page() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    return (
        <div>
            <h1>AI Chat Assistant</h1>
            <div>
                {messages.map((message) => (
                    <p key={message.id}><strong>{message.role}:</strong> {message.content}</p>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input value={input} onChange={handleInputChange} placeholder="Type a message..." />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
```


## 🚀 **Try It Out**
1. Install dependencies  
2. Set up `.env.local` with Cardano & OpenAI API keys  
3. Run `npm run dev`  
4. Chat with AI & interact with Cardano blockchain!  

---

## 📜 **License**
This example is open-source under the **MIT License**.  

For more details, check out [Cardano Agent Kit](https://github.com/thanhngoc541/cardano-agent-kit). 🚀
