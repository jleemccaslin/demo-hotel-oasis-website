import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { CabinInterface } from "@/app/types/interfaces";

export default function Cabin({ cabin }: CabinInterface) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="grid md:grid-cols-[3fr_4fr] md:gap-20 border border-primary-800 md:py-3 md:px-10 mb-24">
      <div className="relative h-102 md:h-auto md:scale-x-[1.15] md:scale-y-[1.15] md:-translate-x-3">
        <Image
          fill
          className="md:object-cover"
          src={image}
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-7xl mb-5 -translate-y-89.25 text-right md:text-left md:translate-y-0 md:-translate-x-63.5 bg-primary-950 p-6 pb-1 md:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 -mt-18 mb-10 px-10 md:mt-auto md:px-0">
          <TextExpander>{description as string}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7 px-10 md:px-0">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
