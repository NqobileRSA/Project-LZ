'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Newspaper, Mic } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div
      className="relative min-h-screen pt-[50px] bg-black bg-opacity-[0.09] "
      id="home"
    >
      {/* Main Content */}
      <div className="relative container mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-12 sm:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column - Text Content */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 transform -rotate-2 leading-tight">
                LUNGELO ZULU
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 ml-4 transform rotate-1">
                / visual storyteller / journalist / cultural curator /
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-xl leading-relaxed"
            >
              Based in Katlehong, I capture the raw essence of urban culture
              through my lens and pen. From street stories to cultural
              movements, I document the heartbeat of South Africa's vibrant
              communities.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/archives"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-black font-bold uppercase tracking-wider transform hover:scale-105 transition-all duration-300 hover:-rotate-1 text-sm sm:text-base"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-yellow-500 text-yellow-500 font-bold uppercase tracking-wider transform hover:scale-105 transition-all duration-300 hover:rotate-1 text-sm sm:text-base"
              >
                My Story
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Dynamic Image Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:mt-0"
          >
            {[
              {
                src: '/Lungelo/Color.jpg',
                alt: 'Radio documentary shoot',
                rotate: '-2deg',
              },
              {
                src: '/Lungelo/b&w.png',
                alt: 'Street portrait photography',
                rotate: '2deg',
              },
              {
                src: '/Lungelo/b&w.png',
                alt: 'Urban documentation',
                rotate: '2deg',
              },
              {
                src: '/Lungelo/Color.jpg',
                alt: 'Cultural event coverage',
                rotate: '-2deg',
              },
            ].map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
                style={{
                  transform: `rotate(${img.rotate}) translateY(${
                    scrollY * 0.1 * (index + 1)
                  }px)`,
                  transition: 'transform 0.1s linear',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-center transform hover:scale-110 transition-transform duration-700"
                  layout="fill"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Professional Focus Areas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {[
            {
              icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
              title: 'Visual Documentation',
              desc: 'Capturing authentic moments that tell powerful stories of urban life and culture',
            },
            {
              icon: <Newspaper className="w-6 h-6 sm:w-8 sm:h-8" />,
              title: 'Cultural Journalism',
              desc: 'Writing compelling narratives about the people and movements shaping our communities',
            },
            {
              icon: <Mic className="w-6 h-6 sm:w-8 sm:h-8" />,
              title: 'Media Production',
              desc: 'Creating impactful content through HIP Daily Media Works',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-zinc-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-all duration-300"
              style={{ rotate: index % 2 ? '1deg' : '-1deg' }}
            >
              <div className="text-yellow-500 mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Latest Work Preview - Mobile Only */}
        {isMobile && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4 transform -rotate-2">
              Latest Work
            </h2>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 w-max">
                {['/radio.jpg', '/bluegray.jpg', '/wearhouz.jpg'].map(
                  (src, index) => (
                    <div
                      key={index}
                      className="w-64 h-48 relative rounded-lg overflow-hidden"
                    >
                      <img
                        src={src}
                        alt="Recent work"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero;
