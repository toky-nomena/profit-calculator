import { CalculatorConfig, mergeConfigs, CalculatorResult } from "./storage";

export function calculate(
  config?: Partial<CalculatorConfig>
): CalculatorResult {
  const { equity, leverage, riskRatio, riskReward } = mergeConfigs(config);

  const profit = Math.floor(riskReward * riskRatio * equity) / 100;
  const maxDrawdown = -(riskRatio * equity) / 100;
  const lot = (equity * riskRatio) / leverage / 100;

  return { profit, maxDrawdown, lot };
}
