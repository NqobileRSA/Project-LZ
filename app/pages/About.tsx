'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Pen, Music } from 'lucide-react';

const About = (): JSX.Element => {
  const { scrollY } = useScroll();

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

  const textVariants = {
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

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const skills = [
    { icon: <Camera className="w-6 h-6" />, text: 'Content Creation' },
    { icon: <Pen className="w-6 h-6" />, text: 'Writing' },
    { icon: <Music className="w-6 h-6" />, text: 'Music' },
  ];

  // Create parallax effect for text sections
  const createParallax = (start: number, end: number) => {
    return useTransform(scrollY, [start, end], [0, -50], {
      clamp: false,
    });
  };

  return (
    <div
      className="relative bg-black bg-opacity-[0.09]  overflow-hidden min-h-screen"
      id="about"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#000,transparent)]" />
      </div>

      {/* Header Section */}
      <div className="sticky top-0 z-30  pt-8 pb-2">
        <div className="relative px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 mb-2 transform -rotate-2">
              ABOUT ME
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 ml-4 transform rotate-1">
              / storyteller / creative director / urban culture /
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section with Image */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Image Section - Kept Static */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="sticky top-32">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 rounded-lg transform rotate-6 group-hover:rotate-3 transition-transform duration-300" />
                <img
                  src="/Lungelo/Color.jpg"
                  alt="Lungelo Zulu"
                  className="relative rounded-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300 object-cover w-full h-[600px]"
                />
              </div>

              {/* Skills Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 grid grid-cols-2 gap-4"
              >
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg transform hover:scale-105 transition-transform duration-300 flex items-center gap-3"
                  >
                    <div className="text-yellow-500">{skill.icon}</div>
                    <span className="text-zinc-300">{skill.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content Section with Parallax */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {[
              'I am Lungelo Zulu (known to many as Smile/Smiles)',
              "A tall Zulu boy who was born in August of '96 in Dundee, Kwa-Zulu Natal, but raised by the grimy streets of Katlehong – 'the far East' they say.",
              'His writing experience stems from 2015 with the establishment of his Tumblr blog www.smileythevisionaire.tumblr.com where he wrote music reviews, event reviews, as well as artist & brand profiles. Prior to that, Lungelo was a Rapper and Songwriter since his early teens, so make no mistake; that boy can write.',
              "Soon after dropping out of College, Lungelo Zulu started his own content production agency called HIP Daily Media Works. The agency's first target was Sunday Kos & Chill, a gala dinner with friends 'cause, of course, Lu is friends with many, many artists, across various mediums, so best believe, this bloke knows every-one.",
              'Word on the street has it that Lungelo is returning fully to his initial duties at HIP Daily Media Works as Creative Director & Head of Content and has a possible docuseries in the pipelines. The first installation is set to premiere on the 5th of August via HIP Daily TV on YouTube.',
            ].map((text, index) => (
              <motion.div
                key={index}
                variants={textVariants}
                style={{ y: createParallax(index * 300, (index + 1) * 300) }}
                className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg transform hover:scale-102 transition-all duration-300 hover:bg-zinc-900/70"
              >
                <p className="text-zinc-300 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline Section - Centered with Flex Row */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative bg-black bg-opacity-[0.09]  py-12 mt-8"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 mb-6 transform -rotate-2 text-center">
              Journey So Far
            </h2>
            <div className="flex flex-row flex-wrap justify-center items-start gap-6">
              {[
                {
                  year: '2015',
                  title: 'Tumblr Blog Launch',
                  desc: 'Started music reviews and artist profiles',
                },
                {
                  year: '2020',
                  title: 'HIP Daily Media Works',
                  desc: 'Founded content production agency',
                },
                {
                  year: '2024',
                  title: 'Docuseries Launch',
                  desc: 'Upcoming project on HIP Daily TV',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 min-w-[280px] max-w-[400px] bg-zinc-900/90 p-6 rounded-lg transform transition-all duration-300"
                  style={{ rotate: index % 2 ? '1deg' : '-1deg' }}
                >
                  <span className="text-yellow-500 font-bold text-xl mb-2 block">
                    {item.year}
                  </span>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
