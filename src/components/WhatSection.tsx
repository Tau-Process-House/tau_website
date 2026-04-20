export default function WhatSection() {
  return (
    <section className="section section-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">Our Philosophy</h2>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl mb-2">We design IT systems not to replace humans, but to elevate them.</p>
          <p className="text-xl">Our goal is the perfect symbiosis where technology handles the complexity, so your people can focus on the result.</p>
        </div>
        <div className="relative w-full max-w-md mx-auto aspect-square scale-75 md:scale-100">
          <div className="absolute w-60 h-60 rounded-full bg-transparent border-2 border-black top-1/2 -translate-y-1/2 left-1/2 -translate-x-[75%] flex items-center justify-start">
            <span className="text-lg font-bold ml-6">people</span>
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