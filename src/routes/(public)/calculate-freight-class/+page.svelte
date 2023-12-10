<script lang="ts">
  import { goto } from '$app/navigation';
  import { shipmentInfoStore } from '$src/components/quote/shipment_info_store';
  import { fade } from 'svelte/transition';
  import { commodityStore } from '$src/components/quote/commodity_store';
  function calculateFreightClass() {
    if (!resultData.length || !resultData.width || !resultData.height || !resultData.weight) {
      return;
    }
    let density = 0;
    let volume = 0;
    if (resultData.length && resultData.width && resultData.height && resultData.weight) {
      if (
        resultData.length <= 0 ||
        resultData.width <= 0 ||
        resultData.height <= 0 ||
        resultData.weight <= 0
      ) {
        return;
      }
      let vol = (resultData.length * resultData.width * resultData.height) / 1728;
      volume = vol * resultData.quantity;
      density = parseFloat((resultData.weight / volume).toFixed(2));
    }
    let currentFreightClass = {
      upper: 0,
      lower: 0,
      currentClass: 0,
      nextClass: 0
    };
    if (density >= 1 && density <= 2) {
      currentFreightClass.lower = 1;
      currentFreightClass.upper = 2;
      currentFreightClass.currentClass = 400;
      currentFreightClass.nextClass = 300;
    }
    if (density >= 2.000001 && density <= 3) {
      currentFreightClass.lower = 2;
      currentFreightClass.upper = 3;
      currentFreightClass.currentClass = 300;
      currentFreightClass.nextClass = 250;
    }
    if (density >= 3.000001 && density <= 4) {
      currentFreightClass.lower = 3;
      currentFreightClass.upper = 4;
      currentFreightClass.currentClass = 250;
      currentFreightClass.nextClass = 200;
    }
    if (density >= 4.000001 && density <= 5) {
      currentFreightClass.lower = 4;
      currentFreightClass.upper = 5;
      currentFreightClass.currentClass = 200;
      currentFreightClass.nextClass = 175;
    }
    if (density >= 5.000001 && density <= 6) {
      currentFreightClass.lower = 5;
      currentFreightClass.upper = 6;
      currentFreightClass.currentClass = 175;
      currentFreightClass.nextClass = 150;
    }
    if (density >= 6.000001 && density <= 7) {
      currentFreightClass.lower = 6;
      currentFreightClass.upper = 7;
      currentFreightClass.currentClass = 150;
      currentFreightClass.nextClass = 125;
    }
    if (density >= 7.000001 && density <= 8) {
      currentFreightClass.lower = 7;
      currentFreightClass.upper = 8;
      currentFreightClass.currentClass = 125;
      currentFreightClass.nextClass = 110;
    }
    if (density >= 8.000001 && density <= 9) {
      currentFreightClass.lower = 8;
      currentFreightClass.upper = 9;
      currentFreightClass.currentClass = 110;
      currentFreightClass.nextClass = 100;
    }
    if (density >= 9.000001 && density <= 10.5) {
      currentFreightClass.lower = 9;
      currentFreightClass.upper = 10.5;
      currentFreightClass.currentClass = 100;
      currentFreightClass.nextClass = 92.5;
    }
    if (density >= 10.5 && density <= 12) {
      currentFreightClass.lower = 10.5;
      currentFreightClass.upper = 12;
      currentFreightClass.currentClass = 92.5;
      currentFreightClass.nextClass = 85;
    }
    if (density >= 12 && density <= 13.5) {
      currentFreightClass.lower = 12;
      currentFreightClass.upper = 13.5;
      currentFreightClass.currentClass = 85;
      currentFreightClass.nextClass = 77.5;
    }
    if (density >= 13.5 && density <= 15) {
      currentFreightClass.lower = 13.5;
      currentFreightClass.upper = 15;
      currentFreightClass.currentClass = 77.5;
      currentFreightClass.nextClass = 70;
    }
    if (density >= 15 && density <= 22.5) {
      currentFreightClass.lower = 15;
      currentFreightClass.upper = 22.5;
      currentFreightClass.currentClass = 70;
      currentFreightClass.nextClass = 65;
    }
    if (density >= 22.5 && density <= 30) {
      currentFreightClass.lower = 22.5;
      currentFreightClass.upper = 30;
      currentFreightClass.currentClass = 65;
      currentFreightClass.nextClass = 60;
    }
    if (density >= 30 && density <= 35) {
      currentFreightClass.lower = 30;
      currentFreightClass.upper = 35;
      currentFreightClass.currentClass = 60;
      currentFreightClass.nextClass = 55;
    }
    if (density >= 35 && density <= 50) {
      currentFreightClass.lower = 35;
      currentFreightClass.upper = 50;
      currentFreightClass.currentClass = 55;
      currentFreightClass.nextClass = 50;
    }
    console.log(density);
    if (density > 50) {
      currentFreightClass.lower = 50;
      currentFreightClass.upper = 50;
      currentFreightClass.nextClass = 50;
      currentFreightClass.currentClass = 50;
    }

    let lowDiff = Math.abs(currentFreightClass.lower - density);
    let highDiff = currentFreightClass.upper - density;
    console.log(lowDiff, highDiff);
    if (lowDiff < highDiff) {
      console.log('lowdiff is less');
      resultData.estimatedFreightClass = currentFreightClass.currentClass;
    } else {
      console.log('lowdiff is more');
      resultData.estimatedFreightClass = currentFreightClass.nextClass;
    }
    showResult = true;
    resultData.density = density;
    resultData.volume = parseFloat(volume.toString().substring(0, 5));
    console.log(resultData.estimatedFreightClass);
  }
  let resultData = {
    length: null,
    width: null,
    height: null,
    weight: null,
    quantity: 1,
    volume: 0,
    density: 0,
    estimatedFreightClass: 0
  };
  let showResult = false;
  async function updateQuote() {
    $commodityStore[0].length = resultData.length != null ? resultData.length : 0;
    $commodityStore[0].width = resultData.width != null ? resultData.width : 0;
    $commodityStore[0].height = resultData.height != null ? resultData.height : 0;
    $commodityStore[0].weight = resultData.weight != null ? resultData.weight : 0;
    $commodityStore[0].quantity = resultData.quantity != null ? resultData.quantity : 0;
    $shipmentInfoStore.editMode = true;
    // update quote item store # this is redundant but will be removed in the future
    await goto('/admin/quote');
  }
