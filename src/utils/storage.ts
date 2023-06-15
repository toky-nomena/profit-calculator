const STORAGE_KEY = "@profit-calculator";

export const defaultConfig = {
  equity: 50,
  riskReward: 2.0,
  riskRatio: 5.0,
  leverage: 100,
} as const;

export type CalculatorConfig = typeof defaultConfig;
export type CalculatorResult = {
  profit: number;
  maxDrawdown: number;
  lot: number;
};

export function setConfig(config: CalculatorConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function getConfig(): CalculatorConfig {
  const valueString = localStorage.getItem(STORAGE_KEY);

  if (valueString) {
    return { ...defaultConfig, ...JSON.parse(valueString) };
  }

  return defaultConfig;
}

let storedConfig: CalculatorConfig | undefined = undefined;

export function mergeConfigs(
  config?: Partial<CalculatorConfig>
): CalculatorConfig {
  if (!storedConfig) {
    storedConfig = { ...getConfig() };
  }

  return { ...storedConfig, ...config };
}
