import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const reviews = [
  {
    name: "Kovács Péter",
    company: "Marketing Vezető",
    review: "Amióta digitális névjegykártyát használok, sokkal professzionálisabb képet mutatok az üzleti partnereimnek.",
    rating: 5
  },
  {
    name: "Nagy Andrea",
    company: "Értékesítési Menedzser",
    review: "Hihetetlen, mennyivel egyszerűbb lett a kapcsolatépítés. Mindenki le van nyűgözve a modern megoldástól.",
    rating: 5
  },
  {
    name: "Szabó János",
    company: "Ügyvezető",
    review: "A legjobb befektetés volt az üzleti megjelenésem szempontjából. Ajánlom mindenkinek!",
    rating: 5
  }
];

const SocialProof = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-indigo-900/50 to-purple-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Mit mondanak ügyfeleink?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-4 text-sm leading-relaxed">"{review.review}"</p>
              <div className="text-white/70 text-sm">
                <div className="font-medium">{review.name}</div>
                <div>{review.company}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA after testimonials */}
        <div className="mt-12 text-center">
          <Link to="/vcard">
            <Button 
              className="w-full sm:w-auto h-12 px-8 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 shadow-lg hover:shadow-xl transition-all rounded-xl backdrop-blur-sm"
            >
              Csatlakozom az elégedett ügyfelekhez
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;