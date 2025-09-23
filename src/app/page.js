"use client"
import Carousel from "./components/ui/home/carousel";
import ReviewComponent from "./components/ui/home/review";
import Footer from "./components/ui/genral/footer";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProgram, setActiveProgram] = useState(0);
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);
  const [statValues, setStatValues] = useState({ passRate: 0, graduates: 0, jobPlacement: 0, experience: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    // Stats counter animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          
          // Animate stats counting up
          const duration = 2000;
          const steps = 100;
          const incrementPass = 98 / steps;
          const incrementGrad = 200 / steps;
          const incrementJob = 95 / steps;
          const incrementExp = 15 / steps;
          
          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep += 1;
            setStatValues({
              passRate: Math.min(98, Math.round(incrementPass * currentStep)),
              graduates: Math.min(2000, Math.round(incrementGrad * currentStep)),
              jobPlacement: Math.min(95, Math.round(incrementJob * currentStep)),
              experience: Math.min(15, Math.round(incrementExp * currentStep))
            });
            
            if (currentStep === steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Auto-rotate programs
  useEffect(() => {
    const programInterval = setInterval(() => {
      setActiveProgram((prev) => (prev + 1) % programs.length);
    }, 5000);
    
    return () => clearInterval(programInterval);
  }, []);

  // Program tabs animation
  const programs = [
    {
      title: "CDL Class A",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Comprehensive training for operating tractor-trailers. Includes classroom, range, and road training.",
      details: [
        "160 hours of instruction",
        "Pre-trip inspection",
        "Backing maneuvers",
        "Highway driving"
      ]
    },
    {
      title: "CDL Class B",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      description: "Focused on straight trucks and buses. Ideal for local delivery or passenger transport.",
      details: [
        "120 hours of training",
        "Vehicle maintenance",
        "Safety protocols",
        "Urban navigation"
      ]
    },
    {
      title: "Refresher Courses",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      description: "Update your skills or prepare for endorsements like hazmat or doubles/triples.",
      details: [
        "Customized duration",
        "Endorsement prep",
        "Defensive driving",
        "Logbook management"
      ]
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
        
        /* New Animations */
        .float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .glow-gold {
          animation: glow-gold 2s ease-in-out infinite alternate;
        }
        @keyframes glow-gold {
          from { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }
          to { box-shadow: 0 0 15px rgba(212, 175, 55, 0.8); }
        }
        
        .slide-in-left {
          animation: slide-in-left 1s ease-out;
        }
        @keyframes slide-in-left {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .slide-in-right {
          animation: slide-in-right 1s ease-out;
        }
        @keyframes slide-in-right {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }
        @keyframes bounce-subtle {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-3px); }
        }
        
        .rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        
        .fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .program-transition {
          transition: all 0.5s ease-in-out;
        }
        
        /* Improved Text Visibility */
        .text-high-contrast {
          color: #FFFFFF;
          text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }
        
        .text-secondary-contrast {
          color: #E5E5E5;
          text-shadow: 0 1px 2px rgba(0,0,0,0.7);
        }
        
        .text-tertiary-contrast {
          color: #D1D1D1;
          text-shadow: 0 1px 2px rgba(0,0,0,0.6);
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

      {/* Hero Section with Carousel */}
      <section className="relative">
        <Carousel />
      </section>

      {/* Welcome/About Section */}
      <section className="py-20 bg-darker relative overflow-hidden hex-pattern">
        <div className="absolute top-0 left-0 w-full h-1 gold-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold mb-16 text-center md:text-4xl gold-gradient-text text-shimmer ">
              Welcome to NextGen Truck Driving School
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-10 leading-relaxed mobile-optimized-text text-secondary-contrast">
              At Next Gen Truck Driving School we provide top-tier training for aspiring truck drivers. Our comprehensive programs are designed to equip you with the skills needed for a successful career in the trucking industry. With experienced instructors and state-of-the-art facilities, we're committed to your success on the road.
            </p>
            <div className="flex justify-center mb-12">
              <div className="gold-border rounded-xl overflow-hidden float-slow">
                <img
                  src="https://res.cloudinary.com/dsyf8cltg/image/upload/v1757875404/gallery/ns0pawerpygyra2pnfpc.jpg"
                  className="rounded-xl w-full max-w-4xl object-cover transition-transform duration-700 hover:scale-105"
                  alt="Truck driving school"
                />
              </div>
            </div>
            <a
              href="/admissions"
              className="inline-block gold-gradient text-black px-10 py-5 rounded-full font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg gold-border pulse-gold glow-gold"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-dark relative overflow-hidden hex-pattern">

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center md:text-4xl gold-gradient-text text-shimmer ">
            Our Success in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-darker rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 gold-border float-slow">
              <div className="text-5xl font-bold mb-2 text-gold text-high-contrast">{statsInView ? `${statValues.passRate}%` : '0%'}</div>
              <div className="uppercase tracking-wider text-sm font-semibold text-secondary-contrast">Pass Rate</div>
            </div>
            
            <div className="p-6 bg-darker rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 gold-border float-medium" style={{animationDelay: '1s'}}>
              <div className="text-5xl font-bold mb-2 text-gold text-high-contrast">{statsInView ? `${statValues.graduates}+` : '0+'}</div>
              <div className="uppercase tracking-wider text-sm font-semibold text-secondary-contrast">Graduates</div>
            </div>
            
            <div className="p-6 bg-darker rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 gold-border float-fast" style={{animationDelay: '2s'}}>
              <div className="text-5xl font-bold mb-2 text-gold text-high-contrast">{statsInView ? `${statValues.jobPlacement}%` : '0%'}</div>
              <div className="uppercase tracking-wider text-sm font-semibold text-secondary-contrast">Job Placement</div>
            </div>
           
            <div className="p-6 bg-darker rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 gold-border float-slow" style={{animationDelay: '3s'}}>
              <div className="text-5xl font-bold mb-2 text-gold text-high-contrast">{statsInView ? statValues.experience : '0'}</div>
              <div className="uppercase tracking-wider text-sm font-semibold text-secondary-contrast">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Why Choose Us Section */}
      <section className="py-20 bg-black relative hex-pattern">
        <div className="absolute top-0 left-0 w-full h-1 gold-gradient"></div>
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold mb-16 text-center md:text-4xl gold-gradient-text text-shimmer  ">
              Why Choose Next Gen Truck Driving School
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-darker p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 gold-border group float-slow">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 gold-border glow-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-gold transition-colors ">Experienced Instructors</h3>
                <p className="text-center mobile-optimized-text ">
                  Our certified instructors have years of real-world trucking experience, ensuring you get practical, hands-on training.
                </p>
              </div>
              <div className="bg-darker p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 gold-border group float-medium" style={{animationDelay: '1s'}}>
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 gold-border glow-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-gold transition-colors ">Modern Fleet</h3>
                <p className="text-center mobile-optimized-text ">
                  Train on the latest trucks and equipment, including simulators for safe, effective learning.
                </p>
              </div>
              <div className="bg-darker p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 gold-border group float-fast" style={{animationDelay: '2s'}}>
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 gold-border glow-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-gold transition-colors ">Job Placement Assistance</h3>
                <p className="text-center mobile-optimized-text ">
                  We partner with top trucking companies to help you secure employment after graduation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Programs Section */}
      <section className="py-20 bg-dark relative hex-pattern">
        <div className="absolute top-0 left-0 w-full h-1 gold-gradient"></div>
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold mb-16 text-center md:text-4xl gold-gradient-text text-shimmer  ">
              Our Training Programs
            </h2>
            
            {/* Program Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap justify-center gap-4 bg-darker p-2 rounded-xl gold-border">
                {programs.map((program, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProgram(index)}
                    className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                      activeProgram === index 
                        ? 'gold-gradient text-black shadow-2xl glow-gold' 
                        : 'bg-black text-gray-300 hover:text-gold hover:bg-darker'
                    }`}
                  >
                    {program.title}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Program Content */}
            <div className="bg-darker p-10 rounded-3xl shadow-2xl transition-all duration-500 gold-border program-transition">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-2/5 flex justify-center">
                  <div className="bg-black rounded-2xl p-10 w-80 h-80 flex items-center justify-center transform transition-all duration-500 hover:scale-105 gold-border float-slow">
                    {programs[activeProgram].icon}
                  </div>
                </div>
                <div className="w-full md:w-3/5 fade-in-up">
                  <h3 className="text-3xl font-semibold mb-6 gold-gradient-text ">{programs[activeProgram].title}</h3>
                  <p className="mb-8 text-lg leading-relaxed mobile-optimized-text card-text-contrast">{programs[activeProgram].description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {programs[activeProgram].details.map((detail, i) => (
                      <li key={i} className="flex items-center mobile-optimized-text card-text-contrast">
                        <svg className="w-6 h-6 text-gold mr-4 flex-shrink-0 bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <button className="gold-gradient text-black px-10 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg gold-border pulse-gold">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* New Features Section */}
      <section className="py-20 bg-black relative hex-pattern">
        <div className="absolute top-0 left-0 w-full h-1 gold-gradient"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center md:text-4xl gold-gradient-text text-shimmer ">
            Our Training Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-darker p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 text-center group gold-border float-slow">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 gold-border glow-gold">
                <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-4 group-hover:text-gold transition-colors text-high-contrast">Flexible Scheduling</h3>
              <p className="mobile-optimized-text card-text-contrast">Day and evening classes to fit your busy life</p>
            </div>
            
            <div className="bg-darker p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 text-center group gold-border float-medium" style={{animationDelay: '1s'}}>
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 gold-border glow-gold">
                <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-4 group-hover:text-gold transition-colors text-high-contrast">Financial Aid</h3>
              <p className="mobile-optimized-text card-text-contrast">Options available for those who qualify</p>
            </div>
            
            <div className="bg-darker p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 text-center group gold-border float-fast" style={{animationDelay: '2s'}}>
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 gold-border glow-gold">
                <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-9 0H9m2 0h2m2 0h2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-4 group-hover:text-gold transition-colors text-high-contrast">Modern Facilities</h3>
              <p className="mobile-optimized-text card-text-contrast">State-of-the-art classrooms and training areas</p>
            </div>
            
            <div className="bg-darker p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 text-center group gold-border float-slow" style={{animationDelay: '3s'}}>
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 gold-border glow-gold">
                <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-4 group-hover:text-gold transition-colors text-high-contrast">Fast Track</h3>
              <p className="mobile-optimized-text card-text-contrast">Complete training in as little as 4 weeks</p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Review */}
      <ReviewComponent/>

      {/* Footer */}
      <Footer />
    </div>
  );
}