export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  trialDays: number;
  features: string[];
  comparisonPoints: string[];
}

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'professional',
    name: 'Professzionális csomag',
    price: 5990,
    period: '1 év',
    trialDays: 14,
    features: [
      'Egyedi digitális névjegykártya weboldal',
      'Professzionális QR kód generálás',
      'Korlátlan névjegy megosztás',
      'Azonnali adatfrissítés',
      '14 napos ingyenes próbaidőszak'
    ],
    comparisonPoints: [
      'Nincs többé nyomtatási költség',
      'Elkerülhető az újranyomtatás névjegyváltozás esetén',
      'Környezetbarát - nincs papír és festékhasználat',
      'Nincs többé "elfogyott névjegy" probléma',
      'Nem gyűrődik, nem szakad, nem vész el',
      'Kockázatmentes - 14 napos pénzvisszafizetési garancia'
    ]
  }
];