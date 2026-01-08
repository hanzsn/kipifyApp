class TopDestinationsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section id="TopDestinations" class="p-16 relative">
        <div class="shadowyrt absolute inset-0"></div>
        <div class="w-full max-w-4xl p-4 mx-auto">

            <h1 class="tripify-font mb-6 text-4xl left-text font-bold text-center text-white z-10">Top 10 Destinations in the Philippines: 2025
                Outlook
            </h1>

            <div class="overflow-x-auto shadow-2xl rounded-xl relative z-10 left-text">
                <table class="min-w-full divide-y divide-gray-700">
                    <!-- Table Header -->
                    <thead class="text-white bg-black">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase">
                                Destinations
                            </th>
                            <th scope="col" class="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase">
                                Focus
                            </th>
                            <th scope="col" class="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase">
                                2025 Vibe
                            </th>
                            <th scope="col" class="px-6 py-3 text-xs font-semibold tracking-wider text-right uppercase">
                                Recommended Duration
                            </th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-200 divide-y divide-gray-700">
                        <!-- Row 1: -->
                        <tr class="transition duration-150 bg-gray-900 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Palawan (El Nido & Coron)
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                Adventure & Marine Life
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-100 bg-green-800 rounded-full">
                                    The Last Frontier
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                7-10 Days
                            </td>
                        </tr>

                        <!-- Row 2: -->
                        <tr class="transition duration-150 bg-gray-800 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Boracay Island
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                Luxury Beach & Wellness
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-100 bg-yellow-800 rounded-full">
                                    Reimagined Paradise
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                3-5 Days
                            </td>
                        </tr>

                        <!-- Row 3: -->
                        <tr class="transition duration-150 bg-gray-900 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Siargao Island
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                Surfing & Laid-back Vibe
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-blue-100 bg-blue-800 rounded-full">
                                    Bohemian Surf Capital
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                5-7 Days
                            </td>
                        </tr>

                        <!-- Row 4: -->
                        <tr class="transition duration-150 bg-gray-800 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Negros Island
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                Food & Eco-Tourism
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-red-100 bg-red-800 rounded-full">
                                    Slow Food Travel
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                4-6 Days
                            </td>
                        </tr>

                        <!-- Row 5: -->
                        <tr class="transition duration-150 bg-gray-900 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Cebu (Central Visayas Hub)
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                Canyoneering & Urban Life
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-100 bg-green-800 rounded-full">
                                    Gateway to Adventure
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                5-8 Days
                            </td>
                        </tr>

                        <!-- Row 6: -->
                        <tr class="transition duration-150 bg-gray-800 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Banaue Rice terraces
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                Cultural Heritage & Trekking
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-100 bg-yellow-800 rounded-full">
                                    Eight wonder of the world
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                3-5 Days
                            </td>
                        </tr>

                        <!-- Row 7: -->
                        <tr class="transition duration-150 bg-gray-900 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Mayon Volcano, Albay
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                Volcanic Landscape & ATV Tours
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-blue-100 bg-blue-800 rounded-full">
                                    The perfect Cone
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                3-5 Days
                            </td>
                        </tr>

                        <!-- Row 8: -->
                        <tr class="transition duration-150 bg-gray-800 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Intramuros, Manila
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                Historical & Spanish Colonial
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-red-100 bg-red-800 rounded-full">
                                    Walled City History
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                2-3 Days
                            </td>
                        </tr>

                        <!-- Row 9: -->
                        <tr class="transition duration-150 bg-gray-900 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Siquijor
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                Waterfalls & Mystical Vibe
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-100 bg-green-800 rounded-full">
                                    The Mystical Island
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                5-7 Days
                            </td>
                        </tr>

                        <!-- Row 10: -->
                        <tr class="transition duration-150 bg-gray-800 hover:bg-gray-700">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                Vigan
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                UNESCO World Heritage & Culture
                            </td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-100 bg-yellow-800 rounded-full">
                                    Spanish Colonial History
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                2-3 Days
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-4 text-center relative z-10 left-text text-gray-400 text-sm">
                <div class="flex text-left">
                    <p>Note: There are more Top destinations in the
                        Philippines but the displayed list are only Top 10 destinations. To find more top destinations in
                        the philippines you can check this sources:
                        <a href="https://lakbaypinas.com/top-10-tourist-destination-in-the-philippines-2025/"
                        class="hover:underline">lakbaypinas.com</a> &
                        <a href="https://www.gmanetwork.com/news/lifestyle/travel/962129/asia-s-top-islands-cond-nast-traveler-2025/story/"
                        class="hover:underline">www.gmanetwork.com</a>
                        </p>
                </div>
                <p class="text-left">Last updated: November 2025.</p>
        </div>
    </section>`;
  }
}

customElements.define("app-topdestinations", TopDestinationsComponent);
