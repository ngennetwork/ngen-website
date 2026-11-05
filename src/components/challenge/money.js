export function formatMoney(amount) {
  return `$${Number(amount).toLocaleString("en-US")}`;
}

/** Split an integer total into `parts` payments. The last payment holds the remainder. */
export function splitTotal(total, parts) {
  const base = Math.floor(total / parts);
  const amounts = Array.from({ length: parts }, () => base);
  amounts[parts - 1] = total - base * (parts - 1);
  return amounts;
}

export function formatPayments(amounts) {
  const money = amounts.map(formatMoney);
  if (money.length === 1) return money[0];
  if (money.length === 2) return `${money[0]} and ${money[1]}`;
  return `${money.slice(0, -1).join(", ")}, and ${money[money.length - 1]}`;
}
