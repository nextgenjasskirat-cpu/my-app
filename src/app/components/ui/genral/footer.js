"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTruck } from 'react-icons/fa';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-black text-white overflow-hidden border-t-4 border-yellow-600"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 border-2 border-yellow-600/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animation: `pulse ${Math.random() * 10 + 10}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="container relative mx-auto px-4 py-16">
        <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Brand/Logo Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-8 bg-gradient-to-r from-gray-800 to-gray-900 p-3 rounded-xl transform hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-yellow-600/30">
                <div className="w-48 h-14 bg-gradient-to-r from-yellow-600 to-yellow-700 flex items-center justify-center rounded-lg shadow-sm">
                  {/* Logo with animated truck */}
                  <div className="relative flex items-center">
                    <div className="absolute -left-6 animate-bounce-side">
                      <FaTruck className="text-gray-900 text-2xl" />
                    </div>
                    <span className="text-gray-900 font-bold text-xl ml-2 tracking-wide">DRIVE SAFE</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-center md:text-left mb-6 leading-relaxed">
                Your premier truck driving school with over 15 years of experience training professional drivers.
              </p>

            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-6 relative inline-block text-yellow-500">
                Quick Links
                <span className="absolute left-0 bottom-[-8px] w-10 h-1 bg-yellow-600 rounded-full"></span>
                <span className="absolute left-0 bottom-[-8px] w-3 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
              </h3>
              <ul className="space-y-3">
                {['Home', 'Courses', 'Pricing', 'Instructors', 'Contact'].map((link, index) => (
                  <li 
                    key={link} 
                    className="group overflow-hidden"
                    style={{ animationDelay: isVisible ? `${index * 100}ms` : '0ms' }}
                  >
                    <Link 
                      href={`/${link.toLowerCase()}`} 
                      className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center transform hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-6 relative inline-block text-yellow-500">
                Programs
                <span className="absolute left-0 bottom-[-8px] w-10 h-1 bg-yellow-600 rounded-full"></span>
                <span className="absolute left-0 bottom-[-8px] w-3 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
              </h3>
              <ul className="space-y-3">
                {['CDL Training', 'Beginner Course', 'Advanced Maneuvers', 'Hazard Materials', 'Refresher Course'].map((program, index) => (
                  <li 
                    key={program} 
                    className="group overflow-hidden"
                    style={{ animationDelay: isVisible ? `${index * 100 + 200}ms` : '0ms' }}
                  >
                    <Link 
                      href={`/programs/${program.toLowerCase().replace(' ', '-')}`} 
                      className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center transform hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                      {program}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-6 relative inline-block text-yellow-500">
                Contact Us
                <span className="absolute left-0 bottom-[-8px] w-10 h-1 bg-yellow-600 rounded-full"></span>
                <span className="absolute left-0 bottom-[-8px] w-3 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
              </h3>
              <ul className="space-y-5">
                {[
                  { icon: FaMapMarkerAlt, text: '20 MANTAKA ST BLACKTOWN 2148 NSW AUSTRALIA' },
                  { icon: FaPhone, text: '+61 402 417 462' },
                  { icon: FaEnvelope, text: '13jassptyltd@gmail.com' }
                ].map((contact, index) => (
                  <li 
                    key={index} 
                    className="flex items-start group"
                    style={{ animationDelay: isVisible ? `${index * 150 + 400}ms` : '0ms' }}
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-yellow-700 to-yellow-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-yellow-600/20">
                      <contact.icon className="text-white text-sm" />
                    </div>
                    <span className="text-gray-400 pt-1 group-hover:text-yellow-400 transition-colors duration-300">{contact.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-3 md:mb-0">
              © {new Date().getFullYear()} Drive Safe Trucking School. All rights reserved.
            </p>
            <div className="flex space-x-5">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-gray-500 hover:text-yellow-400 text-sm transition-colors duration-300 hover:underline underline-offset-4"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.1; }
          50% { opacity: 0.15; }
          100% { opacity: 0.2; }
        }
        @keyframes bounce-side {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-side {
          animation: bounce-side 2s infinite;
        }
        li {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer;