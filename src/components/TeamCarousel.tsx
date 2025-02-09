'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion';

const teamMembers = [
  {
    image: "/team/felix.jpg",
    name: "Felix Rimbakowsky",
    role: "Founder & CEO",
    quote: "Processes are the bridge between vision and reality"
  },
  {
    image: "/team/luca.jpeg",
    name: "Luca Bleckmann",
    role: "Lead Project Manager",
    quote: "Technology should serve people, not the other way around"
  },
  {
    image: "/team/placeholder.png",
    name: "[Your Name Here]",
    role: "Future Team Member",
    quote: "Join our team and shape the future of process automation"
  },
  {
    image: "/team/moritz.jpeg",
    name: "Moritz Bruder",
    role: "Technical Advisor",
    quote: "Automation is about empowering humans to do what they do best"
  }
];

export default function TeamCarousel() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Immer mit Index 0 (Felix) starten, unabhängig vom Gerät
      setCurrentIndex(0);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        // Nach rechts gewischt
        setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
      } else {
        // Nach links gewischt
        setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
      }
    } else {
      // Zurück zur Ausgangsposition, wenn nicht weit genug gewischt wurde
      await controls.start({ x: 0 });
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-4xl overflow-hidden">
      <div className="relative h-[500px] flex items-center justify-center">
        <div className="flex items-center w-full">
          <motion.div
            className={`flex gap-4 ${isMobile ? 'px-4' : 'px-16'}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            {/* Vorherige und aktuelle Karte nur auf Desktop anzeigen */}
            {!isMobile && (
              <div 
                className="shrink-0 opacity-50 cursor-pointer transition-opacity hover:opacity-75"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)}
              >
                <div className="team-card">
                  <img 
                    src={teamMembers[(currentIndex - 1 + teamMembers.length) % teamMembers.length].image} 
                    alt="Previous team member" 
                    className="team-image" 
                  />
                </div>
              </div>
            )}

            {/* Aktuelle Karte */}
            <div className={`shrink-0 ${!isMobile ? 'z-10 scale-105' : 'w-full'}`}>
              <div className={`team-card ${isMobile ? 'mx-auto max-w-[90%]' : ''}`}>
                <img 
                  src={teamMembers[currentIndex].image} 
                  alt={teamMembers[currentIndex].name} 
                  className="team-image" 
                />
                <h3 className="text-2xl font-bold mb-2">{teamMembers[currentIndex].name}</h3>
                <p className="text-gray-600 mb-4">{teamMembers[currentIndex].role}</p>
                <p className="team-quote">{teamMembers[currentIndex].quote}</p>
              </div>
            </div>

            {/* Nächste Karte nur auf Desktop anzeigen */}
            {!isMobile && (
              <div 
                className="shrink-0 opacity-50 cursor-pointer transition-opacity hover:opacity-75"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % teamMembers.length)}
              >
                <div className="team-card">
                  <img 
                    src={teamMembers[(currentIndex + 1) % teamMembers.length].image} 
                    alt="Next team member" 
                    className="team-image" 
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 