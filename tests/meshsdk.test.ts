import { MeshSDK } from "../src/tools/meshsdk";

describe("MeshSDK", () => {
    const API_KEY = "test_api_key";

    it("should initialize with Blockfrost by default", () => {
        const wallet = new MeshSDK(API_KEY);
        expect(wallet).toBeDefined();
        expect(wallet.getMnemonic().length).toBe(24); // Ensure mnemonic is 24 words
    });

    it("should initialize with a custom provider (Maestro)", () => {
        const wallet = new MeshSDK("maestro", API_KEY, "mainnet");
        expect(wallet).toBeDefined();
    });

    // it("should restore a wallet from a given mnemonic", () => {
    //     const testMnemonic = Array(24).fill("test"); // Mock 24-word mnemonic
    //     const wallet = new MeshSDK("blockfrost", API_KEY, "testnet", testMnemonic);
    //     expect(wallet.getMnemonic()).toEqual(testMnemonic);
    // });

    it("should fetch a wallet address", async () => {
        const wallet = new MeshSDK(API_KEY);
        const address = await wallet.getAddress();
        expect(address).toBeDefined();
        expect(typeof address).toBe("string");
    });

    // it("should fetch the wallet balance", async () => {
    //     const wallet = new MeshSDK(API_KEY);
    //     const balance = await wallet.getBalance();
    //     expect(balance).toBeDefined();
    //     expect(typeof balance).toBe("string");
    // });

    it("should sign and send a transaction", async () => {
        const wallet = new MeshSDK(API_KEY);
        const rawTx = "RAW_TX_HEX"; // Mock raw transaction hex
        await expect(wallet.signAndSendTx(rawTx)).rejects.toThrow(); // Since we use mock data, it should fail
    });
});
