'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  XIcon,
  Undo2,
  Filter,
  Camera,
} from 'lucide-react';

type Props = {};

interface PortfolioItemType {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  src: string;
  category: string;
  type: 'video' | 'image';
}

const portfolioItems: PortfolioItemType[] = [
  {
    id: 1,
    title: 'A Fruitful Venture',
    description: 'A documentary about sustainable farming',
    thumbnail: '/skyf.jpg',
    src: '/Videos/A FRUITFUL VENTURE.mp4',
    category: 'Films',
    type: 'video',
  },
  {
    id: 2,
    title: 'We Stayed True',
    description: 'Full documentary on cultural preservation',
    thumbnail: '/thumbnails/we-stayed-true-thumbnail.jpg',
    src: '/Videos/We Stayed True [Full Documentary].mp4',
    category: 'Films',
    type: 'video',
  },
  {
    id: 3,
    title: 'What We Became',
    description: 'Official trailer for an upcoming documentary',
    thumbnail: '/thumbnails/what-we-became-thumbnail.jpg',
    src: 'https://www.youtube.com/watch?v=fSVM_lLZY-o',
    category: 'Films',
    type: 'video',
  },
  {
    id: 4,
    title: 'What We Became - Full Documentary',
    description: 'Full version of the acclaimed documentary',
    thumbnail: '/thumbnails/what-we-became-full-thumbnail.jpg',
    src: 'https://www.youtube.com/watch?v=fSVM_lLZY-o',
    category: 'Films',
    type: 'video',
  },
  {
    id: 5,
    title: 'App 2',
    description: 'Lorem ipsum',
    thumbnail: '/k1.png',
    src: '/k1.png',
    category: 'Articles',
    type: 'image',
  },
  {
    id: 6,
    title: 'Product 2',
    description: 'Lorem ipsum',
    thumbnail: '/themba.jpg',
    src: '/themba.jpg',
    category: 'Articles',
    type: 'image',
  },
  {
    id: 7,
    title: 'Branding 2',
    description: 'Lorem ipsum',
    thumbnail: '/bittercure.jpg',
    src: '/bittercure.jpg',
    category: 'Articles',
    type: 'image',
  },
  {
    id: 8,
    title: 'Books 2',
    description: 'Lorem ipsum',
    thumbnail: '/skyf.jpg',
    src: '/skyf.jpg',
    category: 'Events',
    type: 'image',
  },
  {
    id: 9,
    title: 'App 3',
    description: 'Lorem ipsum',
    thumbnail: '/fb.jpg',
    src: '/fb.jpg',
    category: 'Events',
    type: 'image',
  },
  {
    id: 10,
    title: 'Product 3',
    description: 'Lorem ipsum',
    thumbnail: '/sunday.jpg',
    src: '/sunday.jpg',
    category: 'Events',
    type: 'image',
  },
];

const categories = ['All', 'Films', 'Articles', 'Events'];

const PortfolioItem: React.FC<{
  item: PortfolioItemType;
  onClick: () => void;
  onHover: (item: PortfolioItemType | null) => void;
}> = ({ item, onClick, onHover }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative group cursor-pointer overflow-hidden bg-black rounded-lg shadow-lg"
      onClick={onClick}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
    >
      {item.type === 'video' ? (
        <div className="relative aspect-[4/3]">
          <video
            ref={videoRef}
            src={item.src}
            poster={item.thumbnail}
            className="w-full h-full object-cover"
            onClick={togglePlay}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-6xl"
            onClick={togglePlay}
          >
            {isPlaying ? '❚❚' : '▶'}
          </motion.button>
        </div>
      ) : (
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end justify-start p-6"
      >
        <div className="text-white">
          <h4 className="text-xl font-light mb-2">{item.title}</h4>
          <p className="text-sm opacity-80">{item.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FullScreenView: React.FC<{
  item: PortfolioItemType;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ item, onClose, onPrev, onNext }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="absolute top-4 right-4 text-white/80 hover:text-white"
        onClick={onClose}
      >
        <XIcon size={32} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
        onClick={onPrev}
      >
        <ChevronLeft size={48} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
        onClick={onNext}
      >
        <ChevronRight size={48} />
      </motion.button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-6xl max-h-full p-4"
      >
        {item.type === 'video' ? (
          <div className="relative">
            <video
              ref={videoRef}
              src={item.src}
              className="max-w-full max-h-[80vh] rounded-lg"
              controls
            />
          </div>
        ) : (
          <Image
            src={item.src}
            alt={item.title}
            width={1200}
            height={800}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        )}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-white"
        >
          <h2 className="text-3xl font-light">{item.title}</h2>
          <p className="mt-2 text-white/80">{item.description}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Work: React.FC<Props> = () => {
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItemType | null>(
    null
  );
  const [hoveredItem, setHoveredItem] = useState<PortfolioItemType | null>(
    null
  );

  const filteredItems =
    filter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);

  const [isScrolled, setIsScrolled] = useState(false);

  // Add this useEffect in the Work component
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-neutral-900 text-white font-light relative overflow-hidden"
    >
      {/* Background blur effect */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0"
            style={{ pointerEvents: 'none' }}
          >
            <Image
              src={hoveredItem.thumbnail}
              alt=""
              fill
              className="object-cover opacity-30 blur-3xl scale-110"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <motion.nav
          variants={{
            hidden: { y: -100 },
            visible: {
              y: 0,
              transition: {
                duration: 0.5,
                ease: 'easeOut',
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className={`fixed top-0 left-0 right-0 z-50 ${
            isScrolled
              ? 'bg-black/80 backdrop-blur-lg shadow-lg'
              : 'bg-transparent'
          } transition-all duration-300`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <Camera className="w-6 h-6 text-yellow-500 transform group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-white font-bold text-lg sm:text-xl">
                  LUNGELO
                  <span className="text-yellow-500">ZULU</span>
                </span>
              </Link>

              {/* Filters */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center space-x-8"
              >
                <div className="flex items-center space-x-4">
                  <Filter size={16} className="text-yellow-500" />
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ y: -2 }}
                      className={`relative text-sm font-medium transition-colors duration-300 ${
                        filter === category
                          ? 'text-yellow-500'
                          : 'text-zinc-400 hover:text-yellow-500'
                      }`}
                      onClick={() => setFilter(category)}
                    >
                      {category}
                      {filter === category && (
                        <motion.div
                          layoutId="filter-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-500"
                          initial={false}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
                <Link href="/">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-zinc-400 hover:text-yellow-500 transition-colors duration-300"
                  >
                    <Undo2 size={24} />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        <section className="mt-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <PortfolioItem
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                  onHover={setHoveredItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <FullScreenView
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onPrev={() => {
              const currentIndex = filteredItems.findIndex(
                (item) => item.id === selectedItem.id
              );
              const prevIndex =
                (currentIndex - 1 + filteredItems.length) %
                filteredItems.length;
              setSelectedItem(filteredItems[prevIndex]);
            }}
            onNext={() => {
              const currentIndex = filteredItems.findIndex(
                (item) => item.id === selectedItem.id
              );
              const nextIndex = (currentIndex + 1) % filteredItems.length;
              setSelectedItem(filteredItems[nextIndex]);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Work;
