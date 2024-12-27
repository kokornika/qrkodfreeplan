export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  comparisonPoints: string[];
}

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'professional',
    name: 'Professzionális csomag',
    price: 5990,
    period: '1 év',
    features: [
      'Egyedi digitális névjegykártya weboldal',
      'Professzionális QR kód generálás',
      'Korlátlan névjegy megosztás',
      'Azonnali adatfrissítés'
    ],
    comparisonPoints: [
      'Nincs többé nyomtatási költség',
      'Elkerülhető az újranyomtatás névjegyváltozás esetén',
      'Környezetbarát - nincs papír és festékhasználat',
      'Nincs többé "elfogyott névjegy" probléma',
      'Nem gyűrődik, nem szakad, nem vész el'
    ]
  }
];