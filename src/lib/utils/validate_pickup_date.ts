import hd from 'date-holidays';

export function validatePickupDate(pickupDate: string): boolean {
  let pickup_date = new Date(pickupDate);
  const hds = new hd('US', 'la');
  try {
    // current date at current timezone
    const currentDate = new Date();
    const isHoliday = hds.isHoliday(pickup_date);
    if (new Date().getDate() > pickup_date.getDate()) {
      return false;
    }
    if (
      pickup_date.getDate() == currentDate.getDate() &&
      pickup_date.getHours() < 15 &&
      pickup_date.getHours() > 9 &&
      pickup_date.getDay() != 6 &&
      pickup_date.getDay() != 0 &&
      isHoliday == false
    ) {
      pickup_date.setDate(pickup_date.getDate());
      pickup_date.setHours(10, 0, 0);
      pickup_date = new Date(pickup_date);
      pickup_date.setTime(10);
      return true;
    } else if (
      pickup_date.getDay() != 6 &&
      pickup_date.getDay() != 0 &&
      isHoliday == false &&
      pickup_date.toDateString() != 'Invalid Date'
    ) {
      pickup_date = new Date(pickup_date.setHours(10, 0, 0));
      return true;
    }
    return true;
  } catch (error) {
    return true;
  }
}
