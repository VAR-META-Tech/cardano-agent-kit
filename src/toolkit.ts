import { MeshSDK } from "./tools/meshsdk";

export type ProviderType = "blockfrost" | "maestro" | "koios" | "u5c";
export type NetworkType = "testnet" | "mainnet";

export class CardanoToolKit {
    private meshSDK: MeshSDK;

    constructor(
        providerType: ProviderType,
        apiKey: string,
        network: NetworkType = "testnet",
        mnemonicOrBech32?: string[] | string
    ) {
        // ✅ Initialize MeshSDK inside CardanoToolKit
        this.meshSDK = new MeshSDK(providerType, apiKey, network, mnemonicOrBech32);
    }

    /**
     * Returns the wallet's mnemonic (if available).
     */
    getMnemonic(): string[] | undefined {
        return this.meshSDK.getMnemonic();
    }

    /**
     * Returns the wallet's private key (if available, in Bech32 format).
     */
    getPrivateKey(): string | undefined {
        return this.meshSDK.getPrivateKey();
    }

    /**
     * Returns the wallet's address.
     */
    async getAddress(): Promise<string> {
        return await this.meshSDK.getAddress();
    }

    /**
     * Fetches all assets in the connected wallet.
     * Returns an array of objects, each containing:
     * - `unit`: Asset identifier (e.g., "lovelace" for ADA)
     * - `quantity`: Amount held in the wallet
     */
    async getBalance(): Promise<{ unit: string; quantity: string }[]> {
        return await this.meshSDK.getBalance();
    }

    /**
     * Signs and submits a transaction.
     * @param txHex The raw transaction hex string.
     */
    async signAndSendTx(txHex: string): Promise<string> {
        return await this.meshSDK.signAndSendTx(txHex);
    }
}
