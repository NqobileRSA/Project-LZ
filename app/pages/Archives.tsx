'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Camera, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Archives = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (isMobile) {
        handleMobileScroll();
      }
    };

    const handleMobileScroll = () => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const scrollProgress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

        if (scrollProgress > 0 && scrollProgress < 1) {
          const rotation = Math.min(20, scrollProgress * 40 - 20);
          const scale = 1 - Math.min(0.2, Math.abs(scrollProgress - 0.5) * 0.4);
          const translateY = Math.min(0, (scrollProgress - 0.5) * 100);

          card.style.transform = `
            perspective(1000px)
            translateY(${translateY}px)
            scale(${scale})
            ${
              index % 2 === 0
                ? 'rotateY(' + rotation + 'deg)'
                : 'rotateY(' + -rotation + 'deg)'
            }
          `;
          card.style.opacity = Math.min(1, scrollProgress * 2);
        }
      });
    };

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const images = [
    {
      src: '/radio.jpg',
      category: 'events',
      year: '2023',
      title: 'Radio Days',
    },
    {
      src: '/bluegray.jpg',
      category: 'documentary',
      year: '2023',
      title: 'Street Stories',
    },
    {
      src: '/wearhouz.jpg',
      category: 'street',
      year: '2023',
      title: 'Urban Canvas',
    },
    {
      src: '/themba.jpg',
      category: 'portrait',
      year: '2022',
      title: 'Soul Capture',
    },
    {
      src: '/cusuin.jpg',
      category: 'events',
      year: '2022',
      title: 'Night Tales',
    },
    {
      src: '/skyf.jpg',
      category: 'documentary',
      year: '2022',
      title: 'City Lights',
    },
    { src: '/swag.jpg', category: 'street', year: '2022', title: 'Style Wars' },
    {
      src: '/bittercure.jpg',
      category: 'documentary',
      year: '2021',
      title: 'Raw Truth',
    },
    {
      src: '/combo.png',
      category: 'portrait',
      year: '2021',
      title: 'Face of Now',
    },
    { src: '/vibe.jpg', category: 'events', year: '2021', title: 'Pulse' },
    {
      src: '/half.jpg',
      category: 'street',
      year: '2021',
      title: 'Split Second',
    },
    { src: '/cusuin.jpg', category: 'events', year: '2021', title: 'Movement' },
    {
      src: '/yellow.png',
      category: 'documentary',
      year: '2020',
      title: 'Golden Hour',
    },
    {
      src: '/pink.png',
      category: 'portrait',
      year: '2020',
      title: 'Pink Dreams',
    },
    { src: '/fb.jpg', category: 'street', year: '2020', title: 'Forward Base' },
    { src: '/k1.png', category: 'events', year: '2020', title: 'K-One' },
    {
      src: '/sunday.jpg',
      category: 'documentary',
      year: '2020',
      title: 'Sunday Culture',
    },
  ];

  const filteredImages =
    activeFilter === 'all'
      ? images
      : images.filter((img) => img.category === activeFilter);

  const categories = ['all', 'documentary', 'street', 'events', 'portrait'];

  const getCardStyle = (index) => {
    if (!isMobile) {
      return {
        transform: `translateY(${scrollY * 0.1 * ((index % 3) + 1)}px) ${
          index % 3 === 0
            ? 'rotate(2deg)'
            : index % 3 === 1
            ? 'rotate(-1deg)'
            : 'rotate(1deg)'
        }`,
        transition: 'transform 0.1s linear',
      };
    }

    // Mobile initial style - will be updated by scroll handler
    return {
      transform: 'translateY(100px)',
      opacity: 0,
      transition:
        'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease',
    };
  };

  return (
    <>
      <section
        className="relative bg-black bg-opacity-[0.09] overflow-hidden"
        id="archives"
      >
        {/* Sticky Header Section */}
        <div className="sticky top-0 z-30 bg-black bg-opacity-[0.09] pt-8 pb-2">
          <div className="relative px-6">
            <div className="transform">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 mb-2 transform -rotate-2 whitespace-nowrap">
                ARCHIVES
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 ml-4 transform rotate-1">
                / captured moments / street stories / urban culture /
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6  justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative px-3 sm:px-4 md:px-6 py-1 sm:py-2 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider
                  transform hover:scale-110 transition-all duration-300
                  ${
                    activeFilter === category
                      ? 'text-yellow-500 -rotate-2'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                style={{
                  textShadow:
                    activeFilter === category
                      ? '0 0 20px rgba(234,179,8,0.5)'
                      : 'none',
                }}
              >
                {category}
                {activeFilter === category && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-500 transform -rotate-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Parallax Background - Desktop Only */}
        {!isMobile && (
          <div
            className="fixed inset-0 opacity-10 pointer-events-none"
            style={{
              transform: `translateY(${scrollY * 0.7}px)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,0,0.1),transparent_50%)]"
              style={{ transform: `scale(${1 + scrollY * 0.001})` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#000,transparent)]" />
          </div>
        )}

        {/* Scrolling Content */}
        <div className="relative pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`relative overflow-hidden transform transition-all duration-500
                  ${
                    !isMobile
                      ? `
                    ${
                      index % 3 === 0
                        ? 'rotate-2'
                        : index % 3 === 1
                        ? '-rotate-1'
                        : 'rotate-1'
                    }
                    hover:rotate-0
                  `
                      : ''
                  }
                  hover:scale-105 group`}
                style={getCardStyle(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setLightboxOpen(true);
                }}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-4 transform 
                    ${
                      hoveredIndex === index
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-full opacity-0'
                    }
                    transition-all duration-500`}
                  >
                    <div className="transform -rotate-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {image.title}
                      </h3>
                      <div className="flex items-center gap-2 sm:gap-4">
                        <span className="px-2 sm:px-3 py-1 bg-yellow-500 text-black text-xs sm:text-sm font-bold uppercase tracking-wider transform rotate-2">
                          {image.category}
                        </span>
                        <span className="text-zinc-300 text-sm sm:text-base font-medium">
                          {image.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See More Button */}
      <div className="relative bg-black/50 backdrop-blur-sm py-12 -mt-16 z-40">
        <div className="container mx-auto flex justify-center">
          <Link
            href="/Work"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black font-bold uppercase tracking-wider transform hover:scale-105 transition-all duration-300 hover:-rotate-1"
          >
            See More Work
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-yellow-500 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={() =>
              setCurrentImageIndex(
                (currentImageIndex - 1 + filteredImages.length) %
                  filteredImages.length
              )
            }
            className="absolute left-4 text-white hover:text-yellow-500 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={() =>
              setCurrentImageIndex(
                (currentImageIndex + 1) % filteredImages.length
              )
            }
            className="absolute right-4 text-white hover:text-yellow-500 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-h-[80vh] max-w-[90vw] relative">
            <img
              src={filteredImages[currentImageIndex].src}
              alt={filteredImages[currentImageIndex].title}
              className="max-h-[80vh] max-w-[90vw] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">
                {filteredImages[currentImageIndex].title}
              </h3>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold uppercase tracking-wider">
                  {filteredImages[currentImageIndex].category}
                </span>
                <span className="text-zinc-300 text-sm font-medium">
                  {filteredImages[currentImageIndex].year}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Archives;
