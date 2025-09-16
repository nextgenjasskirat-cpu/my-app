"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Logo dimensions
  const logoWidth = 300;
  const logoHeight = 80;

  // Dark black color scheme with popping accents
  const darkBlack = "#0A0A0A";
  const mediumBlack = "#1A1A1A";
  const lightBlack = "#2A2A2A";
  const accentColor = "#FFD700"; // Golden yellow for maximum pop
  const secondaryAccent = "#FF6B6B"; // Coral for variety

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
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
    { name: 'Schedule', href: '/schedule' },
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
      icon: <FaInstagram className="h-5 w-5" />, 
      href: 'https://www.instagram.com/hii.mahii/', 
      name: 'Instagram',
      color: "hover:text-white hover:bg-[#E1306C]",
      bg: "bg-[#E1306C]"
    },
    { 
      icon: <FaWhatsapp className="h-5 w-5" />, 
      href: 'https://wa.me/9781278770?text=Hi%2C%20I%20am%20interested%20in%20your%20services%20at%20Colour%20Sense%20Salon.%20Could%20you%20please%20help%20me%20with%20more%20details%3F',
      name: 'WhatsApp',
      color: "hover:text-white hover:bg-[#25D366]",
      bg: "bg-[#25D366]"
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Animation variants
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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
  };

  const socialIconVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Text pop animation
  const textPopVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const isPathActive = (href) => {
    if (!href || href === '#') return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isDropdownParentActive = (dropdown) => {
    if (!dropdown) return false;
    return dropdown.some((item) => isPathActive(item.href));
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 h-28 transition-all duration-300 ${scrolled ? 'shadow-xl bg-black' : 'shadow-md bg-black'}`}
      >
        {/* Glowing top accent line */}
        <motion.div 
          className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Navbar container */}
        <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-6">
          {/* Logo */}
          <motion.div
            className="font-bold text-xl cursor-pointer flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="relative mr-2"
              whileHover={{ rotate: [0, 0, 0] }}
              transition={{ duration: 0.5 }}
              style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>
          </motion.div>

          {/* Desktop Links */}
          <motion.ul
            className="hidden lg:flex gap-6 font-medium"
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
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <div className="relative">
                    <motion.button 
                      className={`flex items-center transition-colors relative px-3 py-2 rounded-lg group ${
                        isDropdownParentActive(item.dropdown)
                          ? 'text-yellow-400'
                          : 'text-gray-200 hover:text-yellow-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => toggleDropdown(item.name)}
                    >
                      <motion.span
                        className="relative transition-colors duration-300 font-semibold"
                        whileHover={{ 
                          scale: 1.1,
                          textShadow: "0 0 8px rgba(255,215,0,0.8)"
                        }}
                      >
                        {item.name}
                      </motion.span>
                      <motion.div
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDownIcon className="ml-1 h-4 w-4 transition-colors duration-300 text-gray-200 group-hover:text-yellow-400" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute left-0 mt-1 w-48 rounded-md shadow-lg py-1 z-50 border border-gray-800"
                          style={{ backgroundColor: mediumBlack }}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <motion.div
                              key={dropdownItem.name}
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <Link
                                href={dropdownItem.href}
                                className={`block px-4 py-2 transition-colors duration-200 font-medium ${
                                  isPathActive(dropdownItem.href)
                                    ? 'text-black bg-yellow-500'
                                    : 'text-gray-200 hover:bg-yellow-500 hover:text-black'
                                }`}
                                onClick={() => setActiveDropdown(null)}
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
                    className={`transition-colors relative py-1 px-3 rounded-lg block group ${
                      isPathActive(item.href)
                        ? 'text-yellow-400'
                        : 'text-gray-200 hover:text-yellow-400'
                    }`}
                  >
                    <motion.span
                      whileHover={{ 
                        scale: 1.1,
                        textShadow: "0 0 8px rgba(255,215,0,0.8)"
                      }}
                      className="relative transition-colors duration-300 font-semibold"
                    >
                      {item.name}
                      <motion.span 
                        className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                          isPathActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                        style={{ backgroundColor: accentColor }}
                      />
                    </motion.span>
                  </Link>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* Desktop Social Icons and Phone */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Phone Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsPhoneOpen(!isPhoneOpen)}
                className="p-2 rounded-full shadow-sm transition-colors text-yellow-400 hover:text-yellow-200"
                style={{ backgroundColor: mediumBlack }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  boxShadow: "0 0 15px rgba(255,215,0,0.5)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                <IoIosCall className="h-5 w-5" />
              </motion.button>

              <AnimatePresence>
                {isPhoneOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 z-50 border border-gray-800"
                    style={{ backgroundColor: mediumBlack }}
                  >
                    <div className="px-4 py-2 font-medium text-yellow-400 border-b border-gray-800 bg-black">
                      Contact Numbers
                    </div>
                    {phoneNumbers.map((phone, index) => (
                      <motion.a
                        key={index}
                        href={`tel:${phone.number.replace(/\D/g, '')}`}
                        className="block px-4 py-2 text-gray-200   transition-colors duration-200 font-medium"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        onClick={() => setIsPhoneOpen(false)}
                      >
                        <div className="font-medium">{phone.label}</div>
                        <div className="text-yellow-400">{phone.number}</div>
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
                className={`p-2 rounded-full shadow-sm transition-colors text-yellow-400 hover:text-yellow-200`}
                style={{ backgroundColor: mediumBlack }}
                variants={socialIconVariants}
                initial="rest"
                whileHover="hover"
                whileTap="hover"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden focus:outline-none z-50 p-2 rounded-lg shadow-sm transition-colors text-yellow-400"
            style={{ backgroundColor: mediumBlack }}
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 15px rgba(255,215,0,0.5)"
            }}
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={iconVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.div>
          </motion.button>
        </div>
                {/* Glowing top accent line */}
          <motion.div 
          className="h-1 w-full bg-gradient-to-r -mt-2 from-transparent via-yellow-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-0 bg-black/90 lg:hidden z-40"
                onClick={toggleMenu}
              />
              
              {/* Menu Items */}
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 right-0 w-full max-w-sm h-full flex flex-col z-40 shadow-2xl border-l border-gray-800"
                style={{ backgroundColor: darkBlack }}
              >
                <div className="flex-1 overflow-y-auto pt-20 pb-24 px-6">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                      <div 
                        className="relative mr-3"
                        style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
                      >
                        <Image
                          src="/logo.png"
                          alt="Logo"
                          fill
                          className="object-contain"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {navLinks.map((item, index) => (
                    <motion.div 
                      key={item.name} 
                      className="mb-2"
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.dropdown ? (
                        <>
                          <motion.button
                            onClick={() => toggleDropdown(item.name)}
                            className={`flex justify-between items-center w-full text-lg font-medium py-4 border-b border-gray-800 ${
                              isDropdownParentActive(item.dropdown)
                                ? 'text-yellow-400'
                                : 'text-gray-200'
                            }`}
                            whileHover={{ color: accentColor, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="hover:text-yellow-400 transition-colors duration-300">
                              {item.name}
                            </span>
                            <motion.div
                              animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDownIcon className="h-5 w-5 hover:text-yellow-400 transition-colors duration-300" />
                            </motion.div>
                          </motion.button>
                          
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="pl-4 border-l-2 ml-2 rounded-r-lg"
                                style={{ borderColor: accentColor, backgroundColor: mediumBlack }}
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
                                      className={`block text-base py-3 border-b border-gray-800 transition-colors duration-200 font-medium ${
                                        isPathActive(dropdownItem.href)
                                          ? 'text-yellow-400'
                                          : 'text-gray-200 hover:text-yellow-400'
                                      }`}
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
                          className={`block text-lg font-medium py-4 border-b border-gray-800 transition-colors duration-300 ${
                            isPathActive(item.href)
                              ? 'text-yellow-400'
                              : 'text-gray-200 hover:text-yellow-400'
                          }`}
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
                    className="mt-8 p-4 rounded-lg border border-gray-800"
                    style={{ backgroundColor: mediumBlack }}
                    variants={itemVariants}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-lg font-medium text-yellow-400 mb-3">
                      Contact Numbers
                    </div>
                    {phoneNumbers.map((phone, index) => (
                      <motion.a
                        key={index}
                        href={`tel:${phone.number.replace(/\D/g, '')}`}
                        className="block py-2 text-gray-200 hover:text-yellow-400 transition-colors duration-200 font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        whileHover={{ x: 5 }}
                        onClick={toggleMenu}
                      >
                        <div className="font-medium">{phone.label}</div>
                        <div className="text-yellow-400">{phone.number}</div>
                      </motion.a>
                    ))}
                  </motion.div>
                  
                  {/* Social Icons in Mobile Menu */}
                  <motion.div 
                    className="mt-6 flex gap-4 justify-center"
                    variants={itemVariants}
                    transition={{ delay: 0.4 }}
                  >
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full text-white ${social.bg}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Mobile Social Bar */}
      <motion.div 
        className="lg:hidden fixed bottom-0 left-0 right-0 py-3 px-4 z-40 flex justify-around items-center shadow-lg border-t border-gray-800"
        style={{ backgroundColor: darkBlack }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        {/* Phone icon */}
        <motion.a
          href={`tel:${phoneNumbers[0].number.replace(/\D/g, '')}`}
          className="flex flex-col items-center  rounded-lg transition-colors duration-200 text-gray-200 hover:text-yellow-400"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoIosCall className="h-8 w-8 bg-blue-800 rounded-2xl p-1" ></IoIosCall>
          <span className="text-xs mt-1">Call</span>
        </motion.a>
        
        {/* Social icons */}
        {socialLinks.map((social) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-2 rounded-lg transition-colors duration-200 text-gray-200 hover:text-yellow-400"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`p-1 rounded-full ${social.bg} text-white`}>
              {social.icon}
            </div>
            <span className="text-xs mt-1">{social.name}</span>
          </motion.a>
        ))}
      </motion.div>
      
      
      {/* Padding to account for fixed navbar */}
      <div className="pt-22 lg:pt-16"></div>
      
    </>
  );
}