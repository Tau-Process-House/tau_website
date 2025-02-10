export default function WhySection() {
  return (
    <section className="section section-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Why us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Expertise</h3>
            <p>Proven track record of our technology and methodology for process optimization in various industries and company sizes</p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Custom Solutions</h3>
            <p>Every client is unique! We do not rely on one-fits-all solutions but tailor solutions to your specific requirements and your software stack</p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Sustainable</h3>
            <p>Building on major platforms like Google, Microsoft and Zoho ensures continuous function- and security-updates to stay ahead of the curve</p>
          </div>
        </div>
      </div>
    </section>
  );
} 