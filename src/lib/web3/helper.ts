export function truncateAddress(
  address: string
): `${string}...${string}` | string {
  if (!address) return "";
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
}
