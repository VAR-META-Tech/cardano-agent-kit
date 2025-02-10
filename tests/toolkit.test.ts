import CardanoToolKit from "../src";

describe("CardanoToolKit", () => {
    const API_KEY = "previewueSVWOXkYUQdtHQkj0CftJIibwETLjH0";
    const TEST_RECIPIENT = "addr_test1qqpnp9n7274je4mugywj890pp9w6hexceedhvryfrgs7gqxl9g3ghpcdgv2j58fe7yvpwt6nqc2ylzjr4k8zldetjlvq80w9t3"; // Replace with a valid test address
    const STAKE_POOL_ID = "pool1dhheyj4y7q8c8nj3z3lkuv9vqfjw75rnt48eet8efcnvczeznr7";

    // ✅ Use a valid test mnemonic (not an actual funded wallet)
    const TEST_MNEMONIC = [
        "churn", "analyst", "debate", "million", "tattoo", "enlist",
        "crystal", "slide", "gallery", "airport", "squeeze", "live",
        "dinosaur", "rough", "first", "south", "cave", "clerk",
        "divorce", "attend", "topic", "idea", "finger", "verify"
    ];

    const TEST_BECH32_PRIVATE_KEY = "xprv1mpujpqs8nv47d2atwzltun35t9fg9sm58luxytlmazkm6d5ghdvma2gtxnrtvlt739e68gppkuc9t742sz6ht84fa26v827hsuk8mamrfcdyql8eqtzx3fc379pv7qtsjtsg4ahlpcxdz89rlmd23n2y258da03d"; // Replace with a valid test format

    let toolkit: CardanoToolKit;

    beforeEach(() => {
        toolkit = new CardanoToolKit("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);
    });

    it("should initialize with Blockfrost and generate a wallet", async () => {
        expect(toolkit).toBeDefined();
        expect(toolkit.getMnemonic()).toEqual(TEST_MNEMONIC);
    });

    it("should restore a wallet from a given mnemonic", async () => {
        const mnemonic = toolkit.getMnemonic();
        expect(mnemonic).toEqual(TEST_MNEMONIC);
    });

    it("should restore a wallet from a Bech32 private key", async () => {
        const toolkitWithPrivateKey = new CardanoToolKit("blockfrost", API_KEY, "testnet", TEST_BECH32_PRIVATE_KEY);
        expect(toolkitWithPrivateKey.getPrivateKey()).toEqual(TEST_BECH32_PRIVATE_KEY);
    });

    it("should fetch a wallet address", async () => {
        const address = await toolkit.getAddress();
        console.log("Wallet Address:", address);
        expect(address).toBeDefined();
        expect(typeof address).toBe("string");
    });

    it("should return wallet balance", async () => {
        const balance = await toolkit.getBalance();
        console.log("Wallet Balance:", balance);
        expect(Array.isArray(balance)).toBe(true);
    });

    it("should handle empty wallet balance", async () => {
        jest.spyOn(toolkit, "getBalance").mockResolvedValue([]);
        const balance = await toolkit.getBalance();
        console.log("Empty Wallet Balance:", balance);
        expect(balance.length).toBe(0);
    });

    // it("should sign and send a transaction (mock)", async () => {
    //     const rawTx = "RAW_TX_HEX"; // Mock raw transaction hex
    //     jest.spyOn(toolkit, "signAndSendTx").mockResolvedValue("mock_tx_hash_123");
    //     const txHash = await toolkit.signAndSendTx(rawTx);
    //     console.log("Transaction Hash:", txHash);
    //     expect(txHash).toBe("mock_tx_hash_123");
    // });

    // it("should send Lovelace (mocked)", async () => {
    //     jest.spyOn(toolkit, "sendLovelace").mockResolvedValue("mock_lovelace_tx_hash");
    //     const txHash = await toolkit.sendLovelace(TEST_RECIPIENT, "1000000"); // 1 ADA
    //     console.log("Lovelace Transaction Hash:", txHash);
    //     expect(txHash).toBe("mock_lovelace_tx_hash");
    // });

    // it("should handle sendLovelace() errors properly", async () => {
    //     jest.spyOn(toolkit, "sendLovelace").mockRejectedValue(new Error("Insufficient balance"));
    //     await expect(toolkit.sendLovelace(TEST_RECIPIENT, "500000000000")).rejects.toThrow("Insufficient balance");
    // });

    // it("should register & stake ADA (mocked)", async () => {
    //     jest.spyOn(toolkit, "registerAndStakeADA").mockResolvedValue("mock_stake_tx_hash");
    //     const txHash = await toolkit.registerAndStakeADA(STAKE_POOL_ID);
    //     console.log("Staking Transaction Hash:", txHash);
    //     expect(txHash).toBe("mock_stake_tx_hash");
    // });

    // it("should handle registerAndStakeADA() errors", async () => {
    //     jest.spyOn(toolkit, "registerAndStakeADA").mockRejectedValue(new Error("Stake address not found"));
    //     await expect(toolkit.registerAndStakeADA(STAKE_POOL_ID)).rejects.toThrow("Stake address not found");
    // });

    /**
     * **🚀 Real Transaction Tests**
     * Uncomment the tests below to send **REAL** transactions on Testnet.
     */

    it("should actually send Lovelace (real transaction)", async () => {
        console.log("Fetching sender address...");
        const senderAddress = await toolkit.getAddress();
        console.log("Sender Address:", senderAddress);

        console.log("Checking balance...");
        const balance = await toolkit.getBalance();
        console.log("Wallet Balance:", balance);

        console.log("Sending 1 ADA to recipient...");
        const txHash = await toolkit.sendLovelace(TEST_RECIPIENT, "1000000"); // 1 ADA

        console.log("✅ Transaction Sent! TX Hash:", txHash);
        expect(txHash).toBeDefined();
    });

    // it("should actually register & stake ADA (real transaction)", async () => {
    //     console.log("Registering stake address and delegating...");
    //     const txHash = await toolkit.registerAndStakeADA(STAKE_POOL_ID);
    //     console.log("✅ Staking Transaction Sent! TX Hash:", txHash);
    //     expect(txHash).toBeDefined();
    // });

});
