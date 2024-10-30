import React from 'react';
import {
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Camera,
} from 'lucide-react';
import Link from 'next/link';

const Contact = () => {
  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      label: 'Instagram',
      href: '#',
      username: '@lungelo.zulu',
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: 'Twitter',
      href: '#',
      username: '@lungelozulu',
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      label: 'YouTube',
      href: '#',
      username: 'HIP Daily TV',
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'hello@lungelozulu.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+27 (0) 123 456 789',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'Katlehong, Gauteng',
    },
  ];

  return (
    <footer className="relative bg-black" id="contact">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#000,transparent)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 transform -rotate-2 mb-4">
            GET IN TOUCH
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 ml-4 transform rotate-1 max-w-2xl">
            Let's collaborate on your next project or just have a conversation
            about urban culture and storytelling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white transform -rotate-1">
                Connect
              </h3>
              <div className="space-y-2">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex items-center gap-4 p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg transform hover:scale-102 transition-all duration-300 hover:bg-zinc-900/70"
                    style={{ transform: `rotate(${index % 2 ? 1 : -1}deg)` }}
                  >
                    <div className="text-yellow-500 transform group-hover:rotate-12 transition-transform duration-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-zinc-400 text-sm">{link.label}</div>
                      <div className="text-white font-medium">
                        {link.username}
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white transform -rotate-1">
                Contact Details
              </h3>
              <div className="space-y-2">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg"
                    style={{ transform: `rotate(${index % 2 ? 1 : -1}deg)` }}
                  >
                    <div className="text-yellow-500">{info.icon}</div>
                    <div>
                      <div className="text-zinc-400 text-sm">{info.label}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links and Logo */}
          <div className="space-y-8">
            <div className="flex flex-col items-start">
              <Link href="/" className="flex items-center gap-2 group mb-6">
                <Camera className="w-8 h-8 text-yellow-500 transform group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-white font-bold text-2xl">
                  LUNGELO<span className="text-yellow-500">ZULU</span>
                </span>
              </Link>
              <p className="text-zinc-400 max-w-md">
                Visual storyteller and cultural curator based in Katlehong,
                capturing the essence of urban life through photography and
                journalism.
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
              {[
                'Home',
                'About',
                'Archives',
                'Journal',
                'Projects',
                'Contact',
              ].map((link, index) => (
                <Link
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-zinc-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  {link}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-zinc-800">
              <p className="text-zinc-500 text-sm">
                © {new Date().getFullYear()} Lungelo Zulu. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
