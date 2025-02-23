import { MeshSDK } from "./meshsdk";
export class CardanoToolKit {
    private meshSDK: MeshSDK;

    constructor(
        providerType: string,
        apiKey: string,
        network: string = "testnet",
        mnemonicOrBech32?: string[] | string
    ) {
        if (!apiKey) throw new Error("API key is required");
        this.meshSDK = new MeshSDK(providerType, apiKey, network, mnemonicOrBech32);
    }

    /**
     * **Static function to create a new wallet and return its mnemonic.**
     * @returns {string[]} The newly generated mnemonic.
     */
    static createWallet(): string[] {
        return MeshSDK.createWallet();
    }

    getMnemonic(): string[] | undefined {
        return this.meshSDK.getMnemonic();
    }

    getPrivateKey(): string | undefined {
        return this.meshSDK.getPrivateKey();
    }

    async getAddress(): Promise<string> {
        try {
            return await this.meshSDK.getAddress();
        } catch (error) {
            throw new Error(`Error fetching address: ${(error as Error).message}`);
        }
    }

    async getBalance(): Promise<{ unit: string; quantity: string }[]> {
        try {
            return await this.meshSDK.getBalance();
        } catch (error) {
            throw new Error(`Error fetching balance: ${(error as Error).message}`);
        }
    }

    async signAndSendTx(txHex: string): Promise<string> {
        try {
            return await this.meshSDK.signAndSendTx(txHex);
        } catch (error) {
            throw new Error(`Error signing transaction: ${(error as Error).message}`);
        }
    }

    async sendLovelace(recipientAddress: string, amountLovelace: string): Promise<string> {
        try {
            return await this.meshSDK.sendLovelace(recipientAddress, amountLovelace);
        } catch (error) {
            throw new Error(`Error sending ADA: ${(error as Error).message}`);
        }
    }



    async registerAndStakeADA(poolId: string): Promise<string> {
        try {
            return await this.meshSDK.registerAndStakeADA(poolId);
        } catch (error) {
            throw new Error(`Error staking ADA: ${(error as Error).message}`);
        }
    }

    /**
     * **Mint a new NFT on Cardano.**
     * @param assetName - The name of the NFT
     * @param assetQuantity - The quantity to mint (default: 1)
     * @param recipient - The recipient's Cardano address
     * @param metadata - Metadata including name, image, mediaType, and description
     * @returns The transaction hash
     */
    async mintNFT(
        assetName: string,
        assetQuantity: string = "1",
        recipient: string,
        metadata: {
            name: string;
            image: string;
            mediaType: string;
            description: string | string[];
        }
    ): Promise<string> {
        try {
            return await this.meshSDK.mintNFT(assetName, assetQuantity, recipient, metadata);
        } catch (error) {
            throw new Error(`Error minting NFT: ${(error as Error).message}`);
        }
    }

    /**
     * **Burn a Cardano asset (NFT or token).**
     * @param assetUnit - The asset's unique identifier (`policyId + assetNameHex`)
     * @param quantity - The quantity to burn (default: 1)
     * @returns The transaction hash
     */
    async burnAsset(assetUnit: string, quantity: string = "1"): Promise<string> {
        try {
            return await this.meshSDK.burnAsset(assetUnit, quantity);
        } catch (error) {
            throw new Error(`Error burning asset: ${(error as Error).message}`);
        }
    }
}