</script>

<div class="mx-auto max-w-[1400px] px-2 py-16 mt-[70px]">
  <div class="flex flex-col items-center justify-center gap-8">
    <div
      class="mx-auto flex flex-col gap-6 items-center justify-center py-24 px-2 md:px-12 shadow-lg bg-primary"
    >
      <div class="flex flex-col items-center gap-2" transition:fade>
        <h3 class="text-xl">Freight Class Calculator</h3>
        <div>
          <h3 class=" font-semibold">Dimensions</h3>
        </div>
        <div class="flex w-full">
          <div class="w-[28%]">
            <label for="length">length</label>
            <div class="wrapper">
              <input
                type="number"
                name="length"
                id="length"
                class="w-full p-2"
                placeholder="L"
                bind:value={resultData.length}
              />
            </div>
          </div>
          <div class="w-[28%]">
            <label for="width" class="">width</label>
            <div class="wrapper">
              <input
                type="number"
                name="width"
                id="width"
                class="w-full p-2"
                placeholder="W"
                bind:value={resultData.width}
              />
            </div>
          </div>
          <div class="w-[44%]">
            <label for="height">height</label>
            <div class="wrapper flex border-collapse">
              <input
                type="number"
                id="height"
                name="height"
                class="w-[90%] p-2"
                placeholder="H"
                bind:value={resultData.height}
              />
              <h3 class="flex h-full w-[40px] items-center">
                <span class="ml-2">IN</span>
              </h3>
            </div>
          </div>
        </div>
        <div class="flex w-full">
          <div class="w-1/2">
            <h3 class="font-bungee">Total Weight</h3>
            <div class="wrapper">
              <input
                type="number"
                name="weight"
                id="weight"
                class="w-full p-2"
                placeholder="Weight"
                bind:value={resultData.weight}
              />
            </div>
          </div>
          <div class="w-1/2">
            <h3 class="font-bungee">Package Count</h3>
            <div class="wrapper flex items-center justify-between">
              <input
                type="number"
                name="weight"
                id="weight"
                class="w-[calc(100%-50px)] p-2"
                placeholder="Quantity"
                bind:value={resultData.quantity}
              />
              <h3 class="flex h-full w-[50px] items-center">
                <span class="ml-2">LB</span>
              </h3>
            </div>
          </div>
        </div>
        <div class="flex w-full max-w-[400px]">
          <button
            class="bg-neutral ownBtn mt-4 w-full font-bungee"
            on:click|preventDefault={calculateFreightClass}>Calculate Density</button
          >
        </div>
      </div>
      <div class="flex flex-col" transition:fade class:hidden={!showResult}>
        <h3 class="text-xl">Freight Class Results</h3>
        <div class="mt-3 flex flex-col gap-1">
          <h3 class=" font-semibold">
            Volue: {resultData.volume != 0 ? resultData.volume : ''} cbft
          </h3>
          <h3 class=" font-semibold">
            Density: {resultData.density != 0 ? resultData.density : ''} lb/cbft
          </h3>
          <h3 class=" font-semibold">
            Estimated Freight Class: {resultData.estimatedFreightClass != 0
              ? resultData.estimatedFreightClass
              : ''}
          </h3>
        </div>
        <div class="flex w-full gap-2">
          <button
            class="btn-secondary btn mt-4 w-1/2 font-bungee"
            style="color:white;"
            on:click|preventDefault={() => (showResult = false)}>Recalculate</button
          >
          <button
            class="btn-primary btn mt-4 w-1/2 font-bungee"
            style="color:white;"
            on:click|preventDefault={updateQuote}>Get Quote</button
          >
        </div>
      </div>
    </div>
    <h1 class="text-2xl text-[#eea47f]">What is Freight Class 300?</h1>
    <div class="w-full max-w-[800px]">
      <p class="py-12 px-2 text-[1.1rem] text-[#1B2752] shadow-md md:p-12">
        Freight class is a standardized system used in transportation to categorize and rate
        different types of freight based on their characteristics. The National Motor Freight
        Classification (NMFC) system assigns a specific class rating to each shipment based on
        density, stowability, handling, and liability. This rating is critical in calculating
        shipping rates for less-than-truckload (LTL) shipments, as it affects space and handling
        requirements.
      </p>
    </div>
    <h3 class="p-4 text-xl">What determines Freight Class?</h3>
    <div class="flex flex-col gap-4 p-4 pb-24 md:flex-row">
      <div class="flex w-full min-w-[200px] flex-col">
        <img
          src="https://assets-global.website-files.com/5f065b9089edc2aa45b26101/627d7a25ac020523c210d726_Density.svg"
          loading="lazy"
          alt="Scale Icon"
          class="h-[90px] w-[90px]"
        />
        <div class="subheading-label">DENSITY</div>
        <div class=" text-[.9rem]">
          <p>
            The density of a commodity is identified by its dimensions and weight. Freight class
            code 300 should have a density of 2-3 pounds per cubic foot.
          </p>
        </div>
      </div>
      <div class="min-w-[200px]">
        <img
          src="https://assets-global.website-files.com/5f065b9089edc2aa45b26101/627d7a31e4b1aaf60c6666f8_Stowability.svg"
          loading="lazy"
          alt="Shipping Boxes Icon"
          class="h-[90px] w-[90px]"
        />
        <div class="subheading-label">STOWABILITY</div>
        <div class=" text-[.9rem]">
          <p>
            Will your freight need to be loaded with special equipment? If the size and shape of the
            items you are shipping require a lift or a dock it will influence your freight class
            determination since the carrier will have to spend more time loading and unloading your
            freight.
          </p>
        </div>
      </div>
      <div class="min-w-[200px]">
        <img
          src="https://assets-global.website-files.com/5f065b9089edc2aa45b26101/627d7a3b49fdba7d2b82b92f_Liability.svg"
          loading="lazy"
          class="h-[90px] w-[90px]"
          alt="Shield Icon"
        />
        <div class="subheading-label">LIABILITY</div>
        <div class=" text-[.9rem]">
          <p>
            Will your carrier need to take extra precautions to keep your freight safe? If you are
            shipping rare or highly valuable items that might be prone to theft that will affect
            your freight class determination since the carrier will have to make special
            arrangements.
          </p>
        </div>
      </div>
      <div class="min-w-[200px]">
        <img
          src="https://assets-global.website-files.com/5f065b9089edc2aa45b26101/627d7a468e46b6cc2b2c51b7_Handling.svg"
          loading="lazy"
          alt="Hand Holding Box Icon"
          class="h-[90px] w-[90px]"
        />
        <div class="subheading-label">HANDLING</div>
        <div class=" text-[.9rem]">
          <p>
            Will the packaging of your freight allow for other items to easily fit in the carrier’s
            trailer? Shipping sporting products like canoes and kayaks that can’t have anything
            packed on top of them impacts the capacity of the carrier and, ultimately, your freight
            class determination.
          </p>
        </div>
      </div>
    </div>
    <div class="hidden w-full">
      <img src="/images/shipments.png" alt="transport" class="h-full w-full bg-cover object-fill" />
      <div
        class="absolute top-[10%] left-[20px] flex h-[500px] w-full flex-col items-center rounded-md md:left-[calc(50%-350px)] md:m-12 md:h-[400px] md:w-[700px] md:flex-row md:justify-center"
      >
        <div class="h-[50px] w-full md:h-full md:w-[30%]">
          <div class="flex items-center justify-center">
            <svg
              data-v-06e26d44=""
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="fill-green"
              fill="none"
              width="200"
              height="200"
              viewBox="0 0 206 144"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M37.1884 99.9142C37.1884 103.601 40.1769 106.589 43.8633 106.589H183.082C186.768 106.589 189.756 103.601 189.756 99.9142C189.756 96.2278 186.768 93.2393 183.082 93.2393H177.36C173.674 93.2393 170.685 90.2509 170.685 86.5645C170.685 82.8781 173.674 79.8897 177.36 79.8897H195.478C199.164 79.8897 202.153 76.9012 202.153 73.2148C202.153 69.5284 199.164 66.54 195.478 66.54H174.5C178.186 66.54 181.174 63.5515 181.174 59.8651C181.174 56.1787 178.186 53.1903 174.5 53.1903H113.472C117.159 53.1903 120.147 50.2018 120.147 46.5154C120.147 42.829 117.159 39.8406 113.472 39.8406H59.1201C55.4337 39.8406 52.4452 42.829 52.4452 46.5154C52.4452 50.2018 55.4337 53.1903 59.1201 53.1903H20.9781C17.2917 53.1903 14.3032 56.1787 14.3032 59.8651C14.3032 63.5515 17.2917 66.54 20.9781 66.54H44.8168C48.5033 66.54 51.4917 69.5284 51.4917 73.2148C51.4917 76.9012 48.5033 79.8897 44.8168 79.8897H6.67485C2.98843 79.8897 0 82.8781 0 86.5645C0 90.2509 2.98843 93.2393 6.67485 93.2393H43.8633C40.1769 93.2393 37.1884 96.2278 37.1884 99.9142ZM199.293 106.589C202.979 106.589 205.967 103.6 205.967 99.9139C205.967 96.2275 202.979 93.2391 199.293 93.2391C195.606 93.2391 192.618 96.2275 192.618 99.9139C192.618 103.6 195.606 106.589 199.293 106.589Z"
                fill="#E6E9F0"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M168.465 27.3479V32.2474"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M168.465 42.0459V46.9454"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M158.667 37.1467H163.566"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M173.365 37.1466H178.265"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M142.17 2V6.89949"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M142.17 16.6985V21.598"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M132.372 11.7991H137.271"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M147.07 11.7989H151.97"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M159.07 122.402V127.302"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M159.07 137.1V142"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M149.271 132.201H154.17"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M163.969 132.201H168.869"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M27.4015 98.4623V103.362"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M27.4015 113.161V118.06"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M17.6025 108.261H22.502"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M32.3013 108.261H37.2008"
                stroke="#E6E6E5"
                stroke-width="3.71662"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M105.389 71.9999H59.1115V107.778H51.7227V120.222H70.0004V128.778H81.6671V120.222H124.834V128.778H135.723V120.222H154V107.389H135.723V56.8332H148.556V37.3888H114.334V57.2221H127.556V107.389H105.389V71.9999Z"
                fill="white"
                stroke="#5A5A5A"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M154.376 106.643H136.715V57.7766H148.645C149.244 57.7766 149.727 57.2923 149.727 56.6948V37.3039C149.727 36.7072 149.244 36.2222 148.645 36.2222H114.288C113.69 36.2222 113.206 36.7065 113.206 37.3039V56.6948C113.206 57.2915 113.69 57.7766 114.288 57.7766H126.217V106.643H106.06V71.7853C106.06 71.1886 105.576 70.7035 104.978 70.7035H59.1902C58.5935 70.7035 58.1084 71.1878 58.1084 71.7853V106.641H51.6374C51.0407 106.641 50.5557 107.124 50.5557 107.723V119.63C50.5557 120.228 51.04 120.711 51.6374 120.711H68.7569V128.474C68.7569 129.072 69.2412 129.555 69.8386 129.555H81.4046C82.0013 129.555 82.4863 129.072 82.4863 128.474V120.711H123.528V128.474C123.528 129.072 124.011 129.555 124.609 129.555L136.175 129.555C136.773 129.555 137.257 129.071 137.257 128.473V120.711H154.376C154.974 120.711 155.458 120.227 155.458 119.629V107.722C155.458 107.125 154.974 106.642 154.376 106.642L154.376 106.643ZM115.37 38.3857H147.564V55.6131H115.37V38.3857ZM128.381 57.7766H134.552V106.643H128.381V57.7766ZM103.896 78.4072H86.5893V72.8671H103.896V78.4072ZM82.0659 80.1913C82.0116 80.1393 81.9437 80.1136 81.8834 80.0744C81.826 80.0389 81.7755 79.9914 81.7144 79.9673C81.6427 79.9394 81.5673 79.9371 81.4926 79.9243C81.43 79.9137 81.3704 79.8918 81.3078 79.8918C81.2301 79.8918 81.1562 79.919 81.0807 79.9363C81.0211 79.9507 80.9608 79.9514 80.9035 79.9756C80.8318 80.0057 80.7714 80.0608 80.7066 80.1061C80.656 80.1415 80.5987 80.1626 80.5542 80.2079L78.3793 82.3828V72.8679H84.4277V82.4573L82.0659 80.1913ZM76.2158 72.8664V78.4065L60.2702 78.4073V72.8671L76.2158 72.8664ZM60.2702 80.57H76.2158V84.9928C76.2158 85.1331 76.2438 85.2741 76.2988 85.4062C76.409 85.6709 76.6187 85.8807 76.8842 85.9915C77.0162 86.0466 77.1558 86.0745 77.2976 86.0745C77.4394 86.0745 77.5789 86.0466 77.711 85.9915C77.8437 85.9365 77.9629 85.8573 78.0633 85.7569L81.3335 82.4867L84.7605 85.7741C84.805 85.8164 84.8609 85.8367 84.9099 85.8707C84.974 85.9137 85.0299 85.9635 85.1015 85.9929C85.232 86.0472 85.3708 86.0751 85.5089 86.0751C85.6515 86.0751 85.794 86.0472 85.9283 85.9906C86.0626 85.934 86.1803 85.8511 86.2806 85.7485C86.2829 85.7455 86.2874 85.7455 86.2889 85.7417C86.3243 85.7047 86.3387 85.6572 86.3681 85.6172C86.4202 85.5471 86.4752 85.4784 86.5084 85.3954C86.5416 85.311 86.5491 85.2227 86.5612 85.1337C86.568 85.0846 86.5891 85.0432 86.5891 84.9934V80.5706H103.896V106.643H60.2706L60.2713 80.5687L60.2702 80.57ZM80.3215 127.393H70.9184V120.712H80.3215V127.393ZM135.091 127.393H125.688V120.712H135.091V127.393ZM153.292 118.551H52.7166V108.806H153.292V118.551Z"
                fill="#5A5A5A"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M118.849 50.2429H144.082C144.68 50.2429 145.163 49.7586 145.163 49.1611V41.3248C145.163 40.7281 144.68 40.243 144.082 40.243L118.849 40.2438C118.251 40.2438 117.767 40.7281 117.767 41.3256V49.1619C117.768 49.7593 118.252 50.2429 118.849 50.2429V50.2429ZM119.931 42.4066H143V48.0802H119.931V42.4066Z"
                fill="#5A5A5A"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M121.166 51.7976H118.849C118.251 51.7976 117.767 52.2819 117.767 52.8794C117.767 53.4761 118.251 53.9611 118.849 53.9611H121.166C121.764 53.9611 122.248 53.4768 122.248 52.8794C122.248 52.2819 121.764 51.7976 121.166 51.7976Z"
                fill="#30BD00"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M130.273 52.879C130.273 52.2823 129.79 51.7972 129.191 51.7972H126.875C126.277 51.7972 125.793 52.2815 125.793 52.879C125.793 53.4757 126.277 53.9608 126.875 53.9608H129.191C129.79 53.96 130.273 53.4757 130.273 52.879Z"
                fill="#30BD00"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M136.657 51.7976H134.341C133.742 51.7976 133.259 52.2819 133.259 52.8794C133.259 53.4761 133.742 53.9611 134.341 53.9611H136.657C137.255 53.9611 137.739 53.4768 137.739 52.8794C137.739 52.2819 137.255 51.7976 136.657 51.7976Z"
                fill="#30BD00"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M144.083 51.7976H141.765C141.167 51.7976 140.684 52.2819 140.684 52.8794C140.684 53.4761 141.167 53.9611 141.765 53.9611H144.083C144.681 53.9611 145.165 53.4768 145.165 52.8794C145.165 52.2819 144.681 51.7976 144.083 51.7976Z"
                fill="#30BD00"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M96.0158 102.07H93.9551V104.183H96.0158V102.07Z"
                fill="#30BD00"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M100.136 102.07H98.0757V104.183H100.136V102.07Z"
                fill="#30BD00"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M64.7497 97.8221H62.689V104.159H66.8086V102.046H64.7479V97.8221H64.7497Z"
                fill="#30BD00"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M92.5552 99.9591H100.796V93.6222H92.5552V99.9591ZM94.6159 95.7351H98.7355V97.848H94.6159V95.7351Z"
                fill="#30BD00"
              />
            </svg>
          </div>
        </div>
        <div
          class="mt-20 flex w-[70%] flex-col gap-2 self-start px-2 py-12 md:mt-0 md:p-16"
          transition:fade
          class:hidden={showResult}
        >
          <h3 class="text-xl">Freight Class Calculator</h3>
          <div>
            <h3 class=" font-semibold">Dimensions</h3>
          </div>
          <div class="flex w-full">
            <div class="w-[28%]">
              <label for="length">length</label>
              <div class="wrapper">
                <input
                  type="number"
                  name="length"
                  id="length"
                  class="w-full p-2"
                  placeholder="L"
                  bind:value={resultData.length}
                />
              </div>
            </div>
            <div class="w-[28%]">
              <label for="width" class="">width</label>
              <div class="wrapper">
                <input
                  type="number"
                  name="width"
                  id="width"
                  class="w-full p-2"
                  placeholder="W"
                  bind:value={resultData.width}
                />
              </div>
            </div>
            <div class="w-[38%]">
              <label for="height">height</label>
              <div class="wrapper flex border-collapse">
                <input
                  type="number"
                  id="height"
                  name="height"
                  class="w-[90%] p-2"
                  placeholder="H"
                  bind:value={resultData.height}
                />
                <h3 class="flex h-full w-[50px] items-center">
                  <span class="ml-2">IN</span>
                </h3>
              </div>
            </div>
          </div>
          <div class="flex w-full">
            <div class="w-1/2">
              <h3>Total Weight</h3>
              <div class="wrapper">
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  class="w-full p-2"
                  placeholder="Weight"
                  bind:value={resultData.weight}
                />
              </div>
            </div>
            <div class="w-1/2">
              <h3>Package Quantity</h3>
              <div class="wrapper flex items-center justify-between">
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  class="w-[calc(100%-50px)] p-2"
                  placeholder="Quantity"
                  bind:value={resultData.quantity}
                />
                <h3 class="flex h-full w-[50px] items-center">
                  <span class="ml-2">LB</span>
                </h3>
              </div>
            </div>
          </div>
          <div class="flex w-full">
            <button
              class="bg-neutral ownBtn mt-4 w-full font-bungee"
              on:click|preventDefault={calculateFreightClass}>Calculate Density</button
            >
          </div>
        </div>
        <div
          class="mt-20 flex w-[70%] flex-col gap-2 self-start p-12 md:mt-0"
          transition:fade
          class:hidden={!showResult}
        >
          <h3 class="text-xl">Freight Class Results</h3>
          <div class="mt-3 flex flex-col gap-1">
            <h3 class=" font-semibold">
              Volue: {resultData.volume != 0 ? resultData.volume : ''} cbft
            </h3>
            <h3 class=" font-semibold">
              Density: {resultData.density != 0 ? resultData.density : ''} lb/cbft
            </h3>
            <h3 class=" font-semibold">
              Estimated Freight Class: {resultData.estimatedFreightClass != 0
                ? resultData.estimatedFreightClass
                : ''}
            </h3>
          </div>
          <div class="flex w-full gap-2">
            <button
              class="bg-neutral ownBtn mt-4 w-1/2 font-bungee"
              style="color:white;"
              on:click|preventDefault={() => (showResult = false)}>Recalculate</button
            >
            <button
              class="btn-primary btn mt-4 w-1/2 font-bungee"
              style="color:white;"
              on:click|preventDefault={updateQuote}>Get Quote</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .subheading-label {
    font-size: 1rem;
    font-family: 'Bungee';
  }
  video {
    width: 1400px;
    height: 700px;
    object-fit: cover;
  }
  .wrapper {
    border: 3px;
    --tw-border-opacity: 1;
    border-color: rgb(229 231 235 / var(--tw-border-opacity));
    border-style: solid;
    border-collapse: separate;
    height: 40px;
    border-spacing: 0px;
  }
  input {
    height: 100%;
  }
  p, div{
    color: black;
  }
  h3, label{
    color:white;
  }
</style>
