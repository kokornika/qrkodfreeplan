import React from 'react';
import { Phone, Mail, Globe, MapPin, Save, Share2 } from 'lucide-react';
import QRCode from 'qrcode.react';
import { Button } from './button';

interface PhonePreviewProps {
  className?: string;
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ className = '' }) => {
  // Generate example vCard string
  const exampleVCard = `BEGIN:VCARD
VERSION:3.0
N:Minta;János;;;
FN:Minta János
ORG:Tech Kft.
TITLE:Marketingmenedzser
TEL;TYPE=CELL:+36301234567
EMAIL:minta@minta.hu
URL:https://qrnevjegy.hu
ADR:;;Budapest, Minta u. 1.;;;;
END:VCARD`;

  return (
    <div className="space-y-4">
      {/* Desktop Try It Message */}
      <div className="hidden lg:block text-center bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-blue-700 font-medium mb-2">
         Próbáld ki te is! Görgess le a QR kódig és szkenneld be telefonoddal!
        </p>
        <p className="text-blue-600 text-sm">
          Nyisd meg a telefon kameráját és irányítsd a QR kódra.
        </p>
      </div>

      {/* Mobile Try It Message */}
      <div className="lg:hidden text-center bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
        <p className="text-blue-700 font-medium">
        Próbáld ki te is! Kattints a telefon alján lévő "Mentem a névjegyzékbe" gombra és máris a telefonkönyvedben lesz a névjegy!
        </p>
      </div>

      <div className={`relative mx-auto ${className}`} style={{ maxWidth: '320px' }}>
        <div className="relative border-[12px] border-black rounded-[3rem] shadow-xl">
          <div className="relative bg-white h-[600px] rounded-[2rem] flex flex-col overflow-hidden">
            {/* Header with Profile Circle Container */}
            <div className="relative flex-shrink-0">
              {/* Gradient Background */}
              <div 
                className="h-24 w-full"
                style={{
                  background: 'linear-gradient(135deg, #6366F1, rgba(99, 102, 241, 0.1))',
                  borderBottomLeftRadius: '1.5rem',
                  borderBottomRightRadius: '1.5rem'
                }}
              />
              
              {/* Profile Circle - Positioned relative to header */}
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-2xl font-semibold shadow-lg">
                  <span className="text-indigo-600">MJ</span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
              <div className="mt-12">
                {/* Name and Position */}
                <div className="text-center mb-8">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Minta János
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Marketingmenedzser - Tech Kft.
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-xl flex flex-col items-center justify-center bg-indigo-50">
                    <Phone className="w-5 h-5 mb-1 text-indigo-600" />
                    <span className="text-xs text-indigo-600">Telefon</span>
                  </div>
                  <div className="w-16 h-16 rounded-xl flex flex-col items-center justify-center bg-indigo-50">
                    <Mail className="w-5 h-5 mb-1 text-indigo-600" />
                    <span className="text-xs text-indigo-600">Email</span>
                  </div>
                  <div className="w-16 h-16 rounded-xl flex flex-col items-center justify-center bg-indigo-50">
                    <Globe className="w-5 h-5 mb-1 text-indigo-600" />
                    <span className="text-xs text-indigo-600">Web</span>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                    <Phone className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-sm">+36 30 123 4567</div>
                      <div className="text-xs text-gray-500">Mobil</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-sm">minta@minta.hu</div>
                      <div className="text-xs text-gray-500">Email</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-sm">qrnevjegy.hu</div>
                      <div className="text-xs text-gray-500">Weboldal</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-sm">Budapest, Minta u. 1.</div>
                      <div className="text-xs text-gray-500">Cím</div>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="mt-6 flex flex-col items-center">
                  <div className="w-40 h-40 bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
                    <QRCode
                      value={exampleVCard}
                      size={160}
                      level="M"
                      renderAs="svg"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 mb-4">
                    Szkenneld be a névjegyem
                  </p>

                  {/* Share Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Minta János - Digitális Névjegykártya',
                          text: 'Minta János digitális névjegykártyája',
                          url: window.location.href
                        }).catch(console.error);
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                          .then(() => alert('Link másolva a vágólapra!'))
                          .catch(console.error);
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Megosztás
                  </Button>

                  {/* Mobile Save Button */}
                  <div className="lg:hidden w-full">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      onClick={() => {
                        const blob = new Blob([exampleVCard], { type: 'text/vcard;charset=utf-8' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = 'minta_janos.vcf';
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                      }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Mentem a névjegyzékbe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Buttons */}
        <div className="absolute right-0 top-24 w-1 h-12 bg-black rounded-l-lg"></div>
        <div className="absolute left-0 top-20 w-1 h-8 bg-black rounded-r-lg"></div>
        <div className="absolute left-0 top-32 w-1 h-8 bg-black rounded-r-lg"></div>
      </div>
    </div>
  );
};

export default PhonePreview;