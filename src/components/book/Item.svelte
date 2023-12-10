<script lang="ts">
  import { allFreightClasses } from '$src/lib/utils/freight_class';
  import { allPackageTypes } from '$src/lib/utils/package_type';
  import type { commodity } from '$src/types/commodity';
  import type { Writable } from 'svelte/store';
  import { fade } from 'svelte/transition';
  export let commodityStore: Writable<commodity[]>;
  export let bgColor: string;
</script>

{#if $commodityStore.length > 0}
  {#each $commodityStore as item, index}
    <div transition:fade class={bgColor} id={'item_' + index} class:mt-6={index != 0}>
      <div class="flex flex-col my-4">
        <div class="flex flex-row items-center h-[50px] mb-3">
          <span class="label font-bold">Item {index + 1}</span>
        </div>
        <div class="flex w-full flex-col gap-1">
          <label class="mt-1" for={'description_' + index}> Shipment Description </label>
          <input
            type="text"
            required
            class="input w-full lg:w-[520px]"
            style="background-color:#ffffff;"
            id={'description_' + index}
            name="description"
            bind:value={$commodityStore[index]['description']}
            placeholder="what are you shipping?"
          />
          <!-- {#if !quoteIte.shipmentItemsErrors[index].description.valid}
            <span class="py-1  text-red-500 font-semibold"
              >{$quoteErrorsStore.shipmentItemsErrors[index].description.message}</span
            >
          {/if} -->
        </div>
        <div class="flex gap-2 flex-wrap">
          <div class="mt-2 flex w-full flex-col sm:w-[150px]">
            <label class="mt-1 w-full" for={'quantity_' + index}>Quantity</label>
            <input
              required
              readonly
              disabled
              class="input w-full"
              style="background-color:#ffffff;"
              id={'quantity_' + index}
              name="quantity"
              type="number"
              bind:value={item.quantity}
              min="1"
              max="20"
              placeholder="quantity"
            />
            <!-- {#if !$quoteErrorsStore.shipmentItemsErrors[index]?.quantity?.valid}
              <span class="py-1  text-red-500 font-semibold"
                >{$quoteErrorsStore.shipmentItemsErrors[index]?.quantity?.message}</span
              >
            {/if} -->
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[200px]">
            <label class="mt-1 w-full" for={'packageType_' + index}> Package Type </label>
            <select
              required
              disabled
              form="quoteForm"
              id={'packageType_' + index}
              name="packageType"
              class="select w-full"
              style="background-color:#ffffff;"
              bind:value={item.packageType}
            >
              {#each allPackageTypes as packageType}
                {#if packageType.value == 0}
                  <option selected value={''}>Select Package type </option>
                {:else}
                  <option value={packageType.value} label={packageType.name}
                    >{packageType.name}
                  </option>
                {/if}
              {/each}
            </select>
            <!-- {#if !$quoteErrorsStore.shipmentItemsErrors[index]?.packageType?.valid}
              <span class="py-1  text-red-500 font-semibold">
                {$quoteErrorsStore.shipmentItemsErrors[index]?.packageType?.message}
              </span>
            {/if} -->
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[150px]">
            <label class="mt-1" for={'length_' + index}>Length</label>
            <input
              required
              readonly
              disabled
              id={'length_' + index}
              name="length"
              type="number"
              placeholder="inch"
              class="input"
              style="background-color:#ffffff;"
              autocomplete="on"
              bind:value={$commodityStore[index]['length']}
            />
            <!-- {#if !$quoteErrorsStore.shipmentItemsErrors[index]?.length?.valid}
              <span class="py-1  text-red-500 font-semibold"
                >{$quoteErrorsStore.shipmentItemsErrors[index]?.length.message}</span
              >
            {/if} -->
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[150px]">
            <label class="mt-1" for={'width_' + index}>Width</label>
            <input
              id={'width_' + index}
              name="width"
              type="number"
              placeholder="inch"
              required
              readonly
              disabled
              class="input"
              style="background-color:#ffffff;"
              autocomplete="on"
              bind:value={$commodityStore[index]['width']}
            />
            <!-- {#if !$quoteErrorsStore.shipmentItemsErrors[index]?.width?.valid}
              <span class="py-1  text-red-500 font-semibold"
                >{$quoteErrorsStore.shipmentItemsErrors[index]?.width?.message}</span
              >
            {/if} -->
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[150px]">
            <label class="mt-1" for={'height_' + index}>Height</label>
            <input
              id={'height_' + index}
              name="height"
              type="number"
              placeholder="inch"
              required
              readonly
              disabled
              class="input"
              style="background-color:#ffffff;"
              autocomplete="on"
              bind:value={$commodityStore[index]['height']}
            />
            <!-- {#if !$quoteErrorsStore.shipmentItemsErrors[index].height.valid}
              <span class="py-1  text-red-500 font-semibold"
                >{$quoteErrorsStore.shipmentItemsErrors[index]?.height?.message}</span
              >
            {/if} -->
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[200px]">
            <label class="mt-1" for={'weight_' + index}>Total Weight</label>
            <input
              type="number"
              class="input"
              id={'weight_' + index}
              name="weight"
              required
              readonly
              disabled
              style="background-color:#ffffff;"
              bind:value={$commodityStore[index]['weight']}
              placeholder="total weight lbs"
            />
            <!-- {#if !$quoteErrorsStore.shipmentItemsErrors[index]?.weight?.valid}
              <span class="py-1  text-red-500 font-semibold"
                >{$quoteErrorsStore.shipmentItemsErrors[index]?.weight?.message}</span
              >
            {/if} -->
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[200px]">
            <label class="mt-1" for={'freightClass_' + index}>Freight Class</label>
            <select
              id={'freightClass_' + index}
              name="freightClass"
              required
              disabled
              style="background-color:#ffffff;"
              class="select-accent select"
              bind:value={$commodityStore[index]['freightClass']}
            >
              {#each allFreightClasses as freight, index}
                {#if index == 0}
                  <option selected={true} disabled={true} value={0}> Select Freight Class </option>
                {:else if freight.stringValue != 'UNRECOGNIZED'}
                  <option value={freight.value} label={freight.name}>
                    {freight.name}
                  </option>
                {/if}
              {/each}
            </select>
          </div>
        </div>
      </div>
    </div>
  {/each}
{/if}
