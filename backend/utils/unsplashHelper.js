// unsplashHelper.js
import dotenv from "dotenv";
import { createClient } from "pexels";

// Get the directory name in ES modules

// Load .env from backend folder (go up one level from utils/)
dotenv.config();

const client = createClient(process.env.PEXELS_API_KEY);

const buildSearchQuery = (placeName) => {
  const placeKeywords = {
    // Luzon
    banaue: "banaue rice terraces ifugao",
    vigan: "vigan heritage calle crisologo",
    "hundred islands": "hundred islands pangasinan",
    sagada: "sagada hanging coffins mountains",
    batanes: "batanes rolling hills stone houses",
    tagaytay: "taal volcano tagaytay",
    pagsanjan: "pagsanjan falls laguna",
    intramuros: "intramuros manila walled city fort",
    corregidor: "corregidor island fortress",
    anawangin: "anawangin cove zambales pine trees",
    pinatubo: "mount pinatubo crater lake",
    palaui: "palaui island cagayan beach",
    baguio: "baguio city pine trees session road",
    "mount pulag": "mount pulag sea of clouds",
    calaguas: "calaguas island camarines norte",
    caramoan: "caramoan islands limestone cliffs",
    mayon: "mayon volcano perfect cone",
    donsol: "donsol whale shark",
    sorsogon: "sorsogon bicol beach",
    masungi: "masungi georeserve rock formations",

    // Palawan
    "el nido": "el nido palawan limestone cliffs beach",
    coron: "coron palawan kayangan lake",
    "puerto princesa": "puerto princesa underground river",
    "port barton": "port barton palawan beach",
    balabac: "balabac palawan sandbar",
    "san vicente": "san vicente long beach palawan",
    tubbataha: "tubbataha reef diving",
    "honda bay": "honda bay puerto princesa",

    // Visayas
    boracay: "boracay white beach sunset",
    "chocolate hills": "chocolate hills bohol",
    kawasan: "kawasan falls cebu turquoise",
    magellan: "magellans cross cebu",
    panglao: "panglao island bohol beach",
    bantayan: "bantayan island cebu white sand",
    guimaras: "guimaras island mango beach",
    siquijor: "siquijor island mystical beach",
    "apo island": "apo island marine sanctuary diving",
    moalboal: "moalboal cebu sardine run",
    oslob: "oslob whale shark cebu",
    malapascua: "malapascua island cebu diving",
    kalanggaman: "kalanggaman island sandbar leyte",
    manjuyod: "manjuyod sandbar maldives philippines",
    dumaguete: "dumaguete negros oriental",
    bacolod: "bacolod masskara festival",
    iloilo: "iloilo molo church",
    carbin: "carbin reef white sandbar",

    // Mindanao
    siargao: "siargao cloud 9 surfing",
    "enchanted river": "hinatuan enchanted river blue water",
    "mount apo": "mount apo davao summit",
    dahican: "dahican beach mati skimboarding",
    camiguin: "camiguin island waterfalls",
    "tinuy-an": "tinuy-an falls surigao niagara",
    "lake sebu": "lake sebu seven falls tboli",
    dapitan: "dapitan zamboanga rizal shrine",
    dahilayan: "dahilayan bukidnon zipline",
    "white island": "white island camiguin sandbar",
    britania: "britania islands surigao",
    samal: "samal island garden city davao",
    bukidnon: "bukidnon pineapple plantations",
    "cagayan de oro": "cagayan de oro whitewater rafting",
  };

  const lowerName = placeName.toLowerCase();

  // Check if we have a specific keyword
  for (const [key, query] of Object.entries(placeKeywords)) {
    if (lowerName.includes(key)) {
      console.log(`  → Using specific query: "${query}"`);
      return query;
    }
  }

  // Default: use place name + philippines + tourist
  const defaultQuery = `${placeName} philippines tourist destination`;
  console.log(`  → Using default query: "${defaultQuery}"`);
  return defaultQuery;
};

export const getUnsplashImage = async (query) => {
  try {
    // Check if API key exists
    if (!process.env.PEXELS_API_KEY) {
      console.error("❌ PEXELS_API_KEY not found in environment variables!");
      return getRandomFallbackImage();
    }

    const searchQuery = buildSearchQuery(query);
    console.log(`🔍 Searching Pexels for: "${searchQuery}"`);

    const result = await client.photos.search({
      query: searchQuery,
      per_page: 5,
      orientation: "landscape",
    });

    if (result.photos && result.photos.length > 0) {
      const imageUrl = result.photos[0].src.large;
      console.log(`✅ Found image: ${imageUrl.substring(0, 60)}...`);
      return imageUrl;
    }

    console.log("⚠️  No results found, using fallback");
    return getRandomFallbackImage();
  } catch (error) {
    console.error("❌ Pexels API error:", error.message);
    return getRandomFallbackImage();
  }
};

const getRandomFallbackImage = () => {
  const fallbackImages = [
    "https://images.pexels.com/photos/2169205/pexels-photo-2169205.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const randomImage =
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  console.log(`  → Using fallback: ${randomImage.substring(0, 60)}...`);
  return randomImage;
};
