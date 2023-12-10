<script lang="ts">
  import { isEmail } from '$src/lib/utils/valid_email';
  import type { jobPostType } from '$src/lib/custom_types';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import PageWrapper from '$src/components/widgets/PageWrapper.svelte';
  let data: jobPostType = {
    title: '',
    features: [],
    department: '',
    description: '',
    requirements: '',
    benefits: '',
    apply: '',
    posted: '',
    updated: '',
    posted_date: ''
  };
  onMount(() => {
    let dataStr = localStorage.getItem('selectedJob');
    if (dataStr) {
      data = JSON.parse(dataStr);
    }
  });
  $: showApplicationSent = false;
  let input_data = {
    name: {
      value: '',
      valid: true,
      invalidmessage: 'Please enter your name'
    },
    email: {
      value: '',
      valid: true,
      invalidmessage: 'Please enter your email'
    },
    phone: {
      value: '',
      valid: true,
      invalidmessage: 'Please enter your phone number'
    },
    resume: {
      value: '',
      valid: true,
      invalidmessage: 'Please upload your resume'
    },
    cover_letter: {
      value: '',
      valid: true,
      invalidmessage: 'Please upload your cover letter'
    },
    yearsofexperience: {
      value: '',
      valid: true,
      invalidmessage: 'Please enter your years of experience'
    },
    title: {
      value: '',
      valid: true,
      invalidmessage: 'Please enter your title'
    },
    message: {
      value: '',
      valid: true,
      invalidmessage: 'Please tell us about yourself'
    },
    job_type: {
      value: '',
      valid: true,
      invalidmessage: 'Please enter your job type (remote/onsite)'
    }
  };
  function apply() {
    let valid = true;
    console.debug('resume', input_data.resume.value);
    if (input_data.name.value.length < 1) {
      input_data.name.valid = false;
      valid = false;
    }
    if (!isEmail(input_data.email.value)) {
      input_data.email.valid = false;
      valid = false;
    }
    if (input_data.resume.value.length < 1) {
      input_data.resume.valid = false;
      valid = false;
    }
    if (input_data.yearsofexperience.value.length < 1) {
      input_data.resume.valid = false;
      valid = false;
    }
    if (input_data.resume.value.length < 1) {
      input_data.resume.valid = false;
      valid = false;
    }
    if (valid) {
      showApplicationSent = true;
      setTimeout(() => {
        showApplicationSent = false;
        window.location.href = '/careers';
      }, 2000);
    } else {
      alert('Please fill out all fields');
      return;
    }
  }
</script>

