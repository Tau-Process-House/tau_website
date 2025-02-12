export default function HowSection() {
  return (
    <section className="section section-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">How we do it</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">Technology</h3>
            <ul className="space-y-6">
              <li>[x] Building ontop of strong foundations like Zoho One, Google Workspace or Microsoft 365</li>
              <li>[x] Integrating your favorite software tools like Slack, Notion, Mailchimp, etc.</li>
              <li>[x] Leveraging on-platform customization tools like scripting or workflow automation</li>
            </ul>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">Methodology</h3>
            <ul className="space-y-6">
              <li>[x] Analysing your companies strategy, existing technology and your staff needs </li>
              <li>[x] Designing, implementing and tracking wholistic processes on your platform of choice</li>
              <li>[x] Incremental redesign, automation and optimization of individual process steps</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 