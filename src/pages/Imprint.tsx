import React from 'react';

const Imprint: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Impresszum</h1>

          <div className="prose prose-lg">
            <h2>Szolgáltató adatai</h2>
            <p>
              Név: Kovács Kornél János E.V.<br />
              Székhely: 7171 Sióagárd, Deák u. 6.<br />
              Adószám: 483484-1-17<br />
              Email: ideiglenes@qr.hu<br />
              Telefon: +36303551793
            </p>

            <h2>Tárhelyszolgáltató</h2>
            <p>
              Név: Netlify, Inc.<br />
              Székhely: 2325 3rd Street, Suite 215, San Francisco, CA 94107<br />
              Email: support@netlify.com<br />
              Weboldal: https://www.netlify.com
            </p>

            <h2>Szerzői jogok</h2>
            <p>
              A weboldalon megjelenő tartalmak szerzői jogi védelem alatt állnak. 
              A tartalmak másolása, terjesztése csak a szolgáltató előzetes írásbeli 
              engedélyével lehetséges.
            </p>

            <h2>Felelősség</h2>
            <p>
              A weboldalon található információk kizárólag tájékoztató jellegűek. 
              A szolgáltató fenntartja a jogot az információk előzetes értesítés 
              nélküli módosítására.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Imprint;