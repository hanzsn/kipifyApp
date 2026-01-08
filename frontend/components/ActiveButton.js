class ActiveButtonComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<button type="button" id="auth"
                class=" p-2 text-sm font-medium font-sans text-white transition-all duration-300 bg-black rounded-lg cursor-pointer log hover:bg-[hsl(0,0%,10%)] max-lg:hidden hover:translate-y-px">Get
                Started</button>`

        const auth = document.querySelector("#auth");

        auth.addEventListener("click", () => {
            window.location.href = `./AuthForm.html`;
        });
    }
}

customElements.define('active-btn', ActiveButtonComponent);