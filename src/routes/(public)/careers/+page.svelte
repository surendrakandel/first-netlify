<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { jobPostType } from '$src/lib/custom_types';
  import PageWrapper from '$src/components/widgets/PageWrapper.svelte';
  let jobDepartments = [
    'View all',
    'Development',
    'Marketing',
    'Sales',
    'Customer Service',
    'Human Resources',
    'Finance',
    'Operations',
    'Other'
  ];
  $: selectedDepartment = 'View all';
  function changeDepartment(department: string) {
    console.debug(department);
    selectedDepartment = department;
  }
  let jobs: jobPostType[] = [
    {
      title: 'Senior Frontend Developer',
      features: ['Remote', 'Full Time'],
      department: 'Development',
      description:
        'We are looking for a Senior Frontend Developer to join our team. You will be responsible for the development of the frontend of our web application.',
      requirements: '',
      benefits: '',
      apply: '',
      posted: '11/01/2022',
      updated: '',
      posted_date: ''
    },
    {
      title: 'Senior Backend Developer',
      features: ['Remote', 'Full Time'],
      department: 'Development',
      description:
        'We are looking for a Senior Backend Developer to join our team. You will be responsible for the development of the backend of our web application.',
      requirements: '',
      benefits: '',
      apply: '',
      posted: '11/01/2022',
      updated: '',
      posted_date: ''
    },
    {
      title: 'Senior FullStack Developer',
      features: ['Remote', 'Full Time'],
      department: 'Development',
      description:
        'We are looking for a Senior Frontend Developer to join our team. You will be responsible for the development of the fullstack of our web application.',
      requirements: '',
      benefits: '',
      apply: '',
      posted: '11/01/2022',
      updated: '',
      posted_date: ''
    },
    {
      title: 'Junior Frontend Developer',
      features: ['Remote', 'Full Time'],
      department: 'Development',
      description:
        'We are looking for a Junior Frontend Developer to join our team. You will be responsible for the development of the fontend of our web application.',
      requirements: '',
      benefits: '',
      apply: '',
      posted: '11/01/2022',
      updated: '',
      posted_date: ''
    }
  ];
  function selectJob(index: number) {
    let job = jobs[index];
    localStorage.setItem('selectedJob', JSON.stringify(job));
    window.location.href = '/careers/apply';
  }
</script>

<PageWrapper mxAuto={true}>
  <div class="flex flex-col mx-2">
    <div class="ml-2 mt-16">
      <div
        class="w-[100px] rounded-3xl border-[1px] border-solid border-black p-1 py-2 px-2 text-center"
      >
        <p class="py-1">We're hiring!</p>
      </div>
      <h2 class="mt-[20px] py-3 text-2xl">Be part of our mission</h2>
      <p class="pb-4 leading-5">
        We're looking for passionate people to join us on our mission. We value flat hierachies,
        clear communication, and full ownership and responsibility.
      </p>
      <ul class="departments py-3">
        {#each jobDepartments as department, index}
          <li
            class="my-2 mr-3 inline-flex rounded-3xl border-2 border-gray-700 py-2 px-3 font-bold"
            transition:fade
            class:selectedDeparted={department == selectedDepartment}
          >
            <button on:click|preventDefault={() => changeDepartment(department)}
              >{department}</button
            >
          </li>
        {/each}
      </ul>
    </div>
    <div class="ml-2 w-full pt-6 pb-16">
      {#each jobs as job, index}
        <div class="flex flex-col gap-2 border-y-[1px] border-gray-300 py-4">
          <div class="flex-start flex flex-col items-start pr-12 md:flex-row md:justify-between">
            <h3 class="text-xl font-bold">{job.title}</h3>
            <div class="flex items-center justify-start gap-3 py-2 md:justify-between md:pt-0">
              <h3 class="font-bold">Apply</h3>
              <div class="relative h-[30px] w-[30px] rotate-[-30deg]">
                <a
                  href="/"
                  class="block"
                  on:click={() => {
                    selectJob(index);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute max-w-[60px]"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Layer_1"
                    viewBox="0 0 512 512"
                    style="enable-background:new 0 0 512 512;"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        d="M256,0C114.859,0,0,114.837,0,256c0,141.141,114.859,256,256,256c141.163,0,256-114.859,256-256    C512,114.837,397.163,0,256,0z M403.691,264.149c-1.088,2.603-2.645,4.971-4.608,6.933l-85.333,85.333    c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.901-2.091-15.083-6.251c-8.32-8.341-8.32-21.845,0-30.165l48.917-48.917H128    c-11.776,0-21.333-9.557-21.333-21.333c0-11.797,9.557-21.333,21.333-21.333h204.501l-48.917-48.917    c-8.32-8.341-8.32-21.845,0-30.165c8.341-8.341,21.845-8.341,30.165,0l85.333,85.312c1.963,1.963,3.52,4.331,4.608,6.955    C405.845,253.056,405.845,258.923,403.691,264.149z"
                      />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <p class="-mt-3 mb-2">{job.description}</p>
          <ul class="flex gap-3">
            {#each job.features as feature}
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
      {/each}
    </div>
  </div>
</PageWrapper>

<style>
  .selectedDeparted {
    border-color: #000;
    color: #fff;
    --tw-border-opacity: 1;
    background-color: rgb(55 65 81 / var(--tw-border-opacity));
  }
  p, li, h2,h3{
    color:black;
  }
</style>
