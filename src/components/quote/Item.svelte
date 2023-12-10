<script lang="ts">
  import { get, writable, type Writable } from 'svelte/store';
  import { fade } from 'svelte/transition';
  import toast from 'svelte-french-toast';
  import {
    addCommodity,
    initItemErrorData,
    removeCommodity,
    type quoteItemErrors,
    validateQuantity,
    calculateFreightClass,
    validateLength,
    validateWidth,
    validateHeight,
    validateWeight,
    commodityStore
  } from './commodity_store';
  import { allFreightClasses } from '$src/lib/utils/freight_class';
  import { allPackageTypes } from '$src/lib/utils/package_type';
  export let bgColor = '';
  let quoteItemErrorsStore: Writable<quoteItemErrors> = initItemErrorData();
  function updateCommodityServices(event: Event, value: number, index: number) {
    let eventValue = event.target as HTMLInputElement;
    commodityStore.update((val) => {
      let commodity = val[index];
      if (eventValue?.checked && !commodity.commodityServices.includes(value)) {
        commodity.commodityServices.push(value);
      } else if (!eventValue?.checked) {
        commodity.commodityServices = commodity.commodityServices.filter((val) => val !== value);
      }
      val[index] = commodity;
      return val;
    });
    console.log($commodityStore);
  }
  function updateDimensions(event: Event, index: number) {
    let eventValue = event.target as HTMLInputElement;

    if (eventValue && eventValue?.value == '1') {
      commodityStore.update((val) => {
        let commodity = val[index];
        commodity.length = 48;
        commodity.width = 40;
        commodity.packageType = 1;
        val[index] = commodity;
        return val;
      });
    }
    if (eventValue && eventValue?.value == '2') {
      commodityStore.update((val) => {
        let commodity = val[index];
        commodity.length = 48;
        commodity.width = 48;
        commodity.packageType = 2;
        val[index] = commodity;
        return val;
      });
    }
  }
</script>

