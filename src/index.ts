import { CardanoToolKit, NetworkType, ProviderType } from "./toolkit";

// ✅ Export as named and default
export { CardanoToolKit, NetworkType, ProviderType };
export default CardanoToolKit;

export function helloCardano(name: string = "Cardano"): string {
    return `Hello, ${name}! Welcome to Cardano Agent Kit.`;
}
