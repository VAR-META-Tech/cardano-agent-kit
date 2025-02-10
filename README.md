Here is a comprehensive **README.md** for your `cardano-agent-kit` project. 🎯  

---

# **Cardano Agent Kit 🛠️**
> A **TypeScript SDK** for interacting with the **Cardano blockchain** using Mesh SDK and other tools, etc.

[![npm version](https://img.shields.io/npm/v/cardano-agent-kit.svg)](https://www.npmjs.com/package/cardano-agent-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/thanhngoc541/cardano-agent-kit/actions/workflows/node.js.yml/badge.svg)](https://github.com/thanhngoc541/cardano-agent-kit/actions)

---
## 📂 **Project Structure**
```
cardano-agent-kit/
│── src/
│   ├── tools/
│   │   ├── meshsdk.ts        # Mesh SDK Wrapper (Handles wallet operations)
│   │   ├── blockfrost.ts     # Blockfrost API Handler
│   │   ├── othertools.ts     # Other tools ...
│   ├── index.ts              # Entry point (Exports modules)
│   ├── toolkit.ts            # High-level API for Cardano interactions
│── examples/                 # Examples to use Cardano Tool Kit...
│── test/
│   ├── toolkit.test.ts       # Unit tests for CardanoToolKit
│   ├── meshsdk.test.ts       # Unit tests for MeshSDK
│── dist/                     # Compiled output (after build)
│── package.json              # Project metadata & dependencies
│── tsconfig.json             # TypeScript configuration
│── README.md                 # Documentation
│── LICENSE                   # MIT License
```


## 🚀 **Features**
✅ Create & Restore **Cardano Wallets**  
✅ Get Wallet **Balance** (ADA + Native Assets)  
✅ **Send ADA (Lovelace)** Transactions  
✅ **Sign & Submit** Transactions  
✅ **Stake & Delegate ADA** to Stake Pools  
✅ Support for **Blockfrost, Koios, Maestro, U5C** providers  

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

---

## 🔬 **API Reference**
### **Wallet Functions**
| Function | Description |
|----------|-------------|
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
