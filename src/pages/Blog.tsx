import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, QrCode, CreditCard, Smartphone, Share2, Briefcase } from 'lucide-react';

const blogPosts = [
  {
    id: 5,
    slug: 'digitalis-nevjegykartya-keszites-vallalkozasoknak',
    title: 'Digitális Névjegykártya Készítés Vállalkozásoknak: Modern Megoldás a Kapcsolatépítéshez',
    excerpt: 'Fedezze fel, hogyan teheti hatékonyabbá vállalkozása kapcsolatépítését modern digitális névjegykártyákkal. Professzionális megoldások az üzleti sikerhez.',
    icon: Briefcase,
    readTime: '8 perc',
    keywords: ['vállalkozás', 'digitális névjegy', 'üzleti kapcsolatépítés', 'modern marketing']
  },
  {
    id: 1,
    title: 'A digitális névjegykártyák 5 előnye a hagyományos névjegyekkel szemben',
    excerpt: 'Fedezze fel, hogyan teheti hatékonyabbá kapcsolatépítését modern digitális névjegykártyákkal. Környezetbarát, költséghatékony és professzionális megoldás üzleti kapcsolataihoz.',
    icon: CreditCard,
    readTime: '5 perc',
    keywords: ['digitális névjegykártya', 'online névjegy', 'elektronikus névjegy', 'környezetbarát névjegy']
  },
  {
    id: 2,
    title: 'QR kódok a modern üzleti életben: Több mint csak egy vonalkód',
    excerpt: 'Ismerje meg a QR kódok sokoldalú felhasználási lehetőségeit és azok üzleti előnyeit. Hatékony megoldások kapcsolatépítésre és információmegosztásra.',
    icon: QrCode,
    readTime: '4 perc',
    keywords: ['qr kód készítés', 'qr kód generálás', 'üzleti qr kód', 'dinamikus qr kód']
  },
  {
    id: 3,
    title: 'A névjegykészítés jövője: Trendek és innovációk',
    excerpt: 'Pillantson be a névjegykészítés jövőjébe, ahol a digitális és fizikai világ találkozik. Innovatív megoldások a modern üzleti kapcsolatépítéshez.',
    icon: Smartphone,
    readTime: '6 perc',
    keywords: ['modern névjegykártya', 'digitális kapcsolatépítés', 'üzleti networking', 'smart névjegy']
  },
  {
    id: 4,
    title: 'Praktikus tippek a digitális névjegyek hatékony használatához',
    excerpt: 'Gyakorlati tanácsok és trükkök, amelyekkel maximalizálhatja digitális névjegye hatékonyságát. Professzionális megjelenés és egyszerű kezelhetőség.',
    icon: Share2,
    readTime: '3 perc',
    keywords: ['névjegykártya tippek', 'digitális marketing', 'online jelenlét', 'üzleti profil']
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero section */}
      <div className="bg-indigo-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Digitális Névjegy Blog
            </h1>
            <p className="text-indigo-100 text-lg">
              Fedezze fel a digitális névjegyek és QR kódok világát. Szakértői
              tippek, trendek és gyakorlati tanácsok.
            </p>
          </div>
        </div>
      </div>

      {/* Blog posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <post.icon className="w-8 h-8 text-indigo-600" />
                  <span className="ml-2 text-sm text-gray-500">
                    {post.readTime} olvasás
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${post.slug || post.id}`}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Tovább olvasom
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Készen áll a digitális átállásra?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Készítse el saját digitális névjegykártyáját most, és lépjen be a
              modern kapcsolatépítés világába!
            </p>
            <Link
              to="/vcard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors"
            >
              Névjegykártya készítése
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;