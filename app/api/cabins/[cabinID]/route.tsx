import { getBookedDatesByCabinID, getCabin } from "@/app/_lib/data-service";
import { CabinParams } from "@/app/types/interfaces";

export async function GET(request: any, { params }: CabinParams) {
  const { cabinID } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinID),
      getBookedDatesByCabinID(cabinID),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
