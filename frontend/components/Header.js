class HeaderComponent extends HTMLElement {
  previousScrollPosition = 0;
  headerElement = null;
  HEADER_HEIGHT = 64;
  scrollTimeout = null;

  connectedCallback() {
    this.innerHTML = `<header class="top absolute top-0 flex items-center justify-around w-full h-16 gap-8 px-4 bg-black/20 backdrop-blur-[4px] shadow-xl z-30 transition-all duration-300 ease-in-out" id="mainHeader">

            <div class="flex items-center gap-8 z-20">
                <div class="flex items-center"><img src="./public/img/logo-transparent.png" alt="logo" height="40" width="40" />
                <a href="index.html" class="tripify-font text-2xl font-medium cursor-pointer text-white">Tripify
                </a>
                </div>
                <a href="Search.html"><svg class="w-5 h-5 text-gray-800 dark:text-white hover:translate-y-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg></a>
            </div>

            <nav class="flex gap-8 text-md max-md:hidden max-md:text-sm relative z-30">
            <div><a href="index.html#Home" class="animated-link">Home</a></div>

                <div class="dropdown-container relative">
                    <a href="#" class="animated-link">Destinations</a>
                    <div class="menu-list absolute hidden gap-2 p-2 mt-2 rounded shadow-2xl bg-black font-semibold min-w-max">
                        <a href="index.html#TopDestinations" class="hover:bg-white/10 hover:backdrop-blur-[4px] hover:rounded hover:shadow px-2 whitespace-nowrap">Top Destinations</a>
                        <a href="Destinations.html#destinations" class="hover:bg-white/10 hover:backdrop-blur-[4px] hover:rounded hover:shadow px-2 whitespace-nowrap">All Destinations</a>
                        <a href="beach.html#beach" class="hover:bg-white/10 hover:backdrop-blur-[4px] hover:rounded px-2 whitespace-nowrap">Beaches & Islands</a>
                        <a href="mountain.html#mountain" class="hover:bg-white/10 hover:backdrop-blur-[4px] hover:rounded px-2 whitespace-nowrap">Mountains & Nature</a>
                        <a href="city.html#city" class="hover:bg-white/10 hover:backdrop-blur-[4px] hover:rounded px-2 whitespace-nowrap">Cities & Culture</a>
                        <a href="hidden-gems.html#hidden-gems" class="hover:bg-white/10 hover:backdrop-blur-[4px] hover:rounded px-2 whitespace-nowrap">Hidden Gems</a>
                    </div>
                </div>

                <div class="dropdown-container relative">
                    <a href="#" class="animated-link">Regions</a>
                    <div class="menu-list absolute hidden gap-2 p-2 mt-2 rounded shadow-2xl bg-black font-semibold min-w-max">
                        <a href="Luzon.html#Luzon" class="hover:bg-white/10 hover:backdrop-blur-[4px] hover:rounded px-2 whitespace-nowrap">Luzon</a>
                        <a href="Visayaz.html#Visayaz" class="hover:bg-white/10 hover:backdrop-blur-[4px] hover:rounded px-2 whitespace-nowrap">Visayaz</a>
                        <a href="Mindanao.html#Mindanao" class="hover:bg-white/10 hover:backdrop-blur-[4px] hover:rounded px-2 whitespace-nowrap">Mindanao</a>
                    </div>
                </div>

                <a href="index.html#about" class="animated-link">About</a>
            </nav>

            <div class="hidden max-md:flex z-20">
                <svg class="sidebar-btn cursor-pointer w-6 h-6 active:translate-y-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m7 10 1.99994 1.9999-1.99994 2M12 5v14M5 4h14c.5523 0 1 .44772 1 1v14c0 .5523-.4477 1-1 1H5c-.55228 0-1-.4477-1-1V5c0-.55228.44772-1 1-1Z" />
                </svg>
            </div>
        </header>`;

    this.headerElement = this.querySelector("#mainHeader");
    window.addEventListener("scroll", this.throttledScroll.bind(this), {
      passive: true,
    });
  }

  throttledScroll() {
    if (this.scrollTimeout) return;

    this.scrollTimeout = setTimeout(() => {
      this.handleScroll();
      this.scrollTimeout = null;
    }, 100);
  }

  handleScroll() {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > this.HEADER_HEIGHT) {
      if (this.previousScrollPosition < currentScrollPosition) {
        this.headerElement.classList.add("header-hidden");
      } else {
        this.headerElement.classList.remove("header-hidden");
      }
    } else {
      this.headerElement.classList.remove("header-hidden");
    }

    this.previousScrollPosition = currentScrollPosition;
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.throttledScroll.bind(this));
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
  }
}

customElements.define("app-header", HeaderComponent);
