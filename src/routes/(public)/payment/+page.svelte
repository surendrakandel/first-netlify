<script lang="ts">
  //@ts-nocheck
  import { loadStripe } from '@stripe/stripe-js';
  import { onMount } from 'svelte';
  let stripe = null;
  onMount(async () => {
    stripe = await loadStripe(
      'pk_live_51MZMJJLd6kPgIJ7Iv7nio2oOoGtOOEMHQwybfoU7IoAVOr8fbqvGIMwgOJiW3MKyM1w1PytycGKllKw7TEeInnSQ00wYJvjLl6'
    );
    //@ts-ignore
    cardInput.addEventListener('input', formatCreditCardNumber);
  });
  import PageWrapper from '$src/components/widgets/PageWrapper.svelte';
  import { writable } from 'svelte/store';
  import Whitelogo from '$src/components/widgets/Whitelogo.svelte';
  import Visa from '$src/components/widgets/Visa.svelte';
  import MasterCard from '$src/components/widgets/MasterCard.svelte';
  import Discover from '$src/components/widgets/Discover.svelte';
  import AmericanExpress from '$src/components/widgets/AmericanExpress.svelte';
  import Jcb from '$src/components/widgets/Jcb.svelte';
  import { Key } from 'svelte-hero-icons';
  let isEmpty = false;
  function handleSubmit() {}
  let cartTotal = writable(0);
  let name = '';
  let cardElement = null;
  let cardErrors = null;
  let itemDetail = {
    name: 'test',
    price: 100,
    quantity: 1
  };
  let cardSelected = false;
  let isVisa = false;
  let isMasterCard = false;
  let isDiscover = false;
  let isAmericanExpress = false;
  let isJcb = false;
  let cardInput:any;
  function getCreditCardType(inputEvent: Event) {
    let value = (<HTMLInputElement>inputEvent.target).value;
    if (value) {
      if (/^4/.test(value)) {
        isVisa = true;
        cardSelected = true;
        isMasterCard = false;
        isDiscover = false;
        isAmericanExpress = false;
        isJcb = false;
        return;
      } else if (/^5/.test(value)) {
        isMasterCard = true;
        cardSelected = true;
        isVisa = false;
        isDiscover = false;
        isAmericanExpress = false;
        isJcb = false;
        return;
      } else if (/^3/.test(value)) {
        isAmericanExpress = true;
        cardSelected = true;
        isMasterCard = false;
        isVisa = false;
        isDiscover = false;
        isJcb = false;
        return;
      } else if (/^3/.test(value)) {
        isAmericanExpress = false;
        cardSelected = true;
        isMasterCard = false;
        isVisa = false;
        isDiscover = true;
        isJcb = false;
        return;
      } else if (/^6/.test(value)) {
        isAmericanExpress = false;
        cardSelected = true;
        isMasterCard = false;
        isVisa = false;
        isDiscover = true;
        isJcb = false;
        return;
      } else if (/^(?:2131|1800|35\d{3})/.test(value)) {
        isAmericanExpress = false;
        isMasterCard = false;
        isVisa = false;
        isDiscover = false;
        isJcb = true;
        cardSelected = true;
        return;
      } else {
        cardSelected = false;
        return;
      }
    } else {
      isMasterCard = false;
      isVisa = false;
      isDiscover = false;
      isAmericanExpress = false;
      isJcb = false;
      cardSelected = false;
      return;
    }
  }
  function formatPhoneInput(event:any) {
    getCreditCardType(event);
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length > 0) {
      formattedValue += '(' + value.substring(0, 3);
    }

    if (value.length > 3) {
      formattedValue += ') ' + value.substring(3, 6);
    }

    if (value.length > 6) {
      formattedValue += '-' + value.substring(6);
    }
    if (value.length > 10) {
      input.style.color = 'red';
    } else {
      input.style.color = 'black';
    }
    input.value = formattedValue;
  }
  function formatCreditCardNumber(e: Event) {
    let cursorPosition = e.target.selectionStart;
    let cardDigits = cardInput.value.replace(/\D/g, '');
    let formattedCard = '';

    for (let i = 0; i < cardDigits.length; i++) {
      if (
        i === 4 &&
        (cardDigits.startsWith('4') || cardDigits.startsWith('5') || cardDigits.startsWith('6'))
      ) {
        formattedCard += ' ';
        if (e.inputType !== 'deleteContentBackward') {
          cursorPosition++;
        }
      } else if ((i === 4 || i === 10) && cardDigits.startsWith('3')) {
        formattedCard += ' ';
        if (e.inputType !== 'deleteContentBackward') {
          cursorPosition++;
        }
      } else if (i > 0 && i % 4 === 0 && !cardDigits.startsWith('3')) {
        formattedCard += ' ';
        if (e.inputType !== 'deleteContentBackward') {
          cursorPosition++;
        }
      }
      formattedCard += cardDigits[i];
    }
    cardInput.value = formattedCard;
    cardInput.setSelectionRange(cursorPosition, cursorPosition);
  }
