export default function HowSection() {
  return (
    <section className="section section-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">How we do it</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Technology</h3>
            <ul className="space-y-4">
              <li>• Building ontop of strong foundations like Zoho One, Google Workspace or Microsoft 365</li>
              <li>• Integrating your favorite software tools like Slack, Notion, Mailchimp, etc.</li>
              <li>• Leveraging on-platform customization tools like scripting or workflow automation</li>
            </ul>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Methodology</h3>
            <ul className="space-y-4">
              <li>• Analysing your strategy, existing technology and user needs</li>
              <li>• Designing, implementing and tracking these processes on your platform of choice</li>
              <li>• Incremental redesign, automation and optimization of process steps</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 