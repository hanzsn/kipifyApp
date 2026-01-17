class HomeComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section id="Home" class="bot relative flex h-full items-center flex-col w-full justify-center min-h-screen xl:flex-row overflow-x-hidden">

        <!-- Separate background layer for fade effect -->
        <img id="bgLayer" 
        src="./public/img/baguio.jpg"
        alt="Top Destinations"
        class="absolute inset-0 bg-center h-full w-full bg-cover will-change-opacity"
        loading="eager"
        fetchpriority="high">

        
        <div class="shadowybt absolute inset-0"></div>
        <div class="shadowyrt absolute inset-0"></div>

        <div
            class="left-text relative bottom-0 z-10 flex flex-col items-center justify-center w-full h-auto p-6 lg:mt-[80px] md:mt-[90px] sm:mt-[90px] xs:mt-[100px] text-center xl:bottom-40 xl:items-start lg:justify-start lg:w-1/2 lg:h-full lg:p-10 xl:text-left">
            <h1 class="tripify-font text-3xl font-bold text-white sm:text-5xl lg:text-5xl xl:text-7xl">
                Discover the Philippines<br>Top Destinations
            </h1>
            <p class="max-w-2xl mt-4 font-sans text-sm font-normal text-white sm:text-lg lg:text-lg lg:mt-6 lg:max-w-xl pb-5">
                Welcome to Tripify, your essential guide to the Philippines' unparalleled beauty.
                We help you find your next great adventure. Start planning your perfect lakbay (journey) across the archipelago today.
            </p>
        </div>

        <div
            class="top-0 xl:top-40 relative z-10 flex items-center justify-center h-auto pb-12 lg:items-end lg:justify-end lg:h-full p-6 xl:p-10 lg:pb-20 overflow-hidden">
            <div class="relative w-full max-w-md lg:max-w-none h-[450px] sm:h-[500px] flex items-center justify-center">

                <!-- Center Image (Current) -->
                <div class="z-20 w-64 overflow-hidden shadow-2xl right img-slider sm:w-72 lg:w-80 rounded-2xl">
                    <div class="relative h-64 sm:h-72 lg:h-80">
                        <img id="sliderImage" 
                        src="./public/img/baguio.jpg" 
                        alt="Destination"
                        class="object-cover w-full h-full will-change-opacity"
                        loading="eager"
                        fetchpriority="high">

                        <!-- Previous Button -->
                        <button id="prevBtn"
                            class="absolute z-10 p-2 transition transform -translate-y-1/3 rounded-full shadow-lg cursor-pointer sm:p-3 left-2 sm:left-4 top-1/2 bg-white/20 backdrop-blur-[4px] hover:bg-white/10 hover:backdrop-blur-xs">
                            <svg class="w-5 h-5 text-black sm:w-6 sm:h-6" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7">
                                </path>
                            </svg>
                        </button>

                        <!-- Next Button -->
                        <button id="nextBtn"
                            class="absolute z-10 p-2 transition transform -translate-y-1/3 rounded-full shadow-lg cursor-pointer sm:p-3 right-2 sm:right-4 top-1/2 bg-white/20 backdrop-blur-[4px] hover:bg-white/10 hover:backdrop-blur-xs">
                            <svg class="w-5 h-5 text-black sm:w-6 sm:h-6" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                                </path>
                            </svg>
                        </button>

                        <!-- Dots Indicator -->
                        <div id="dotsContainer"
                            class="absolute z-10 flex gap-2 transform \-translate-x-[50%] bottom-4 left-1/2">
                        </div>
                    </div>

                    <!-- Image Info -->
                    <div class="p-4 relative">
                        <div class="shadowyrt absolute inset-0"></div>
                        <div class="shadowylt absolute inset-0"></div>
                        <h3 id="imageTitle" class="tripify-font text-lg font-bold text-white sm:text-xl relative z-10">Baguio City</h3>
                        <p id="imageDesc" class="mt-1 text-sm text-white relative z-10">City of Pines and cool mountain air</p>
                    </div>
                </div>

            </div>
        </div>
    </section>`;
  }
}

customElements.define("app-home", HomeComponent);
