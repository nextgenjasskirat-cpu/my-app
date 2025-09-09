"use client"
import { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample data for the carousel - all images are in the public folder
  const slides = [
    {
      id: 1,
      image: "/hero.png", // All paths now start with slash for public folder
      title: "Beautiful Landscape",
      description: "Experience the beauty of nature at its finest"
    },
    {
      id: 2,
      image: "/hero.png", // Replace with your actual image paths
      title: "Mountain Adventure",
      description: "Explore the majestic mountains around the world"
    },
    {
      id: 3,
      image: "/hero.png", // Replace with your actual image paths
      title: "City Lights",
      description: "Discover the vibrant energy of modern cities"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  // Navigate to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Navigate to next/previous slide
  const goToNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-50 md:h-[700px] overflow-hidden rounded-lg">
      {/* Slides container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className="relative flex-shrink-0 w-full h-full"
          >
            {/* Background image - using img tag for better control */}
            <img 
              src={slide.image} 
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay with blur background for text */}
            {/* <div className="absolute inset-0  flex items-center justify-center">
              <div className="backdrop-blur-md p-6 md:p-8 rounded-lg max-w-md mx-4 transform transition-all duration-700 scale-95 hover:scale-100">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {slide.title}
                </h2>
                <p className="text-white opacity-90">
                  {slide.description}
                </p>
              </div>
            </div> */}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blur bg-opacity-50 text-black p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blur bg-opacity-50 text-black p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;