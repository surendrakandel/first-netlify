import type { bid } from '$src/types/bid';
import { type Writable, writable } from 'svelte/store';
export interface BidStore {
  bids: bid[];
  choosen_bid: bid | undefined;
}

function initRatesStore() {
  const bid_store: Writable<BidStore> = writable({
    bids: [],
    choosen_bid: undefined
  });
  function addChoosenBid(bid: bid) {
    bid_store.update((value) => {
      value.choosen_bid = bid;
      return value;
    });
  }
  return { bid_store, addChoosenBid };
}
export const { bid_store, addChoosenBid } = initRatesStore();
