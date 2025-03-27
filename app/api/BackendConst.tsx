export const backendRoutesMap = {
    api: "https://core-status.fintlabs.no/api",
    beta: "https://core-status-beta.fintlabs.no",
    alpha: "https://core-status-alpha.fintlabs.no",
} as const;

type Env = keyof typeof backendRoutesMap; // 'api' | 'beta' | 'alpha'

export function toEnvKey(env: string): Env | undefined {
    const lower = env.toLowerCase();
    return ["api", "beta", "alpha"].includes(lower)
        ? (lower as Env)
        : undefined;
}