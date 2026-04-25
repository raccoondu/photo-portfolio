export interface PrintOption {
  name: string; // e.g. "8×10", "16×20", "24×36"
  price: number; // in USD
}

export const defaultPrintOptions: PrintOption[] = [
  { name: '8"×10"', price: 35 },
  { name: '12"×16"', price: 55 },
  { name: '16"×20"', price: 85 },
  { name: '24"×36"', price: 150 },
];

export interface Photo {
  id: string;
  src: string;
  alt: string;
  description?: string; // 2-3 line blurb about the photo
  location: string; // slug of the sub-location (e.g. "japan")
  width: number;
  height: number;
  printable?: boolean; // set to false to disable print ordering for this photo
  printOptions?: PrintOption[]; // override default print options per photo
}

export interface SubLocation {
  slug: string;
  name: string;
  region: string; // slug of the parent region
  description: string;
  coverPhoto: string;
}

export interface Region {
  slug: string;
  name: string;
  subLocations: string[]; // slugs of sub-locations
}

// ============================================================
// CONFIGURATION: Regions (continents) and their sub-locations
// ============================================================

export const regions: Region[] = [
  {
    slug: "asia",
    name: "Asia",
    subLocations: ["japan", "thailand", "vietnam"],
  },
  {
    slug: "north-america",
    name: "North America",
    subLocations: ["new-york", "california", "mexico"],
  },
  {
    slug: "south-america",
    name: "South America",
    subLocations: ["colombia", "peru", "argentina"],
  },
];

export const subLocations: SubLocation[] = [
  // Asia
  {
    slug: "japan",
    name: "Japan",
    region: "asia",
    description: "Neon lights and quiet temples",
    coverPhoto: "/photos/japan/cover.jpg",
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "asia",
    description: "Golden temples and emerald waters",
    coverPhoto: "/photos/thailand/cover.jpg",
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    region: "asia",
    description: "Vibrant streets and misty mountains",
    coverPhoto: "/photos/vietnam/cover.jpg",
  },
  // North America
  {
    slug: "new-york",
    name: "New York",
    region: "north-america",
    description: "The city that never sleeps",
    coverPhoto: "/photos/new-york/cover.jpg",
  },
  {
    slug: "california",
    name: "California",
    region: "north-america",
    description: "Coast, desert, and golden light",
    coverPhoto: "/photos/california/cover.jpg",
  },
  {
    slug: "mexico",
    name: "Mexico",
    region: "north-america",
    description: "Color, culture, and ancient ruins",
    coverPhoto: "/photos/mexico/cover.jpg",
  },
  // South America
  {
    slug: "colombia",
    name: "Colombia",
    region: "south-america",
    description: "Rhythm, color, and mountain villages",
    coverPhoto: "/photos/colombia/cover.jpg",
  },
  {
    slug: "peru",
    name: "Peru",
    region: "south-america",
    description: "Ancient peaks and sacred valleys",
    coverPhoto: "/photos/peru/cover.jpg",
  },
  {
    slug: "argentina",
    name: "Argentina",
    region: "south-america",
    description: "Tango, Patagonia, and endless plains",
    coverPhoto: "/photos/argentina/cover.jpg",
  },
];

