import React from 'react';
import { 
  Leaf, 
  Share2, 
  Globe2, 
  Shield,
  QrCode,
  BadgeCheck,
  Pencil,
  Wallet
} from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: 'Környezetbarát',
    description: 'Nincs szükség papírra, festékre - védjük együtt környezetünket!'
  },
  {
    icon: Share2,
    title: 'Azonnali megosztás',
    description: 'Ossza meg névjegyét azonnal bárkivel, bárhol a világon!'
  },
  {
    icon: Globe2,
    title: 'Mindig elérhető',
    description: 'Névjegye a nap 24 órájában elérhető az interneten keresztül'
  },
  {
    icon: Shield,
    title: 'Biztonságos tárolás',
    description: 'Adatai biztonságban vannak és csak Ön rendelkezik felettük'
  },
  {
    icon: QrCode,
    title: 'Beépített QR kód',
    description: 'Mutassa meg a QR kódot és az összes adat azonnal a partner telefonjába kerül'
  },
  {
    icon: BadgeCheck,
    title: 'Professzionális megjelenés',
    description: 'Modern, személyre szabható design a pozitív első benyomásért'
  },
  {
    icon: Pencil,
    title: 'Egyszerű kezelés',
    description: 'Intuitív felület, amely nem igényel technikai szaktudást'
  },
  {
    icon: Wallet,
    title: 'Költséghatékony',
    description: 'Nincs több nyomtatási költség és újranyomtatás'
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-8 sm:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Miért válassza a digitális névjegykártyát?
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            A modern üzleti világban a digitális névjegykártya nem csak egy lehetőség,
            hanem egy szükségszerű lépés a hatékonyabb kapcsolatépítés felé.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 sm:mb-4">
                <benefit.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;