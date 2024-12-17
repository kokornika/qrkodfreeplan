import React from 'react';
import { Smartphone } from 'lucide-react';
import BlogCTA from '../components/blog/BlogCTA';

const BlogPost3 = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          A névjegykészítés jövője: Trendek és innovációk
        </h1>
        
        <div className="flex items-center text-gray-600 mb-8">
          <Smartphone className="w-5 h-5 mr-2" />
          <span>6 perc olvasás</span>
        </div>

        <div className="prose prose-lg max-w-none">
          <img
            src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=1200&h=600"
            alt="Modern digitális technológiák"
            className="w-full rounded-xl mb-8"
          />

          <h2>A digitális forradalom hatása a névjegykártyákra</h2>
          <p>
            Az üzleti kapcsolattartás folyamatosan fejlődik, és vele együtt a névjegykártyák is 
            átalakulnak. A hagyományos papíralapú névjegykártyáktól a modern digitális megoldásokig 
            vezető út számos innovatív technológiát és trendet hozott magával.
          </p>

          <img
            src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=1200&h=600"
            alt="Augmented Reality technológia"
            className="w-full rounded-xl my-8"
          />

          <h3>Augmented Reality (AR) integráció</h3>
          <p>
            Az AR technológia lehetővé teszi, hogy névjegykártyánk "életre keljen". Képzelje el, 
            hogy üzleti partnere telefonjával rámutat névjegyére, és azonnal megjelenik egy 
            interaktív bemutatkozó videó vagy 3D-s portfólió.
          </p>

          <img
            src="https://images.unsplash.com/photo-1557187666-4fd70cf76254?auto=format&fit=crop&q=80&w=1200&h=600"
            alt="NFC technológia és okos névjegykártyák"
            className="w-full rounded-xl my-8"
          />

          <h3>NFC technológia és okos névjegykártyák</h3>
          <p>
            Az NFC chipekkel ellátott névjegykártyák egyetlen érintéssel megoszthatók 
            okostelefonokkal. Ez a technológia nem csak gyors és kényelmes, de környezetbarát is.
          </p>

          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200&h=600"
            alt="Mesterséges intelligencia alkalmazása"
            className="w-full rounded-xl my-8"
          />

          <h2>Mesterséges intelligencia a névjegykártyákban</h2>
          <p>
            Az AI nem csak a névjegykártyák tervezésében segít, de a kapcsolatok kezelésében is. 
            Intelligens algoritmusok elemzik a kapcsolati hálót és javaslatokat tesznek a 
            networking optimalizálására.
          </p>

          <h2>Konklúzió</h2>
          <p>
            A névjegykártyák evolúciója nem áll meg - a technológia fejlődésével 
            újabb és újabb lehetőségek nyílnak meg a professzionális kapcsolatépítésben.
          </p>
        </div>

        <BlogCTA />
      </article>
    </div>
  );
};

export default BlogPost3;