// Placeholder photos — replace src paths with your actual photos
export const photos: Photo[] = [
  // Japan
  { id: "japan-1", src: "/photos/japan/japan-1.jpg", alt: "Shibuya crossing at night", description: "The organized chaos of Shibuya crossing. Shot during rush hour when the rain turned the streets into mirrors.", location: "japan", width: 1600, height: 2400 },
  { id: "japan-2", src: "/photos/japan/japan-2.jpg", alt: "Temple in morning light", description: "Early morning at Senso-ji before the crowds arrive. The incense smoke caught the first light perfectly.", location: "japan", width: 2400, height: 1600 },
  { id: "japan-3", src: "/photos/japan/japan-3.jpg", alt: "Cherry blossoms in Ueno Park", description: "Peak sakura season in Ueno. Everyone was looking up — I pointed the camera down at the petals on the water.", location: "japan", width: 1600, height: 2400 },
  // Thailand
  { id: "thailand-1", src: "/photos/thailand/thailand-1.jpg", alt: "Wat Arun at sunset", location: "thailand", width: 2400, height: 1600 },
  { id: "thailand-2", src: "/photos/thailand/thailand-2.jpg", alt: "Floating market", location: "thailand", width: 1600, height: 2400 },
  { id: "thailand-3", src: "/photos/thailand/thailand-3.jpg", alt: "Phi Phi Islands", location: "thailand", width: 2400, height: 1600 },
  // Vietnam
  { id: "vietnam-1", src: "/photos/vietnam/vietnam-1.jpg", alt: "Ha Long Bay", location: "vietnam", width: 2400, height: 1600 },
  { id: "vietnam-2", src: "/photos/vietnam/vietnam-2.jpg", alt: "Hoi An lanterns", location: "vietnam", width: 1600, height: 2400 },
  { id: "vietnam-3", src: "/photos/vietnam/vietnam-3.jpg", alt: "Rice terraces in Sapa", location: "vietnam", width: 2400, height: 1600 },
  // New York
  { id: "new-york-1", src: "/photos/new-york/new-york-1.jpg", alt: "Brooklyn Bridge at dawn", location: "new-york", width: 2400, height: 1600 },
  { id: "new-york-2", src: "/photos/new-york/new-york-2.jpg", alt: "Central Park in autumn", location: "new-york", width: 1600, height: 2400 },
  { id: "new-york-3", src: "/photos/new-york/new-york-3.jpg", alt: "Manhattan skyline", location: "new-york", width: 2400, height: 1600 },
  // California
  { id: "california-1", src: "/photos/california/california-1.jpg", alt: "Big Sur coastline", location: "california", width: 2400, height: 1600 },
  { id: "california-2", src: "/photos/california/california-2.jpg", alt: "Joshua Tree at dusk", location: "california", width: 1600, height: 2400 },
  { id: "california-3", src: "/photos/california/california-3.jpg", alt: "Golden Gate in fog", location: "california", width: 2400, height: 1600 },
  // Mexico
  { id: "mexico-1", src: "/photos/mexico/mexico-1.jpg", alt: "Oaxaca street colors", location: "mexico", width: 1600, height: 2400 },
  { id: "mexico-2", src: "/photos/mexico/mexico-2.jpg", alt: "Cenote swim", location: "mexico", width: 2400, height: 1600 },
  { id: "mexico-3", src: "/photos/mexico/mexico-3.jpg", alt: "Tulum ruins", location: "mexico", width: 2400, height: 1600 },
  // Colombia
  { id: "colombia-1", src: "/photos/colombia/colombia-1.jpg", alt: "Cartagena old town", location: "colombia", width: 1600, height: 2400 },
  { id: "colombia-2", src: "/photos/colombia/colombia-2.jpg", alt: "Cocora Valley palms", location: "colombia", width: 2400, height: 1600 },
  { id: "colombia-3", src: "/photos/colombia/colombia-3.jpg", alt: "Guatapé from above", location: "colombia", width: 2400, height: 1600 },
  // Peru
  { id: "peru-1", src: "/photos/peru/peru-1.jpg", alt: "Machu Picchu at sunrise", location: "peru", width: 2400, height: 1600 },
  { id: "peru-2", src: "/photos/peru/peru-2.jpg", alt: "Rainbow Mountain", location: "peru", width: 1600, height: 2400 },
  { id: "peru-3", src: "/photos/peru/peru-3.jpg", alt: "Sacred Valley", location: "peru", width: 2400, height: 1600 },
  // Argentina
  { id: "argentina-1", src: "/photos/argentina/argentina-1.jpg", alt: "Buenos Aires street art", location: "argentina", width: 1600, height: 2400 },
  { id: "argentina-2", src: "/photos/argentina/argentina-2.jpg", alt: "Perito Moreno glacier", location: "argentina", width: 2400, height: 1600 },
  { id: "argentina-3", src: "/photos/argentina/argentina-3.jpg", alt: "Patagonia peaks", location: "argentina", width: 2400, height: 1600 },
];

// Helper functions
export function getRegion(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getSubLocation(slug: string): SubLocation | undefined {
  return subLocations.find((l) => l.slug === slug);
}

export function getSubLocationsByRegion(regionSlug: string): SubLocation[] {
  return subLocations.filter((l) => l.region === regionSlug);
}

export function getPhotosByLocation(slug: string): Photo[] {
  return photos.filter((p) => p.location === slug);
}

export function getPhotosByRegion(regionSlug: string): Photo[] {
  const region = getRegion(regionSlug);
  if (!region) return [];
  return photos.filter((p) => region.subLocations.includes(p.location));
}
