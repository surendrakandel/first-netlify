<script lang="ts">
  import { changeStaffRole } from '$src/lib/utils/change_role';
  import type { removeStaff } from '$src/types/remove_staff';
  import { basicStore } from '$src/routes/(admin)/admin/basic_store';
  import { get } from 'svelte/store';
  import { deleteUser } from '$src/apis/business/delete_user';
  import toast from 'svelte-french-toast';
  import { goto } from '$app/navigation';
  let basicStoreData = get(basicStore);
  async function DeleteUser(email: string) {
    if (basicStoreData?.users?.length == 1) {
      toast.error('can not remove only user in your organization');
      return;
    }
    let removeUser: removeStaff = {
      token: '',
      removeStaffEmail: email,
      businessId: ''
    };
    if (basicStoreData?.business?.businessId) {
      removeUser.businessId = basicStoreData?.business?.businessId;
    }
    let success = await deleteUser(removeUser);

    if (success.status == 'ok') {
      toast.success('Sorry to see you go.Thank you for using Firstshipper.');
      setTimeout(async () => {
        return await goto('/logout');
      }, 2000);
    }
  }
</script>

<!-- <div class="mb-2 hidden w-full pl-2 2xl:flex">
  <pclass="w-[50%]  2xl:w-[33%]">Email</p>
  <pclass="w-[50%] pl-2  2xl:w-[66%]">Role</p>
</div> -->
<div class="mb-12">
  {#if  $basicStore.user?.email && $basicStore.user?.email.length > 0}
      <div class="mb-4 flex flex-col w-full gap-4">
        <p class="" id="useremail">
          {$basicStore.user.email}
        </p>
        <div class="min-w-[100px]">
          <select
            id={'userrole_' }
            name={'userrole_' }
            class="select w-[200px]"
            style="opacity: .9;color:#5CB971;font-weight: 600;"
            value="0"
            disabled
            on:change={changeStaffRole}
          >
            <option value="0" label="Admin"> Admin </option>
            <option value="1" label="Manager"> Manager </option>
          </select>
        </div>
        <div class="">
          <button
            class="btn w-[150px] font-bungee"
            title="delete the selected user"
            style="background-color: rgba(250,32,32,.6);padding:0;color:#fff;"
            id="deleteUser"
            on:click|preventDefault={() => DeleteUser($basicStore?.user?.email || "")}
          >
            delete user
          </button>
        </div>
      </div>
  {/if}
</div>

<style>
  select {
    background-color: white !important;
  }
  button {
    color: white !important;
  }
</style>
