import { getBookedDatesByCabinID, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { CabinInterface } from "../types/interfaces";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ cabin }: CabinInterface) {
  const [settings, bookedDates] = await Promise.all([
    getBookedDatesByCabinID(cabin.id),
    getSettings(),
  ]);

  const session = await auth();

  return (
    <div className="grid lg:grid-cols-2 border border-primary-800 min-h-[400px] mb-10 text-accent-400">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
