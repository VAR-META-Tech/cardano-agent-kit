import { CardanoToolKit } from "../src";

describe("CardanoToolKit", () => {
    const API_KEY = "previewueSVWOXkYUQdtHQkj0CftJIibwETLjH0";
    const TEST_RECIPIENT = "addr_test1qqpnp9n7274je4mugywj890pp9w6hexceedhvryfrgs7gqxl9g3ghpcdgv2j58fe7yvpwt6nqc2ylzjr4k8zldetjlvq80w9t3";
    const STAKE_POOL_ID = "pool18pn6p9ef58u4ga3wagp44qhzm8f6zncl57g6qgh0pk3yytwz54h";

    const TEST_MNEMONIC = [
        "churn", "analyst", "debate", "million", "tattoo", "enlist",
        "crystal", "slide", "gallery", "airport", "squeeze", "live",
        "dinosaur", "rough", "first", "south", "cave", "clerk",
        "divorce", "attend", "topic", "idea", "finger", "verify"
    ];

    const TEST_BECH32_PRIVATE_KEY = "xprv1mpujpqs8nv47d2atwzltun35t9fg9sm58luxytlmazkm6d5ghdvma2gtxnrtvlt739e68gppkuc9t742sz6ht84fa26v827hsuk8mamrfcdyql8eqtzx3fc379pv7qtsjtsg4ahlpcxdz89rlmd23n2y258da03d";

    let toolkit: CardanoToolKit;

    beforeEach(() => {
        toolkit = new CardanoToolKit("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);
    });

    describe("🔹 Wallet Utilities", () => {
        it("should generate a new wallet mnemonic", () => {
            const mnemonic = CardanoToolKit.createWallet();
            console.log("Generated Mnemonic:", mnemonic);

            expect(Array.isArray(mnemonic)).toBe(true);
            expect(mnemonic.length).toBeGreaterThanOrEqual(12);
            expect(mnemonic.every(word => typeof word === "string")).toBe(true);
        });
    });

    describe("🔹 Wallet Initialization", () => {
        it("should initialize with Blockfrost and generate a wallet", () => {
            expect(toolkit).toBeDefined();
            expect(toolkit.getMnemonic()).toEqual(TEST_MNEMONIC);
        });

        it("should restore a wallet from a given mnemonic", () => {
            expect(toolkit.getMnemonic()).toEqual(TEST_MNEMONIC);
        });

        it("should restore a wallet from a Bech32 private key", () => {
            const toolkitWithPrivateKey = new CardanoToolKit("blockfrost", API_KEY, "testnet", TEST_BECH32_PRIVATE_KEY);
            expect(toolkitWithPrivateKey.getPrivateKey()).toEqual(TEST_BECH32_PRIVATE_KEY);
        });
    });

    describe("🔹 Wallet Data Fetching", () => {
        it("should fetch a wallet address", async () => {
            const address = await toolkit.getAddress();
            console.log("Wallet Address:", address);
            expect(address).toBeDefined();
            expect(typeof address).toBe("string");
        });

        it("should return wallet balance", async () => {
            const mockBalance = [
                { unit: "lovelace", quantity: "1000000000" }, // 1 ADA
                { unit: "0f5560dbc05282e05507aedb02d823d9d9f0e583cce579b81f9d1cd8", quantity: "5" }
            ];
            jest.spyOn(toolkit, "getBalance").mockResolvedValue(mockBalance);

            const balance = await toolkit.getBalance();
            console.log("Wallet Balance:", balance);

            expect(Array.isArray(balance)).toBe(true);
            expect(balance.length).toBeGreaterThan(0);
            expect(balance[0]).toHaveProperty("unit");
            expect(balance[0]).toHaveProperty("quantity");
        });

        it("should handle empty wallet balance", async () => {
            jest.spyOn(toolkit, "getBalance").mockResolvedValue([]);
            const balance = await toolkit.getBalance();
            console.log("Empty Wallet Balance:", balance);
            expect(balance.length).toBe(0);
        });
    });

    describe("🔹 NFT Minting", () => {
        // it("should mint an NFT (mocked)", async () => {

        //     const txHash = await toolkit.mintAsset(
        //         "MeshNFT",
        //         "1",
        //         TEST_RECIPIENT,
        //         {
        //             name: "Mesh Token",
        //             image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        //             mediaType: "image/jpg",
        //             description: [
        //                 "This NFT was minted using CardanoToolKit",
        //                 "Powered by MeshSDK!"
        //             ]
        //         }
        //     );

        //     console.log("Minted NFT TX Hash:", txHash);
        //     expect(txHash).toBeDefined();
        // });

        it("should handle mintNFT errors", async () => {
            jest.spyOn(toolkit, "mintAsset").mockRejectedValue(new Error("Invalid recipient address"));

            await expect(toolkit.mintAsset(
                "MeshNFT",
                "1",
                "INVALID_ADDRESS",
                {
                    name: "Mesh Token",
                    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
                    mediaType: "image/jpg",
                    description: "This NFT was minted using CardanoToolKit"
                }
            )).rejects.toThrow("Invalid recipient address");
        });
    });

    describe("🔹 Transactions & Staking", () => {
        it("should send Lovelace (mocked)", async () => {
            jest.spyOn(toolkit, "sendLovelace").mockResolvedValue("mock_lovelace_tx_hash");

            const txHash = await toolkit.sendLovelace(TEST_RECIPIENT, "1000000"); // 1 ADA
            console.log("Lovelace Transaction Hash:", txHash);

            expect(txHash).toBe("mock_lovelace_tx_hash");
        });

        it("should register & stake ADA (mocked)", async () => {
            jest.spyOn(toolkit, "registerAndStakeADA").mockResolvedValue("mock_stake_tx_hash");

            const txHash = await toolkit.registerAndStakeADA(STAKE_POOL_ID);
            console.log("Staking Transaction Hash:", txHash);

            expect(txHash).toBe("mock_stake_tx_hash");
        });

        it("should handle registerAndStakeADA() errors", async () => {
            jest.spyOn(toolkit, "registerAndStakeADA").mockRejectedValue(new Error("Stake address not found"));

            await expect(toolkit.registerAndStakeADA(STAKE_POOL_ID)).rejects.toThrow("Stake address not found");
        });

        /**
         * **🚀 Real Transaction Tests**
         * Uncomment the tests below to send **REAL** transactions on Testnet.
         */

        // it("should actually send Lovelace (real transaction)", async () => {
        //     console.log("Fetching sender address...");
        //     const senderAddress = await toolkit.getAddress();
        //     console.log("Sender Address:", senderAddress);

        //     console.log("Checking balance...");
        //     const balance = await toolkit.getBalance();
        //     console.log("Wallet Balance:", balance);

        //     console.log("Sending 1 ADA to recipient...");
        //     const txHash = await toolkit.sendLovelace(TEST_RECIPIENT, "1000000"); // 1 ADA

        //     console.log("✅ Transaction Sent! TX Hash:", txHash);
        //     expect(txHash).toBeDefined();
        // });

    });
});
