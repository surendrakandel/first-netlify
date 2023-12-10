<script lang="ts">
  import Logo from '$src/components/widgets/Logo.svelte';
  export let data: any;
</script>

<div class="m-auto flex max-h-[1104px] max-w-[768px] flex-col" id="bol">
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
        <a class="block" href={`tel:${data?.quoteRequest?.delivery?.contact?.phoneNumber}`}>
          {data?.quoteRequest?.delivery?.contact?.name || ''}
        </a>
        <h4 class="mb-1" style="font-size: 14px;">
          {data?.quoteRequest?.delivery?.companyName}
        </h4>
        <h4 class="">{data?.quoteRequest?.delivery?.address?.addressLine1}</h4>
        <h4 class="">
          {data?.quoteRequest?.delivery?.address?.city}, {data?.quoteRequest?.delivery?.address
            ?.state}, {data?.quoteRequest?.delivery?.address?.zipCode}
        </h4>
        <a href={`tel:${data?.quoteRequest?.delivery?.contact?.emailAddress}`}
          >Email: {data?.quoteRequest?.delivery?.contact?.emailAddress}
        </a>
        <a class="block" href={`tel:${data?.quoteRequest?.delivery?.contact?.phoneNumber}`}
          >Phone: {data?.quoteRequest?.delivery?.contact?.phoneNumber}
        </a>
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
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>1</td>
        <td>$279.396</td>
        <td>$279.396</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" class="text-right">Subtotal</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Discount</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Tax</td>
        <td>$279.396</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Total</td>
        <td>$279.396</td>
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
