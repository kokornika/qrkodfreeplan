import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import StarRating from '../ui/StarRating';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-0 lg:pt-16 pb-8 overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-2 gap-8 items-center">
          {/* Hero Image */}
          <div className="relative flex justify-center md:col-span-3 lg:col-span-1 lg:justify-end lg:order-2 lg:-mr-16 xl:-mr-32 mt-1
            md:mt-0">
            {/* Background effects container */}
            <div className="lg:hidden absolute inset-0 rounded-[40px] bg-gradient-to-b from-white/10 to-transparent backdrop-blur-[2px] -z-10" />
            
            <div className="relative w-full max-w-[1000px] aspect-[4/3] lg:aspect-auto">
              <picture>
                {/* Mobile image */}
                <source
                  media="(max-width: 768px)"
                  srcSet="/hero-image-mobile.png"
                />
                {/* Tablet image */}
                <source
                  media="(max-width: 1024px)"
                  srcSet="/hero-image.png"
                />
                {/* Desktop image */}
                <img 
                  src="/hero-image.png"
                  alt="Digitális névjegykártya bemutató"
                  className="w-full h-full object-contain 
                    scale-100 
                    md:scale-125 
                    lg:scale-150 
                    max-h-[40vh] 
                    md:max-h-[60vh] 
                    lg:max-h-none 
                    transform 
                    translate-y-0 
                    md:translate-y-0 
                    lg:translate-y-0"
                />
              </picture>
              
              {/* Desktop-only glow effect */}
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent rounded-3xl filter blur-2xl -z-10" />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-left space-y-4 lg:space-y-6 md:col-span-2 lg:col-span-1 lg:pr-8 lg:order-1 relative z-20 -mt-8 md:mt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Digitális Névjegykártya 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text block mt-2">
               Ami Mindig A Zsebedben Van
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-indigo-100/90 leading-relaxed max-w-xl">
              Online elérhető, állandó rendelkezésre álló, személyre szabott névjegykártya QR kóddal és 1 
              gombos megosztással ami akár 5 perc alatt elkészíthető!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2 lg:pt-4">
              <Link to="/vcard" className="flex-shrink-0">
                <Button 
                  className="w-full sm:w-auto h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg font-semibold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-white/30 hover:scale-[1.02] animate-pulse"
                >
                  Elkészítem a saját névjegyem!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 lg:gap-6 pt-4 lg:pt-8 text-white/60 text-xs lg:text-sm">
              <div className="flex items-center gap-2">
                <StarRating rating={4.9} />
                <span>4.9/5 értékelés</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>3000+ aktív felhasználó</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;