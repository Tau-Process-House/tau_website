import Link from 'next/link';
import type { Metadata } from 'next';

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

          {/* 1. Verantwortlicher */}
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

          {/* 2. Grundsätze */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Grundsätze der Datenverarbeitung</h2>
            <p>
              Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer
              funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
              Eine Verarbeitung personenbezogener Daten erfolgt nur auf Grundlage einer gesetzlichen
              Erlaubnis oder Ihrer Einwilligung (Art. 6 DSGVO).
            </p>
          </section>

          {/* 3. Hosting */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Hosting</h2>
            <p>
              Diese Website wird bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133,
              Covina, CA 91723, USA gehostet. Beim Aufruf unserer Website werden automatisch
              Verbindungsdaten (IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp und
              -version, Betriebssystem, referenzierende URL) durch den Server verarbeitet.
            </p>
            <p className="mt-3">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem
              sicheren und effizienten Betrieb der Website). Vercel ist unter dem
              EU-US Data Privacy Framework zertifiziert. Weitere Informationen:{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300"
              >
                vercel.com/legal/privacy-policy
              </a>
            </p>
          </section>

          {/* 4. Cookies und Einwilligungsverwaltung */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Cookies und Einwilligungsverwaltung</h2>
            <p>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die im Browser
              gespeichert werden. Wir unterscheiden zwischen technisch notwendigen Cookies und
              optionalen Cookies.
            </p>
            <p className="mt-3">
              Zur Verwaltung Ihrer Cookie-Einwilligung setzen wir <strong>CookieYes</strong> ein
              (CookieYes Limited, 3 Warren Yard, Warren Park, Wolverton Mill, Milton Keynes,
              MK12 5NW, Vereinigtes Königreich). CookieYes speichert Ihre Einwilligungsentscheidung
              in einem Cookie, um diese nicht bei jedem Seitenaufruf erneut abfragen zu müssen.
            </p>
            <p className="mt-3">
              Rechtsgrundlage für den Einsatz von CookieYes ist Art. 6 Abs. 1 lit. c DSGVO
              (rechtliche Verpflichtung zur Nachweisbarkeit der Einwilligung) sowie Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            </p>
          </section>

          {/* 5. Google Analytics */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Google Analytics</h2>
            <p>
              Mit Ihrer Einwilligung verwenden wir <strong>Google Analytics 4</strong>, einen
              Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
              Irland. Google Analytics erfasst pseudonymisierte Nutzungsdaten (u.a. Seitenaufrufe,
              Verweildauer, ungefähren Standort) und übermittelt diese an Server von Google LLC
              in den USA.
            </p>
            <p className="mt-3">
              Google LLC ist unter dem EU-US Data Privacy Framework zertifiziert. Zusätzlich
              haben wir Google Consent Mode v2 implementiert: Ohne Ihre Einwilligung sendet
              Google Analytics keine Tracking-Daten. Erst nach Ihrer aktiven Zustimmung im
              Cookie-Banner wird das vollständige Tracking aktiviert.
            </p>
            <p className="mt-3">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre
              Einwilligung jederzeit durch Klick auf &bdquo;Cookie-Einstellungen&ldquo; am unteren
              Seitenrand widerrufen. Weitere Informationen zur Datenverarbeitung durch Google:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300"
              >
                policies.google.com/privacy
              </a>
            </p>
          </section>

          {/* 6. Kontaktaufnahme per E-Mail */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Kontaktaufnahme per E-Mail</h2>
            <p>
              Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre E-Mail-Adresse sowie
              die von Ihnen mitgeteilten Daten (z.B. Name, Anliegen), um Ihre Anfrage zu
              bearbeiten und zu beantworten. Die Daten werden nur für diesen Zweck verwendet
              und nicht an Dritte weitergegeben, sofern keine gesetzliche Verpflichtung besteht.
            </p>
            <p className="mt-3">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
              Bearbeitung von Anfragen) bzw. Art. 6 Abs. 1 lit. b DSGVO, sofern die Kontaktaufnahme
              der Anbahnung eines Vertrags dient. Die Daten werden gelöscht, sobald sie für die
              Zweckerreichung nicht mehr erforderlich sind und keine gesetzlichen
              Aufbewahrungspflichten bestehen.
            </p>
          </section>

          {/* 7. Externe Links */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Externe Links</h2>
            <p>
              Unsere Website enthält Links zu externen Diensten, insbesondere zum
              Bewerbungsportal <strong>join.com</strong> (JOIN Solutions AG, Veteranenstraße 24,
              10119 Berlin). Für die Datenschutzpraktiken dieser Dienste sind wir nicht
              verantwortlich. Bitte beachten Sie die jeweilige Datenschutzerklärung des Anbieters.
            </p>
          </section>

          {/* 8. Rechte der betroffenen Personen */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Ihre Rechte</h2>
            <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO): Sie können Auskunft über die von uns verarbeiteten Daten verlangen.</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger Daten verlangen.</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
              <li><strong>Recht auf Einschränkung</strong> (Art. 18 DSGVO): Sie können unter bestimmten Voraussetzungen die Einschränkung der Verarbeitung verlangen.</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie können die Herausgabe Ihrer Daten in einem strukturierten, maschinenlesbaren Format verlangen.</li>
              <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO): Sie können der Verarbeitung Ihrer Daten auf Basis von Art. 6 Abs. 1 lit. f DSGVO jederzeit widersprechen.</li>
              <li><strong>Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO): Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.</li>
            </ul>
            <p className="mt-4">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
              <a href="mailto:info@tauprocess.de" className="underline hover:text-gray-300">
                info@tauprocess.de
              </a>
            </p>
          </section>

          {/* 9. Beschwerderecht */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Beschwerderecht bei einer Aufsichtsbehörde</h2>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
              Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
              Die zuständige Aufsichtsbehörde für Berlin ist:
            </p>
            <address className="mt-3 not-italic leading-relaxed">
              Berliner Beauftragte für Datenschutz und Informationsfreiheit (BlnBDI)<br />
              Friedrichstr. 219<br />
              10969 Berlin<br />
              <a
                href="https://www.datenschutz-berlin.de"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300"
              >
                www.datenschutz-berlin.de
              </a>
            </address>
          </section>

          {/* 10. Änderungen */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die
              Rechtslage oder unsere Datenverarbeitungspraktiken ändern. Die jeweils aktuelle
              Version ist stets auf dieser Seite abrufbar. Bei wesentlichen Änderungen werden
              wir Sie gegebenenfalls gesondert informieren.
            </p>
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