{#if showApplicationSent}
  <div
    class="absolute z-10"
    transition:fade
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 0 bg-opacity-75 transition-opacity" />
    <div class="fixed inset-0 z-10 mt-5">
      <div class="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: outline/exclamation-triangle -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  width="416.979px"
                  height="416.979px"
                  viewBox="0 0 416.979 416.979"
                  style="enable-background:new 0 0 416.979 416.979;"
                  xml:space="preserve"
                  fill="green"
                >
                  <g>
                    <path
                      d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85   c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786   c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576   c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765   c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
                    />
                  </g>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-2 sm:text-left">
                <h3 class="font-medium leading-6" id="modal-title">Job Application Submited</h3>
                <div class="mt-2">
                  <p class="">
                    Your applicaton is submited. We will contact you as soon as we move to next step
                    of our hiring process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
<PageWrapper>
  <div class="mx-auto w-full md:w-[800px] md:max-w-fullx">
    <div transition:fade>
      {#if data.title != ''}
        <div class="flex flex-col gap-4 border-[1px] border-gray-300 p-4 py-4">
          <h3 class="text-xl font-bold text-black">{data?.title}</h3>
          <p class="-mt-3 mb-2">{data?.description}</p>
          <ul class="flex gap-3">
            {#each data?.features as feature}
              <li class="my-1 inline-flex rounded-3xl border-2 border-gray-700 py-2 px-3 font-bold">
                {#if feature == 'Remote'}
                  <i
                    class="fa-sharp fa-solid fa-location-pin mr-2 pt-[1px] text-[16px] text-black"
                  />
                {:else}
                  <i class="fa-sharp fa-solid fa-clock mr-2 pt-[1px] text-[16px] text-black" />
                {/if}
                {feature}
              </li>
            {/each}
          </ul>
        </div>
        <div class="mx-auto w-full py-24 md:w-[800px] md:max-w-full">
          <div class="border border-gray-300 p-6 sm:rounded-md">
            <div class="flex flex-col gap-2">
              <div>
                <label class="block" for="name">Your name</label>
                <input
                  required
                  name="name"
                  type="text"
                  id="name"
                  class="input
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                        "
                  placeholder="Joe Bloggs"
                  bind:value={input_data.name.value}
                />
                {#if !input_data.name.valid}
                  <p class="py-1 text-red-500">{input_data.name.invalidmessage}</p>
                {/if}
              </div>
              <div>
                <label class="block" for="name">Email address</label>
                <input
                  required
                  name="email"
                  type="email"
                  id="email"
                  class="input
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                        "
                  placeholder="Joe Bloggs"
                  bind:value={input_data.email.value}
                />
                {#if !input_data.email.valid}
                  <p class="py-1 text-red-500">{input_data.email.invalidmessage}</p>
                {/if}
              </div>
              <div>
                <label class="block" for="yearsofexp">Years of experience</label>
                <select
                  required
                  name="yearsofexp"
                  id="yearsofexp"
                  class="select
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-indigo-200
                    focus:ring-opacity-50
                    "
                  bind:value={input_data.yearsofexperience.value}
                >
                  <option>Less than a year</option>
                  <option>1 - 2 years</option>
                  <option>2 - 4 years</option>
                  <option>4 - 7 years</option>
                  <option>7 - 10 years</option>
                  <option>10+ years</option>
                </select>
                {#if !input_data.yearsofexperience.valid}
                  <p class="py-1 text-red-500">{input_data.yearsofexperience.invalidmessage}</p>
                {/if}
              </div>
              <div>
                <label class="block" for="message">Tell us more about yourself</label>
                <textarea
                  required
                  rows="4"
                  name="message"
                  id="message"
                  class="textarea
                        mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        p-2
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                    "
                  placeholder="Joe Bloggs"
                  bind:value={input_data.message.value}
                />
                {#if !input_data.message.valid}
                  <p class="py-1 text-red-500">{input_data.message.invalidmessage}</p>
                {/if}
              </div>
              <div>
                <label class="block" for="resume">Upload your resume</label>
                <input
                  required
                  name="cv"
                  type="file"
                  class="
                        block
                        h-[80px]
                        w-full
                        py-4
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50"
                  bind:value={input_data.resume.value}
                />
                {#if !input_data.message.valid}
                  <p class="py-1 text-red-500">{input_data.message.invalidmessage}</p>
                {/if}
              </div>
              <div class="flex flex-col pt-4">
                <label class="block" for="work-setup">How would you like to work?</label>
                <fieldset id="work-setup" class="flex flex-col gap-5">
                  <div class="flex items-center gap-3">
                    <input
                      class="radio"
                      type="radio"
                      name="work-setup"
                      bind:value={input_data.job_type.value}
                    />
                    <span>remote</span>
                  </div>
                  <div class="-mt-4 flex items-center gap-3">
                    <input
                      class="radio"
                      type="radio"
                      name="work-setup"
                      bind:value={input_data.job_type.value}
                    />
                    <span>onsite</span>
                  </div>
                </fieldset>
                {#if !input_data.job_type.valid}
                  <p class="py-1 text-red-500">{input_data.job_type.invalidmessage}</p>
                {/if}
              </div>
              <div class="my-6">
                <button
                  style="color:#fff;"
                  type="submit"
                  class="
                    min-w-[200px]
                    focus:shadow-outline
                    btn-primary btn
                    mt-0
                    h-10
                    rounded-lg
                    bg-indigo-700
                    py-0
                    
                    transition-colors
                    duration-150
                    hover:bg-indigo-800
                    "
                  on:click={apply}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      {:else}
        <p>
          Please select the job you wanted to apply for from <a
            href="/careers/"
            title="firstshipper careers page">careers page</a
          >
        </p>
      {/if}
    </div>
  </div>
</PageWrapper>

<style>
  * {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
  }
</style>
