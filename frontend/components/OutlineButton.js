class OutlineButtonComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<button type="button"
        class="btn active:translate-y-1 lg:btn-md w-[256px] text-sm xl:text-lg lg:text-lg sm:text-lg btn-neutral text-white bg-black hover:translate-y-px btn-sm rounded-lg">
        SEE MORE DESTINATIONS!</button>`

        const auth = document.querySelector(".btn");

        auth.addEventListener("click", () => {
            window.location.href = `./AuthForm.html`;
        });
    }
}

customElements.define('outline-btn', OutlineButtonComponent)