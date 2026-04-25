export interface Photo {
  id: string;
  src: string;
  alt: string;
  location: string;
  width: number;
  height: number;
  featured?: boolean;
}

export interface Location {
  slug: string;
  name: string;
  country: string;
  description: string;
  coverPhoto: string;
}

// ============================================================
// CONFIGURATION: Add your locations and photos here
// ============================================================

export const locations: Location[] = [
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    description: "Neon lights and quiet temples",
    coverPhoto: "/photos/tokyo/cover.jpg",
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    description: "Light, architecture, and timeless beauty",
    coverPhoto: "/photos/paris/cover.jpg",
  },
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    description: "The city that never sleeps",
    coverPhoto: "/photos/new-york/cover.jpg",
  },
];

// Photos organized by location slug
// Replace these with your actual photos — put them in public/photos/<location>/
export const photos: Photo[] = [
  // Tokyo
  {
    id: "tokyo-1",
    src: "/photos/tokyo/tokyo-1.jpg",
    alt: "Shibuya crossing at night",
    location: "tokyo",
    width: 1600,
    height: 2400,
  },
  {
    id: "tokyo-2",
    src: "/photos/tokyo/tokyo-2.jpg",
    alt: "Temple in morning light",
    location: "tokyo",
    width: 2400,
    height: 1600,
  },
  {
    id: "tokyo-3",
    src: "/photos/tokyo/tokyo-3.jpg",
    alt: "Cherry blossoms in Ueno Park",
    location: "tokyo",
    width: 1600,
    height: 2400,
  },
  // Paris
  {
    id: "paris-1",
    src: "/photos/paris/paris-1.jpg",
    alt: "Eiffel Tower at golden hour",
    location: "paris",
    width: 2400,
    height: 1600,
  },
  {
    id: "paris-2",
    src: "/photos/paris/paris-2.jpg",
    alt: "Café on a quiet street",
    location: "paris",
    width: 1600,
    height: 2400,
  },
  {
    id: "paris-3",
    src: "/photos/paris/paris-3.jpg",
    alt: "Seine at sunset",
    location: "paris",
    width: 2400,
    height: 1600,
  },
  // New York
  {
    id: "new-york-1",
    src: "/photos/new-york/new-york-1.jpg",
    alt: "Brooklyn Bridge at dawn",
    location: "new-york",
    width: 2400,
    height: 1600,
  },
  {
    id: "new-york-2",
    src: "/photos/new-york/new-york-2.jpg",
    alt: "Central Park in autumn",
    location: "new-york",
    width: 1600,
    height: 2400,
  },
  {
    id: "new-york-3",
    src: "/photos/new-york/new-york-3.jpg",
    alt: "Manhattan skyline",
    location: "new-york",
    width: 2400,
    height: 1600,
  },
];

export function getPhotosByLocation(slug: string): Photo[] {
  return photos.filter((p) => p.location === slug);
}

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getFeaturedPhotos(): Photo[] {
  // Return first photo from each location as featured
  const featured: Photo[] = [];
  for (const loc of locations) {
    const locPhotos = getPhotosByLocation(loc.slug);
    if (locPhotos.length > 0) featured.push(locPhotos[0]);
  }
  return featured;
}
