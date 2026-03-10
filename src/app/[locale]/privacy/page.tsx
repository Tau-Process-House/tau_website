import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

// Privacy policy stays in German (legal requirement), but navigation is translated
export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Tau Process House',
  description: 'Informationen zur Verarbeitung personenbezogener Daten auf der Website von Tau Process House.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-block mb-12 hover:underline">
          ← Zurück zur Hauptseite
        </Link>

        <h1 className="text-4xl font-bold mb-4">Datenschutzerklärung</h1>
        <p className="text-gray-400 mb-12">Stand: März 2026</p>

        <div className="space-y-10">

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Verantwortlicher</h2>
            <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
            <address className="mt-3 not-italic leading-relaxed">
              Felix Rimbakowsky<br />
              Großbeerenstraße 71<br />
              10963 Berlin<br />
              Deutschland<br />
              E-Mail: <a href="mailto:info@tauprocess.de" className="underline hover:text-gray-300">info@tauprocess.de</a>
            </address>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Grundsätze der Datenverarbeitung</h2>
            <p>
              Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer
              funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
              Eine Verarbeitung personenbezogener Daten erfolgt nur auf Grundlage einer gesetzlichen
              Erlaubnis oder Ihrer Einwilligung (Art. 6 DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Hosting</h2>
            <p>
              Diese Website wird bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133,
              Covina, CA 91723, USA gehostet. Beim Aufruf unserer Website werden automatisch
              Verbindungsdaten (IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp und
              -version, Betriebssystem, referenzierende URL) durch den Server verarbeitet.
            </p>
            <p className="mt-3">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Vercel ist unter dem
              EU-US Data Privacy Framework zertifiziert. Weitere Informationen:{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
                vercel.com/legal/privacy-policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Cookies und Einwilligungsverwaltung</h2>
            <p>
              Unsere Website verwendet Cookies. Zur Verwaltung Ihrer Cookie-Einwilligung setzen wir <strong>CookieYes</strong> ein
              (CookieYes Limited, 3 Warren Yard, Warren Park, Wolverton Mill, Milton Keynes, MK12 5NW, Vereinigtes Königreich).
            </p>
            <p className="mt-3">
              Rechtsgrundlage für den Einsatz von CookieYes ist Art. 6 Abs. 1 lit. c DSGVO sowie Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Google Analytics</h2>
            <p>
              Mit Ihrer Einwilligung verwenden wir <strong>Google Analytics 4</strong> (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland).
              Google Analytics erfasst pseudonymisierte Nutzungsdaten und übermittelt diese an Server von Google LLC in den USA.
            </p>
            <p className="mt-3">
              Google LLC ist unter dem EU-US Data Privacy Framework zertifiziert. Wir haben Google Consent Mode v2 implementiert.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
                policies.google.com/privacy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Kontaktaufnahme per E-Mail</h2>
            <p>
              Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre E-Mail-Adresse sowie
              die von Ihnen mitgeteilten Daten nur zur Bearbeitung Ihrer Anfrage.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Externe Links</h2>
            <p>
              Unsere Website enthält Links zu externen Diensten, insbesondere zum
              Bewerbungsportal <strong>join.com</strong>. Für die Datenschutzpraktiken dieser Dienste sind wir nicht verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Ihre Rechte</h2>
            <p>Sie haben gegenüber uns folgende Rechte:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
              <li><strong>Recht auf Einschränkung</strong> (Art. 18 DSGVO)</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
              <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Kontakt:{' '}
              <a href="mailto:info@tauprocess.de" className="underline hover:text-gray-300">
                info@tauprocess.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Beschwerderecht bei einer Aufsichtsbehörde</h2>
            <address className="mt-3 not-italic leading-relaxed">
              Berliner Beauftragte für Datenschutz und Informationsfreiheit (BlnBDI)<br />
              Friedrichstr. 219, 10969 Berlin<br />
              <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
                www.datenschutz-berlin.de
              </a>
            </address>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex gap-6">
          <Link href="/" className="text-sm hover:underline">Hauptseite</Link>
          <Link href="/imprint" className="text-sm hover:underline">Impressum</Link>
        </div>
      </div>
    </main>
  );
}
