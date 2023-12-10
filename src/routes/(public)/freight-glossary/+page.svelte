<script lang="ts">
  //@ts-nocheck
  import { fade } from 'svelte/transition';
  let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  $: selectedLetter = 'all';
  let selectedBtn:any;
  function changeDepartment(event:any,letter: string) {
    console.debug(letter, event.target.id);
    let btnElement = document.getElementById(event?.target?.id);
    if(selectedBtn != null && selectedBtn){
      selectedBtn.style.color = "black"
    }
    if(btnElement){
      btnElement.style.color = "white"
      selectedBtn = btnElement
    }
    selectedLetter = letter;
    let element = document.getElementById(letter);

    element
      ? element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' })
      : null;
  }
</script>

<div
  class="bg-whitebg fixed left-0 right-0 mx-auto flex h-[180px] w-full max-w-[1240px] flex-col justify-center rounded-md mt-[70px]"
  style="z-index:1000;"
>
  <h1 class="pb-3 text-center font-bold">Freight Glossary</h1>
  <div class="flex flex-col">
    <ul class="flex flex-wrap items-center justify-center px-2">
      {#each letters as letter, index}
        {#if index == 0}
          <li style="color:white;background-color:white"
            class="mr-1 mt-1 inline rounded-full border-2 border-gray-700 p-1 font-bold text-white"
            id="all"
            transition:fade
            class:selectedLetter={'all' == selectedLetter}
          >
            <button style="color:black;"
              class="inline-block text-white min-h-[20px] min-w-[20px]"
              on:click|preventDefault={(event)=> changeDepartment(event,'all')}>all</button
            >
          </li>
        {/if}
        <li
          class="mr-1 mt-1 inline rounded-full border-2 border-gray-700 p-1 font-bold"
          transition:fade
          class:selectedLetter={letter == selectedLetter}
        >
          <button
            id="button-{letter}"
            class="inline-block min-h-[20px] min-w-[20px]"
            on:click|preventDefault={(event) => changeDepartment(event,letter)}
            >{letter}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>
<div class="mx-auto mt-[250px] flex w-full max-w-[1240px] flex-col">
  <table
    class="datatable flex flex-col"
    cellpadding="0"
    cellspacing="0"
    summary="This table lists the general  freight terms glossary"
  >
    <tbody class="px-3">
      <tr>
        <td class="px-3 py-4"
          ><a id="a" />
          <h3 class="text-medium pb-3 font-semibold">Average Annual Daily Truck Traffic (AADTT)</h3>
          <p>
            The total volume of truck traffic on a highway segment for one year, divided by the
            number of days in the year.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a id="b" />
          <h3 class="text-medium pb-3 font-semibold">Backhaul</h3>
          <p />
          <p>
            The process of a transportation vehicle (typically a truck) returning from the original
            destination point to the point of origin. A backhaul can be with a full or partially
            loaded trailer.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Barge</h3>
          <p />
          <p>
            The cargo-carrying vehicle that inland water carriers primarily use. Basic barges have
            open tops, but there are covered barges for both dry and liquid cargoes.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Belly Cargo</h3>
          <p>Air freight carried in the belly of passenger aircraft.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Bill of Lading</h3>
          <p>
            A transportation document that is the contract of carriage containing the terms and
            condition between shipper and carrier.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Bottleneck</h3>
          <p />
          <p>
            A section of a highway or rail network that experiences operational problems such as
            congestion. Bottlenecks may result from factors such as reduced roadway width or steep
            freeway grades that can slow trucks.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Boxcar</h3>
          <p />
          <p>
            An enclosed railcar, typically 40 or more feet long, used for packaged freight and some
            bulk commodities.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Breakbulk Cargo</h3>
          <p>
            Cargo of non-uniform sizes, often transported on pallets, sacks, drums, or bags. These
            cargoes require labor-intensive loading and unloading processes. Examples of breakbulk
            cargo include coffee beans, logs, or pulp.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Broker</h3>
          <p />
          <p>
            A person whose business it is to prepare shipping and customs documents for
            international shipments. Brokers often have offices at major freight gateways, including
            border crossings, seaports, and airports.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Bulk Cargo</h3>
          <p>
            Cargo that is unbound as loaded; it is without count in a loose unpackaged form.
            Examples of bulk cargo include coal, grain, and petroleum products.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="c" id="c" />
          <h3 class="text-medium pb-3 font-semibold">Cabotage</h3>
          <p />
          <p>
            A national law that requires costal and intercostal traffic to be carried in its own
            nationally registered, and sometimes built and crewed ships.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Capacity</h3>
          <p />
          <p>
            The physical facilities, personnel and process available to meet the product of service
            needs of the customers. Capacity generally refers to the maximum output or producing
            ability of a machine, a person, a process, a factory, a product, or a service.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Cargo Ramp</h3>
          <p>A dedicated load/unload facility for cargo aircraft.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Carload</h3>
          <p />
          <p>
            Quantity of freight (in tons) required to fill a railcar; amount normally required to
            qualify for a carload rate.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Carrier</h3>
          <p />
          <p>A firm which transports goods or people via land, sea or air.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Centralized Dispatching</h3>
          <p>
            The organization of the dispatching function into one central location. This structure
            often involves the use of data collection devices for communication between the
            centralized dispatching function, which usually reports to the production control
            department and the shop manufacturing departments.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Chassis</h3>
          <p />
          <p>
            A trailer-type device with wheels constructed to accommodate containers, which are
            lifted on and off.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Claim</h3>
          <p />
          <p>Charges made against a carrier for loss, damage, delay, or overcharge.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Class I Carrier</h3>
          <p>
            A classification of regulated carriers based upon annual operating revenues-motor
            carrier of property greater than or equal to $5 million; railroads: greater than or
            equal to $50 million: motor carriers of passengers; greater than or equal to $3 million.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Class II Carrier</h3>
          <p>
            A classification of regulated carriers based upon annual operating revenues-motor
            carrier of property $1- $5 million; railroads: $10-$50 million: motor carriers of
            passengers; less than or equal to $3 million.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Class III Carrier</h3>
          <p>
            A classification of regulated carriers based upon annual operating revenues-motor
            carrier of property less than or equal to $1 million; railroads: greater than or equal
            to $10 million.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Classification Yard</h3>
          <p>A railroad terminal area where railcars are grouped together to form train units.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Coastal Shipping</h3>
          <p>
            Also known as short-sea or coastwise shipping, describes marine shipping operations
            between ports along a single coast or involving a short sea crossing.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Contract Carrier</h3>
          <p>
            A carrier that does not serve the general public, but provides transportation for hire
            for one or a limited number of shippers under a specific contract.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Commodity</h3>
          <p />
          <p>
            An Item that is traded in commerce. The term usually implies an undifferentiated product
            competing primarily on price and availability.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Common Carrier</h3>
          <p>
            Any carrier engaged in the interstate transportation of persons/property on a regular
            schedule at published rates, whose services are for hire to the general public.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Consignee</h3>
          <p />
          <p>The receiver of a freight shipment, usually the buyer.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Consignor</h3>
          <p />
          <p>The sender of a freight shipment, usually the seller.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Container</h3>
          <p />
          <p>
            A "box"' typically ten to forty feet long, which is used primarily for ocean freight
            shipment. For travel to and from ports, containers are loaded onto truck chassis' or on
            railroad flatcars.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Container on Flatcar (COFC)</h3>
          <p>Containers resting on railway flatcars without a chassis underneath.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Containerization</h3>
          <p />
          <p>
            A shipment method in which commodities are placed in containers, and after initial
            loading, the commodities per se are not re-handled in shipment until they are unloaded
            at destination.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Containerized Cargo</h3>
          <p>
            Cargo that is transported in containers that can be transferred easily from one
            transportation mode to another.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Contract Carrier</h3>
          <p>
            Carrier engaged in interstate transportation of persons/property by motor vehicle on a
            for-hire basis, but under continuing contract with one or a limited number of customers
            to meet specific needs.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Cubage</h3>
          <p />
          <p>Cubic volume of space being used or available for shipping or storage.</p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="d" id="d" />
          <h3 class="text-medium pb-3 font-semibold">Deadhead</h3>
          <p />
          <p>
            The return of an empty transportation container back to a transportation facility.
            Commonly-used description of an empty backhaul.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Detention Fee</h3>
          <p>
            The carrier charges and fees applied when rail freight cars, ship and carriers are
            retained beyond a specified loading or unloading time.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Demurrage</h3>
          <p />
          <p>
            The carrier charges and fees applied when rail freight cars and ships are retained
            beyond a specific loading or unloading time.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Direct to store</h3>
          <p>
            Process of shipping direct from a manufacturer’s plant or distribution center to the
            customer’s retail store, thus bypassing the customer’s distribution center.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Dispatcher</h3>
          <p />
          <p>
            An individual tasked to assign available transportation loads to available carriers.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Distribution Center (DC)</h3>
          <p>
            The warehouse facility which holds inventory from manufacturing pending distribution to
            the appropriate stores.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Dock</h3>
          <p />
          <p>A space used or receiving merchandise at a freight terminal.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Double-stack</h3>
          <p />
          <p>Railcar movement of containers stacked two high.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Drayage</h3>
          <p />
          <p>
            Transporting of rail or ocean freight by truck to an intermediate or final destination;
            typically a charge for pickup/delivery of goods moving short distances (e.g., from
            marine terminal to warehouse).
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Drop</h3>
          <p />
          <p>
            A situation in which an equipment operator deposits a trailer or boxcar at a facility at
            which it is to be loaded or unloaded.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Durable Goods</h3>
          <p>
            Generally, any goods whose continuous serviceability is likely to exceed three years.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="e" id="e" />
          <h3 class="text-medium pb-3 font-semibold">Exempt Carrier</h3>
          <p>
            A for-hire carrier that is free from economic regulation. Trucks hauling certain
            commodities are exempt from Interstate Commerce Commission economic regulation. By far
            the largest portion of exempt carrier transports agricultural commodities or seafood.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="f" id="f" />
          <h3 class="text-medium pb-3 font-semibold">Flatbed</h3>
          <p />
          <p>A trailer without sides used for hauling machinery or other bulky items.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">For-hire Carrier</h3>
          <p>Carrier that provides transportation service to the public on a fee basis.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Freight All Kinds (FAK)</h3>
          <p>
            Goods classified FAK are usually charged higher rates than those marked with a specific
            classification and are frequently in a container that includes various classes of cargo.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Freight Forwarder</h3>
          <p>
            A person whose business is to act as an agent on behalf of a shipper. A freight
            forwarder frequently consolidates shipments from several shippers and coordinates
            booking reservations.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Free Trade Zone (FTZ)</h3>
          <p>
            An area or zone set aside at or near a port or airport, under the control of the U.S.
            Customs Service, for holding goods duty-free pending customs clearance.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Fuel-Taxed Waterway System</h3>
          <p>
            Eleven thousand miles of the U.S. waterway system designated by the Water Resources
            Development Act of 1986. Commercial users of this system pay a per gallon fuel tax which
            is deposited in the Inland Waterways Trust Fund and used to fund inland navigation
            projects each year.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Four P's</h3>
          <p>
            Set of marketing tools to direct the business offering to the customer. The four P's are
            product, price, place and promotion.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="g" id="g" />
          <h3 class="text-medium pb-3 font-semibold">Gross Vehicle Weight (GVW)</h3>
          <p>The combined total weight of a vehicle and its freight.</p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="h" id="h" />
          <h3 class="text-medium pb-3 font-semibold">Hazardous Material</h3>
          <p>
            A substance or material which the Department of Transportation has determined to be
            capable of posing a risk to health, safety, and property when stored or transported in
            commerce.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Hours of Service</h3>
          <p>Ruling that stipulates the amount of time a driver is allotted to work.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Hub</h3>
          <p />
          <p>
            A common connection point for devices in a network. Referenced for a transportation
            network as in "hub and spoke"which is common in the airline and trucking industry.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="i" id="i" />
          <h3 class="text-medium pb-3 font-semibold">In-bond Shipment</h3>
          <p>
            A shipment status in which goods are permitted to enter a country and temporarily stored
            for transport to a final destination where the duty will be paid.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Inbound Logistics</h3>
          <p>
            The movement of materials from shippers and vendors into production processes or storage
            facilities.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Interline Freight</h3>
          <p>
            Freight moving from point of origin to destination over the lines of two or more
            transportation lines.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Intermodal terminal</h3>
          <p>
            A location where links between different transportation modes and networks connect.
            Using more than one mode of transportation in moving persons and goods. For example, a
            shipment moved over 1000 miles could travel by truck for one portion of the trip, and
            then transfer to rail at a designated terminal.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Inventory</h3>
          <p />
          <p>The number of units and/or value of the stock of good a company holds.</p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="j" id="j" />
          <h3 class="text-medium pb-3 font-semibold">Just-in-Time (JIT)</h3>
          <p>
            Cargo or components that must be at a destination at the exact time needed. The
            container or vehicle is the movable warehouse.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="l" id="l" />
          <h3 class="text-medium pb-3 font-semibold">Lead-time</h3>
          <p />
          <p>
            The total time that elapses between an order's placement and it receipt. It includes the
            time required for order transmittal, order processing, order preparation, and transit.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">
            Less-Than-Containerload/Less-Than-Truckload (LCL/LTL)
          </h3>
          <p>
            A container or trailer loaded with cargo from more than one shipper; loads that do not
            by themselves meet the container load or truckload requirements.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Level of Service (LOS)</h3>
          <p>
            A qualitative assessment of a road's operating conditions. For local government
            comprehensive planning purposes, level of service means an indicator of the extent or
            degree of service provided by, or proposed to be provided by, a facility based on and
            related to the operational characteristics of the facility. Level of service indicates
            the capacity per unit of demand for each public facility.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Lift-on/Lift-off (lo/lo) Cargo</h3>
          <p>
            Containerized cargo that must be lifted on and off vessels and other vehicles using
            handling equipment.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Line Haul</h3>
          <p>
            The movement of freight over the road/rail from origin terminal to destination terminal,
            usually over long distances.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Liquid Bulk Cargo</h3>
          <p>
            A type of bulk cargo that consists of liquid items, such as petroleum, water, or liquid
            natural gas.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Live Load</h3>
          <p>
            As situation in which the equipment operation stays with the trailer or boxcar while
            being loaded or unloaded.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Lock</h3>
          <p />
          <p>A channel where the water rises and falls to allow boats to travel a dammed river.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Logbook</h3>
          <p>
            - A daily record of the hours an interstate driver spends driving, off duty, sleeping in
            the berth, or on duty not driving.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Logistics</h3>
          <p />
          <p>
            All activities involved in the management of product movement; delivering the right
            product from the right origin to the right destination, with the right quality and
            quantity, at the right schedule and price.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Lumpers</h3>
          <p />
          <p>
            Individuals that assist a motor carrier owner operator in the unloading of property;
            quite commonly used in the food industry.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="n" id="n" />
          <h3 class="text-medium pb-3 font-semibold">Neo-bulk Cargo</h3>
          <p>
            Shipments consisting entirely of units of a single commodity, such as cars, lumber, or
            scrap metal.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Node</h3>
          <p />
          <p>
            A fixed point in a firm's logistics system where goods come to rest; includes plants,
            warehouses, supply sources, and markets.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="o" id="o" />
          <h3 class="text-medium pb-3 font-semibold">OS&amp;D</h3>
          <p />
          <p>
            Over, short and damaged. Report is issued at warehouse when goods are damaged; claim is
            usually filed with the carrier.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">On-dock Rail</h3>
          <p>
            Direct shipside rail service. Includes the ability to load and unload
            containers/breakbulk directly from rail car to vessel.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Outbound Logistics</h3>
          <p>
            The process related to the movement and storage of products from the end of the
            production line to the end user.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Operating Ratio</h3>
          <p>
            A measure of operation efficiency defined as: (Operating Expenses/Operation Revenues) x
            100.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Owner-operator</h3>
          <p />
          <p>Trucking operation in which the owner of the truck is also the driver.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><a name="p" id="p" />
          <h3 class="text-medium pb-3 font-semibold">Placard</h3>
          <p />
          <p>A label that identifies a hazardous material shipment and the hazards present.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Piggyback</h3>
          <p />
          <p>
            A rail/truck service. A shipper loads a highway trailer, and a carrier drives it to a
            rail terminal and loads it on a flatcar; the railroad moves the trailer-on-flatcar
            combination to the destination terminal, where the carrier offloads the trailer and
            delivers it to the consignee.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Pool/Drop Trailers</h3>
          <p>Trailer that are staged at a facilities for preloading purposes.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Point of Sale (POS)</h3>
          <p>
            The time and place at which a sale occurs, such as a cash register in a retail
            operation, or the order confirmation screen in an on-line session. Supply chain partners
            are interested in capturing data at the POS because it is a true record of the sale
            rather than being derived from other information such as inventory movement.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Port Authority</h3>
          <p>
            State or local government that owns, operates, or otherwise provides wharf, dock, and
            other terminal investments at ports.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Private Carrier</h3>
          <p>
            A carrier that provides transportation service to the firm that owns or leases the
            vehicles and does not charge a fee.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Private Warehouse</h3>
          <p>A company owned warehouse.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Prepaid</h3>
          <p />
          <p>
            A freight term, which indicates that charges are to be paid by the shipper. Prepaid
            shipping charges may be added to the customer invoice, or the cost may be bundled into
            the pricing of the product.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Proof of Delivery</h3>
          <p>
            Information supplied by the carrier containing the name of the person who signed for the
            shipment, the time and date of delivery, and other shipment delivery related
            information.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Pull Logistics System</h3>
          <p>
            "Just in time"logistics system driven by customer demand and enabled by
            telecommunications and information systems rather than by manufacturing process and
            inventory stockpiling.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Purchase Order (PO)</h3>
          <p>
            The purchaser's authorization used to formalize a purchase transaction with a supplier.
            The physical form or electronic transaction a buyer uses when placing an order for
            merchandise.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Push Logistics System</h3>
          <p>
            Inventory-based logistics system characterized by regularly scheduled flows of products
            and high inventory levels.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="r" id="r" />
          <h3 class="text-medium pb-3 font-semibold">Rail Siding</h3>
          <p>
            A very short branch off a main railway line with only one point leading onto it. Sidings
            are used to allow faster trains to pass slower ones or to conduct maintenance.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Reefer Trailer</h3>
          <p>A refrigerated trailer that is commonly used for perishable goods.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Regional Railroad</h3>
          <p>
            Railroad defined as line-haul railroad operating at least 350 miles of track and/or
            earns revenue between $40 million and $266.7 million.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Reliability</h3>
          <p />
          <p>
            Refers to the degree of certainty and predictability in travel times on the
            transportation system. Reliable transportation systems offer some assurance of attaining
            a given destination within a reasonable range of an expected time. An unreliable
            transportation system is subject to unexpected delays, increasing costs for system
            users.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Reverse Logistics</h3>
          <p>
            A specialized segment of logistics focusing on the movement and management of products
            and resources after the sale and after delivery to the customer. Includes product
            returns and repair for credit.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Receiving</h3>
          <p />
          <p>
            The function encompassing the physical receipt of material, the inspection of the
            shipment for conformance with the purchase order (quantity and damage), the
            identification and delivery to destination, and the preparation of receiving reports.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Return to Vendor (RTV)</h3>
          <p>
            Material that has been rejected by the customer or buyer's inspection department and is
            awaiting shipment back to supplier for repair or replacement.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Radio Frequency (RFID)</h3>
          <p>
            A form of wireless communication that lets users relay information via electronic energy
            waves from a terminal to a base station, which is linked in turn to a host computer. The
            terminals can be placed at a fixed station, mounted on a forklift truck, or carried in
            the worker's hand. The base station contains a transmitter and receiver for
            communication with the terminals. When combined with a bar-code system for identifying
            inventory items, a radio-frequency system can relay data instantly, thus updating
            inventory records in so-called "real time".
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Roll-on/Roll-off (ro/ro) Cargo</h3>
          <p>
            Wheeled cargo, such as automobiles, or cargo carried on chassis that can be rolled on or
            off vehicles without using cargo handling equipment.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="s" id="s" />
          <h3 class="text-medium pb-3 font-semibold">Seasonality</h3>
          <p />
          <p>
            Repetitive pattern of demand from year to year (or other repeating time interval) with
            some periods considerably higher than others. Seasonality explains the fluctuation in
            demand for various recreational products, which are used during different seasons.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Shipper</h3>
          <p />
          <p>Party that tenders goods for transportation.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Shipping Manifest</h3>
          <p>A document that lists the pieces in a shipment.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Short Line Railroad</h3>
          <p>
            Freight railroads which are not Class I or Regional Railroads, that operate less than
            350 miles of track and earn less than $40 million.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Short-sea Shipping</h3>
          <p>
            Also known as coastal or coastwise shipping, describes marine shipping operations
            between ports along a single coast or involving a short sea crossing.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Sleeper Team</h3>
          <p>
            Two drivers who operated a truck equipped with a sleeper berth; while one driver sleeps
            in the berth to accumulate mandatory off-duty time, the other driver operates the
            vehicle.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Stock Keeping Unit (SKU)</h3>
          <p>A category of unit with unique combination of form, fit and function.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Stock Outs</h3>
          <p>
            Merchandise that is requested by a customer but is temporarily unavailable. Also
            referred to as (OOS).
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Stop Off Charge</h3>
          <p>
            Charge associated with a load that has more than one drop off point. Typically, the
            first stop of a multistop load is free, and then the charge applies to the subsequent
            stops.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Strategic Highway Network (STRAHNET)</h3>
          <p>
            A network of highways which are important to the United States' strategic defense policy
            and which provide defense access, continuity, and emergency capabilities for defense
            purposes.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">
            Strategic Rail Corridor Network (STRACNET)
          </h3>
          <p>
            An interconnected and continuous rail line network consisting of over 38,000 miles of
            track serving over 170 defense installations.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Switching and Terminal Railroad</h3>
          <p>Railroad that provides pick-up and delivery services to line-haul carriers.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Supply Chain</h3>
          <p>
            Starting with unprocessed raw materials and ending with final customer using the
            finished goods.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="t" id="t" />
          <h3 class="text-medium pb-3 font-semibold">TEU</h3>
          <p />
          <p>Twenty-foot equivalent unit, a standard size intermodal container</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Third-party Logistics (3PL) Provider</h3>
          <p>
            A specialist in logistics who may provide a variety of transportation, warehousing, and
            logistics-related services to buyers or sellers. These tasks were previously performed
            in-house by the customer.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Throughput</h3>
          <p />
          <p>
            Total amount of freight imported or exported through a seaport measured in tons or TEUs.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Ton-mile</h3>
          <p />
          <p>
            A measure of output for freight transportation; reflects weight of shipment and the
            distance it is hauled; a multiplication of tons hauled by the distance traveled.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Trailer on Flatcar (TOFC)</h3>
          <p>Transport of trailers with their loads on specially designed rail cars.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Transit time</h3>
          <p>The total time that elapses between a shipment's delivery and pickup.</p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Transloading</h3>
          <p />
          <p>
            Transferring bulk shipments from the vehicle/container of one mode to that of another at
            a terminal interchange point.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Truckload (TL)</h3>
          <p>
            Quantity of freight required to fill a truck, or at a minimum, the amount required to
            qualify for a truckload rate.
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-4"
          ><h3 class="text-medium pb-3 font-semibold">Twenty-foot Equivalent Unit (TEU)</h3>
          <p>
            The 8-foot by 8-foot by 20-foot intermodal container is used as a basic measure in many
            statistics and is the standard measure used for containerized cargo.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="u" id="u" />
          <h3 class="text-medium pb-3 font-semibold">Unit Train</h3>
          <p>
            A train of a specified number of railcars handling a single commodity type which remain
            as a unit for a designated destination or until a change in routing is made.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="v" id="v" />
          <h3 class="text-medium pb-3 font-semibold">Vehicle Miles of Travel (VMT)</h3>
          <p>
            A unit to measure vehicle travel made by a private vehicle, such as an automobile, van,
            pickup truck, or motorcycle.
          </p>
        </td>
      </tr>

      <tr>
        <td class="px-3 py-4"
          ><a name="w" id="w" />
          <h3 class="text-medium pb-3 font-semibold">Warehouse</h3>
          <p />
          <p>
            Storage place for products. Principal warehouse activities include receipt of product,
            storage, shipment and order picking.
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .selectedLetter {
    border-color: #000;
    color: #fff;
    --tw-border-opacity: 1;
    background-color: rgb(55 65 81 / var(--tw-border-opacity));
  }
  a, p, h3,h1,button{
    color: #000;
  }
</style>
