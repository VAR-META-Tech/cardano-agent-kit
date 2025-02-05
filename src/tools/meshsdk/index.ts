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
    private wallet: MeshWallet;
    private provider: BlockfrostProvider | KoiosProvider | MaestroProvider | U5CProvider;
    private mnemonic: string[];
    private networkId: 0 | 1; // 0 = Testnet, 1 = Mainnet

    /**
     * Default constructor with Blockfrost
     * @param apiKey Blockfrost API Key
     * @param network Network type ("testnet" or "mainnet")
     */
    constructor(apiKey: string, network?: NetworkType)

    /**
     * Constructor with custom provider
     * @param providerType The blockchain provider ("blockfrost" | "maestro" | "koios" | "u5c")
     * @param apiKey The API key required for the selected provider.
     * @param network The network ("testnet" or "mainnet").
     * @param existingMnemonic Optional mnemonic to restore an existing wallet.
     */
    constructor(providerType: ProviderType, apiKey: string, network?: NetworkType, existingMnemonic?: string[]);

    constructor(
        providerOrApiKey: ProviderType | string,
        apiKeyOrNetwork?: string | NetworkType,
        networkOrMnemonic?: NetworkType | string[],
        existingMnemonic?: string[]
    ) {
        // If only API key and network are provided, default to Blockfrost
        let providerType: ProviderType = "blockfrost";
        let apiKey: string;
        let network: NetworkType = "testnet";
        let mnemonic: string[] | undefined;

        if (typeof providerOrApiKey === "string" && (apiKeyOrNetwork === "testnet" || apiKeyOrNetwork === "mainnet" || apiKeyOrNetwork === undefined)) {
            apiKey = providerOrApiKey;
            network = apiKeyOrNetwork || "testnet";
        } else if (typeof providerOrApiKey === "string" && typeof apiKeyOrNetwork === "string") {
            providerType = providerOrApiKey as ProviderType;
            apiKey = apiKeyOrNetwork;
            network = (networkOrMnemonic as NetworkType) || "testnet";
            mnemonic = existingMnemonic;
        } else {
            throw new Error("Invalid constructor parameters");
        }

        if (!apiKey) throw new Error("API key is required");

        this.networkId = network === "mainnet" ? 1 : 0; // Assign network ID

        // ✅ Select the correct provider dynamically
        switch (providerType) {
            case "blockfrost":
                this.provider = new BlockfrostProvider(apiKey);
                break;
            case "maestro":
                this.provider = new MaestroProvider({ apiKey, network: network === "mainnet" ? "Mainnet" : "Preprod" });
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

        // ✅ Generate a new mnemonic if not provided
        this.mnemonic = mnemonic || (MeshWallet.brew() as string[]);

        // ✅ Create the wallet instance
        this.wallet = new MeshWallet({
            networkId: this.networkId,
            fetcher: this.provider,
            submitter: this.provider,
            key: {
                type: "mnemonic",
                words: this.mnemonic,
            },
        });
    }

    /**
     * Returns the wallet's mnemonic.
     */
    getMnemonic(): string[] {
        return this.mnemonic;
    }

    /**
     * Returns the wallet's address.
     */
    async getAddress(): Promise<string> {
        const addresses = await this.wallet.getUsedAddresses();
        if (!addresses.length) throw new Error("No addresses found for this wallet");
        return addresses[0];
    }

    /**
     * Fetches the wallet's balance.
     */
    async getBalance(): Promise<string> {
        if (!this.wallet) throw new Error("Wallet not initialized");

        try {
            const address = await this.getAddress();
            const balance = await this.provider.fetchAccountInfo(address);
            return balance.balance; // Returns balance in lovelace (1 ADA = 1,000,000 lovelace)
        } catch (error) {
            throw new Error("Error fetching balance: " + error);
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
