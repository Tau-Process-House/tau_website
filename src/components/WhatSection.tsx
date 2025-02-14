export default function WhatSection() {
  return (
    <section className="section section-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">What we do</h2>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl mb-2">Processes are created when strategy is implemented through technology.</p>
          <p className="text-xl">We help you to connect your strategy with your technology.</p>
        </div>
        <div className="relative w-full max-w-md mx-auto aspect-square scale-75 md:scale-100">
          <div className="absolute w-60 h-60 rounded-full bg-transparent border-2 border-black top-1/2 -translate-y-1/2 left-1/2 -translate-x-[75%] flex items-center justify-start">
            <span className="text-lg font-bold ml-6">strategy</span>
          </div>
          <div className="absolute w-60 h-60 rounded-full bg-transparent border-2 border-black top-1/2 -translate-y-1/2 right-1/2 translate-x-[75%] flex items-center justify-end">
            <span className="text-lg font-bold mr-2">technology</span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <span className="text-lg font-bold">process</span>
          </div>
        </div>
      </div>
    </section>
  );
} 