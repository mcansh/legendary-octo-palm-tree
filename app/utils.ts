interface FormatOptions {
  amount: string;
  currencyCode: string;
}

export function formatMoney({ amount, currencyCode }: FormatOptions): string {
  let amountNumber = Number(amount);

  return `$${amountNumber.toFixed(2)} ${currencyCode}`;
}
