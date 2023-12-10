<div class="relative flex h-[400px] w-full flex-col items-center justify-center">
  <div class="absolute top-0 left-0 m-auto flex h-full w-full flex-col items-center justify-center">
    <div class="shipment-image absolute w-full max-w-[1300px]">
      <img
        src="https://images.unsplash.com/photo-1516833514026-5aa3dc6eeef3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2750&q=80"
        width="full"
        alt="firstshipper shipment tracking"
        class="background-image h-[400px] w-full max-w-[2000px] object-cover"
      />
    </div>
    <div class="absolute left-[calc(50%-150px)] top-0 mt-10 w-[300px]">
      <p class="text-white font-bold text-lg text-center">SHIPMENT TRACKING</p>
    </div>
    <div class="absolute top-32 w-full">
      <form class="m-auto flex flex-col items-center justify-center" action="/" method="post" id="">
        <div
          class="flex flex-col items-center justify-center gap-6 rounded-lg p-8 w-[500px] h-[200px]"
        >
          <input
            class="input w-[300px] text-center"
            style="background-color: white;"
            type="text"
            id="edit-tracking-tool"
            name="tracking_tool"
            value=""
            placeholder="pro number"
            required
            aria-required="true"
          />
          <button
            class="bg-neutral ownBtn w-[300px] font-bungee"
            type="submit"
            value="Track Shipment">Track Shipment</button
          >
        </div>
      </form>
    </div>
  </div>
</div>
