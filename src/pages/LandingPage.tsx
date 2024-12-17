import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Leaf,
  QrCode,
  Share2,
  Smartphone,
  BadgeCheck,
  RefreshCw,
  Shield
} from 'lucide-react';
import { Button } from '../components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="relative pt-20 pb-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/90">4.9/5 értékelés több mint 300+ elégedett ügyféltől</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Digitális Névjegykártya<br/>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                21. Századi Üzleti Megjelenés
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Tegye egyedivé és hatékonnyá üzleti kapcsolatépítését modern digitális névjegykártyával
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col items-center gap-4">
              <Link to="/vcard" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-white/30 hover:scale-[1.02]">
                  Elkészítem a névjegyem most
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <span className="text-sm text-white/60">14 napos pénzvisszafizetési garancia</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex flex-col items-center text-center">
                <QrCode className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-medium mb-2">Azonnali Megosztás</h3>
                <p className="text-sm text-white/70">QR kód vagy link segítségével</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="font-medium mb-2">Bármikor Frissíthető</h3>
                <p className="text-sm text-white/70">Mindig aktuális információk</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex flex-col items-center text-center">
                <Shield className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-medium mb-2">Biztonságos</h3>
                <p className="text-sm text-white/70">Védett adattárolás</p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80" 
                alt="Digital Business Card Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-white/5 backdrop-blur-sm border-y border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">300+</div>
              <div className="text-white/70">Aktív felhasználó</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-white/70">Átlagos értékelés</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-white/70">Környezetbarát</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Készítse el saját digitális névjegykártyáját most!
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Csatlakozzon a modern üzleti világhoz és tegye egyszerűbbé kapcsolatai kezelését
          </p>
          <Link to="/vcard">
            <Button className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-white/30 hover:scale-[1.02]">
              Elkészítem a névjegyem most
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;