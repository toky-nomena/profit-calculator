export type NumberFormatType = "lot" | "currency" | "integer";

function getFormatterOptions(
  format: NumberFormatType
): Intl.NumberFormatOptions {
  if (format === "currency")
    return {
      style: "currency",
      currency: "USD",
    };

  if (format === "lot")
    return {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    };

  return {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  };
}

export function format(
  number: number,
  type: NumberFormatType = "currency",
  option?: Intl.NumberFormatOptions
): string {
  const formatOptions = {
    ...getFormatterOptions(type),
    ...option,
  };

  return new Intl.NumberFormat("en-US", formatOptions).format(number);
}
