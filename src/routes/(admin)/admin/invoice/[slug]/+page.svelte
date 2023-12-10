<script lang="ts">
  import Logo from '$src/components/widgets/Logo.svelte';
  import { invoiceItems } from '$src/routes/(admin)/admin/invoice/invoice_store';
  export let data: any;
  console.log('invoiceItems are', $invoiceItems);
</script>

<div class="p-2 min-h-[100vh]">
  <div class="flex max-w-[900px] flex-col px-6 py-12 ml-8" id="bol">
    <div class="mb-2 flex justify-between">
      <div class="w-1/2">
        <Logo />
      </div>
      <div class="flex h-full w-1/2 flex-col place-items-end self-end">
        <h3 class="text-2xl font-bold" style="font-size:30px;">Invoice</h3>
        <h3 class="font-bold" style="font-size:20px">Invoice #12365</h3>
      </div>
    </div>
    <div class="flex w-full flex-col" style="margin-top:15px;">
      <div class="flex w-1/2 flex-col gap-1">
        <a class="block" href={`tel:${data?.quoteRequest?.pickup?.contact?.phoneNumber}`}>
          <span class="personName" style="text-transform:capitalize"
            >{data?.quoteRequest?.pickup?.contact?.name || ''}</span
          >
        </a>
        <h4 class="text-uppercase companyName mb-1 text-[20px] font-bold" style="font-size: 16px">
          {data?.quoteRequest?.pickup?.companyName}
        </h4>
        <h4 class="">{data?.quoteRequest?.pickup?.address?.addressLine1}</h4>
        <h4 class="">
          {data?.quoteRequest?.pickup?.address?.city}, {data?.quoteRequest?.pickup?.address?.state}, {data
            ?.quoteRequest?.pickup?.address?.zipCode}
        </h4>
        <a href={`tel:${data?.quoteRequest?.pickup?.contact?.emailAddress}`}
          >Email: {data?.quoteRequest?.pickup?.contact?.emailAddress}</a
        >
        <a class="block" href={`tel:${data?.quoteRequest?.pickup?.contact?.phoneNumber}`}
          >Phone: {data?.quoteRequest?.pickup?.contact?.phoneNumber}</a
        >
      </div>
      <h3 class="mt-2 text-2xl font-bold">Bill To</h3>
      <div class="flex w-[300px] gap-2 border-b-[1px] border-gray-500" />
      <div class="flex w-full justify-between">
        <div class="flex w-1/2 flex-col gap-1 py-3">
          <lable for="billTo" class="font-bold">Name</lable>
          <input
            type="text"
            class="py-1 px-2 max-w-[300px]"
            bind:value={data.quoteRequest.delivery.contact.name}
          />
          <div class="mb-1 flex flex-col" style="font-size: 14px;">
            <lable for="billTo" class="font-bold">Company Name</lable>
            <input
              type="text"
              class="py-1 px-2 max-w-[300px]"
              bind:value={data.quoteRequest.delivery.companyName}
            />
          </div>
          <div class="mb-1 flex flex-col" style="font-size: 14px;">
            <lable for="billTo" class="font-bold">Steet</lable>
            <input
              type="text"
              class="py-1 px-2 max-w-[300px]"
              bind:value={data.quoteRequest.delivery.address.addressLine1}
            />
          </div>
          <div class="flex gap-3 w-[300px]">
            <div class="mb-1 flex flex-col w-1/2" style="font-size: 14px;">
              <lable for="billTo" class="font-bold">City</lable>
              <input
                type="text"
                class="py-1 px-2 w-full"
                bind:value={data.quoteRequest.delivery.address.city}
              />
            </div>
            <div class="mb-1 flex flex-col w-1/2" style="font-size: 14px;">
              <lable for="billTo" class="font-bold w-full">State</lable>
              <input
                type="text"
                class="py-1 px-2 w-full"
                bind:value={data.quoteRequest.delivery.address.state}
              />
            </div>
          </div>
          <div class="mb-1 flex flex-col" style="font-size: 14px;">
            <lable for="billTo" class="font-bold">Country</lable>
            <input
              type="text"
              class="py-1 px-2 max-w-[300px]"
              bind:value={data.quoteRequest.delivery.address.country}
            />
          </div>
          <div class="mb-1 flex flex-col" style="font-size: 14px;">
            <lable for="billTo" class="font-bold">Email</lable>
            <input
              type="text"
              class="py-1 px-2 max-w-[300px]"
              bind:value={data.quoteRequest.delivery.contact.emailAddress}
            />
          </div>
          <div class="mb-1 flex flex-col" style="font-size: 14px;">
            <lable for="billTo" class="font-bold">Phone</lable>
            <input
              type="text"
              class="py-1 px-2 max-w-[300px]"
              bind:value={data.quoteRequest.delivery.contact.phoneNumber}
            />
          </div>
        </div>
        <div class="flex w-1/2 flex-col place-items-end py-3">
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl">Balance Due: $279.396</h3>
            <h3 class="text-xl">Term: 0</h3>
            <h3 class="text-xl">Due Date: {new Date().toLocaleDateString().split('T')[0]}</h3>
          </div>
        </div>
      </div>
    </div>
    <table class="">
      <thead class="" style="background-color:blue;!important">
        <tr class="" style="background-color:blue;!important">
          <th class="">SN</th>
          <th class="">Description</th>
          <th class="">Quantity</th>
          <th class="">Unit Price</th>
          <th class="">Amount</th>
        </tr>
      </thead>
      <tbody>
        {#each $invoiceItems as item, index}
          <tr>
            <td>{index}</td>
            <td>{item.item.description}</td>
            <td>{item.item.picesPerBox}</td>
            <td>{item.item.price}</td>
            <td>${item.item.price}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-right">Subtotal</td>
          <td />
        </tr>
        <tr>
          <td colspan="4" class="text-right">Discount</td>
          <td />
        </tr>
        <tr>
          <td colspan="4" class="text-right">Tax</td>
          <td />
        </tr>
        <tr>
          <td colspan="4" class="text-right">Total</td>
          <td />
        </tr>
      </tfoot>
    </table>
    <div class="flex flex-col gap-1 pt-4">
      <h3 class="font-bold">Notes</h3>
      <div class="flex w-full gap-2 border-b-[1px] border-gray-500" />
      <div class="flex flex-col gap-1">
        <textarea class="w-full p-3 shadow-sm" rows="1" />
      </div>
      <div>
        <h3 class="font-bold">Terms & Conditions</h3>
        <div class="flex w-full gap-2 border-b-[1px] border-gray-500" />
        <div class="flex flex-col gap-1">
          <textarea class="w-full p-3 shadow-sm" rows="1" />
        </div>
      </div>
      <div>
        <h3 class="font-bold">Payment Instructions</h3>
        <div class="flex w-full gap-2 border-b-[1px] border-gray-500" />
        <div class="flex flex-col gap-1">
          <textarea class="w-full p-3 shadow-sm" rows="1" />
        </div>
      </div>
      <div>
        <h3 class="pt-5 font-bold">Thank you for your business</h3>
      </div>
    </div>
  </div>
</div>
