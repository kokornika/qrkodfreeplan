import React from 'react';
import { CreditCard, ArrowRight, Star, Users, Leaf } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center pt-16 pb-8 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-blue-900/98 to-purple-900/95" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full animate-fade-in">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 text-sm">Több mint 300+ elégedett ügyfél</span>
          </div>
          
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Digitális Névjegykártya<br/>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mt-4 block">
                21. Századi Üzleti Megjelenés
              </span>
            </h2>
          </div>
          
          <p className="text-lg sm:text-xl text-indigo-100/90 leading-relaxed max-w-2xl mx-auto px-4">
            Tegye egyedivé üzleti megjelenését modern digitális névjegykártyával! 
            Ossza meg kapcsolatait egyetlen kattintással, bárhol és bármikor.
          </p>
          
          <div className="flex flex-col gap-4 items-stretch px-4 sm:px-0 mt-12">
            <Link to="/vcard">
              <Button 
                className="w-full h-14 px-8 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-white/30 hover:scale-[1.02] animate-pulse"
              >
                <span className="mr-2">🎁</span>
                Digitális névjegykártya készítése
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/guide">
              <Button 
                className="w-full h-12 text-base text-white/90 hover:text-white bg-transparent hover:bg-transparent border-0 rounded-xl transition-colors"
              >
                Hogyan működik?
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/80 text-sm mb-4">Csatlakozzon elégedett ügyfeleinkhez</p>
            <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.9/5 értékelés</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>300+ aktív felhasználó</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-400" />
                <span>100% környezetbarát</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 text-red-400">🏢</span>
                <span>100%-ban magyar vállalkozás Budapestről</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;