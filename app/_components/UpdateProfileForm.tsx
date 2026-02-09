"use client";

import { useFormStatus } from "react-dom";
import { updateGuest } from "../_lib/actions";
import { GuestInterface } from "../types/interfaces";
import SubmitButton from "./SubmitButton";

interface UpdateProfileFormParams {
  guest: GuestInterface;
  children: React.ReactNode;
}

export default function UpdateProfileForm({
  guest,
  children,
}: UpdateProfileFormParams) {
  const { fullName, email, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="fullName">Full name</label>
        <input
          name="fullName"
          defaultValue={fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email">Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag !== "" ? (
            <img
              src={countryFlag as string}
              alt="Country flag"
              className="h-5 rounded-xs relative"
            />
          ) : (
            ""
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs"
        />
      </div>

      <div className="flex justify-center md:justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>;
}
