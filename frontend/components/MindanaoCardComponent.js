// MindanaoCardComponent.js
class MindanaoCardComponent extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name") || "Mindanao Destination";
    const province = this.getAttribute("province") || "Province";
    const description = this.getAttribute("description") || "Description";
    const imageUrl =
      this.getAttribute("image") ||
      "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600";
    const placeId = this.getAttribute("place-id") || "";

    // Always blue for Mindanao
    const badgeColor = "bg-blue-500";

    this.innerHTML = `
      <div class="relative z-10 card bg-black shadow-lg w-full h-full flex flex-col hover:scale-105 transition-transform cursor-pointer" data-place-id="${placeId}">
          <div class="shadowyrt absolute inset-0"></div>
          <figure class="h-64 w-full overflow-hidden flex-shrink-0">
              <img
                  src="${imageUrl}"
                  alt="${name}"
                  loading="lazy"
                  class="w-full h-full object-cover"
                  onerror="this.src='https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600'" />
          </figure>
          <div class="relative z-10 card-body flex-grow flex flex-col justify-between">
              <div>
                  <h2 class="card-title text-lg mb-2">
                      ${name}
                      <div class="badge ${badgeColor} text-white border-none text-xs">${province}</div>
                  </h2>
                  <p class="text-sm mb-4">${description}</p>
              </div>
              <div class="card-actions justify-end">
                  <a href="PlacesDetails.html?id=${placeId}" class="badge border border-gray-600 hover:bg-white hover:text-black transition">More</a>
              </div>
          </div>
      </div>
    `;
  }
}

customElements.define("mindanao-card", MindanaoCardComponent);
