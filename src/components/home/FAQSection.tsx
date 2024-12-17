import React from 'react';
import { HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      question: 'Mennyi időre szól a digitális névjegykártya?',
      answer: 'A digitális névjegykártya 1 éves időtartamra szól. A lejárat után megújítható.'
    },
    {
      question: 'Mi történik, ha elveszítem a QR kódot?',
      answer: 'A QR kód bármikor újra letölthető a digitális névjegykártya weboldaláról, így nem kell aggódnia az elvesztés miatt.'
    },
    {
      question: 'Hogyan oszthatom meg a névjegyemet?',
      answer: 'A névjegy megosztható QR kód beolvasásával, közvetlen linkkel, vagy e-mailben. A QR kód kinyomtatható hagyományos névjegyre is.'
    },
    {
      question: 'Biztonságban vannak az adataim?',
      answer: 'Igen, az adatok biztonságos szervereken tárolódnak, és csak az Ön által jóváhagyott információk jelennek meg a névjegykártyán.'
    },
    {
      question: 'Működik offline is a névjegykártya?',
      answer: 'A QR kód beolvasásához internetkapcsolat szükséges, de a névjegy adatai elmenthetők a telefonba offline használatra.'
    }
  ];

  return (
    <section className="py-8 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Gyakori kérdések
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Válaszok a leggyakrabban felmerülő kérdésekre
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <HelpCircle className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;