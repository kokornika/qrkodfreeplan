import React from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Save, 
  ArrowRight,
  Globe,
  Shield,
  RefreshCw,
  Share2,
  MessageSquare,
  Send,
  Smartphone,
  Users,
  Briefcase
} from 'lucide-react';
import { Button } from '../components/ui/button';
import PhonePreview from '../components/ui/PhonePreview';

const Guide = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Hogyan működik a digitális névjegykártya?
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ismerje meg a modern névjegykezelés két egyszerű módját!
            </p>
          </div>
        </div>
      </section>

      {/* Two Methods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hogyan osztható meg a digitális névjegykártya?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Personal Meeting Method */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">1. Személyes találkozón</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <QrCode className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Mutassa meg QR kódját</h4>
                        <p className="text-gray-600 text-sm">
                          Nyissa meg digitális névjegyét és mutassa meg a QR kódot partnerének.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Smartphone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Ügyfele/Partnere beolvassa azt</h4>
                        <p className="text-gray-600 text-sm">
                          Partnere telefonja kamerájával beolvassa a QR kódot.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Save className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Azonnali mentés</h4>
                        <p className="text-gray-600 text-sm">
                          Egy kattintással elmenti névjegyét a telefonkönyvébe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Sharing Method */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold">2. Online megosztás</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Share2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Válasszon csatornát (Megosztás gomb)</h4>
                        <div className="grid grid-cols-3 gap-3 mt-3">
                          <div className="text-center">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                              <MessageSquare className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-xs text-gray-600">SMS</span>
                          </div>
                          <div className="text-center">
                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                              <Send className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-xs text-gray-600">Email</span>
                          </div>
                          <div className="text-center">
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                              <Share2 className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-xs text-gray-600">Közösségi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Partner megnyitja a kapott linket</h4>
                        <p className="text-gray-600 text-sm">
                          A kapott linkre kattintva megnyílik digitális névjegye.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Save className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Egy kattintásos mentés</h4>
                        <p className="text-gray-600 text-sm">
                          Partnere azonnal elmentheti névjegyét a telefonkönyvébe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop CTA - Hidden on mobile */}
              <div className="hidden lg:block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Készítse el saját digitális névjegykártyáját most!
                </h3>
                <p className="text-blue-100 mb-6">
                  Próbálja ki professzionális névjegykártya készítő szolgáltatásunkat és tegye egyszerűbbé üzleti kapcsolatépítését.
                </p>
                <Link to="/vcard">
                  <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50">
                    Névjegykártya készítése
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Phone Preview */}
            <div className="lg:sticky lg:top-24 h-fit">
              <PhonePreview />
              
              {/* Mobile CTA - Only visible on mobile */}
              <div className="lg:hidden mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Készítse el saját digitális névjegykártyáját most!
                </h3>
                <p className="text-blue-100 mb-6">
                  Próbálja ki professzionális névjegykártya készítő szolgáltatásunkat és tegye egyszerűbbé üzleti kapcsolatépítését.
                </p>
                <Link to="/vcard">
                  <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50">
                    Névjegykártya készítése
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Impact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Professzionális megjelenés minden helyzetben
            </h2>
            <p className="text-lg text-gray-600">
              Tegye egyedivé és hatékonnyá üzleti kapcsolatépítését
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Modern üzleti megjelenés</h3>
              <p className="text-gray-600">
                Tükrözze vállalkozása innovatív szemléletét digitális névjegyével
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Mindig naprakész</h3>
              <p className="text-gray-600">
                Frissítse adatait bármikor, partnerei mindig az aktuális információkat látják
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Megbízható tárolás</h3>
              <p className="text-gray-600">
                Biztonságos és professzionális megoldás üzleti kapcsolatai kezelésére
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Készítse el saját digitális névjegykártyáját most!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Csatlakozzon a modern üzleti világhoz és tegye egyszerűbbé kapcsolatai kezelését
          </p>
          <Link to="/vcard">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3">
              Névjegykártya készítése
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Guide;