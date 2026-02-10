"use client";

import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import { BookingInterface } from "../types/interfaces";

interface ReservationList {
  bookings: BookingInterface[];
}

export default function ReservationList({ bookings }: ReservationList) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingID) => {
      return curBookings.filter((booking) => booking.id !== bookingID);
    },
  );

  async function handleDelete(bookingID: number) {
    optimisticDelete(bookingID);
    await deleteBooking(bookingID);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
