export interface BookingInterface {
  id: number;
  guestID?: number;
  startDate: string;
  endDate: Date;
  numNights?: number;
  totalPrice?: number;
  numGuests: number;
  status?: string;
  created_at: Date;
  cabins?: any;
}

export interface BookingInterfaceParams {
  booking: BookingInterface;
}

export interface CabinInterface {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string;
  image: any;
}

export interface CabinInterfaceParams {
  cabin: CabinInterface;
}

export interface CabinParams {
  params: { cabinID: string };
}

export interface GuestInterface {
  id?: number;
  created_at?: Date;
  fullName?: string;
  email?: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string;
}

export interface SettingsInterface {
  id?: number;
  created_at?: string;
  minBookingLength?: number;
  maxBookingLength?: number;
  maxGuestsPerBooking?: number;
  breakfastPrice?: 20;
}

export interface UserInterface {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}