{#if $commodityStore}
  {#each $commodityStore as commodity, index}
    <div transition:fade class={bgColor} id={'item_' + index} class:mt-4={index != 0}>
      <div class="flex flex-col my-4">
        <div class="flex flex-row items-center h-[50px] mb-3">
          <span class="label font-bold">Item {index + 1}</span>
          <span
            class="ml-10 w-10 h-10 rounded-full"
            style="background-color: rgba(252, 101, 60, 0.702)"
          >
            <button type="button" class="h-full w-full" on:click={() => removeCommodity(index)}>
              <i class="fa-solid fa-trash-can w-[40px] text-white" />
            </button>
          </span>
        </div>
        <div class="flex w-full flex-col">
          <label class="my-1" for={'description_' + index}
            ><span> Shipment Description</span>
          </label>
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
          {#if !$quoteItemErrorsStore.description.valid}
            <span class="py-1 text-red-500 font-semibold"
              >{$quoteItemErrorsStore?.description?.message}</span
            >
          {/if}
        </div>
        <div class="flex gap-2 flex-wrap">
          <div class="mt-2 flex w-full flex-col sm:w-[150px]">
            <label class="my-1 w-full" for={'quantity_' + index}><span>Quantity</span></label>
            <input
              required
              class="input w-full"
              style="background-color:#ffffff;"
              id={'quantity_' + index}
              name="quantity"
              type="number"
              bind:value={$commodityStore[index].quantity}
              min="1"
              max="20"
              on:change={(event) => {
                validateQuantity(event, quoteItemErrorsStore);
                calculateFreightClass(index, quoteItemErrorsStore);
              }}
              placeholder="quantity"
            />
            {#if !$quoteItemErrorsStore?.quantity?.valid}
              <span class="py-1 text-red-500 font-semibold error"
                >{$quoteItemErrorsStore?.quantity?.message}</span
              >
            {/if}
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[250px]">
            <label class="my-1 w-full" for={'packageType_' + index}>
              <span>Package Type</span>
            </label>
            <select
              required
              form="quoteForm"
              id={'packageType_' + index}
              name="packageType"
              class="select w-full"
              style="background-color:#ffffff;"
              on:invalid={() => {
                toast.error('please select package type');
              }}
              on:change={(event) => {
                updateDimensions(event, index);
              }}
              bind:value={$commodityStore[index].packageType}
            >
              {#each allPackageTypes as packageType, index}
                {#if index === 0}
                  <option
                    value={packageType.value}
                    selected={packageType.value === 0}
                    disabled={packageType.value === 0}
                  >
                    Package Type
                  </option>
                {:else if packageType.stringValue !== 'UNRECOGNIZED'}
                  <option value={packageType.value} label={packageType.name}>
                    {packageType.name}
                  </option>
                {/if}
              {/each}
            </select>
            {#if !$quoteItemErrorsStore?.packageType?.valid}
              <span class="py-1 text-red-500 font-semibold error">
                {$quoteItemErrorsStore?.packageType?.message}
              </span>
            {/if}
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[150px]">
            <label class="my-1" for={'length_' + index}><span>Length</span></label>
            <input
              required
              id={'length_' + index}
              name="length"
              type="number"
              placeholder="inch"
              class="input"
              style="background-color:#ffffff;"
              autocomplete="on"
              on:change={(event) => {
                validateLength(event, quoteItemErrorsStore);
                calculateFreightClass(index, quoteItemErrorsStore);
              }}
              bind:value={$commodityStore[index]['length']}
            />
            {#if !$quoteItemErrorsStore?.length?.valid}
              <span class="py-1 text-red-500 font-semibold error"
                >{$quoteItemErrorsStore?.length?.message}</span
              >
            {/if}
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[150px]">
            <label class="my-1" for={'width_' + index}><span>Width</span></label>
            <input
              id={'width_' + index}
              name="width"
              type="number"
              placeholder="inch"
              required
              class="input"
              style="background-color:#ffffff;"
              on:change={(event) => {
                validateWidth(event, quoteItemErrorsStore);
                calculateFreightClass(index, quoteItemErrorsStore);
              }}
              autocomplete="on"
              bind:value={$commodityStore[index]['width']}
            />
            {#if !$quoteItemErrorsStore?.width?.valid}
              <span class="py-1 text-red-500 font-semibold error"
                >{$quoteItemErrorsStore?.width?.message}</span
              >
            {/if}
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[150px]">
            <label class="my-1" for={'height_' + index}><span>Height</span></label>
            <input
              id={'height_' + index}
              name="height"
              type="number"
              placeholder="inch"
              required
              class="input"
              style="background-color:#ffffff;"
              on:change={(event) => {
                validateHeight(event, quoteItemErrorsStore);
                calculateFreightClass(index, quoteItemErrorsStore);
              }}
              autocomplete="on"
              bind:value={$commodityStore[index]['height']}
            />
            {#if !$quoteItemErrorsStore?.height?.valid}
              <span class="py-1 text-red-500 font-semibold error"
                >{$quoteItemErrorsStore?.height?.message}</span
              >
            {/if}
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[200px]">
            <label class="my-1" for={'weight_' + index}><span>Total Weight</span></label>
            <input
              type="number"
              class="input"
              id={'weight_' + index}
              name="weight"
              required
              style="background-color:#ffffff;"
              on:change={(event) => {
                validateWeight(event, quoteItemErrorsStore);
                calculateFreightClass(index, quoteItemErrorsStore);
              }}
              bind:value={$commodityStore[index]['weight']}
              placeholder="total weight lbs"
            />
            {#if !$quoteItemErrorsStore?.weight?.valid}
              <span class="py-1 text-red-500 font-semibold error"
                >{$quoteItemErrorsStore?.weight?.message}</span
              >
            {/if}
          </div>
          <div class="mt-2 flex w-full flex-col sm:w-[250px]">
            <label class="my-1" for={'freightClass_' + index}><span>Freight Class</span></label>
            <select
              id={'freightClass_' + index}
              name="freightClass"
              required
              style="background-color:#ffffff;"
              class="select-accent select"
              bind:value={$commodityStore[index]['freightClass']}
            >
              {#each allFreightClasses as freight, index}
                {#if index == 0}
                  <option selected={true} disabled={true} value={freight.value}>
                    freight class
                  </option>
                {:else if freight.stringValue != 'UNRECOGNIZED'}
                  <option value={freight.value} label={freight.name}>
                    {freight.name}
                  </option>
                {/if}
              {/each}
            </select>
          </div>
        </div>
        <div class="flex w-full flex-col mt-3">
          <label class="my-1" for={'commodityServices_' + index}><span>Item Services</span> </label>
          <div class="flex flex-wrap gap-x-8 mt-1">
            <label for={'guaranteed_' + index} class="flex w-full items-center py-1 sm:w-auto">
              <input
                class="checkbox"
                style="height: 40px;width: 40px;"
                id={'guaranteed_' + index}
                type="checkbox"
                name={'guaranteed_' + index}
                on:change={(e) => {
                  updateCommodityServices(e, 2, index);
                }}
              />
              <span class="ml-3 min-w-[200px]">Guaranteed Delivery</span>
            </label>
            <label for={'hazardous_' + index} class="flex w-full items-center py-1 sm:w-auto">
              <input
                class="checkbox"
                style="height: 40px;width: 40px;"
                id={'hazardous_' + index}
                type="checkbox"
                name={'hazardous_' + index}
                on:change={(e) => {
                  updateCommodityServices(e, 3, index);
                }}
              />
              <span class="ml-3 min-w-[200px]">Hazardous</span>
            </label>
            <label for={'stackable_' + index} class="flex w-full items-center py-1 sm:w-auto">
              <input
                class="checkbox"
                style="height: 40px;width: 40px;"
                id={'stackable_' + index}
                type="checkbox"
                name={'stackable' + index}
                on:change={(e) => {
                  updateCommodityServices(e, 4, index);
                }}
              />
              <span class="ml-3 min-w-[200px]">Stackable</span>
            </label>
            <label
              for={'protectFromFreeze_' + index}
              class="flex w-full items-center py-1 sm:w-auto"
            >
              <input
                class="checkbox"
                style="height: 40px;width: 40px;"
                id={'protectFromFreeze_' + index}
                type="checkbox"
                name={'protectFromFreeze' + index}
                on:change={(e) => {
                  updateCommodityServices(e, 0, index);
                }}
              />
              <span class="ml-3 min-w-[200px]">Protect From Freeze</span>
            </label>
            <label
              for={'sortAndSegregate_' + index}
              class="flex w-full items-center py-1 sm:w-auto"
            >
              <input
                class="checkbox"
                style="height: 40px;width: 40px;"
                id={'sortAndSegregate_' + index}
                type="checkbox"
                name={'sortAndSegregate' + index}
                on:change={(e) => {
                  updateCommodityServices(e, 1, index);
                }}
              />
              <span class="ml-3 min-w-[200px]">Sort And Segregate</span>
            </label>
          </div>
        </div>
        <div class="pl-2 sm:pl-0 pr-2 flex flex-col w-full] mt-6">
          <p class="text-wrap text-lg font-semibold">
            If You have different sized packages/pallets please add new items.
          </p>
          <button
            style="color:white;height: 40px;font-size: .8rem;"
            class="bg-primary ownBtn w-[300px] font-mono hover:opacity-90 mt-3"
            on:click|preventDefault={() => addCommodity(get(commodityStore).length)}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  {/each}
{/if}

<style>
  button {
    color: white !important;
  }
  span,
  label {
    color: #1d1d1d;
    font-weight: 700;
    font-size: 16px;
  }
</style>
