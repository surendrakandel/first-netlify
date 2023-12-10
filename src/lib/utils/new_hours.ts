import type { businessHours } from '$src/types/business_hours';

export function getNewBusinessHours(): businessHours {
  const newHours: businessHours = {
    start: '',
    end: ''
  };
  return newHours;
}
