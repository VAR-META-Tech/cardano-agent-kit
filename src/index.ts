
export * from "./tools";
export * from "./integrations";

export function helloCardano(name: string = "Cardano"): string {
    return `Hello, ${name}! Welcome to Cardano Agent Kit.`;
}
