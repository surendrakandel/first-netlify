<script lang="ts">
  import Logo from '$components/widgets/Logo.svelte';
  import { type carrierContact, getCarrierContact } from '$src/lib/utils/get_carrier_contact';
  import type { bookingResponse } from '$src/types/book';
  export let data: bookingResponse;
  let carrierContact: carrierContact;
  if (data?.bookingInfo?.carrierProNumber) {
    carrierContact = getCarrierContact(data.bookingInfo.carrierName);
  }
</script>

{#if data.bookingInfo?.carrierProNumber}
  <div
    class="bol textPrimary relative m-auto mt-4 flex max-h-[1104px] max-w-[768px] flex-col justify-around"
    id="bol"
  >
    <div class="h-full">
      <div class="relative mb-2 flex h-[30px] w-full justify-between">
        <div class="flex h-full w-1/2 items-center justify-start">
          <Logo />
        </div>
        <div class="flex h-full w-full items-center text-center">
          <div class="flex w-full items-center justify-end text-center">
            <h3 class="text-center font-semibold">BILL OF LADING</h3>
          </div>
        </div>
      </div>
      <div class="flex w-full" style="margin-top:10px;">
        <div class="flex w-1/2 flex-col gap-1">
          <h3>SHIPPER</h3>
          <div class="flex w-[300px] gap-2 border-b-[.5px] border-gray-700" />
          <h4 class="text-uppercase companyName mb-1 text-[20px] font-bold" style="font-size: 16px">
            {data?.quoteRequest?.pickup?.companyName}
          </h4>
          <h4 class="">{data?.quoteRequest?.pickup?.address?.addressLine1}</h4>
          <h4 class="">
            <span>{data?.quoteRequest?.pickup?.address?.city}</span>, <span>{data?.quoteRequest?.pickup?.address
              ?.state}</span>, <span>{data?.quoteRequest?.pickup?.address?.zipCode}</span>
          </h4>
          <a href={`tel:${data?.quoteRequest?.pickup?.contact?.phoneNumber}`}>
            <span class="personName" style="text-transform:capitalize"
              >{data?.quoteRequest?.pickup?.contact?.name || ''}</span
            >, Phone: {data?.quoteRequest?.pickup?.contact?.phoneNumber || ''}
          </a>
          <a href={`tel:${data?.quoteRequest?.pickup?.contact?.emailAddress}`}
            >Email: {data?.quoteRequest?.pickup?.contact?.emailAddress}</a
          >
          <h3 class="mt-2">CONSIGNEE</h3>
          <div class="flex w-[300px] gap-2 border-b-[.5px] border-gray-700" />
          <h4 class="text-uppercase companyName mb-1" style="font-size: 16px;">
            {data?.quoteRequest?.delivery?.companyName}
          </h4>
          <h4 class="">{data?.quoteRequest?.delivery?.address?.addressLine1}</h4>
          <h4 class="">
            <span>{data?.quoteRequest?.delivery?.address?.city}</span>,   <span>{data?.quoteRequest?.delivery?.address
              ?.state}</span>,   <span>{data?.quoteRequest?.delivery?.address?.zipCode}</span>
          </h4>
          <a href={`tel:${data?.quoteRequest?.delivery?.contact?.phoneNumber}`}>
            <span class="personName" style="text-transform:capitalize"
              >{data?.quoteRequest?.delivery?.contact?.name || ''}</span
            >, Phone: {data?.quoteRequest?.delivery?.contact?.phoneNumber || ''}
          </a>
          <a href={`tel:${data?.quoteRequest?.delivery?.contact?.emailAddress}`}
            >Email: {data?.quoteRequest?.delivery?.contact?.emailAddress}</a
          >
        </div>
        <div class="flex w-1/2 flex-col gap-1">
          <div class="flex h-[50px] w-full justify-between">
            <div class="flex h-full w-1/2 flex-col items-center justify-center">
              <img
                src={data.bookingInfo.carrierLogoUrl}
                height="50%"
                width="50%"
                alt="carrier logo"
              />
            </div>
            <div class="flex h-full w-1/2 flex-col items-center justify-center">
              <!-- <img src={data?.bookingInfo.svgData} alt="po number"style="width:100%; height: 80px;margin:0;"/> -->
              <img
                src={data?.bookingInfo?.proNumberSvgUrl}
                alt="po number"
                style="width:100%; height: 40px;margin:0;"
              />
              <span style="font-size: 16px; margin-top:4px;" class="text-2xl"
                >PRO# {data?.bookingInfo.carrierProNumber}</span
              >
            </div>
          </div>
          <div class="mt-1 flex w-full">
            <div class="flex w-full flex-col">
              <div class="flex gap-2 border-b-[.5px] border-gray-700">
                <div class="flex w-[55%] flex-col">
                  <h3>Carrier</h3>
                  <h4 class="mt-1">{data?.bookingInfo.carrierName}</h4>
                </div>
                <div class="flex w-[45%] flex-col">
                  <h3>Pickup Date</h3>
                  <h4 class="mt-1">{data?.quoteRequest?.shipmentInfo?.displayDate} {data?.quoteRequest?.shipmentInfo?.pickupReadyTime} </h4>
                </div>
              </div>
              <div class="flex gap-2 border-b-[.5px] border-gray-700">
                <div class="flex w-[55%] flex-col">
                  <h3>Carrier PRO#</h3>
                  <h4 class="mt-1">{data?.bookingInfo.carrierProNumber}</h4>
                </div>
                <div class="flex w-[45%] flex-col">
                  <h3>Bill of lading NO.</h3>
                  <h4 class="mt-1">{data?.bookingInfo.firstShipperBolNumber}</h4>
                </div>
              </div>
              <div class="flex gap-2 border-b-[.5px] border-gray-700">
                <div class="flex w-[55%] flex-col">
                  <h3>PO#</h3>
                  <h4 class="mt-1">{data?.bookingInfo.carrierPickupNumber}</h4>
                </div>
                <div class="flex w-[45%] flex-col">
                  <h3>Reference#</h3>
                  <h4 class="mt-1">
                    {data?.bookingInfo.carrierReferences}
                    {'CABOL ' + data.bookingInfo.carrierBolNumber}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <h3 class="mt-1 w-full border-b-[.5px] border-gray-700 font-bold">Fright Charge Terms</h3>
          <div class="flex items-center gap-2 pt-2">
            <label for="prepaid" class="label flex items-center">
              <input type="checkbox" class="h-4 w-4 rounded-full p-1" />
              Prepaid
            </label>
            <label for="third-party" class="label flex items-center">
              <input type="checkbox" class="h-4 w-4 rounded-full" checked={true} />
              Third Party
            </label>
            <label for="inbound-collect" class="label flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded-full bg-gray-400 p-1"
                style="background-color:lightgray"
              />
              Inbound Collect
            </label>
          </div>
          <div class="flex items-center gap-1 py-1">
            <h3 class="font-semibold">Carrier Contact:</h3>
            <div class="ml-2 flex gap-3">
              <div class="flex gap-1">
                <span>Email:</span>
                <a href={`mailto:${carrierContact?.email}`}>
                  {carrierContact?.email}
                </a>
              </div>
              <div class="flex gap-1">
                <span>Phone:</span>
                <a href={`tel:${carrierContact?.email}`}>
                  {carrierContact?.phone || ''}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-1 flex flex-col border-t-[1px] border-gray-700" />
      <div class="mt-1 mb-2 flex h-[30px] justify-between">
        <div class="flex w-1/2 flex-col">
          <h3>PICKUP INSTRUCTIONS</h3>
          <span style="text-align:left;">{data?.quoteRequest?.pickup?.instructions || ''}</span>
        </div>
        <div class="flex w-1/2 flex-col border-l-[1px] border-gray-700">
          <h3 class="self-end">DELIVERY INSTRUCTIONS</h3>
          <span style="text-align:right;">{data?.quoteRequest?.delivery?.instructions || ''}</span>
        </div>
        <div class="mt-1 flex flex-col border-t-[1px] border-gray-700" />
      </div>
      <div class="mb-3 flex min-h-[35px] flex-col">
        <h3 class="">SPECIAL INSTRUCTIONS</h3>
        <span>{data?.quoteRequest?.shipmentInfo?.specialInstruction || ''}</span>
      </div>
      <div class="mb-2">
        <table class="bol-table border-collapse border border-gray-700">
          <tbody>
          <tr class="border-collapse">
            <th
              class="border-collapse border border-gray-700"
              colspan="2"
              style="vertical-align : middle;text-align:center; width: 10%;">Handeling Unit</th
            >
            <th
              class="border-collapse border border-gray-700"
              colspan="2"
              style="vertical-align : middle;text-align:center; width: 10%;">Package</th
            >
            <th
              class="border-collapse border border-gray-700"
              rowspan="2"
              style="vertical-align : middle;text-align:center;width: 5%;">HM</th
            >
            <th
              class="border-collapse border border-gray-700"
              rowspan="2"
              style="horizontal-align : middle;text-align:center; width: 40%;"
              >Commodities Description</th
            >
            <th
              class="border-collapse border border-gray-700"
              rowspan="2"
              style="vertical-align : middle;text-align:center;width: 10%;">Weight</th
            >
            <th
              class="border-collapse border border-gray-700"
              rowspan="2"
              style="vertical-align : middle;text-align:center;width: 5%;">Freight Class</th
            >
            <th
              class="border-collapse border border-gray-700"
              rowspan="2"
              style="vertical-align : middle;text-align:center;width: 5%;">NMFC#</th
            >
            <th
              class="border-collapse border border-gray-700"
              colspan="3"
              style="vertical-align : middle;text-align:center;width: 10%;">DIMENSION</th
            >
            <th
              class="border-collapse border border-gray-700"
              rowspan="2"
              style="vertical-align : middle;text-align:center;width: 5%;">Stackable</th
            >
          </tr>
          <tr>
            <th class="border-collapse border border-gray-700" scope="col">Type</th>
            <th class="border-collapse border border-gray-700" scope="col">QTY</th>
            <th class="border-collapse border border-gray-700" scope="col">Type</th>
            <th class="border-collapse border border-gray-700" scope="col">QTY</th>
            <th class="border-collapse border border-gray-700" scope="col">L</th>
            <th class="border-collapse border border-gray-700" scope="col">W</th>
            <th class="border-collapse border border-gray-700" scope="col">H</th>
          </tr>
  
          {#if data?.quoteRequest?.commodities}
            {#each data?.quoteRequest.commodities as commodity}
              <tr>
                <td class="border-collapse border border-gray-700" height="20">Pallets</td>
                <td class="border-collapse border border-gray-700">{commodity.quantity}</td>
                <td class="border-collapse border border-gray-700" />
                <td class="border-collapse border border-gray-700">{commodity.quantity}</td>
                <td class="border-collapse border border-gray-700" />
                <td class="border-collapse border border-gray-700">{commodity.description}</td>
                <td class="border-collapse border border-gray-700">{commodity.weight}</td>
                <td class="border-collapse border border-gray-700">{commodity.freightClass}</td>
                <td class="border-collapse border border-gray-700" />
                <td class="border-collapse border border-gray-700">{commodity.length}</td>
                <td class="border-collapse border border-gray-700">{commodity.width}</td>
                <td class="border-collapse border border-gray-700">{commodity.height}</td>
                <td class="border-collapse border border-gray-700"
                  >{commodity?.commodityServices?.includes(5) ? 'YES' : 'NO'}</td
                >
              </tr>
            {/each}
          {/if}

          <tr>
            <td class="total border-collapse border border-gray-700" colspan="2" height="20"
              >TOTAL H/U {data?.quoteRequest?.shipmentInfo?.totalItems}</td
            >
            <td class="total border-collapse border border-gray-700" colspan="2"
              >TOTAL PKG {data?.quoteRequest?.shipmentInfo?.totalItems}</td
            >
            <td class="total border-collapse border border-gray-700" colspan="2"
              >TOTAL Weight {data?.quoteRequest?.shipmentInfo?.totalWeight}</td
            >
            <td class="total border-collapse border border-gray-700" colspan="2"
              >TOTAL Density N/A</td
            >
            <td class="total border-collapse border border-gray-700" colspan="5">Cube N/A</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-1 mt-4">
        <h3 class="">
          * Weights includes total number of handeling units stated. Do not multiple weight by
          number of handeling units
        </h3>
      </div>
      <div class="mt-2 mb-2 font-bold">
        <h2>This shipment has preasigned PRO# and barcode do not apply pro sticker</h2>
      </div>

      <div class="aggrement mt-3 mb-3 flex h-[220px] justify-between gap-2 border-[1px] border-gray-700 p-4">
        <div
          class="flex w-[32%] flex-col justify-between border-r-[1px] border-r-gray-500 p-2"
        >
          <h3 class="mt-2">Shipper Signature / Date</h3>
          <div class="notice  flex flex-col">
            <p class="">
              This is to certify that the above-named materials are properly classified, described,
              packaged, marked and labeled, and are in proper condition for transportation according
              to the applicable regulations of the Department of Transportation
            </p>
          </div>
          <div class="flex flex-col">
            <p class="mt-3 flex w-full">
              Signature: <span class="mt-3 ml-1 block w-full  border-b-[.5px] border-gray-700" />
            </p>
            <p class="mt-4 flex w-full">
              Date: <span class="mt-3 ml-1 block w-full border-b-[.5px] border-gray-700" />
            </p>
          </div>
        </div>
        <div class="flex w-[36%] flex-col">
          <div class="flex w-full justify-around">
            <div class="ml-2 flex w-1/2 flex-col">
              <h3 class="mt-1 font-semibold">Trailer Loaded:</h3>
              <div class="flex flex-col gap-2">
                <div class="flex items-center">
                  <input type="checkbox" class="checkbox" id="trailer_loaded_by_driver" />
                  <label class="label ml-1 flex items-center" for="trailer_loaded_by_driver"
                    >By Driver
                  </label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" class="checkbox" id="trailer_loaded_by_shipper" />
                  <label class="label ml-1" for="trailer_loaded_by_driver">By Shipper </label>
                </div>
              </div>
              <div class="flex flex-col">
                <label for="hu_counted" class="label">Pieces Counted </label>
                <textarea
                  id="hu_counted"
                  class="h-[35px] w-[100px] border-[1px]  border-gray-700"
                />
              </div>
            </div>
            <div class="flex w-1/2 flex-col">
              <h3 class="mt-1 font-semibold">Freight Counted:</h3>
              <div class="flex flex-col gap-2">
                <div class="flex items-center">
                  <input type="checkbox" class="checkbox" id="freight_counted_by_driver" />
                  <label class="label ml-1 flex items-center" for="">By Driver </label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" class="checkbox" id="freight_counted_by_shipper" />
                  <label class="label ml-1" for="freight_counted_by_shipper">By Shipper </label>
                </div>
              </div>
              <div class="flex flex-col">
                <label for="hu_counted" class="label">HU Counted</label>
                <textarea
                  id="hu_counted"
                  class="h-[35px] w-[100px] border-[1px]  border-gray-700"
                />
              </div>
            </div>
          </div>
          <div class="ml-1 flex w-full flex-col">
            <label for="said_to_contain" class="label">Said to Contain</label>
            <textarea
              id="said_to_contain"
              class="h-[35px] w-[90%] border-[1px]  border-gray-700"
            />
          </div>
        </div>
        <div
          class="flex w-[32%] flex-col justify-between border-l-[1px] border-gray-700 p-2"
        >
          <h3 class="mt-2">Carrier Signature / Date</h3>
          <div class="notice mt-2 flex flex-col">
            <p class="">
              This is to certify that the above-named materials are properly classified, described,
              packaged, marked and labeled, and are in proper condition for transportation according
              to the applicable regulations of the Department of Transportation
            </p>
          </div>
          <div class="flex flex-col">
            <p class="mt-3 flex">
              Signature: <span class="mt-3 ml-1 block w-full border-b-[.5px] border-gray-700" />
            </p>
            <p class="mt-4 flex">
              Date: <span class="mt-3 ml-1 block w-full border-b-[.5px] border-gray-700" />
            </p>
          </div>
        </div>
      </div>
      <h3 class="note mt-4">
        * NOTE Liability Limitation for loss or damage in this shipment may be applicable. See 49
        U.S.C. 14706(c)(1)(A) and (B)
      </h3>
      <div class="notices flex flex-col gap-2 font-[7px]">
        <h3>
          <strong>Notice: </strong>: Unless the Shipper completes the requirements as provided
          below, Carrier’s liability shall be limited as stated in carrier minimun shipment
          coverage. in effect on date of shipment, which is available on line at
          www.firstshipper.com or may be obtained upon request to Carrier. Shipment is subject to
          the release value provisions of the NMFC as set forth in paragraph 2 on the reverse side
          of this Bill of Lading.
          <strong
            >In no event shall Carrier be liable for loss of pro t, income, interest, attorney fees,
            or any special, incidental or consequential damages.</strong
          >
        </h3>
        <h3>
          <strong
            >Carrier liability with shipment originating within the United States:
          </strong>Carrier’s liability shall be based on actual NMFC class of the shipment and is
          limited to Carrier’s minimum coverage. Carrier’s liability for all household goods,
          personal effects, and articles other than new, including but not limited to used,
          remanufactured or refurbished articles shall not exceed $1.00 per pound per individual
          lost or damaged piece within the shipment. Carrier’s highest level of liability is $25.00
          per pound per individual lost or damaged piece within the shipment, subject to $150,000.00
          maximum total liability per shipment. Shipper may increase Carrier’s limits on liability
          if the Shipper declares excess value on the Bill of Lading below, requests excess
          liability coverage from the Carrier and pays an additional charge. For this purpose the
          declared value of the property is hereby speci cally stated by the Shipper to be $ , and
          Shipper agrees to pay an additional charge for excess liability coverage. Total declared
          value may not exceed $650,000.00 per shipment.
        </h3>
        <h3>
          <strong>Carrier liability with shipment originating within Canada: </strong>Unless the
          Shipper completes the Special Agreement below, declares the value in the box below and
          agrees to pay the excess liability charge by initialing where indicated, Carrier’s maximum
          liability is CAN$2.00 per pound (CAN$4.41 per kilogram) per individual lost or damaged
          piece within the shipment, subject to a maximum total liability per shipment of
          CAN$20,000.00, and provided further that Carrier’s liability on household goods, personal
          effects articles other than new articles, including but not limited to used,
          remanufactured or refurbished articles, shall not exceed one dollar ($1.00) (CAN) per
          pound per individual lost or damaged piece within the shipment.
        </h3>
      </div>
    </div>
  </div>
{:else}
  <h3>No data</h3>
{/if}

<style>
  a > span.personName::first-letter {
    text-transform: capitalize !important;
  }
  .companyName::first-letter {
    text-transform: capitalize;
  }
</style>
