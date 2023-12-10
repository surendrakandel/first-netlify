<script lang="ts">
  import DefaultPickupAddress from '$src/components/business/DefaultPickupAddress.svelte';
  import User from '$components/user/User.svelte';
  import BusinessAddress from '$src/components/business/DisplayAddress.svelte';
</script>

<div class="min-h-[100vh] text-black  max-w-[1100px]">
  <div class="min-h-[calc(120vh-80px)] w-full flex flex-col p-2">
    <h1 class="py-4 text-xl">Settings</h1>
    <div class="">
      <h3 class="font-bungee">Users</h3>
      <div class="p-2 sm:p-8 bg-whitebg mr-2">
        <User />
        <!-- <h3 class="my-2">Add New User</h3>
        <AddUser /> -->
      </div>
    </div>
    <div class="mt-8">
      <h3 class="">Customer</h3>
      <div class="p-2 sm:p-8 bg-whitebg mr-2">
          <BusinessAddress/>
        <h3 class="mt-2 font-bungee">Default Pickup Address</h3>
        <DefaultPickupAddress />
      </div>
    </div>
  </div>
</div>
