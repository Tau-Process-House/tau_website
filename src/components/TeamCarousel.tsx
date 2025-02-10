'use client';
import { useState, useEffect } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import Image from 'next/image';

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

const TeamCarousel = () => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lazy loading für Bilder
  const teamMembersWithLoading = teamMembers.map(member => ({
    ...member,
    loading: "lazy" as const
  }));

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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

  if (!mounted) {
    return null; // Render nichts während des Server-Side Renderings
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto px-8 overflow-visible">
      <div className="relative h-[500px] flex items-center justify-center">
        <div className="flex items-center w-full justify-center overflow-visible">
          <motion.div
            className={`flex gap-4 ${isMobile ? 'px-4' : ''}`}
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
                <div className="team-card w-[300px]">
                  <Image 
                    src={teamMembers[(currentIndex - 1 + teamMembers.length) % teamMembers.length].image} 
                    alt="Previous team member" 
                    className="team-image" 
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            )}

            {/* Aktuelle Karte */}
            <div className={`shrink-0 ${!isMobile ? 'z-10 scale-105' : 'w-full'}`}>
              <div className={`team-card w-[300px] ${isMobile ? 'mx-auto max-w-[90%]' : ''}`}>
                <Image 
                  src={teamMembersWithLoading[currentIndex].image} 
                  alt={teamMembersWithLoading[currentIndex].name} 
                  className="team-image" 
                  loading="lazy"
                  width={300}
                  height={300}
                />
                <h3 className="text-2xl font-bold mb-2">{teamMembersWithLoading[currentIndex].name}</h3>
                <p className="text-gray-600 mb-4">{teamMembersWithLoading[currentIndex].role}</p>
                <p className="team-quote">{teamMembersWithLoading[currentIndex].quote}</p>
              </div>
            </div>

            {/* Nächste Karte nur auf Desktop anzeigen */}
            {!isMobile && (
              <div 
                className="shrink-0 opacity-50 cursor-pointer transition-opacity hover:opacity-75"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % teamMembers.length)}
              >
                <div className="team-card w-[300px]">
                  <Image 
                    src={teamMembers[(currentIndex + 1) % teamMembers.length].image} 
                    alt="Next team member" 
                    className="team-image" 
                    width={300}
                    height={300}
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

export default TeamCarousel; 