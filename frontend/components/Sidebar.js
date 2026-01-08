class SidebarComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<aside class="fixed h-full bg-gray-700 aside min-w-[50vw] flex-col p-6 gap-12 hidden z-50 top-0 left-0 transition-transform duration-300 ease-in-out transform -translate-x-full">
        <div class="absolute inset-0 shadowyrt"></div>
        <div class="absolute inset-0 shadowylt"></div>
        <div class="z-50 flex items-center gap-2">
            <img src="./public/img/logo-transparent.png" alt="logo" height="30" width="30" />
            <a href="index.html#Home" class="text-xl font-medium text-white cursor-pointer tripify-font">Tripify
            </a>
        </div>
        <nav class="z-20 flex flex-col gap-4 link-wrapper">
            <a href="index.html#Home" class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                        clip-rule="evenodd" />
                </svg>
                Home</a>
            
            <!-- Destinations Dropdown -->
            <div class="sidebar-dropdown">
                <button class="sidebar-dropdown-btn flex items-center justify-between w-full gap-2 hover:translate-x-1 transition-transform duration-200">
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M10.915 2.345a2 2 0 0 1 2.17 0l7 4.52A2 2 0 0 1 21 8.544V9.5a1.5 1.5 0 0 1-1.5 1.5H19v6h1a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1v-6h-.5A1.5 1.5 0 0 1 3 9.5v-.955a2 2 0 0 1 .915-1.68l7-4.52ZM17 17v-6h-2v6h2Zm-6-6h2v6h-2v-6Zm-2 6v-6H7v6h2Z"
                                clip-rule="evenodd" />
                            <path d="M2 21a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z" />
                        </svg>
                        <span>Destinations</span>
                    </div>
                    <svg class="w-4 h-4 text-white transition-transform duration-200 dropdown-arrow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                    </svg>
                </button>
                <div class="sidebar-dropdown-menu hidden flex-col gap-2 pl-8 mt-2 overflow-hidden transition-all duration-300">
                    <a href="index.html#TopDestinations" class="hover:translate-x-1 transition-transform duration-200">Top Destinations</a>
                    <a href="destinations.html" class="hover:translate-x-1 transition-transform duration-200">All Destinations</a>
                    <a href="beach.html" class="hover:translate-x-1 transition-transform duration-200">Beaches & Islands</a>
                    <a href="mountain.html" class="hover:translate-x-1 transition-transform duration-200">Mountains & Nature</a>
                    <a href="city.html" class="hover:translate-x-1 transition-transform duration-200">Cities & Culture</a>
                    <a href="hidden-gems.html" class="hover:translate-x-1 transition-transform duration-200">Hidden Gems</a>
                </div>
            </div>

            <!-- Regions Dropdown -->
            <div class="sidebar-dropdown">
                <button class="sidebar-dropdown-btn flex items-center justify-between w-full gap-2 hover:translate-x-1 transition-transform duration-200">
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216.655.32Z" />
                        </svg>
                        <span>Regions</span>
                    </div>
                    <svg class="w-4 h-4 text-white transition-transform duration-200 dropdown-arrow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                    </svg>
                </button>
                <div class="sidebar-dropdown-menu hidden flex-col gap-2 pl-8 mt-2 overflow-hidden transition-all duration-300">
                    <a href="Luzon.html" class="hover:translate-x-1 transition-transform duration-200">Luzon</a>
                    <a href="Mindanao.html" class="hover:translate-x-1 transition-transform duration-200">Mindanao</a>
                    <a href="Visayaz.html" class="hover:translate-x-1 transition-transform duration-200">Visayas</a>
                </div>
            </div>

            <a href="index.html#about" class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                About</a>
        </nav>
    </aside>`;

    this.initDropdowns();
  }

  initDropdowns() {
    const dropdownBtns = this.querySelectorAll(".sidebar-dropdown-btn");

    dropdownBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const menu = btn.nextElementSibling;
        const arrow = btn.querySelector(".dropdown-arrow");

        menu.classList.toggle("hidden");
        menu.classList.toggle("flex");

        arrow.classList.toggle("rotate-180");
      });
    });
  }
}

customElements.define("app-sidebar", SidebarComponent);
