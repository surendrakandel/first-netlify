<script lang="ts">
  import {
    basicStore,
    resetBasicStore,
    updateBasicStore
  } from '$src/routes/(admin)/admin/basic_store';
  import Place from '$components/places/AddressInput.svelte';
  import { addBusinessAddress } from '$src/apis/business/add_business_address';
  import { Check, Icon } from 'svelte-hero-icons';
  import type { address } from '$src/types/address';
  import { addPhoneNumber } from '$src/apis/business/add_phone_number';
  import toast from 'svelte-french-toast';
  import { UpdateBusinessName } from '$src/apis/business/update_business_name';
  import { getBasicInfo } from '$src/apis/business/get_basic_info';
  import { deleteBusines } from '$src/apis/business/delete_business';
  import { goto } from '$app/navigation';
  import { resetQuote } from '$src/routes/(admin)/admin/quote/quote_utils';
  import { phoneNumberType, type phoneNumber } from '$src/types/phone_number';
	import { enhance } from '$app/forms';
  let updatingPhoneNumber = false;
  let updatingBusinessAddress: boolean = false;
  let phoneNumber: phoneNumber = {
    phoneNumber: '',
    type: phoneNumberType.office
  };
  function updateCurrentPhoneNumber(event: Event) {
    phoneNumber.phoneNumber = (event.target as HTMLInputElement).value;
  }
  async function updatePhoneNumber() {
    if (phoneNumber?.phoneNumber.length < 10) {
      toast.error('Phone number must be 10 digits');
      return;
    }
    let data: phoneNumber = {
      phoneNumber: phoneNumber.phoneNumber,
      type: phoneNumberType.office
    };
    await addPhoneNumber(data);
    if ($basicStore.business) {
      $basicStore.business.phoneNumber = phoneNumber;
      updateBasicStore($basicStore);
    }
    updatingPhoneNumber = false;
    window.location.reload();
  }
  function editPhoneNumber() {
    updatingPhoneNumber = true;
    setTimeout(() => {
      updatingPhoneNumber = false;
    }, 30000);
  }
  async function addAddress(add: address) {
    // add address will be handled by place component
    let res = await addBusinessAddress(add);
    if ($basicStore.business) {
      $basicStore.business.address = add;
      updateBasicStore($basicStore);
    }
    window.location.reload();
  }
  $: newBusinessName = '';
  $: allowBusinessNameUpdate = false;
  function  allowBusinessNameChange(){
    allowBusinessNameUpdate = !allowBusinessNameUpdate;
  }
  async function updateBusinessName() {
    if (newBusinessName.length > 3) {
      await UpdateBusinessName(newBusinessName);
      if ($basicStore.business) {
        $basicStore.business.businessName = newBusinessName;
      }
      await getBasicInfo();
    }
    window.location.reload();
  }
  async function DeleteBusiness() {
    if ($basicStore && $basicStore.business && $basicStore.business.businessId) {
      let data = await deleteBusines($basicStore.business.businessId);
      if (data.success) {
        toast.success('Your business has been deleted along with all of your data.');
        resetBasicStore();
        resetQuote();
        await goto('/logout');
      }
    }
  }
</script>


