"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData: FormData) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  if (formData === null) return;

  // 2) Data building
  const fullName = formData.get("fullName");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = String(formData.get("nationality"))?.split(
    "%",
  );

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID as string))
    throw new Error("Please provide a valid national ID");

  const updateData = { fullName, nationality, countryFlag, nationalID };

  // 3) Mutation
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestID);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  // 4) Revalidation
  revalidatePath("/account/profile");
}

export async function createBooking(bookingData: any, formData: FormData) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  // 2) Data Building
  const newBooking = {
    ...bookingData,
    guestID: session.user.guestID,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  // 3) Add booking
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  // 4) Revalidation and redirection
  revalidatePath(`/cabins${bookingData.cabinID}`);
  redirect("/cabins/thank-you");
}

export async function updateBooking(formData: FormData) {
  const bookingID = Number(formData.get("bookingID"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestID);
  const guestBookingIDs = guestBookings.map((booking) => booking.id);
  if (!guestBookingIDs.includes(bookingID))
    throw new Error("You are not authorized to update this booking.");

  // 3) Build data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingID)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  // 5) Redirection and revalidation
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingID}`);
  redirect("/account/reservations");
}

export async function deleteBooking(bookingID: number) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestID);
  const guestBookingIDs = guestBookings.map((booking) => booking.id);

  if (!guestBookingIDs.includes(bookingID))
    throw new Error("You are not authorized to delete this booking.");

  // 3) Mutation
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingID);

  if (error) throw new Error("Booking could not be deleted");

  // 4) Revalidation
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
