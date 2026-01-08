class LoginForm extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<form action="#" method="post"
        class="flex flex-col items-center justify-center gap-4 p-6 m-6 bg-white border border-gray-300 rounded-lg shadow-2xl py-14 w-110">
        <h1 class="pb-8 text-3xl font-semibold tripify-font">LOGIN</h1>

        <!-- username-wrapper -->
        <div class="grid w-full max-w-[20rem]">
            <label for="username" class="text-xs">Username or Email</label>
            <input type="text" name="text" id="username" placeholder="username" autocomplete="on"
                class="w-full p-2 border border-gray-300 rounded">
        </div>

        <!-- pass-wrapper -->
        <div class="grid w-full max-w-[20rem] pb-4">
            <label for="password" class="text-xs">Password</label>
            <div class="relative flex items-center">
                <input type="password" name="password" id="password" placeholder="password" oncopy="return false"
                    oncut="return false" class="w-full p-2 border border-gray-300 rounded">

                <!-- eye -->
                <svg class="absolute hidden w-4 h-4 text-black cursor-pointer right-2" id="eye" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-width="2"
                        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <!-- eye-slash -->
                <svg class="absolute hidden w-4 h-4 cursor-pointer right-2" id="eye-slash" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
        </div>

        <!-- Login-btn-wrapper -->
        <div class="flex flex-col w-full max-w-[20rem] gap-2">
            <button class="w-full text-white bg-black rounded btn hover:bg-gray-800">
                Login
            </button>
            <div class="flex items-center justify-center w-full gap-2">
                <div class="w-full max-w-[14.5rem] border-b-2 border-gray-300"></div>
                <span>or</span>
                <div class="w-full max-w-[14.5rem] border-b-2 border-gray-300"></div>
            </div>
            <button class="w-full border border-gray-300 rounded btn hover:bg-gray-100">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                    </g>
                </svg>
                Login with Google
            </button>
            <button class="w-full border border-gray-300 rounded btn hover:bg-gray-100">
                <svg class="text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                        clip-rule="evenodd" />
                </svg>
                Login with Facebook
            </button>
        </div>

        <!-- signup -->
        <div class="flex gap-2 text-sm">
            <p>Don't have an account?</p><a href="#" class="underline">Signup</a>
        </div>
    </form>`;
    }
}

customElements.define("login-form", LoginForm);
