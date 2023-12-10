<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import toast from 'svelte-french-toast';
    import { getBookingByBookingId } from '$src/apis/booking/get_booking_by_bookingId';
    import type { bookingResponse } from '$src/types/book';
    import { onMount } from 'svelte';
    import Loading from '$src/components/widgets/Loading.svelte';
    export let data: any;
    let loading = true;
    let bookingRes: bookingResponse = {
      quoteRequest: undefined,
      bookingInfo: undefined,
      svgData: '',
      bid: undefined
    };

    onMount(async () => {
      try {
        debugger;
        let bookId = $page.params.slug;
        if (bookId) {
          bookingRes = await getBookingByBookingId(bookId);
          loading = false;
        }
        console.log(bookingRes);
      } catch (error) {
        toast.success('invalid booking request');
        await goto('/admin/quote');
      }
    });
    let files: any = null;
    let dataFile: any = null;
    async function upload(e: Event) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('fileName', files.name);
      formData.append('bookingResponse', JSON.stringify(bookingRes));
      formData.append('invoice', files[0]);
      formData.append('accountingPlatform', parseRequest.accountingPlatform);
      formData.append('customerId', parseRequest.customerId);
      formData.append('paymentTerm', parseRequest.paymentTerm);
      formData.append('paymentMethod', parseRequest.paymentMethod);
      formData.append('includeShipping', parseRequest.includeShipping.toString());
  
      try {
        const upload = await fetch('http://127.0.0.1:8090/aiparser/invoice', {
          method: 'POST',
          body: formData
        });
      } catch (error) {
        console.log(error);
      }
    }
    let parseRequest = {
      fileName: '',
      bookingResponse: bookingRes,
      invoice: '',
      accountingPlatform: '',
      customerId: '',
      paymentTerm: '',
      paymentMethod: '',
      includeShipping: false
    };
    let pdfData = atob(data.pdfBase64);
  let pdfURL = ""
  onMount(async()=>{
    let response = await fetch(`data:application/pdf;base64,${pdfData}`);
    let pdfBlob = await response.blob();
    pdfURL = URL.createObjectURL(pdfBlob);
  })

  function openBase64NewTab(base64Pdf: string): void {
    var blob = base64toBlob(base64Pdf);
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
  }
  function base64toBlob(base64Data: string) {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: "application/pdf" });
  }

  </script>
  
  <div class="p-2 min-h-[100vh]  max-w-[1100px]">
    {#if loading}
      <Loading loadingText="Generating BOL" />
    {:else}
      <div class="flex flex-col justify-center rounded-lg">
        <div class="w-full rounded-lg bg-gray-100 p-8 md:w-[700px]">
          <div class="flex w-full justify-start gap-3 py-2">
            <div class="w-[80px]">
              <img src="/images/icons/pallet.svg" width="40" alt="pickup icon" class="self-center" />
            </div>
          </div>
          <h2 class="mt-1 w-full py-2">Shipment Info</h2>
          <div class="mt-3 flex w-full justify-start gap-3">
            <div class="w-1/2">
              <h3 class="">Origin</h3>
              <p class="py-2 tracking-wide">
                {bookingRes?.quoteRequest?.pickup?.address?.zipCode || ''}
              </p>
            </div>
            <div class="w-1/2">
              <h3 class="">Destination</h3>
              <p class="py-2 tracking-wide">
                {bookingRes?.quoteRequest?.delivery?.address?.zipCode || ''}
              </p>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap font-bungee">
            <h3 class="w-[30px]">S.N</h3>
            <h3 class="w-[100px]">Package Type</h3>
            <h3 class="w-[130px]">Dimensions</h3>
            <h3 class="w-[70px]">Weight</h3>
          </div>
          <div class="flex w-full flex-wrap">
            {#if bookingRes?.quoteRequest?.commodities}
              {#each bookingRes?.quoteRequest?.commodities as commodity, index}
                <p class="w-[30px] py-2 font-mono font-semibold">
                  {index + 1}
                </p>
                <p class="w-[100px] py-2 font-mono font-semibold">
                  {commodity.packageType == 1
                    ? 'Pallet'
                    : commodity.packageType == 2
                    ? 'Box'
                    : commodity.packageType == 3
                    ? 'Bundle'
                    : commodity.packageType == 4
                    ? 'Crate'
                    : commodity.packageType == 5
                    ? 'Loose'
                    : commodity.packageType == 6
                    ? 'Pieces'
                    : commodity.packageType == 7
                    ? 'Roll'
                    : 'Unrecognized'}
                </p>
                <p class="w-[130px] py-2 font-mono font-semibold">
                  {commodity?.length}*{commodity?.width}*{commodity?.height}
                  {commodity?.dimensionUOM?.INCH ? 'inch' : 'cm'}
                </p>
                <p class="w-[70px] py-2 font-mono font-semibold">
                  {commodity.weight}
                  {commodity?.weightUOM?.LB == true ? 'lbs' : 'kgs'}
                </p>
              {/each}
            {/if}
          </div>
          <h3 class="self-center py-3 text-xl">Booking Was Succesfull</h3>
          <div class="flex flex-col py-3">
            <button class="ownBtn btn-accent btn mt-5 w-[300px] font-bungee" on:click={()=>openBase64NewTab(data.pdfBase64)}>Download BOL</button>
          </div>
        </div>
      </div>
      <div class="hidden my-4 w-full rounded-lg p-5 md:w-[700px]">
        <h3 class="text-2xl">Create Invoice</h3>
        <form class="flex flex-col gap-2" on:submit|preventDefault={upload}>
          <h3 class="pt-3 font-bungee">Select Invoice Image</h3>
          <div class="flex items-center">
            <input id="fileUpload" type="file" bind:files name="invoice" class="input p-2" />
            {#if dataFile && files[0]}
              <p>
                {files[0]?.name}
              </p>
            {/if}
          </div>
          <div class="flex flex-col">
            <label for="accountingPlatform" class="">Accounting Software</label>
            <select
              id="accountingPlatform"
              name="accoutingPlatform"
              class="select px-2 py-2"
              style="background-color: #white;"
              bind:value={parseRequest.accountingPlatform}
            >
              <option value="quickBooks" class="">Quickbooks</option>
              <option value="freshBooks">FreshBooks</option>
              <option value="zohoBooks">ZohoBooks</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="" for="customerId">Customer Id</label>
            <input
              id="customerId"
              name="customerId"
              class="input px-2 py-2"
              style="background-color: #white;"
              bind:value={parseRequest.customerId}
            />
          </div>
          <div class="flex flex-col">
            <label class="" for="paymentTerm">Payment Term</label>
            <select
              id="paymentTerm"
              name="paymentTerm"
              class="select px-2 py-2"
              style="background-color: #white;"
              bind:value={parseRequest.paymentTerm}
            >
              <option value="dueOnReceipt" class="">Due on Receipt</option>
              <option value="net10">Net 10</option>
              <option value="net15">Net 15</option>
              <option value="net30">Net 30</option>
              <option value="net45">Net 45</option>
              <option value="net60">Net 60</option>
              <option value="net90">Net 90</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="paymentMethod" class="">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              class="select px-2 py-2"
              style="background-color: #white;"
              bind:value={parseRequest.paymentMethod}
            >
              <option value="card" class="">Debit/Credit Card</option>
              <option value="ach">ACH</option>
              <option value="check">Check</option>
            </select>
          </div>
          <div class="flex w-full py-2">
            <label for="includeShipping" class="flex items-center gap-1 font-bungee">
              <input
                type="checkbox"
                name="includeShipping"
                id="includeShipping"
                class="checkbox"
                bind:checked={parseRequest.includeShipping}
              />
              Include Shipping Cost
            </label>
          </div>
          <button
            class="btn-primary btn mt-8 max-w-[300px] font-bungee"
            style="color:white;"
            on:click|preventDefault={upload}>Create Invoice</button
          >
        </form>
      </div>
    {/if}
  </div>