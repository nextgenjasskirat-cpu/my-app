"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneNumbers = [
    { label: 'Official Contact', number: '+91 97812-78770' },
    { label: 'Emergency', number: '+91 97812-78770' }
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'schedule', href: '/schedule' },
    { name: 'About Us', href: '/aboutUs' },

    { 
      name: 'Extras', 
      href: '#', 
      dropdown: [
        { name: 'FAQs', href: '/FAQs' },
        { name: 'Blogs', href: '/blog' }
      ] 
    },
  ];

  const socialLinks = [
    { 
      icon: <FaInstagram className="h-6 w-6" />, 
      href: 'https://www.instagram.com/hii.mahii/', 
      name: 'Instagram' 
    },
    { 
      icon: <FaWhatsapp className="h-6 w-6" />, 
      href: 'https://wa.me/9781278770?text=Hi%2C%20I%20am%20interested%20in%20your%20services%20at%20Colour%20Sense%20Salon.%20Could%20you%20please%20help%20me%20with%20more%20details%3F',
      name: 'WhatsApp' 
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  // Animation variants for smoother transitions
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        mass: 0.5,
        delay: 0.1
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        mass: 0.5,
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "h-[140px] md:h-[170px] shadow-md" 
            : "h-[140px] md:h-[170px]"
        }`}
        style={{
          background: "url('/NavbarBG.png') no-repeat left center/cover",
        }}
      >
        {/* Navbar container */}
        <div className="flex items-center h-full px-4">
          {/* Logo */}
          <motion.div
            className="text-black font-bold text-2xl cursor-pointer flex items-center relative -top-4 pl-30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="relative w-12 h-12 mr-3"
              whileHover={{ rotate: [0, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </motion.div>
            <span className="hidden sm:inline-block text-lg md:text-xl">Truck driving</span>
          </motion.div>

          {/* Desktop Links */}
          <motion.ul
            className="hidden lg:flex gap-8 text-black font-medium relative -top-4 mr-5 pl-[10%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {navLinks.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="relative"
              >
                {item.dropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsVerificationOpen(true)}
                    onMouseLeave={() => setIsVerificationOpen(false)}
                  >
                    <motion.button 
                      className="flex items-center hover:text-red-600 transition-colors relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                      <motion.div
                        animate={{ rotate: isVerificationOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDownIcon className="ml-1 h-4 w-4" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isVerificationOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-yellow-400"
                          onMouseEnter={() => setIsVerificationOpen(true)}
                          onMouseLeave={() => setIsVerificationOpen(false)}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <motion.div
                              key={dropdownItem.name}
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <Link
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-black hover:bg-red-50 hover:text-red-600"
                              >
                                {dropdownItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-red-600 transition-colors relative py-1"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                    </motion.span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 hover:w-full"
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* Desktop Social Icons and Phone */}
          <div className="hidden lg:flex items-center gap-4 relative -top-4 pl-[10%]">
            {/* Phone Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsPhoneOpen(!isPhoneOpen)}
                className="text-black hover:text-red-600"
                whileHover={{ scale: 1.1, color: "#dc2626" }}
                whileTap={{ scale: 0.9 }}
              >
                <IoIosCall className="h-6 w-6" />
              </motion.button>

              <AnimatePresence>
                {isPhoneOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-yellow-400"
                  >
                    <div className="px-4 py-2 font-medium text-black border-b border-gray-200 bg-red-50">
                      Contact Numbers
                    </div>
                    {phoneNumbers.map((phone, index) => (
                      <motion.a
                        key={index}
                        href={`tel:${phone.number.replace(/\D/g, '')}`}
                        className="block px-4 py-2 text-black hover:bg-red-50 hover:text-red-600"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="font-medium">{phone.label}</div>
                        <div className="text-red-600">{phone.number}</div>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social Icons */}
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-red-600"
                whileHover={{ scale: 1.1, color: "#dc2626" }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button - Enhanced with smoother animation */}
          <motion.button
            className="lg:hidden text-black focus:outline-none z-50 relative -top-4 pl-[40%]"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={iconVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu - Enhanced with smoother animation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-0 bg-black/60 lg:hidden z-40"
                onClick={toggleMenu}
              />
              
              {/* Menu Items */}
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 right-0 w-full max-w-sm h-full bg-white text-black flex flex-col z-40 shadow-2xl border-l-2 border-yellow-400"
              >
                <div className="flex-1 overflow-y-auto pt-16 pb-24 px-6">
                  {navLinks.map((item, index) => (
                    <motion.div 
                      key={item.name} 
                      className="mb-4"
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.dropdown ? (
                        <>
                          <motion.button
                            onClick={() => setIsVerificationOpen(!isVerificationOpen)}
                            className="flex justify-between items-center w-full text-2xl font-medium py-4 border-b border-gray-200"
                            whileHover={{ color: "#dc2626" }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {item.name}
                            <motion.div
                              animate={{ rotate: isVerificationOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDownIcon className="h-6 w-6" />
                            </motion.div>
                          </motion.button>
                          
                          <AnimatePresence>
                            {isVerificationOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="pl-4 border-l-2 border-red-600 ml-2"
                              >
                                {item.dropdown.map((dropdownItem, dIndex) => (
                                  <motion.div
                                    key={dropdownItem.name}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: dIndex * 0.05 }}
                                  >
                                    <Link
                                      href={dropdownItem.href}
                                      className="block text-xl py-3 text-gray-700 border-b border-gray-200 hover:text-red-600"
                                      onClick={toggleMenu}
                                    >
                                      {dropdownItem.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="block text-2xl font-medium py-4 border-b border-gray-200 hover:text-red-600"
                          onClick={toggleMenu}
                        >
                          <motion.span
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            {item.name}
                          </motion.span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Phone Numbers in Mobile Menu */}
                  <motion.div 
                    className="mt-8 p-4 bg-red-50 rounded-lg border border-yellow-400"
                    variants={itemVariants}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-xl font-medium text-red-800 mb-3">
                      Contact Numbers
                    </div>
                    {phoneNumbers.map((phone, index) => (
                      <motion.a
                        key={index}
                        href={`tel:${phone.number.replace(/\D/g, '')}`}
                        className="block py-2 text-gray-700 hover:text-red-600"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="font-medium">{phone.label}</div>
                        <div className="text-red-600">{phone.number}</div>
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Mobile Social Bar - Always visible on mobile */}
      <motion.div 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-yellow-400 py-3 px-6 z-40 flex justify-around items-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <motion.a
          href={`tel:${phoneNumbers[0].number.replace(/\D/g, '')}`}
          className="flex flex-col items-center text-black hover:text-red-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoIosCall className="h-7 w-7" />
          <span className="text-xs mt-1">Call</span>
        </motion.a>
        {socialLinks.map((social) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-black hover:text-red-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {social.icon}
            <span className="text-xs mt-1">{social.name}</span>
          </motion.a>
        ))}
      </motion.div>
      
      {/* Padding to account for fixed navbar and social bar on mobile */}
      <div className={`pt-[140px] lg:pt-0 lg:pb-0 ${isScrolled ? 'pt-[100px] lg:pt-[120px]' : 'pt-[140px] lg:pt-[170px]'}`}></div>
    </>
  );
}