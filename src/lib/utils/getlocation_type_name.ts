interface Location {
  locationType: number;
  name: string;
  value: string;
}
export function getLocationName(locationType: number): string | undefined {
  const locations: Location[] = [
    {
      locationType: 0,
      name: 'Please select a location type',
      value: 'placeholderLocationType'
    },
    {
      locationType: 1,
      name: 'Has Loading Dock',
      value: 'businessWithLoadingDockOrForkLift'
    },
    {
      locationType: 2,
      name: 'Lift Gate Required',
      value: 'businessWithOutLoadingDockOrForkLift'
    },
    {
      locationType: 3,
      name: 'Residential',
      value: 'residential'
    },
    {
      locationType: 4,
      name: 'Tradeshow',
      value: 'tradeshow'
    },
    {
      locationType: 5,
      name: 'Self Storage',
      value: 'selfStorage'
    },
    {
      locationType: 6,
      name: 'Airport',
      value: 'airport'
    },
    {
      locationType: 7,
      name: 'Church',
      value: 'church'
    },
    {
      locationType: 8,
      name: 'Hospital',
      value: 'hospital'
    },
    {
      locationType: 9,
      name: 'School',
      value: 'school'
    },
    {
      locationType: 10,
      name: 'Government',
      value: 'government'
    },
    {
      locationType: 11,
      name: 'Fair or Amusement Park',
      value: 'fairOrAmusementPark'
    },
    {
      locationType: 12,
      name: 'Construction Site',
      value: 'constructionSite'
    },
    {
      locationType: 13,
      name: 'Farm or Ranch',
      value: 'farmOrRanch'
    },
    {
      locationType: 14,
      name: 'Military Installation',
      value: 'militaryInstallation'
    },
    {
      locationType: 15,
      name: 'Prison',
      value: 'prison'
    },
    {
      locationType: 16,
      name: 'Hotel or Motel',
      value: 'hotelOrMotel'
    },
    {
      locationType: 17,
      name: 'Campground',
      value: 'campground'
    },
    {
      locationType: 18,
      name: 'Grocery Warehouse',
      value: 'groceryWarehouse'
    },
    {
      locationType: 19,
      name: 'Country Club',
      value: 'countryClub'
    },
    {
      locationType: 20,
      name: 'Mine Site',
      value: 'mineSite'
    },
    {
      locationType: 21,
      name: 'Native American Reservation',
      value: 'nativeAmericanReservation'
    },
    {
      locationType: 22,
      name: 'Nursing Home',
      value: 'nursingHome'
    },
    {
      locationType: 23,
      name: 'Pier',
      value: 'pier'
    },
    {
      locationType: 24,
      name: 'Resort',
      value: 'resort'
    }
  ];
  const location = locations.find((loc) => loc.locationType === locationType);
  return location ? location.name : undefined;
}
