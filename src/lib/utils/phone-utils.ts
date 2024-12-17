export function normalizePhoneNumber(phone: string): string {
  // Eltávolítjuk a nem számjegy karaktereket, kivéve a + jelet az elején
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Ha üres a szám, visszaadjuk
  if (!cleaned) return '';

  // Ha már tartalmaz előhívót (+36/06/36)
  if (cleaned.startsWith('+36')) {
    return formatPhoneNumber(cleaned);
  } else if (cleaned.startsWith('06')) {
    return formatPhoneNumber('+36' + cleaned.slice(2));
  } else if (cleaned.startsWith('36')) {
    return formatPhoneNumber('+36' + cleaned.slice(2));
  }
  
  // Ha csak a szolgáltatói számot adták meg (pl. 701234567)
  if (cleaned.length >= 9 && (cleaned.startsWith('20') || cleaned.startsWith('30') || cleaned.startsWith('70'))) {
    return formatPhoneNumber('+36' + cleaned);
  }

  return formatPhoneNumber(cleaned);
}

function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // +36 formátumra alakítjuk
  let formatted = phone;
  if (formatted.startsWith('06')) {
    formatted = '+36' + formatted.slice(2);
  } else if (formatted.startsWith('36')) {
    formatted = '+' + formatted;
  }
  
  // Csoportosítjuk a számokat
  const groups = [];
  if (formatted.startsWith('+36')) {
    groups.push('+36');
    const rest = formatted.slice(3);
    if (rest.length > 0) groups.push(rest.slice(0, 2));
    if (rest.length > 2) groups.push(rest.slice(2, 5));
    if (rest.length > 5) groups.push(rest.slice(5, 9));
  } else {
    // Ha nincs előhívó, akkor is csoportosítunk
    for (let i = 0; i < formatted.length; i += 3) {
      groups.push(formatted.slice(i, i + 3));
    }
  }
  
  return groups.join(' ');
}

export function validatePhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Ha nincs elég számjegy, még nem validálunk
  if (cleaned.length < 11) return true;
  
  // Teljes telefonszám ellenőrzése
  const phoneRegex = /^(\+36|06|36)?[ -]?(20|30|31|50|70)[ -]?\d{3}[ -]?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}