<div class="flex flex-col">
  <div class="flex flex-col py-5 pt-2 lg:flex-row">
    <div class="flex flex-col gap-3 lg:w-1/2">
      <div class="mt-2 self-start">
        <img src="/images/icons/business.svg" alt="user" width="35px" />
      </div>
        <h3 class="font-bungee">{$basicStore?.business?.businessName}</h3>
        <form  name="changeBusinessNameForm" class="w-full flex flex-col gap-4" method="post" 
        use:enhance 
        action="?/changeBusinessName">
          <input type="hidden" name="businessId" value={$basicStore.business?.businessId} />
          {#if allowBusinessNameUpdate}
            <input
              type="text"
              class="input w-[300px]"
              id="businessName"
              name="businessName"
              bind:value={newBusinessName}
              placeholder="business name"
            />
            <button
              type="button"
              on:click={updateBusinessName}
              class="btn mt-1 max-w-[300px]"
              title="edit default pickup location"
              style="background-color: #5CB971; padding:0;color:white;"
            >
              Change Business Name
            </button>
          {/if}
          {#if !allowBusinessNameUpdate}
            <button
            type="button"
            on:click={allowBusinessNameChange}
            class="btn mt-1 max-w-[300px]"
            title="edit default pickup location"
            style="background-color: #5CB971; padding:0;color:white;"
          >
            Update Name
        </button>
          {/if}
        </form>
      <div class="flex w-full flex-col gap-2">
        {#if $basicStore.business?.needsAddressUpdate}
          <label class="" for="address">Add your address</label>
          <Place
            Id={'address'}
            Klass={'w-full lg:max-w-[500px]'}
            placeholder={'add business address'}
            functionToCallAfter={addAddress}
          />
        {:else}
          <div class="flex flex-col gap-2">
            <p>{$basicStore.business?.address?.addressLine1 || ''}</p>
            <p>{$basicStore.business?.address?.city || ''}</p>
            <p>
              {$basicStore.business?.address?.state || ''}{$basicStore.business?.address?.state == '' ? '' : ','}
              {$basicStore.business?.address?.zipCode || ''}
            </p>
          </div>
        {/if}
        <button
          class="btn mt-1 max-w-[300px]"
          title="edit default pickup location"
          style="background-color: #5CB971; padding:0;color:white;"
        >
          update address
        </button>
      </div>
    </div>
    <div class="mt-2 flex w-full flex-col gap-3 md:w-1/2 md:min-w-[300px]">
      <div class="flex flex-col gap-2">
        <div class="flex w-full flex-col">
          <img src="/images/icons/phone_black.svg" alt="user" width="25px" height="25px" />
          {#if updatingPhoneNumber}
            <input
              type="tel"
              id="phoneNumber"
              class="input mt-2"
              bind:value={phoneNumber.phoneNumber}
              on:click={updateCurrentPhoneNumber}
            />
            {:else}
              <div>{$basicStore.business?.phoneNumber?.phoneNumber}</div>
          {/if}
          <!-- {#if $basicStore.business?.phoneNumber?.phoneNumber != '' && !updatingPhoneNumber && $basicStore.business?.phoneNumber?.phoneNumber}
            <a
              id="phone"
              class="mt-2"
              class:input={updatingPhoneNumber}
              href="tel:{$basicStore.business?.phoneNumber?.phoneNumber}"
              >{$basicStore.business?.phoneNumber?.phoneNumber}
            </a>
          {/if} -->
          {#if !updatingPhoneNumber}
            <button
              class="btn mt-1 max-w-[300px] px-8"
              title="edit default pickup location"
              style="background-color: #5CB971; padding:0;color:white;"
              on:click={editPhoneNumber}
            >
              update phone number
            </button>
          {/if}
          {#if updatingPhoneNumber}
            <button
              class="btn mt-3 max-w-[50px]"
              title="edit default pickup location"
              style="background-color: #5CB971; padding:0;"
              on:click={updatePhoneNumber}
            >
              <Icon src={Check} class="h-6" />
            </button>
          {/if}
        </div>
        <div class="flex">
          <img src="/images/icons/binding.svg" alt="user" width="25px" height="25px" />
        </div>
      </div>
      <div class="flex flex-col justify-between gap-2 py-2">
        <p class="">
          Liable Party: <span class="ml-2"
            >{$basicStore.business?.businessName == undefined ? ' ' : $basicStore.business?.businessName}</span
          >
        </p>
      </div>
    </div>
  </div>
  <!-- <div class="flex flex-col">
    <button class="btn max-w-[300px] btn-error"style="color:white;"on:click={()=> DeleteBusiness()}>Delete</button>
  </div> -->
</div>


<style>
  button {
    color: white !important;
  }
</style>
