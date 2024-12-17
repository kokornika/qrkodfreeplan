import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Send, QrCode } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus('idle'), 3000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <Link to="/" className="flex items-center">
              <QrCode className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">QRNevjegy</span>
            </Link>
            <p className="text-xs sm:text-sm">
              Modern megoldás üzleti kapcsolatai digitalizálásához. Környezetbarát és költséghatékony.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Gyors linkek</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Főoldal
                </Link>
              </li>
              <li>
                <Link to="/vcard" className="hover:text-blue-400 transition-colors">
                  Digitális névjegy
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guide" className="hover:text-blue-400 transition-colors">
                  Útmutató
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Jogi információk</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                  Adatkezelési tájékoztató
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">
                  ÁSZF
                </Link>
              </li>
              <li className="flex items-center gap-2 mt-4">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:info@qrnevjegy.hu" className="hover:text-blue-400 transition-colors">
                  info@qrnevjegy.hu
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+36303551793" className="hover:text-blue-400 transition-colors">
                  +36 30 355 1793
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Hírlevél feliratkozás</h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email címed..."
                    className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {subscribeStatus === 'success' && (
                <p className="text-green-400 text-xs sm:text-sm">Sikeres feliratkozás!</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-red-400 text-xs sm:text-sm">Hiba történt. Kérjük, próbáld újra!</p>
              )}
            </form>
            <p className="text-xs sm:text-sm mt-2 text-gray-400">
              Iratkozz fel hírlevelünkre, hogy értesülj a legújabb fejlesztésekről és ajánlatokról.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} QRNevjegy. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
