export interface locationInterface {
  as: as;
  ip: string;
  isp: string;
  location: location;
}

interface as {
  asn: number;
  domain: string;
  name: string;
  route: string;
  type: string;
}

interface location {
  city: string;
  counrty: string;
  geonameId: number;
  lat: number;
  lng: number;
  postalCode: string;
  region: string;
  timezone: string;
}
