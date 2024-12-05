export interface CurrencyFormatOptions {
  amount: number;
  currency: "USD" | "EUR";
}

export const formatCurrency = ({ amount, currency }: CurrencyFormatOptions): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
