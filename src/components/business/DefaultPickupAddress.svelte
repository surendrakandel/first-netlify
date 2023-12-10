<script lang="ts">
  import Place from '$src/components/places/AddressInput.svelte';
  import { Icon, Pencil } from 'svelte-hero-icons';
  import { updatePickupAddress } from '$src/apis/business/update_pickup_address';
  import type { address } from '$src/types/address';
  import { basicStore, updateBasicStore } from '$src/routes/(admin)/admin/basic_store';
  import { getBasicInfo } from '$src/apis/business/get_basic_info';
  let edit_default_pickup_location_active = false;
  function updateDefaultPickupLocation(data: address) {
    edit_default_pickup_location_active = false;
    updatePickupAddress(data)
      .then((res) => {
        getBasicInfo().then((res) => {
          updateBasicStore(res);
          window.location.reload();
        });
      })
      .catch((error) => {
        console.debug(error);
      });
    edit_default_pickup_location_active = false;
  }
  function editDefaultPickupLocation() {
    edit_default_pickup_location_active = true;
    setTimeout(() => {
      edit_default_pickup_location_active = false;
    }, 20000);
  }
</script>

<div class="mt-2 w-full">
  <div class="flex min-h-[100px] w-full flex-col gap-2 sm:items-center">
    <img src="/images/icons/pickup.svg" width="35px" alt="pickup icon" class="self-start" />
    <div class="flex w-full flex-col justify-start gap-3 pb-3 sm:ml-2">
      {#if $basicStore?.business?.needsDefaultPickupAddressUpdate == undefined || $basicStore?.business?.needsDefaultPickupAddressUpdate == false}
        <div class="flex flex-col gap-1">
          <p>{$basicStore?.business?.defaultPickupAddress?.addressLine1}</p>
          <div class="flex gap-2">
            <p>{$basicStore?.business?.defaultPickupAddress?.city}</p>
            <p>{$basicStore?.business?.defaultPickupAddress?.zipCode}</p>
          </div>
          <p>{$basicStore?.business?.defaultPickupAddress?.state}</p>
        </div>
      {:else if $basicStore?.business?.needsDefaultDeliveryAddressUpdate == undefined && edit_default_pickup_location_active != true}
        <button
          class="btn mt-3 max-w-[70px]"
          title="edit default pickup location"
          style="background-color: #5CB971; padding:0;"
          on:click={editDefaultPickupLocation}
        >
          <Icon src={Pencil} class="h-6" />
        </button>
      {:else}
        <label class="font-poppins" for="default_pickup_address">Add Pickup Address</label>
        <Place
          Id={'default_pickup_address'}
          Klass={'w-full lg:max-w-[500px] input'}
          placeholder={'street address'}
          functionToCallAfter={updateDefaultPickupLocation}
        />
      {/if}
    </div>
  </div>
</div>

<style>
  input {
    background-color: white;
  }
</style>
