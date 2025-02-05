import { BlockFrostAPI } from "@blockfrost/blockfrost-js";

export class BlockfrostAPIWrapper {
    private api: BlockFrostAPI;

    constructor(apiKey: string) {
        if (!apiKey) throw new Error("Blockfrost API key is required");
        this.api = new BlockFrostAPI({ projectId: apiKey });
    }

    /**
     * Fetches account details using Blockfrost.
     */
    async getAccountDetails(stakeAddress: string): Promise<any> {
        return await this.api.accounts(stakeAddress);
    }

    /**
     * Fetches the UTXO details for a given address.
     */
    async getUTXOs(address: string): Promise<any> {
        return await this.api.addressesUtxos(address);
    }

    /**
     * Fetches the balance of a given address.
     */
    async getBalance(address: string): Promise<string> {
        const utxos = await this.getUTXOs(address);
        return utxos.reduce((sum: number, utxo: any) => sum + parseInt(utxo.amount[0].quantity), 0).toString();
    }
}
