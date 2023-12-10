function isWeekday(date:any) {
    const day = date.getDay();
    return day != 6 && day != 0;
  }
export function getNextPickupDate() {
    let date = new Date();
    const currentTime = date.getHours();
  
    // Check if the current time is later than 16:00
    if (currentTime >= 16) {
      // Move the date to tomorrow
      date.setDate(date.getDate() + 1);
    }
  
    // Continue moving the date until it is a weekday and not a public holiday
    while (!isWeekday(date)) {
      date.setDate(date.getDate() + 1);
    }
  
    return date;
  }
  // Function to check if a date is a weekday
