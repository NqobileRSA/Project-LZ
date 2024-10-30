'use client';
import { useEffect, useState } from 'react';
import NavBar from '@/components/ui/NavBar';
import Hero from '@/app/pages/Hero';
import About from '@/app/pages/About';
import Contact from '@/app/pages/Contact';
import Archives from '@/app/pages/Archives';
import Work from './Work/page';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Gradient Orbs */}
          <div
            className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(234,179,8,0.2) 0%, rgba(0,0,0,0) 20%)',
              transform: `translate(${mousePosition.x * 100}px, ${
                mousePosition.y * 100
              }px)`,
              transition: 'transform 0.3s ease-out',
              left: '20%',
              top: '10%',
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(0,0,0,0) 70%)',
              transform: `translate(${-mousePosition.x * 50}px, ${
                -mousePosition.y * 50
              }px)`,
              transition: 'transform 0.3s ease-out',
              right: '10%',
              bottom: '20%',
            }}
          />

          {/* Animated Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translateY(${scrollY * 0.2}px)`,
              transition: 'transform 0.1s linear',
              opacity: 0.3,
            }}
          />

          {/* Subtle Noise Texture */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              transform: `translate(${-mousePosition.x * 20}px, ${
                -mousePosition.y * 20
              }px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>

        <Hero />
        <About />
        <Archives />
        <Contact />
      </div>
    </>
  );
}
