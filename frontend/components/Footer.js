class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` <footer class="bot relative p-10 bg-white/2 footer sm:footer-horizontal text-base-content">
        <hr class="absolute w-full border-t-2 border-gray-800">
            <div class="shadowyrt absolute inset-0"></div>
        <aside class="text-white z-20">
            <img src="./public/img/logo-transparent.png" alt="logo" height="50" width="50">
            </svg>
            <p>
                Tripify
                <br />
                Providing reliable philippines top destinations since 2025
                <br>
                © 2025 Hanz. All rights reserved.
            </p>
        </aside>
        <nav class="text-white z-20">
            <h6 class="footer-title">Navigation Links</h6>
            <a href="index.html#Home" class="link hover:underline">Home</a>
            <a href="index.html#TopDestinations" class="link hover:underline">Top Destinations</a>
            <a href="index.html#about" class="link hover:underline">About us</a>
        </nav>
       <!--<nav class="text-white z-20">
            <h6 class="footer-title">Company</h6>
        </nav>
        <nav class="text-white z-20">
            <h6 class="footer-title">Legal</h6>
            <a class="link hover:underline">Terms of use</a>
            <a class="link hover:underline">Privacy policy</a>
            <a class="link hover:underline">Cookie policy</a>
        </nav>-->
    </footer>`;
  }
}

customElements.define("app-footer", FooterComponent);
