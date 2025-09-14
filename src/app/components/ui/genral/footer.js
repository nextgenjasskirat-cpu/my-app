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
      className="bg-blue-500 text-white overflow-hidden border-t-4 border-yellow-400"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 border-2 border-yellow-400/20 rounded-full"
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
              <div className="mb-8 bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-xl transform hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-red-500/30">
                <div className="w-48 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center rounded-lg shadow-sm">
                  {/* Logo with animated truck */}
                  <div className="relative flex items-center">
                    <div className="absolute -left-6 animate-bounce-side">
                      <FaTruck className="text-red-700 text-2xl" />
                    </div>
                    <span className="text-gray-900 font-bold text-xl ml-2 tracking-wide">DRIVE SAFE</span>
                  </div>
                </div>
              </div>
              <p className="text-blue-100 text-center md:text-left mb-6 leading-relaxed">
                Your premier truck driving school with over 15 years of experience training professional drivers.
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: FaFacebook, color: 'text-white bg-blue-600 hover:bg-blue-700' },
                  { icon: FaTwitter, color: 'text-white bg-blue-400 hover:bg-blue-500' },
                  { icon: FaInstagram, color: 'text-white bg-pink-600 hover:bg-pink-700' },
                  { icon: FaLinkedin, color: 'text-white bg-blue-800 hover:bg-blue-900' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${social.color} shadow-sm hover:shadow-md`}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-6 relative inline-block text-white">
                Quick Links
                <span className="absolute left-0 bottom-[-8px] w-10 h-1 bg-yellow-400 rounded-full"></span>
                <span className="absolute left-0 bottom-[-8px] w-3 h-1 bg-red-500 rounded-full animate-pulse"></span>
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
                      className="text-blue-100 hover:text-yellow-300 transition-all duration-300 flex items-center transform hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-6 relative inline-block text-white">
                Programs
                <span className="absolute left-0 bottom-[-8px] w-10 h-1 bg-yellow-400 rounded-full"></span>
                <span className="absolute left-0 bottom-[-8px] w-3 h-1 bg-red-500 rounded-full animate-pulse"></span>
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
                      className="text-blue-100 hover:text-yellow-300 transition-all duration-300 flex items-center transform hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                      {program}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-6 relative inline-block text-white">
                Contact Us
                <span className="absolute left-0 bottom-[-8px] w-10 h-1 bg-yellow-400 rounded-full"></span>
                <span className="absolute left-0 bottom-[-8px] w-3 h-1 bg-red-500 rounded-full animate-pulse"></span>
              </h3>
              <ul className="space-y-5">
                {[
                  { icon: FaMapMarkerAlt, text: '123 Trucker Lane, Highway City, TC 12345' },
                  { icon: FaPhone, text: '(555) 123-4567' },
                  { icon: FaEnvelope, text: 'info@drivesafeschool.com' }
                ].map((contact, index) => (
                  <li 
                    key={index} 
                    className="flex items-start group"
                    style={{ animationDelay: isVisible ? `${index * 150 + 400}ms` : '0ms' }}
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-red-500/20">
                      <contact.icon className="text-white text-sm" />
                    </div>
                    <span className="text-blue-100 pt-1 group-hover:text-yellow-300 transition-colors duration-300">{contact.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700 relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-3 md:mb-0">
              © {new Date().getFullYear()} Drive Safe Trucking School. All rights reserved.
            </p>
            <div className="flex space-x-5">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-blue-200 hover:text-yellow-300 text-sm transition-colors duration-300 hover:underline underline-offset-4"
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