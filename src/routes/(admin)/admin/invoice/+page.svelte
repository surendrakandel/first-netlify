<script lang="ts">
  import { onMount } from 'svelte';
  import { invoiceItems } from './invoice_store';
  $: selectedItem = {
    new: false,
    item: {
      title: '',
      tags: [],
      captions: '',
      description: '',
      price: '',
      location: '',
      image: '',
      packageType: '',
      productType: '',
      picesPerBox: '0',
      discount: '0',
      netPrice: '0',
      objectID: ''
    }
  };
  $: fixedPrice = false;
  function calculateTotal() {
    let price = parseFloat(selectedItem.item.price);
    let qty = parseInt(selectedItem.item.picesPerBox);
    let discount = parseFloat(selectedItem.item.discount);
    if (discount > 0 && !fixedPrice) {
      let netPrice = price * qty - (price * qty * discount) / 100;
      selectedItem.item.netPrice = netPrice.toString();
      return;
    } else if (fixedPrice) {
      if (discount > 0) {
        price = price - (price * discount) / 100;
        selectedItem.item.netPrice = price.toString();
        return;
      }
      selectedItem.item.netPrice = price.toString();
      return;
    } else {
      selectedItem.item.netPrice = (price * qty).toString();
      return;
    }
  }
  function handleClickOutside(event: any) {
    selectedItem.new = false;
  }

  function addtoInvoice() {
    selectedItem.new = false;
    invoiceItems.update((items) => {
      items.push(selectedItem);
      items = items;
      return items;
    });
  }
</script>

<div class="p-2 min-h-[100vh]  max-w-[1100px]">
  <div class="fixed top-[5px] right-[20px] z-100" style="z-index:10000">
    <button
      class="hover:bg-gray-300 font-bold px-4 rounded h-[55px] py-2"
      on:click={() => {
        selectedItem.new = true;
      }}
    >
      <img src="/images/icons/invoice.svg" alt="invoice" class="w-6 h-6" />
      <span>{$invoiceItems.length.toString()}</span>
    </button>
  </div>
  <div
    class="flex flex-col justify-center items-center use:clickOutside on:click_outside={handleClickOutside}"
  >
    <div class="mt-10 flex flex-col items-center" class:min-h-[300px]={selectedItem.new == false}>
      <div id="autocomplete" class="h-full w-[350px]" />
    </div>
    <h3>New Item</h3>
    <div class="relative flex flex-col">
      {#if selectedItem.new}
        <!-- <div class="flex justify-between w-[800px]">
        <h4>Product Type</h4>
        <p>{selectedItem.item.title}</p>
      </div> -->
        <!--
        Background backdrop, show/hide based on modal state.
      
        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
        -->
        <div
          class="inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
          class:fixed={selectedItem.new}
        />
        <div class="relative w-[500px] h-[600px] rounded-md">
          <div class="absolute top-0 left-0 px-6 flex flex-col justify-between gap-3 w-full py-8">
            <div class="flex justify-center items-center">
              <h3 class="font-semibold w-1/3 text-center">Item Name:</h3>
              <input
                type="text"
                class="input w-2/3"
                style="background-color: #f3f3f3 !important"
                bind:value={selectedItem.item.title}
              />
            </div>
            <div class="flex justify-center items-center">
              <h3 class="font-semibold w-1/3 text-center">Item Description:</h3>
              <input
                type="text"
                class="input w-2/3"
                style="background-color: #f3f3f3 !important"
                bind:value={selectedItem.item.description}
              />
            </div>
            <div class="flex justify-center items-center">
              <h3 class="font-semibold w-1/3 text-center">Qty Type:</h3>
              <select class="select w-2/3" bind:value={selectedItem.item.packageType}>
                <option value="pcs">Pieces</option>
                <option value="box">Box</option>
                <option value="ctn">Carton</option>
                <option value="lgs">LBs</option>
              </select>
            </div>
            <div class="flex justify-center items-center">
              <h3 class="font-semibold w-1/3 text-center">Qty:</h3>
              <input
                type="number"
                class="input w-2/3"
                style="background-color: #f3f3f3 !important"
                bind:value={selectedItem.item.picesPerBox}
                on:change={calculateTotal}
              />
            </div>
            <div class="flex justify-center items-center">
              <h3 class="font-semibold w-1/3 text-center">Price:</h3>
              <div class="flex gap-2 w-2/3">
                <input
                  type="number"
                  class="input w-2/3"
                  style="background-color: #f3f3f3 !important"
                  bind:value={selectedItem.item.price}
                  on:change={calculateTotal}
                />
                <label class="label w-1/3" for="priceFixed">
                  <input
                    type="checkbox"
                    id="priceFixed"
                    name="priceFixed"
                    class="checkbox"
                    bind:checked={fixedPrice}
                    on:change={calculateTotal}
                  />
                  <span class="font-semibold">Fixed Price</span>
                </label>
              </div>
            </div>
            <div class="flex justify-center items-center">
              <h3 class="font-semibold w-1/3 text-center">Discount:</h3>
              <input
                type="number"
                class="input w-2/3"
                style="background-color: #f3f3f3 !important"
                bind:value={selectedItem.item.discount}
                on:change={calculateTotal}
              />
            </div>
            <div class="flex justify-center items-center">
              <h3 class="font-semibold w-1/3 text-center">Total:</h3>
              <input
                type="number"
                class="input w-2/3"
                style="background-color: #f3f3f3 !important"
                bind:value={selectedItem.item.netPrice}
              />
            </div>
            <div class="mt-4 flex flex-col justify-center items-center gap-5 w-full">
              <button class="btn btn-primary w-[300px]" style="color:white" on:click={addtoInvoice}
                >Add to Bill</button
              >
              <button
                class="btn w-[300px]"
                style="color:white;background-color: red"
                on:click={() => (selectedItem.new = false)}>Cancel</button
              >
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
