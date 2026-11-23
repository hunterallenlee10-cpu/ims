// The Bitcoin address for the one-year BTC option. Set NEXT_PUBLIC_BTC_ADDRESS in Vercel.
// Until a valid-looking address is set, the "Pay with BTC" button and /join/btc stay closed.
const BTC_ADDRESS = /^(bc1[a-z0-9]{25,87}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/;

export function btcAddress(): string | null {
  const value = process.env.NEXT_PUBLIC_BTC_ADDRESS?.trim();
  return value && BTC_ADDRESS.test(value) ? value : null;
}
