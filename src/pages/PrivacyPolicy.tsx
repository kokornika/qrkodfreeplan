import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Adatkezelési és Cookie Tájékoztató</h1>

          <div className="prose prose-lg">
             <h2>Adatkezelési Tájékoztató</h2>
    <h3>1. Az adatkezelés célja</h3>
    <p>Az Adatkezelő az érintettek személyes adatait az alábbi célokból kezeli:</p>
    <p>Digitális névjegyszolgáltatás nyújtása: az érintett által igényelt szolgáltatás megvalósítása.</p>
    <p>Marketingtevékenység: az érintettek tájékoztatása az Adatkezelő szolgáltatásairól, promóciókról és eseményekről.</p>
    
    <h3>2. A kezelt személyes adatok köre</h3>
    <p>Az Adatkezelő az érintettek alábbi személyes adatait kezeli:</p>
    <p>Teljes név, cégnév, cég pozíció, weboldal, bemutatkozás, mobiltelefonszám, e-mail cím, cím, az érintett által feltöltött fénykép, közösségi média linkek.</p>
    
    <h3>3. Az adatkezelés jogalapja</h3>
    <p>Az adatkezelés jogalapja a GDPR 6. cikk (1) bekezdés b) pontja: az adatkezelés a szerződés teljesítéséhez szükséges, amelyben az érintett az egyik fél. Az adatkezelés a digitális névjegyszolgáltatás nyújtásához elengedhetetlen.</p>
    
    <h3>4. Az adatkezelés módja és időtartama</h3>
    <p>Az Adatkezelő az adatokat kizárólag az alábbi időtartamig kezeli:</p>
    <p>Digitális névjegyszolgáltatás nyújtása céljából: az érintettel fennálló szerződéses kapcsolat időtartama alatt, illetve a szolgáltatás megszűnését követően a jogszabályban előírt megőrzési ideig.</p>
    <p>Marketingtevékenység céljából: az érintett hozzájárulásának visszavonásáig.</p>
    
    <h3>5. Az adatok továbbítása</h3>
    <p>Az Adatkezelő az érintett személyes adatait az alábbi harmadik fél részére továbbítja:</p>
    <p>Netify szolgáltató: a digitális névjegykártya internetes elérhetőségének biztosításához.</p>
    
    <h3>6. Az érintettek jogai</h3>
    <p>Az érintett az alábbi jogokkal élhet személyes adatai kezelésével kapcsolatban:</p>
    <p>Tájékoztatáshoz való jog, hozzáféréshez való jog, helyesbítéshez való jog, törléshez való jog, adatkezelés korlátozásához való jog, adathordozhatósághoz való jog, panasztételhez való jog.</p>
    
    <h3>7. Az adatok védelme</h3>
    <p>Az Adatkezelő megfelelő technikai és szervezési intézkedésekkel gondoskodik a személyes adatok védelméről, különösen azok jogosulatlan hozzáférése, megváltoztatása vagy megsemmisítése ellen.</p>
    
    <h3>8. Sütik kezelése</h3>
    <p>Amennyiben az Adatkezelő weboldala sütiket használ, erről külön tájékoztatást nyújt.</p>
    
    <h3>9. Egyéb információk</h3>
    <p>Az Adatkezelő fenntartja a jogot a tájékoztató módosítására. Az aktuális adatkezelési tájékoztatót az érintettek elérhetik az Adatkezelő hivatalos csatornáin.</p>

            <h2>Cookie (süti) kezelés</h2>
            <p>
              Weboldalunk cookie-kat (sütiket) használ a felhasználói élmény javítása és 
              bizonyos funkciók biztosítása érdekében.
            </p>

            <h3>Mik azok a cookie-k?</h3>
            <p>
              A cookie-k olyan kis méretű szöveges fájlok, amelyeket a weboldal az Ön 
              eszközén tárol. Ezek segítenek minket abban, hogy:
            </p>
            <ul>
              <li>Megjegyezzük az Ön beállításait</li>
              <li>Javítsuk a weboldal teljesítményét</li>
              <li>Megfelelő felhasználói élményt biztosítsunk</li>
            </ul>

            <h3>Milyen cookie-kat használunk?</h3>
            <p>Weboldalunk az alábbi típusú cookie-kat használja:</p>
            
            <h4>Feltétlenül szükséges cookie-k</h4>
            <p>
              Ezek a cookie-k elengedhetetlenek a weboldal működéséhez. Ide tartoznak 
              például a bejelentkezési adatok és a biztonsági cookie-k.
            </p>

            <h4>Teljesítmény cookie-k</h4>
            <p>
              Ezek segítenek nekünk megérteni, hogyan használják a látogatók a 
              weboldalunkat, és hogyan javíthatjuk a felhasználói élményt.
            </p>

            <h4>Funkcionális cookie-k</h4>
            <p>
              Ezek lehetővé teszik, hogy a weboldal emlékezzen az Ön választásaira 
              (például nyelvi beállítások) és személyre szabottabb funkciókat kínáljon.
            </p>

            <h3>Cookie-k kezelése</h3>
            <p>
              Ön bármikor módosíthatja vagy visszavonhatja a cookie-k használatához 
              adott hozzájárulását. A legtöbb böngésző lehetővé teszi a cookie-k 
              kezelését a beállításokban.
            </p>

            <h3>Cookie-k élettartama</h3>
            <p>
              A cookie-k érvényességi ideje változó. Vannak munkamenet cookie-k, 
              amelyek csak az adott böngészési munkamenet idejére szólnak, és vannak 
              tartós cookie-k, amelyek hosszabb ideig tárolódnak az Ön eszközén.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
