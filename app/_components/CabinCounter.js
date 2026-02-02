import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export default async function CabinCounter() {
  const cabins = await getCabins();

  return <span>{cabins ? cabins.length : "many"}</span>;
}
