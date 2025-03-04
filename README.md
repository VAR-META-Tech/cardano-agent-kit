<!-- @format -->

# **Cardano Agent Kit 🛠️**

> A **TypeScript SDK** for interacting with the **Cardano blockchain**, include integration with Vercel AI, Langchain, Eliza...

[![npm version](https://img.shields.io/npm/v/cardano-agent-kit.svg)](https://www.npmjs.com/package/cardano-agent-kit)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

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

✅ **Dynamic Toolset Creation for AI Models**

✅ **Exported Actions** (e.g., create wallet, send ADA, burn assets)

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
import { CardanoToolKit } from 'cardano-agent-kit';
```

### **2️⃣ Initialize Wallet**

```ts
const API_KEY = 'your_blockfrost_api_key';
const TEST_MNEMONIC = [
    'churn',
    'analyst',
    'debate',
    'million',
    'tattoo',
    'enlist',
    'crystal',
    'slide',
    'gallery',
    'airport',
    'squeeze',
    'live',
    'dinosaur',
    'rough',
    'first',
    'south',
    'cave',
    'clerk',
    'divorce',
    'attend',
    'topic',
    'idea',
    'finger',
    'verify',
];

const toolkit = new CardanoToolKit('blockfrost', API_KEY, 'testnet', TEST_MNEMONIC);
```

### **3️⃣ Get Wallet Address**

```ts
const address = await toolkit.getAddress();
console.log('Wallet Address:', address);
```

### **4️⃣ Check Wallet Balance**

```ts
const balance = await toolkit.getBalance();
console.log('Wallet Balance:', balance);
```

### **5️⃣ Send ADA (Lovelace)**

```ts
const recipient = 'addr_test1qz...';
const txHash = await toolkit.sendLovelace(recipient, '1000000'); // 1 ADA
console.log('✅ Transaction Sent! TX Hash:', txHash);
```

### **6️⃣ Delegate to a Stake Pool**

```ts
const stakePoolId = 'pool1a7h89sr6ymj9g2a9tm6e6dddghl64tp39pj78f6cah5ewgd4px0';
const stakingTxHash = await toolkit.registerAndStakeADA(stakePoolId);
console.log('✅ Staking TX Hash:', stakingTxHash);
```

---

## 🧠 **AI-Powered Dynamic Tools**

Cardano Agent Kit supports **AI-powered blockchain tools** using **Vercel AI SDK** and **Langchain**.

### **⚡ Create AI-powered Vercel Tools**

```ts
import { CardanoToolKit, createVercelCardanoTools } from 'cardano-agent-kit';

const toolkit = new CardanoToolKit('blockfrost', API_KEY, 'testnet', TEST_MNEMONIC);
const aiTools = createVercelCardanoTools(toolkit);
```

### **🤖 Create AI-powered Langchain Tools**

```ts
import { CardanoToolKit, createLangchainCardanoTools } from 'cardano-agent-kit';

const toolkit = new CardanoToolKit('blockfrost', API_KEY, 'testnet', TEST_MNEMONIC);
const aiTools = createLangchainCardanoTools(toolkit);
```

### **🔀 Create Dynamic Toolsets**

Cardano Agent Kit allows dynamic creation of AI tools for blockchain interactions.

#### **Create AI-powered tools dynamically for Vercel AI**

```ts
import { CardanoToolKit, createVercelAITools } from 'cardano-agent-kit';
import { getAddress, sendLovelace, getBalance, createWallet, mintAsset, burnAsset, sendAsset } from 'cardano-agent-kit';

const toolkit = new CardanoToolKit('blockfrost', API_KEY, 'testnet', TEST_MNEMONIC);
const aiTools = createVercelAITools(toolkit, [
    sendAsset,
    mintAsset,
    burnAsset,
    getAddress,
    sendLovelace,
    getBalance,
    createWallet,
]);
```

#### **Create AI-powered tools dynamically for Langchain**

```ts
import { CardanoToolKit, createLangchainTools } from 'cardano-agent-kit';
import { getAddress, sendLovelace, getBalance, createWallet, mintAsset, burnAsset, sendAsset } from 'cardano-agent-kit';

const toolkit = new CardanoToolKit('blockfrost', API_KEY, 'testnet', TEST_MNEMONIC);
const aiTools = createLangchainTools(toolkit, [
    sendAsset,
    mintAsset,
    burnAsset,
    getAddress,
    sendLovelace,
    getBalance,
    createWallet,
]);
```

---

## 🔬 **API Reference**

### **Wallet Functions**

| Function                        | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| `createWallet()`                | Creates a new wallet and returns its mnemonic.   |
| `getMnemonic()`                 | Returns the wallet mnemonic (if available).      |
| `getPrivateKey()`               | Returns the Bech32 private key (if available).   |
| `getAddress()`                  | Fetches the primary wallet address.              |
| `getBalance()`                  | Fetches all assets in the wallet (ADA + tokens). |
| `sendLovelace(address, amount)` | Sends ADA to a recipient.                        |
| `signAndSendTx(txHex)`          | Signs and submits a transaction.                 |

### **Staking Functions**

| Function                      | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| `registerAndStakeADA(poolId)` | Registers a stake address and delegates to a stake pool. |

### **Asset Functions**

| Function                                                | Description                               |
| ------------------------------------------------------- | ----------------------------------------- |
| `mintAsset(name, quantity, recipient, metadata, label)` | Mints a new Cardano token/NFT.            |
| `burnAsset(assetUnit, quantity)`                        | Burns a specific amount of an asset.      |
| `sendAsset(recipient, assetUnit, quantity)`             | Transfers a Cardano asset (NFT or token). |

### **Transaction Functions**

| Function                  | Description                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `getTransactionHistory()` | Retrieves the transaction history with details on senders, recipients, and amounts. |

### **AI-Powered Tools**

| Function                                   | Description                                                      |
| ------------------------------------------ | ---------------------------------------------------------------- |
| `createVercelCardanoTools(toolkit)`        | Creates AI-powered Cardano tools using Vercel AI SDK.            |
| `createLangchainCardanoTools(toolkit)`     | Creates AI-powered Cardano tools using Langchain.                |
| `createVercelAITools(toolkit, toolsList)`  | Dynamically generates AI-powered blockchain tools for Vercel AI. |
| `createLangchainTools(toolkit, toolsList)` | Dynamically generates AI-powered blockchain tools for Langchain. |

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

-   Open an issue
-   Submit a pull request

---

## 🌟 **Support**

If you find this project useful, please ⭐ **star the repository** and share it with the Cardano community!

---

### ✅ **What's New?**

1️⃣ **AI-powered Blockchain Interactions** (Vercel AI & Langchain tools)

2️⃣ **Dynamic Toolset Creation for AI Models**

3️⃣ **Enhanced Transaction History Functionality**

4️⃣ **Comprehensive API Documentation & Examples**
