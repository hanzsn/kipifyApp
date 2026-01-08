class MainHComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<main class="bot relative z-10 flex justify-center h-full w-full">
        <img src="./public/img/baguio.jpg"
        class="bg-cover bg-center absolute h-full w-full">
        <div class="absolute inset-0 shadowyrt"></div>
        <div class="h-[50vh] flex items-center w-full px-10 left-text z-10">
            <h1 class="text-5xl sm:text-6xl font-semibold tripify-font">Hidden Gems Destinations</h1>
        </div>
    </main>`;
  }
}

customElements.define("app-mainh", MainHComponent);
