<script lang="ts">
  import { isEmail } from '$src/lib/utils/valid_email';
  import { isValidPassword } from '$src/lib/utils/valid_password';
  import type { addStaff } from '$src/types/add_staff';
  import toast from 'svelte-french-toast';
  let addUser: addStaff = {
    token: '',
    roles: [],
    newStaffEmail: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    businessId: ''
  };
  function AddUser() {
    if (isEmail(addUser.newStaffEmail) && isValidPassword(addUser.password)) {
      // addStaffToBusiness(addUser, businessId)
      // 	.then((res) => {
      // 		if (res?.success) {
      // 			toast?.push(res.message, InfoToastOptions);
      // 			addUser.newStaffEmail = '';
      // 			addUser.password = '';
      // 		}
      // 	}).catch((error) => {
      // 		toast?.push(error?.response?.data || 'please try later', ErrorToastOptions);
      // 	});
    } else {
      toast.error('Add Staff data is not valid.');
      return;
    }
  }
</script>

<!-- <div class="gap-3 pb-5">
  <div class="flex flex-col gap-3 md:flex-row">
    <div class="flex flex-col md:min-w-[300px]">
      <label class="mb-1 font-bungee"for="first_name">First Name</label>
      <input
        type="text"
        id="first_name"
        placeholder="first name"
        class="input"
        bind:value={addUser.firstName}
      />
    </div>
    <div class="flex flex-col md:min-w-[300px]">
      <label class="my-1 font-bungee"for="last_name">Last Name</label>
      <input
        type="text"
        id="last_name"
        placeholder="last name"
        class="input"
        bind:value={addUser.lastName}
      />
    </div>
  </div>
  <div class="flex flex-col gap-3 md:flex-row">
    <div class="flex flex-col md:min-w-[300px]">
      <label class="my-1 font-bungee"for="email">Email</label>
      <input
        type="email"
        id="email"
        class="input"
        placeholder="email"
        bind:value={addUser.newStaffEmail}
      />
    </div>
    <div class="flex flex-col md:min-w-[300px]">
      <label class="my-1 font-bungee"for="password">Password</label>
      <input
        type="password"
        id="password"
        class="input"
        placeholder="password"
        bind:value={addUser.password}
      />
    </div>
  </div>
  <button
    class="btn-primary btn mt-4 w-[200px] rounded-md "
    style="padding:0;color:white"
    title="add a new user to your company"
    on:click={AddUser}
  >
    add user
  </button>
</div> -->
