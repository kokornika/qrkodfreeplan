import { z } from 'zod';

const zipResponseSchema = z.object({
  zips: z.array(z.object({
    zip: z.string(),
    name: z.string(),
    lat: z.number(),
    lng: z.number(),
  }))
});

export type ZipLocation = {
  zip: string;
  name: string;
  lat: number;
  lng: number;
};

export async function fetchCityByZip(zip: string): Promise<ZipLocation[]> {
  try {
    if (!zip || zip.length !== 4) {
      return [];
    }

    const response = await fetch(`https://hur.webmania.cc/zips/${zip}.json`);
    
    if (!response.ok) {
      throw new Error('Nem sikerült lekérni a település adatait');
    }

    const data = await response.json();
    const parsed = zipResponseSchema.parse(data);

    return parsed.zips;
  } catch (error) {
    console.error('Hiba a település lekérése során:', error);
    return [];
  }
}