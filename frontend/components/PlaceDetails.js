class PlacesDetailsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<main class="flex flex-col items-center justify-center w-full gap-6 p-6">
      <div
        class="flex flex-col items-center justify-center xl:max-w-[50vw] w-full mt-[80px] gap-6"
      >
        <div class="relative w-full h-[30vh] bot">
          <img
            src=""
            alt=""
            class="w-full h-full bg-center bg-cover rounded-lg"
          />
          <div class="absolute inset-0 shadowyrt"></div>
        </div>
        <div class="w-full p-6 rounded-lg bg-white/5">
          <div class="flex items-center justify-between mb-4">
            <h1 id="name" class="text-xl tripify-font">
              Name of Place
            </h1>
            <div class="badge badge-secondary" id="province">
              Province
            </div>
          </div>

          <div id="loading" class="py-8 text-center">
            <div
              class="inline-block w-8 h-8 border-b-2 border-gray-700 rounded-full animate-spin"
            ></div>
            <p class="mt-2">Loading detailed information...</p>
          </div>

          <div id="content" class="hidden">
            <div class="mb-4">
              <h3 class="mb-2 text-lg font-semibold">About</h3>
              <p
                id="description"
                class="text-sm leading-relaxed desc left-text"
              >
                Loading...
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div
                class="p-4 rounded border border-gray-700 hover:shadow-lg hover:translate-y-[-2px] left-text"
              >
                <h4 class="mb-2 font-semibold">Best Time to Visit</h4>
                <p id="best_time" class="text-sm">-</p>
              </div>
              <div
                class="p-4 rounded border border-gray-700 hover:shadow-lg hover:translate-y-[-2px] left-text"
              >
                <h4 class="mb-2 font-semibold">Climate</h4>
                <p id="climate" class="text-sm">-</p>
              </div>
            </div>

            <div
              class="p-4 rounded border border-gray-700 hover:shadow-lg hover:translate-y-[-2px] left-text"
            >
              <h3 class="mb-2 text-lg font-semibold">Popular Activities</h3>
              <ul
                id="activities"
                class="space-y-1 text-sm list-disc list-inside"
              >
                <li>Loading...</li>
              </ul>
            </div>
          </div>
        </div>

        <h1 class="tripify-font">Highlights</h1>
        <div id="additional-info" class="w-full space-y-4 text-sm left-text">
          <p class="border border-gray-700 rounded bg-white/5">
            Loading highlights...
          </p>
        </div>
      </div>
    </main>`;
  }
}

customElements.define("app-placesdetails", PlacesDetailsComponent);
