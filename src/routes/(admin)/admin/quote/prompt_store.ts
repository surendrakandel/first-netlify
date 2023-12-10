import { writable, type Writable } from 'svelte/store';

export const pickupPromptStore: Writable<boolean> = writable(false);
export function togglePickupPrompt() {
  pickupPromptStore.update((value) => {
    return !value;
  });
}
