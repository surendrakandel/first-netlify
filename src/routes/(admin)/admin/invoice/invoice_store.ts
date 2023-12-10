import { browser } from '$app/environment';
import { type Writable, writable } from 'svelte/store';
interface itemType {
  new: boolean;
  item: {
    title: string;
    tags: string[];
    captions: string;
    description: string;
    price: string;
    location: string;
    images?: any;
    image: string;
    packageType: string;
    productType: string;
    picesPerBox: string;
    discount: string;
    netPrice: string;
    objectID: string;
  };
}

function createInvoiceItems() {
  const invoiceItems: Writable<itemType[]> = writable([]);
  if (browser) {
    const items = localStorage.getItem('invoiceItems');
    if (items && items != 'undefined' && items != 'null' && items != '[]' && items != '""') {
      invoiceItems.set(JSON.parse(items));
    }
    // persist itemsto localstorage
    invoiceItems.subscribe((items) => {
      localStorage.setItem('invoiceItems', JSON.stringify(items));
    });
  }
  return invoiceItems;
}
export const invoiceItems = createInvoiceItems();
