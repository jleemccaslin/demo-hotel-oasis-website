export interface CabinInterface {
  cabin: {
    id: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description?: string;
    image: any;
  };
}

export interface CabinParams {
  params: { cabinID: string };
}
