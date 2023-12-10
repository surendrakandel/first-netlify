<script lang="ts">
  import QuoteDeliveryZip from '$components/places/QuoteDeliveryZip.svelte';
  import { deliveryStore } from './delivery_store';
  import { getLocationTypes } from './pickup_store';
  import { validateZipCode } from '$src/lib/utils/validate_zipcode';
  function updateLocationServices(event: Event, value: number) {
    let eventValue = event.target as HTMLInputElement;
    if (eventValue?.checked) {
      if (value == 1) {
        deliveryStore.update((services) => {
          // add value to locationServices if not exist
          services.locationServices.find((val) => val === 1)
            ? null
            : services.locationServices.push(1);
          services.locationServices = services.locationServices.filter((val) => val !== 2);
          return services;
        });
        $deliveryStore.locationType = 1;
      }
      if (value == 2) {
        deliveryStore.update((services) => {
          // add value to locationServices if not exist
          services.locationServices.find((val) => val === 2)
            ? null
            : services.locationServices.push(2);
          services.locationServices = services.locationServices.filter((val) => val !== 1);
          return services;
        });
        $deliveryStore.locationType = 2;
      }
      if (value == 3) {
        deliveryStore.update((services) => {
          // add value to locationServices if not exist
          services.locationServices.find((val) => val === 3)
            ? null
            : services.locationServices.push(3);
          return services;
        });
      }
      if (value == 4) {
        deliveryStore.update((services) => {
          // add value to locationServices if not exist
          services.locationServices.find((val) => val === 4)
            ? null
            : services.locationServices.push(4);
          return services;
        });
      }
    } else {
      $deliveryStore.locationServices = $deliveryStore.locationServices.filter(
        (val) => val !== value
      );
    }
    let liftDockIsUndefined =
      $deliveryStore.locationServices.includes(1) || $deliveryStore.locationServices.includes(2);
    if (!liftDockIsUndefined) {
      $deliveryStore.locationType = 0;
    }
    console.log($deliveryStore.locationServices);
  }
  function updateLocationServiceByLocationType(event: Event) {
    let eventValue = event.target as HTMLInputElement;
    console.log(eventValue.value);
    deliveryStore.update((value) => {
      if (parseInt(eventValue.value) == 1) {
        deliveryStore.update((value) => {
          // add value it does not exist
          value.locationServices.find((val) => val === 1) ? null : value.locationServices.push(1);
          value.locationServices = value.locationServices.filter((val) => val !== 2);
          return value;
        });
      } else if (parseInt(eventValue.value) == 2) {
        deliveryStore.update((value) => {
          // add value it does not exist
          value.locationServices.find((val) => val === 2) ? null : value.locationServices.push(2);
          value.locationServices = value.locationServices.filter((val) => val !== 1);
          return value;
        });
      } else if (parseInt(eventValue.value) > 2) {
        deliveryStore.update((value) => {
          // add value it does not exist
          value.locationServices.find((val) => val === 2) ? null : value.locationServices.push(2);
          value.locationServices = value.locationServices.filter((val) => val !== 1);
          return value;
        });
      }
      return value;
    });
    console.log($deliveryStore.locationServices);
  }
</script>

<div class="py-4 flex flex-col gap-1">
  {#if $deliveryStore && $deliveryStore?.address}
    <div class="mb-3 flex flex-col">
      <label class="pb-1" for="shipper_zipcode"><span>Delivery Zip Code</span></label>
      <QuoteDeliveryZip />
    </div>
    <div class="min-w-[300px]">
      <label class="label" for="locationType">Delivery Location Type *</label>
      <select
        class="select"
        style="width:100%;background-color:#fff;"
        id="locationType"
        bind:value={$deliveryStore.locationType}
        on:change={updateLocationServiceByLocationType}
      >
        {#each getLocationTypes() as locationType, index}
          {#if index == 0}
            <option value={0} selected disabled>Location Type</option>
          {:else}
            <option value={locationType.locationType} label={locationType.name}
              >{locationType.name}</option
            >
          {/if}
        {/each}
      </select>
    </div>
    <div class="flex flex-wrap gap-x-6 mt-3">
      <label for="hasLoadingDockDelivery" class="flex w-full items-center py-1 sm:w-auto">
        <input
          class="checkbox"
          style="height: 40px;width: 40px;"
          id="hasLoadingDockDelivery"
          type="checkbox"
          name="hasLoadingDockDelivery"
          checked={$deliveryStore.locationServices.includes(1)}
          on:change={(e) => {
            updateLocationServices(e, 1);
          }}
        />
        <span class="ml-3">Has Loading Dock</span>
      </label>
      <label for="liftgateDelivery" class="flex w-full items-center py-1 sm:w-auto">
        <input
          class="checkbox"
          style="height: 40px;width: 40px;"
          id="liftgateDelivery"
          type="checkbox"
          name="liftgateDelivery"
          checked={$deliveryStore.locationServices.includes(2)}
          on:change={(e) => {
            updateLocationServices(e, 2);
          }}
        />
        <span class="ml-3">Needs Liftgate</span>
      </label>
      <label for="insideDelivery" class="flex w-full items-center py-1 sm:w-auto">
        <input
          class="checkbox"
          style="height: 40px;width: 40px;"
          id="insideDelivery"
          type="checkbox"
          name="insideDelivery"
          checked={$deliveryStore.locationServices.includes(3)}
          on:change={(e) => {
            updateLocationServices(e, 3);
          }}
        />
        <span class="ml-3">Inside Delivery</span>
      </label>
      <label for="needAppointmentDelivery" class="flex w-full items-center py-1 sm:w-auto">
        <input
          class="checkbox"
          style="height: 40px;width: 40px;"
          id="needAppointmentDelivery"
          type="checkbox"
          name="needAppointmentDelivery"
          checked={$deliveryStore.locationServices.includes(4)}
          on:change={(e) => {
            updateLocationServices(e, 4);
          }}
        />
        <span class="ml-3">Needs Appointment</span>
      </label>
    </div>
  {/if}
</div>
