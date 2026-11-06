export function formatMoney(amount) {
  return `$${Number(amount).toLocaleString("en-US")}`;
}

export function formatUsd(amount) {
  return `US$${Number(amount).toLocaleString("en-US")}`;
}
