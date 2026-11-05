export function formatMoney(amount) {
  return `$${Number(amount).toLocaleString("en-US")}`;
}
