"use client"
import { useState, useRef, useEffect } from 'react';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (faqRef.current) {
      observer.observe(faqRef.current);
    }
    
    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What are the requirements to enroll in your CDL training program?",
      answer: "To enroll in our CDL training program, you must be at least 18 years old (21 for interstate driving), have a valid driver's license, pass a DOT physical exam, possess a clean driving record, and be able to read and speak English sufficiently to converse with the general public."
    },
    {
      question: "How long does the CDL training program take to complete?",
      answer: "Our CDL Class A program takes approximately 4-6 weeks to complete with full-time attendance. The CDL Class B program is typically 3-4 weeks. We offer both full-time and part-time schedules to accommodate different needs."
    },
    {
      question: "Do you offer financial assistance or payment plans?",
      answer: "Yes! We offer several financing options including payment plans, and we work with various third-party funding sources. We also accept VA benefits for eligible veterans and have partnerships with workforce development programs."
    },
    {
      question: "What is your job placement rate after graduation?",
      answer: "We maintain a 95% job placement rate for our graduates. We have partnerships with over 50 major trucking companies and provide job placement assistance including resume preparation, interview coaching, and direct company introductions."
    },
    {
      question: "Do I need any prior truck driving experience?",
      answer: "No prior experience is necessary! Our programs are designed for beginners. We start with the fundamentals and gradually build your skills through classroom instruction, simulator training, and hands-on driving experience."
    },
    {
      question: "What types of CDL licenses do you prepare students for?",
      answer: "We prepare students for Class A and Class B CDL licenses. We also offer endorsement training for Hazmat, Tanker, Doubles/Triples, and Passenger vehicles. Our comprehensive training covers all aspects needed to pass the state CDL exams."
    },
    {
      question: "What is included in the tuition cost?",
      answer: "Tuition includes all classroom materials, behind-the-wheel training, use of our modern training equipment, DOT physical exam, drug screening, and job placement assistance. There are no hidden fees - everything you need to start your career is included."
    },
    {
      question: "Can I visit the campus before enrolling?",
      answer: "Absolutely! We encourage prospective students to schedule a campus tour. You'll meet our instructors, see our facilities and equipment, and get all your questions answered. Contact us to schedule your personalized tour."
    }
  ];

  return (
    <div className="min-h-screen bg-black font-sans overflow-hidden">
      <style jsx>{`
        .text-gold {
          color: #D4AF37;
        }
        .bg-gold {
          background-color: #D4AF37;
        }
        .border-gold {
          border-color: #D4AF37;
        }
        .bg-dark {
          background-color: #0A0A0A;
        }
        .bg-darker {
          background-color: #050505;
        }
        .gold-gradient {
          background: linear-gradient(135deg, #D4AF37 0%, #BF953F 50%, #AA771C 100%);
        }
        .gold-gradient-text {
          background: linear-gradient(135deg, #D4AF37 0%, #BF953F 50%, #AA771C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .gold-border {
          position: relative;
          border: 1px solid transparent;
          background-clip: padding-box;
        }
        .gold-border::before {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          z-index: -1;
          margin: 1px;
          border-radius: inherit;
          background: linear-gradient(135deg, #D4AF37 0%, #BF953F 50%, #AA771C 100%);
        }
        .pulse-gold {
          animation: pulse-gold 2s infinite;
        }
        @keyframes pulse-gold {
          0% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
          }
        }
        .section-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          margin: 4rem 0;
        }
        .hex-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.05) 2%, transparent 20%),
            radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.05) 2%, transparent 20%);
          background-size: 30px 30px;
        }
        
        /* FAQ Specific Animations */
        .fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        @keyframes fade-in-up {
          from { 
            transform: translateY(30px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        .slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        @keyframes slide-in-left {
          from { 
            transform: translateX(-50px); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }
        
        .slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        @keyframes slide-in-right {
          from { 
            transform: translateX(50px); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }
        
        .bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }
        @keyframes bounce-subtle {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-3px); }
        }
        
        .faq-item {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .faq-question {
          transition: all 0.3s ease;
        }
        
        .faq-answer {
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .faq-icon {
          transition: transform 0.3s ease;
        }
        
        .faq-active .faq-icon {
          transform: rotate(180deg);
        }
        
        .glow-gold {
          animation: glow-gold 2s ease-in-out infinite alternate;
        }
        @keyframes glow-gold {
          from { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }
          to { box-shadow: 0 0 15px rgba(212, 175, 55, 0.8); }
        }
        
        .float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .text-shimmer {
          background: linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer 3s infinite linear;
        }
        @keyframes text-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Text Contrast Improvements */
        .text-high-contrast {
          color: #FFFFFF;
          text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }
        
        .text-secondary-contrast {
          color: #E5E5E5;
          text-shadow: 0 1px 2px rgba(0,0,0,0.7);
        }
        
        .card-text-contrast {
          color: #F0F0F0;
          line-height: 1.7;
          font-weight: 400;
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .mobile-optimized-text {
            font-size: 1.1rem;
            line-height: 1.6;
            font-weight: 400;
            color: #F5F5F5;
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
          }
          .mobile-padding {
            padding: 1.5rem 1rem;
          }
          .mobile-stack {
            flex-direction: column;
          }
          .mobile-center {
            text-align: center;
          }
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-darker hex-pattern overflow-hidden">
       
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gold rounded-full opacity-30 float-slow"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-gold rounded-full opacity-20 float-medium" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-gold rounded-full opacity-40 float-fast" style={{animationDelay: '1s'}}></div>
      </section>

      {/* FAQ Content Section */}
      <section ref={faqRef} className="py-20 bg-black relative hex-pattern">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className={`mb-16 text-center ${isVisible ? 'fade-in-up' : ''}`}>
            <h2 className="text-4xl font-bold mb-4 gold-gradient-text text-shimmer">
              Common Questions
            </h2>
            <p className="text-lg text-secondary-contrast mobile-optimized-text">
              Can't find what you're looking for? <a href="/contact" className="text-gold hover:underline">Contact our admissions team</a> for personalized assistance.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className={`faq-item bg-darker rounded-2xl shadow-xl overflow-hidden gold-border ${
                  activeIndex === index ? 'faq-active glow-gold' : 'hover:shadow-2xl hover:-translate-y-1'
                } transition-all duration-300`}
              >
                <button
                  className="faq-question w-full text-left p-8 flex justify-between items-center hover:bg-black/30 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-semibold pr-4 text-high-contrast mobile-optimized-text">
                    {faq.question}
                  </h3>
                  <div className="faq-icon flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center gold-border">
                    <svg 
                      className="w-5 h-5 text-gold transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </div>
                </button>
                
                <div 
                  className="faq-answer"
                  style={{
                    maxHeight: activeIndex === index ? '500px' : '0px',
                    padding: activeIndex === index ? '0 2rem 2rem 2rem' : '0 2rem'
                  }}
                >
                  <div className="border-t border-gold/30 pt-6">
                    <p className="text-lg leading-relaxed mobile-optimized-text card-text-contrast">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className={`mt-16 bg-darker rounded-2xl p-10 text-center gold-border glow-gold ${isVisible ? 'fade-in-up' : ''}`}>
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 mx-auto gold-border bounce-subtle">
              <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-high-contrast">Still Have Questions?</h3>
            <p className="text-lg mb-6 text-secondary-contrast mobile-optimized-text">
              Our admissions team is here to help you get all the information you need to start your trucking career.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a 
                href="tel:+1234567890" 
                className="gold-gradient text-black px-8 py-3 rounded-full font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg gold-border"
              >
                Call Now: +61 4024 17462
              </a>
              <a 
                href="mailto:13jassptyltd@gmail.com" 
                className="bg-transparent border-2 border-gold text-gold px-8 py-3 rounded-full font-bold hover:bg-gold hover:text-black transition-all duration-300 transform hover:-translate-y-1"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-dark relative hex-pattern">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center p-6 ${isVisible ? 'slide-in-left' : ''}`}>
              <div className="w-16 h-16 bg-darker rounded-full flex items-center justify-center mb-4 mx-auto gold-border glow-gold">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-high-contrast">Flexible Scheduling</h4>
              <p className="text-secondary-contrast mobile-optimized-text">Day and evening classes available</p>
            </div>
            
            <div className={`text-center p-6 ${isVisible ? 'fade-in-up' : ''}`} style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-darker rounded-full flex items-center justify-center mb-4 mx-auto gold-border glow-gold">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-high-contrast">98% Success Rate</h4>
              <p className="text-secondary-contrast mobile-optimized-text">Graduates successfully employed</p>
            </div>
            
            <div className={`text-center p-6 ${isVisible ? 'slide-in-right' : ''}`} style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-darker rounded-full flex items-center justify-center mb-4 mx-auto gold-border glow-gold">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-high-contrast">Financing Available</h4>
              <p className="text-secondary-contrast mobile-optimized-text">Multiple payment options</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}