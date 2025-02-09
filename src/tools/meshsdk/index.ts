import {
    BlockfrostProvider,
    KoiosProvider,
    MaestroProvider,
    U5CProvider,
    MeshWallet,
} from "@meshsdk/core";

export type ProviderType = "blockfrost" | "maestro" | "koios" | "u5c";
export type NetworkType = "testnet" | "mainnet";

export class MeshSDK {
    private wallet: MeshWallet | null = null;
    private provider: BlockfrostProvider | KoiosProvider | MaestroProvider | U5CProvider;
    private mnemonic?: string[];
    private privateKey?: string;
    private networkId: 0 | 1; // 0 = Testnet, 1 = Mainnet

    constructor(
        providerType: ProviderType,
        apiKey: string,
        network?: NetworkType,
        mnemonicOrBech32?: string[] | string
    ) {
        let networkType: NetworkType = network ?? "testnet";

        if (!apiKey) throw new Error("API key is required");

        this.networkId = networkType === "mainnet" ? 1 : 0; // Assign network ID

        // ✅ Select the correct provider dynamically
        switch (providerType) {
            case "blockfrost":
                this.provider = new BlockfrostProvider(apiKey);
                break;
            case "maestro":
                this.provider = new MaestroProvider({ apiKey, network: networkType === "mainnet" ? "Mainnet" : "Preprod" });
                break;
            case "koios":
                this.provider = new KoiosProvider(apiKey);
                break;
            case "u5c":
                this.provider = new U5CProvider({ url: apiKey });
                break;
            default:
                throw new Error("Invalid provider type");
        }

        // ✅ Determine how to initialize the wallet
        let walletKey: { type: "mnemonic"; words: string[] } | { type: "root"; bech32: string };
        if (Array.isArray(mnemonicOrBech32) && mnemonicOrBech32.length > 0) {
            this.mnemonic = mnemonicOrBech32;
            walletKey = { type: "mnemonic", words: this.mnemonic };
        } else if (typeof mnemonicOrBech32 === "string") {
            this.privateKey = mnemonicOrBech32;
            walletKey = { type: "root", bech32: this.privateKey }; // ✅ Bech32 format
        } else {
            // If no key or an empty mnemonic is provided, generate a new wallet
            this.mnemonic = MeshWallet.brew() as string[];
            walletKey = { type: "mnemonic", words: this.mnemonic };
        }


        // ✅ Initialize the wallet instance
        this.wallet = new MeshWallet({
            networkId: this.networkId,
            fetcher: this.provider,
            submitter: this.provider,
            key: walletKey,
        });

    }

    /**
     * Returns the wallet's mnemonic (if available).
     */
    getMnemonic(): string[] | undefined {
        return this.mnemonic;
    }

    /**
     * Returns the wallet's private key (if available, in Bech32 format).
     */
    getPrivateKey(): string | undefined {
        return this.privateKey;
    }

    /**
     * Returns the wallet's address.
     */
    async getAddress(): Promise<string> {
        if (!this.wallet) throw new Error("Wallet not initialized");
        try {
            const usedAddresses = await this.wallet.getUsedAddresses();
            if (usedAddresses.length > 0) return usedAddresses[0];

            // ✅ Try fetching an unused address
            const unusedAddresses = await this.wallet.getUnusedAddresses();
            if (unusedAddresses.length > 0) return unusedAddresses[0];

            throw new Error("No addresses found. Try receiving funds first.");
        } catch (error) {
            throw new Error("Error fetching wallet address: " + error);
        }
    }


    /**
    * Fetches all assets in the connected wallet.
    * Returns an array of objects, each containing:
    * - `unit`: Asset identifier (e.g., "lovelace" for ADA)
    * - `quantity`: Amount held in the wallet
    */
    async getBalance(): Promise<{ unit: string; quantity: string }[]> {
        if (!this.wallet) throw new Error("Wallet not initialized");

        try {
            const balance = await this.wallet.getBalance();

            if (!Array.isArray(balance)) {
                throw new Error("Unexpected balance format from wallet.");
            }

            return balance; // ✅ Returns full asset list
        } catch (error) {
            throw new Error(`Error fetching balance: ${(error as Error).message}`);
        }
    }




    /**
     * Signs and submits a transaction.
     * @param txHex The raw transaction hex string.
     */
    async signAndSendTx(txHex: string): Promise<string> {
        if (!this.wallet) throw new Error("Wallet not initialized");

        try {
            return await this.wallet.signTx(txHex);
        } catch (error) {
            throw new Error("Error signing transaction: " + error);
        }
    }
}
