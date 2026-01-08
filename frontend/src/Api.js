// Api.js (Updated with Category Support)
const API_BASE_URL = "http://localhost:3000/Api";

export const placesAPI = {
  getAllPlaces: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/places`);
      if (!response.ok) throw new Error("Failed to fetch places");
      return await response.json();
    } catch (error) {
      console.error("Error fetching places:", error);
      return [];
    }
  },

  getPlacesByRegion: async (region) => {
    try {
      const response = await fetch(`${API_BASE_URL}/places?region=${region}`);
      if (!response.ok) throw new Error("Failed to fetch places");
      return await response.json();
    } catch (error) {
      console.error("Error fetching places by region:", error);
      return [];
    }
  },

  getPlacesByCategory: async (category, region = null) => {
    try {
      const url = region
        ? `${API_BASE_URL}/places?category=${category}&region=${region}`
        : `${API_BASE_URL}/places?category=${category}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch places by category");
      return await response.json();
    } catch (error) {
      console.error("Error fetching places by category:", error);
      return [];
    }
  },

  getPlaceById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/places/${id}`);
      if (!response.ok) throw new Error("Failed to fetch place");
      return await response.json();
    } catch (error) {
      console.error("Error fetching place:", error);
      return null;
    }
  },
};
