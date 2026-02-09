import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import { CabinParams } from "@/app/types/interfaces";

export async function generateMetadata(props: CabinParams) {
  const params = await props.params;
  const { name } = await getCabin(params.cabinID);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinID: String(cabin.id) }));

  return ids;
}

export default async function Page(props: CabinParams) {
  const params = props.params;
  const cabin = await getCabin(params.cabinID);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-4xl lg:text-5xl font-semibold text-center mb-6 -mt-12 md:mt-auto">
          Reserve {cabin.name} today. <br className="md:hidden"></br>Pay on
          arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
