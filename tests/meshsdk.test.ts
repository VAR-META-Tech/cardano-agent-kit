import { MeshSDK } from "../src/tools/meshsdk";

describe("MeshSDK", () => {
    const API_KEY = "previewueSVWOXkYUQdtHQkj0CftJIibwETLjH0";
    const TEST_RECIPIENT = "addr_test1qqpnp9n7274je4mugywj890pp9w6hexceedhvryfrgs7gqxl9g3ghpcdgv2j58fe7yvpwt6nqc2ylzjr4k8zldetjlvq80w9t3";
    const STAKE_POOL_ID = "pool18pn6p9ef58u4ga3wagp44qhzm8f6zncl57g6qgh0pk3yytwz54h";

    const TEST_MNEMONIC = [
        "churn", "analyst", "debate", "million", "tattoo", "enlist",
        "crystal", "slide", "gallery", "airport", "squeeze", "live",
        "dinosaur", "rough", "first", "south", "cave", "clerk",
        "divorce", "attend", "topic", "idea", "finger", "verify"
    ];

    let wallet: MeshSDK;

    beforeEach(() => {
        wallet = new MeshSDK("blockfrost", API_KEY, "testnet", TEST_MNEMONIC);
    });

    describe("🔹 Wallet Utility Functions", () => {
        it("should generate a new wallet mnemonic", () => {
            const mnemonic = MeshSDK.createWallet();
            console.log("Generated Mnemonic:", mnemonic);

            expect(Array.isArray(mnemonic)).toBe(true);
            expect(mnemonic.length).toBeGreaterThanOrEqual(12);
            expect(mnemonic.every(word => typeof word === "string")).toBe(true);
        });
    });

    describe("🔹 Wallet Initialization", () => {
        it("should initialize with Blockfrost", () => {
            expect(wallet).toBeDefined();
            expect(wallet.getMnemonic()).toBeDefined();
        });

        it("should restore a wallet from a mnemonic", () => {
            expect(wallet.getMnemonic()).toEqual(TEST_MNEMONIC);
        });
    });

    describe("🔹 Wallet Data Fetching", () => {
        it("should fetch a wallet address", async () => {
            const address = await wallet.getAddress();
            console.log("Wallet Address:", address);

            expect(address).toBeDefined();
            expect(typeof address).toBe("string");
        });

        it("should return wallet balance", async () => {
            const mockBalance = [
                { unit: "lovelace", quantity: "1000000000" },
                { unit: "0f5560dbc05282e05507aedb02d823d9d9f0e583cce579b81f9d1cd8", quantity: "5" }
            ];
            jest.spyOn(wallet, "getBalance").mockResolvedValue(mockBalance);

            const balance = await wallet.getBalance();
            console.log("Wallet Balance:", balance);

            expect(Array.isArray(balance)).toBe(true);
            expect(balance.length).toBeGreaterThan(0);
            expect(balance[0]).toHaveProperty("unit");
            expect(balance[0]).toHaveProperty("quantity");
        });

        it("should return empty balance for new wallets", async () => {
            jest.spyOn(wallet, "getBalance").mockResolvedValue([]);

            const balance = await wallet.getBalance();
            console.log("Empty Wallet Balance:", balance);

            expect(balance.length).toBe(0);
        });
    });

    describe("🔹 Transactions & Staking", () => {
        it("should send Lovelace (mocked)", async () => {
            jest.spyOn(wallet, "sendLovelace").mockResolvedValue("mock_tx_hash");

            const txHash = await wallet.sendLovelace(TEST_RECIPIENT, "1000000");
            console.log("Lovelace Transaction Hash:", txHash);

            expect(txHash).toBe("mock_tx_hash");
        });

        it("should register & stake ADA (mocked)", async () => {
            jest.spyOn(wallet, "registerAndStakeADA").mockResolvedValue("mock_stake_tx_hash");

            const txHash = await wallet.registerAndStakeADA(STAKE_POOL_ID);
            console.log("Staking Transaction Hash:", txHash);

            expect(txHash).toBe("mock_stake_tx_hash");
        });

        it("should send an asset (mocked)", async () => {
            jest.spyOn(wallet, "sendAsset").mockResolvedValue("mock_asset_tx_hash");

            const assetUnit = "d9312da562da182b02322fd8acb536f37eb9d29fba7c49dc172555274d657368546f6b656e";
            const txHash = await wallet.sendAsset(TEST_RECIPIENT, assetUnit, "1");

            console.log("Asset Transaction Hash:", txHash);
            expect(txHash).toBe("mock_asset_tx_hash");
        });
    });

    describe("🔹 Minting & Burning", () => {
        it("should mint an NFT (mocked)", async () => {
            jest.spyOn(wallet, "mintAsset").mockResolvedValue("mock_mint_tx_hash");

            const txHash = await wallet.mintAsset(
                "MeshNFT",
                "1",
                TEST_RECIPIENT,
                {
                    name: "Mesh Token",
                    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
                    mediaType: "image/jpg",
                    description: "This NFT was minted using MeshSDK"
                }
            );

            console.log("Minted NFT TX Hash:", txHash);
            expect(txHash).toBe("mock_mint_tx_hash");
        });

        it("should burn an asset (mocked)", async () => {
            jest.spyOn(wallet, "burnAsset").mockResolvedValue("mock_burn_tx_hash");

            const assetUnit = "d9312da562da182b02322fd8acb536f37eb9d29fba7c49dc172555274d657368546f6b656e";
            const txHash = await wallet.burnAsset(assetUnit, "1");

            console.log("Burn Asset TX Hash:", txHash);
            expect(txHash).toBe("mock_burn_tx_hash");
        });
    });


});
