import { helloCardano } from "../src/index";

describe("helloCardano", () => {
    it("should return a greeting with the provided name", () => {
        expect(helloCardano("Alice")).toBe("Hello, Alice! Welcome to Cardano Agent Kit.");
    });

    it("should return a greeting with the default name when no name is provided", () => {
        expect(helloCardano()).toBe("Hello, Cardano! Welcome to Cardano Agent Kit.");
    });
});
