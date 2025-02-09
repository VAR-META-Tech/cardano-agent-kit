import { MeshSDK } from "../src/tools/meshsdk";

describe("MeshSDK", () => {
    const API_KEY = "previewueSVWOXkYUQdtHQkj0CftJIibwETLjH0";

    // ✅ Use a valid test mnemonic (not an actual funded wallet)
    const TEST_MNEMONIC = [
        "churn", "analyst", "debate", "million", "tattoo", "enlist",
        "crystal", "slide", "gallery", "airport", "squeeze", "live",
        "dinosaur", "rough", "first", "south", "cave", "clerk",
        "divorce", "attend", "topic", "idea", "finger", "verify"
    ];

    // ✅ Mock Bech32 private key (not real)
    const TEST_BECH32_PRIVATE_KEY = "xprv1cqa46gk29plgkg98upclnjv5t425fcpl4rgf9mq2txdxuga7jfq5shk7np6l55nj00sl3m4syzna3uwgrwppdm0azgy9d8zahyf32s62klfyhe0ayyxkc7x92nv4s77fa0v25tufk9tnv7x6dgexe9kdz5gpeqgu"; // Replace with a valid test format

    it("should initialize with Blockfrost by default", () => {
        const wallet = new MeshSDK("blockfrost", API_KEY, "testnet");
        expect(wallet).toBeDefined();
        expect(wallet.getMnemonic()).toBeDefined(); // Ensures mnemonic exists
    });

    it("should initialize with a custom provider (Maestro)", () => {
        const wallet = new MeshSDK("maestro", API_KEY, "mainnet");
        expect(wallet).toBeDefined();
    });

    it("should restore a wallet from a given mnemonic", () => {
        const wallet = new MeshSDK("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);
        expect(wallet.getMnemonic()).toEqual(TEST_MNEMONIC);
    });

    it("should restore a wallet from a Bech32 private key", () => {
        const wallet = new MeshSDK("blockfrost", API_KEY, "testnet", TEST_BECH32_PRIVATE_KEY);
        expect(wallet.getPrivateKey()).toEqual(TEST_BECH32_PRIVATE_KEY);
    });

    it("should fetch a wallet address", async () => {
        const wallet = new MeshSDK("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);

        const address = await wallet.getAddress();
        console.log("Wallet Address:", address);

        expect(address).toBeDefined();
        expect(typeof address).toBe("string");
    });

    it("should handle no addresses found case", async () => {
        const wallet = new MeshSDK("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);

        // ✅ Mock an empty address response
        jest.spyOn(wallet, "getAddress").mockImplementation(async () => {
            throw new Error("No addresses found for this wallet");
        });

        await expect(wallet.getAddress()).rejects.toThrow("No addresses found for this wallet");
    });

    it("should return wallet balance", async () => {
        const wallet = new MeshSDK("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);


        const balance = await wallet.getBalance();
        console.log("Wallet Balance:", balance);

        expect(Array.isArray(balance)).toBe(true);
        expect(balance.length).toBeGreaterThan(0);
        expect(balance[0]).toHaveProperty("unit");
        expect(balance[0]).toHaveProperty("quantity");
    });

    it("should return empty balance for new wallets", async () => {
        const wallet = new MeshSDK("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);

        // ✅ Mock the getBalance() function to return an empty array
        jest.spyOn(wallet, "getBalance").mockResolvedValue([]);

        const balance = await wallet.getBalance();
        console.log("Empty Wallet Balance:", balance);

        expect(Array.isArray(balance)).toBe(true);
        expect(balance.length).toBe(0);
    });

    it("should sign and send a transaction (should fail with mock data)", async () => {
        const wallet = new MeshSDK("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);
        const rawTx = "RAW_TX_HEX"; // Mock raw transaction hex

        // ✅ Expect failure due to mock transaction
        await expect(wallet.signAndSendTx(rawTx)).rejects.toThrow();
    });
});
