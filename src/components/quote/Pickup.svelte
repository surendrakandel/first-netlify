<script lang="ts">
  import QuotePickupZip from '$components/places/QuotePickupZip.svelte';
  import { getLocationTypes, pickupStore } from './pickup_store';
  import { validateZipCode } from '$src/lib/utils/validate_zipcode';
  function updateLocationServices(event: Event, value: number) {
    let eventValue = event.target as HTMLInputElement;
    if (eventValue?.checked) {
      if (value == 1) {
        pickupStore.update((services) => {
          // add value to locationServices if not exist
          services.locationServices.find((val) => val === 1)
            ? null
            : services.locationServices.push(1);
          services.locationServices = services.locationServices.filter((val) => val !== 2);
          return services;
        });
        $pickupStore.locationType = 1;
      }
      if (value == 2) {
        pickupStore.update((services) => {
          // add value to locationServices if not exist
          services.locationServices.find((val) => val === 2)
            ? null
            : services.locationServices.push(2);
          services.locationServices = services.locationServices.filter((val) => val !== 1);
          return services;
        });
        $pickupStore.locationType = 2;
      }
      if (value == 3) {
        pickupStore.update((services) => {
          // add value to locationServices if not exist
          services.locationServices.find((val) => val === 3)
            ? null
            : services.locationServices.push(3);
          return services;
        });
      }
      if (value == 4) {
        pickupStore.update((services) => {
          // add value to locationServices if not exist
          services.locationServices.find((val) => val === 4)
            ? null
            : services.locationServices.push(4);
          return services;
        });
      }
    } else {
      $pickupStore.locationServices = $pickupStore.locationServices.filter((val) => val !== value);
    }
    let liftDockIsUndefined =
      $pickupStore.locationServices.includes(1) || $pickupStore.locationServices.includes(2);
    if (!liftDockIsUndefined) {
      $pickupStore.locationType = 0;
    }
    console.log($pickupStore.locationServices);
  }
  function updateLocationServiceByLocationType(event: Event) {
    let eventValue = event.target as HTMLInputElement;
    console.log(eventValue.value);
    pickupStore.update((value) => {
      if (parseInt(eventValue.value) == 1) {
        pickupStore.update((value) => {
          // add value it does not exist
          value.locationServices.find((val) => val === 1) ? null : value.locationServices.push(1);
          value.locationServices = value.locationServices.filter((val) => val !== 2);
          return value;
        });
      } else if (parseInt(eventValue.value) == 2) {
        pickupStore.update((value) => {
          // add value it does not exist
          value.locationServices.find((val) => val === 2) ? null : value.locationServices.push(2);
          value.locationServices = value.locationServices.filter((val) => val !== 1);
          return value;
        });
      } else if (parseInt(eventValue.value) > 2) {
        pickupStore.update((value) => {
          // add value it does not exist
          value.locationServices.find((val) => val === 2) ? null : value.locationServices.push(2);
          value.locationServices = value.locationServices.filter((val) => val !== 1);
          return value;
        });
      }
      return value;
    });
    console.log($pickupStore.locationServices);
  }
</script>

<div class="py-4 flex flex-col gap-1">
  {#if $pickupStore && $pickupStore.address}
    <div class="mb-3 flex flex-col">
      <label class="pb-1" for="shipper_zipcode"><span>Pickup Zip Code</span></label>
      <QuotePickupZip />
    </div>
    <div class="min-w-[300px]">
      <label class="label" for="locationType">Pickup Location Type *</label>
      <select
        class="select"
        style="width:100%;background-color:#fff;"
        id="locationType"
        bind:value={$pickupStore.locationType}
        on:change={updateLocationServiceByLocationType}
      >
        {#each getLocationTypes() as locationType, index}
          {#if index == 0}
            <option value={0} selected disabled>Location type</option>
          {:else}
            <option value={locationType.locationType} label={locationType.name}
              >{locationType.name}</option
            >
          {/if}
        {/each}
      </select>
    </div>
    <div class="flex flex-wrap gap-x-6 mt-3">
      <label for="hasLoadingDockPickup" class="flex w-full items-center py-1 sm:w-auto">
        <input
          class="checkbox"
          style="height: 40px;width: 40px;"
          id="hasLoadingDockPickup"
          type="checkbox"
          name="hasLoadingDockPickup"
          checked={$pickupStore.locationServices.includes(1)}
          on:change={(e) => {
            updateLocationServices(e, 1);
          }}
        />
        <span class="ml-3">Has Loading Dock</span>
      </label>
      <label for="liftgatePickup" class="flex w-full items-center py-1 sm:w-auto">
        <input
          class="checkbox"
          style="height: 40px;width: 40px;"
          id="liftgatePickup"
          type="checkbox"
          name="liftgatePickup"
          checked={$pickupStore.locationServices.includes(2)}
          on:change={(e) => {
            updateLocationServices(e, 2);
          }}
        />
        <span class="ml-3">Needs Liftgate</span>
      </label>
      <label for="insidePickup" class="flex w-full items-center py-1 sm:w-auto">
        <input
          class="checkbox"
          style="height: 40px;width: 40px;"
          id="insidePickup"
          type="checkbox"
          name="insidePickup"
          checked={$pickupStore.locationServices.includes(3)}
          on:change={(e) => {
            updateLocationServices(e, 3);
          }}
        />
        <span class="ml-3">Inside Pickup</span>
      </label>
      <label for="appointmentPickup" class="flex w-full items-center py-1 sm:w-auto">
        <input
          class="checkbox"
          style="height: 40px;width: 40px;"
          id="appointmentPickup"
          type="checkbox"
          name="appointmentPickup"
          checked={$pickupStore.locationServices.includes(4)}
          on:change={(e) => {
            updateLocationServices(e, 4);
          }}
        />
        <span class="ml-3">Needs appointment</span>
      </label>
    </div>
  {/if}
</div>
