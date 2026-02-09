import { getBookedDatesByCabinID, getCabin } from "@/app/_lib/data-service";
import { CabinParams } from "@/app/types/interfaces";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, props: any) {
  const params = await props.params;
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