</script>

<!-- <svelte:head>
    <script type="text/javascript"
    src="https://jstest.authorize.net/v1/Accept.js"
    charset="utf-8">
</script>
</svelte:head> -->
<!-- <PageWrapper>
    <div class="flex flex-col gap-2 items-center min-w-[300px]">
        <form id="paymentForm"class="flex flex-col gap-2 w-full"method="POST"action="http://YourServer/PathToExistingPaymentProcessingScript">
        <input class="input w-full"type="text"name="expMonth"id="expMonth"placeholder="expMonth"/> 
        <input class="input w-full"type="text"name="expYear"id="expYear"placeholder="expYear"/> 
        <input class="input w-full"type="text"name="cardCode"id="cardCode"placeholder="cardCode"/> 
        <input class="input w-full"type="hidden"name="dataValue"id="dataValue"/>
        <input class="input w-full"type="hidden"name="dataDescriptor"id="dataDescriptor"/>
        <button class="btn btn-primary mt-5"style="color:#fff;">Pay</button>
        </form>
    </div>
</PageWrapper> -->
<PageWrapper mxAuto={true}>
  <div
    class="w-full h-full flex flex-col lg:flex-row items-center justify-center max-w-[500px] lg:max-w-[1000px] my-12 mx-auto"
    style="background-color: rgb(25, 37, 82);height:100%;"
  >
    <div
      class="flex flex-col items-center w-full lg:w-1/2 min-h-full p-12 gap-1"
      style="background-color: rgb(25, 37, 82);height:100%;"
    >
      <div class="logo py-6">
        <Whitelogo />
      </div>
      <div class="border-white-950 rounded-full p-3 border-2">
        <img
          src="/images/banner/banner_img.png"
          class="h-[50px] w-[50px] object-contain"
          alt="pallet svg"
        />
      </div>
      <div class="rounded-xl -mt-6">
        <p class="text-[rgb(25, 37, 82)] px-6 py-1">3 shipments</p>
      </div>
      <div class="">
        <p class="px-6 py-1">Pay Firstshipper</p>
      </div>
      <div class="">
        <p class="px-6 py-1"><span>&#36;</span> {itemDetail.price}</p>
      </div>
    </div>
    <div class="flex flex-col w-full lg:w-1/2 min-h-full gap-1">
      <div class="py-12 px-4 lg:px-16">
        <div class="divider pb-[16px] pt-[12px]">
          <p class="">Pay with card</p>
        </div>
        <div class="flex flex-col">
          <p class=" font-bold">Contact Information</p>
          <div class="flex flex-col h-full">
            <div class="email-input w-full relative h-[50px]">
              <i
                class="absolute fas fa-solid fa-envelope left-0 top-[27%] pl-3"
                style="color: #192552;"
              />
              <input
                class="w-full"
                type="email"
                placeholder="email@example.com"
                autocomplete="email"
              />
            </div>
            <div class="email-input w-full relative h-[50px]">
              <i
                class="absolute fas fa-solid fa-phone left-0 top-[27%] pl-3"
                style="color: #192552;"
              />
              <input
                class="w-full"
                type="tel"
                pattern="\(\d{3}\) \d{3}-\d{4}"
                placeholder="(304) 555-1234"
                autocomplete="tel"
                id="phone"
                name="phone"
                required
                on:input={formatPhoneInput}
                title="Enter phone number in the format (123) 456-7890"
              />
            </div>
          </div>
        </div>
        <div>
          <p class=" font-bold">Card Information</p>
          <div class="flex flex-col w-full">
            <!-- <div class="relative flex justify-end">
                            <input id="credit-card"type="text"inputmode="numeric"pattern="[0-9\s]{13,19}"autocomplete="cc-number"placeholder="1234 5678 9012 3456"class="px-3 py-2 border border-gray-300 rounded w-full"on:input={(e)=>getCreditCardType(e)}>
                            {#key cardSelected}
                                <div class="flex justify-end absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <div class="inline opacity-50 w-[30px] self-end"class:activeCard={isVisa}>
                                        {#if cardSelected == true && isVisa == true || !cardSelected}
                                            <Visa/>
                                        {/if}
                                    </div>
                                    <div class="flex justify-end opacity-50 w-[30px]"class:activeCard={isMasterCard}>
                                        {#if cardSelected == true && isMasterCard == true || !cardSelected}
                                            <MasterCard/>
                                        {/if}
                                    </div>
                                    <div class="opacity-50 w-[30px]"class:activeCard={isAmericanExpress}>
                                        {#if cardSelected == true && isAmericanExpress == true || !cardSelected}
                                            <AmericanExpress/>
                                        {/if}
                                    </div>
                                    <div class="opacity-50 w-[30px]"class:activeCard={isDiscover}>
                                        {#if cardSelected == true && isDiscover == true || !cardSelected}
                                            <Discover/>
                                        {/if}
                                    </div>
                                    <div class="opacity-50 w-[30px]"class:activeCard={isJcb}>
                                        {#if cardSelected == true && isJcb == true || !cardSelected}
                                            <Jcb/>
                                        {/if}
                                    </div>
                                </div>
                            {/key}
                        </div> -->
            <div class="relative flex justify-end">
              <input
                id="credit-card"
                type="text"
                inputmode="numeric"
                pattern="[0-9\s]{(13, 19)}"
                autocomplete="cc-number"
                placeholder="1234 5678 9012 3456"
                class="px-3 py-2 border border-gray-300 rounded w-full"
                on:input={getCreditCardType}
                bind:this={cardInput}
              />
              <div class="flex justify-end absolute right-2 top-1/2 transform -translate-y-1/2">
                {#if isVisa == true || !cardSelected}
                  <div class="opacity-50 w-[30px]" class:activeCard={isVisa}>
                    <Visa />
                  </div>
                {/if}
                {#if isMasterCard == true || !cardSelected}
                  <div class="opacity-50 w-[30px]" class:activeCard={isMasterCard}>
                    <MasterCard />
                  </div>
                {/if}
                {#if isAmericanExpress == true || !cardSelected}
                  <div class="opacity-50 w-[30px]" class:activeCard={isAmericanExpress}>
                    <AmericanExpress />
                  </div>
                {/if}
                {#if isDiscover == true || !cardSelected}
                  <div class="opacity-50 w-[30px]" class:activeCard={isDiscover}>
                    <Discover />
                  </div>
                {/if}
                {#if isJcb == true || !cardSelected}
                  <div class="opacity-50 w-[30px]" class:activeCard={isJcb}>
                    <Jcb />
                  </div>
                {/if}
              </div>
            </div>
          </div>
          <div class="flex -mt-[2px]">
            <input
              id="exp-date"
              type="text"
              pattern="\d{2}\/\d{2}"
              placeholder="MM/YY"
              class="w-1/2 px-3 py-2 border border-gray-300 rounded rounded-r-none"
            />
            <input
              id="cvc"
              type="text"
              maxlength="4"
              placeholder="CVC"
              class="w-[calc(50%+2px)] px-3 py-2 border border-gray-300 rounded rounded-l-none -ml-[2px]"
            />
          </div>
        </div>
        <div>
          <p class=" font-bold">Name on card</p>
          <input
            id="cardUserName"
            type="text"
            maxlength="100"
            placeholder=""
            class="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <p class=" font-bold">Zip Code</p>
          <input
            id="zipCode"
            type="text"
            maxlength="5"
            placeholder=""
            class="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button class="w-full font-bold py-3 rounded mt-4"
            >Pay <span>&#36;</span> {itemDetail.price}</button
          >
        </div>
      </div>
    </div>
  </div>
</PageWrapper>

<style>
  .activeCard {
    opacity: 1;
    transform: scale(1.3);
    transition: all 0.3s ease-in-out;
  }
  .email-input {
    position: relative;
    display: inline-block;
  }
  input[type='email'] {
    padding-left: 35px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
  }
  input[type='tel'] {
    padding-left: 35px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
  }
  input[type='email']:focus {
    border-color: #66afe9;
  }
</style>
