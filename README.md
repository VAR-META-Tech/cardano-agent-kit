# **Cardano Agent Kit 🛠️**
> A **TypeScript SDK** for interacting with the **Cardano blockchain** using Mesh SDK, AI-powered tools, and other utilities.

[![npm version](https://img.shields.io/npm/v/cardano-agent-kit.svg)](https://www.npmjs.com/package/cardano-agent-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/thanhngoc541/cardano-agent-kit/actions/workflows/node.js.yml/badge.svg)](https://github.com/thanhngoc541/cardano-agent-kit/actions)

---

## 🚀 **Features**
✅ **Create & Restore Cardano Wallets**  
✅ **Get Wallet Balance** (ADA + Native Assets)  
✅ **Send ADA (Lovelace) Transactions**  
✅ **Sign & Submit Transactions**  
✅ **Stake & Delegate ADA to Stake Pools**  
✅ **Mint & Burn Tokens / NFTs**  
✅ **Fetch Transaction History**  
✅ **AI-powered Blockchain Tools** (Vercel AI & Langchain integration)  
✅ **Support for Blockfrost, Koios, Maestro, and U5C Providers**  

---

## 📦 **Installation**
Install via **npm**:
```sh
npm install cardano-agent-kit
```
or via **yarn**:
```sh
yarn add cardano-agent-kit
```

---

## 🛠 **Usage Example**
### **1️⃣ Import the SDK**
```ts
import { CardanoToolKit, helloCardano } from "cardano-agent-kit";

console.log(helloCardano("Developer")); 
// Output: "Hello, Developer! Welcome to Cardano Agent Kit."
```

### **2️⃣ Initialize Wallet**
```ts
const API_KEY = "your_blockfrost_api_key";
const TEST_MNEMONIC = [
    "churn", "analyst", "debate", "million", "tattoo", "enlist",
    "crystal", "slide", "gallery", "airport", "squeeze", "live",
    "dinosaur", "rough", "first", "south", "cave", "clerk",
    "divorce", "attend", "topic", "idea", "finger", "verify"
];

const toolkit = new CardanoToolKit("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);
```

### **3️⃣ Get Wallet Address**
```ts
const address = await toolkit.getAddress();
console.log("Wallet Address:", address);
```

### **4️⃣ Check Wallet Balance**
```ts
const balance = await toolkit.getBalance();
console.log("Wallet Balance:", balance);
```

### **5️⃣ Send ADA (Lovelace)**
```ts
const recipient = "addr_test1qz...";
const txHash = await toolkit.sendLovelace(recipient, "1000000"); // 1 ADA
console.log("✅ Transaction Sent! TX Hash:", txHash);
```

### **6️⃣ Delegate to a Stake Pool**
```ts
const stakePoolId = "pool1a7h89sr6ymj9g2a9tm6e6dddghl64tp39pj78f6cah5ewgd4px0";
const stakingTxHash = await toolkit.registerAndStakeADA(stakePoolId);
console.log("✅ Staking TX Hash:", stakingTxHash);
```

### **7️⃣ Mint an NFT / Token**
```ts
const metadata = {
    name: "MeshNFT",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT was minted using CardanoToolKit",
};

const txHash = await toolkit.mintAsset("MeshNFT", "1", recipient, metadata, "721");
console.log("✅ NFT Minted! TX Hash:", txHash);
```

### **8️⃣ Burn an NFT / Token**
```ts
const assetUnit = "d9312da562da182b02322fd8acb536f37eb9d29fba7c49dc172555274d657368546f6b656e";
const burnTxHash = await toolkit.burnAsset(assetUnit, "1");
console.log("✅ Asset Burned! TX Hash:", burnTxHash);
```

### **9️⃣ Send an NFT / Token**
```ts
const sendTxHash = await toolkit.sendAsset(recipient, assetUnit, "1");
console.log("✅ Asset Sent! TX Hash:", sendTxHash);
```

### **🔟 Fetch Transaction History**
```ts
const history = await toolkit.getTransactionHistory();
console.log("Transaction History:", history);
```

---

## 🧠 **AI-Powered Blockchain Tools**
Cardano Agent Kit supports AI-powered **Cardano Blockchain Tools** via **Vercel AI SDK** and **Langchain**.

### **1️⃣ Create Vercel AI Tools**
```ts
import { createVercelCardanoTools } from "cardano-agent-kit";
import { CardanoToolKit } from "./cardanoToolKit";

const toolkit = new CardanoToolKit("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);
const aiTools = createVercelCardanoTools(toolkit);
```

### **2️⃣ Create Langchain AI Tools**
```ts
import { createLangchainCardanoTools } from "cardano-agent-kit";
import { CardanoToolKit } from "./cardanoToolKit";

const toolkit = new CardanoToolKit("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);
const aiTools = createLangchainCardanoTools(toolkit);
```

---

## 🔬 **API Reference**
### **Wallet Functions**
| Function | Description |
|----------|-------------|
| `createWallet()` | Creates a new wallet and returns its mnemonic. |
| `getMnemonic()` | Returns the wallet mnemonic (if available). |
| `getPrivateKey()` | Returns the Bech32 private key (if available). |
| `getAddress()` | Fetches the primary wallet address. |
| `getBalance()` | Fetches all assets in the wallet (ADA + tokens). |
| `sendLovelace(address, amount)` | Sends ADA to a recipient. |
| `signAndSendTx(txHex)` | Signs and submits a transaction. |

### **Staking Functions**
| Function | Description |
|----------|-------------|
| `registerAndStakeADA(poolId)` | Registers a stake address and delegates to a stake pool. |

### **Asset Functions**
| Function | Description |
|----------|-------------|
| `mintAsset(name, quantity, recipient, metadata, label)` | Mints a new Cardano token/NFT. |
| `burnAsset(assetUnit, quantity)` | Burns a specific amount of an asset. |
| `sendAsset(recipient, assetUnit, quantity)` | Transfers a Cardano asset (NFT or token). |

### **Transaction Functions**
| Function | Description |
|----------|-------------|
| `getTransactionHistory()` | Retrieves the transaction history with details on senders, recipients, and amounts. |

### **AI-Powered Tools**
| Function | Description |
|----------|-------------|
| `createVercelCardanoTools(toolkit)` | Creates AI-powered blockchain tools using Vercel AI SDK. |
| `createLangchainCardanoTools(toolkit)` | Creates AI-powered blockchain tools using Langchain. |

---

## 🛠 **Development**
### **Run Tests**
```sh
npm test
```

---

## 📜 **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🤝 **Contributing**
💡 Contributions are welcome!  
- Open an issue  
- Submit a pull request  

---

## 🌟 **Support**
If you find this project useful, please ⭐ **star the repository** and share it with the Cardano community!
