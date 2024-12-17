// Hungarian special character mappings for monogram generation
const hungarianDigraphs = new Map([
  ['sz', 'Sz'],
  ['zs', 'Zs'],
  ['cs', 'Cs'],
  ['gy', 'Gy'],
  ['ly', 'Ly'],
  ['ny', 'Ny'],
  ['ty', 'Ty'],
  ['dzs', 'Dzs']
]);

/**
 * Generates a monogram from a Hungarian name
 * Handles special cases like Sz, Ty, etc.
 */
export function generateHungarianMonogram(name: string): string {
  if (!name) return '';
  
  const nameParts = name.trim().split(' ').filter(Boolean);
  if (nameParts.length === 0) return '';

  return nameParts
    .map(part => {
      part = part.toLowerCase();
      
      // Check for three-letter digraphs first (dzs)
      if (part.startsWith('dzs')) {
        return 'Dzs';
      }
      
      // Check for two-letter digraphs
      for (const [digraph, initial] of hungarianDigraphs) {
        if (part.startsWith(digraph)) {
          return initial;
        }
      }
      
      // Handle regular characters
      return part.charAt(0).toUpperCase();
    })
    .join('');
}

/**
 * Splits a Hungarian name into family name and given names
 */
export function splitHungarianName(name: string): { familyName: string; givenNames: string } {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return { familyName: '', givenNames: '' };
  
  const familyName = parts[0];
  const givenNames = parts.slice(1).join(' ');
  
  return { familyName, givenNames };
}