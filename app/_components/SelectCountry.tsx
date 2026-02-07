import { getCountries } from "@/app/_lib/data-service";

interface SelectCountryParams {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryParams) {
  const countries = await getCountries();
  const flag =
    countries.find((country: any) => country.name === defaultCountry)?.flag ??
    "";

  return (
    <select
      name={name}
      id={id}
      // Here we encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((country: any) => (
        <option key={country.name} value={`${country.name}%${country.flag}`}>
          {country.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
