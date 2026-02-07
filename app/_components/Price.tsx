import { getCabinPrice } from "@/app/_lib/data-service";

interface PriceParams {
  cabinID: string;
}

async function Price({ cabinID }: PriceParams) {
  const cabinPrice = await getCabinPrice(cabinID);
  if (!cabinPrice) throw new Error("Cabin price not found");

  const { regularPrice, discount } = cabinPrice;

  return (
    <p className="mt-12 text-3xl flex gap-3 items-baseline">
      {discount > 0 ? (
        <>
          <span className="text-3xl font-[350]">
            ${regularPrice - discount}
          </span>
          <span className="line-through font-semibold text-primary-600">
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className="text-3xl font-[350]">${regularPrice}</span>
      )}
      <span className="text-primary-200">/ night</span>
    </p>
  );
}

export default Price;
