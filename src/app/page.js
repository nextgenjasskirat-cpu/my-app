"use client"
import Carousel from "./components/ui/home/carousel";
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
          const incrementGrad = 2000 / steps;
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
      { threshold: 0.5 }
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

  // Program tabs animation
  const programs = [
    {
      title: "CDL Class A",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 font-sans overflow-hidden">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <Carousel />
      </section>

      {/* Welcome/About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-6 md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Elite Truck Driving School
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              At Elite Truck Driving School, we provide top-tier training for aspiring truck drivers. Our comprehensive programs are designed to equip you with the skills needed for a successful career in the trucking industry. With experienced instructors and state-of-the-art facilities, we're committed to your success on the road.
            </p>
            <div className="flex justify-center mb-12">
              <img
                src="https://res.cloudinary.com/dsyf8cltg/image/upload/v1757875404/gallery/ns0pawerpygyra2pnfpc.jpg"
                className="rounded-lg shadow-lg w-full max-w-4xl object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <a
              href="/enroll"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 animate-pulse-once">
              <div className="text-4xl font-bold mb-2">{statsInView ? `${statValues.passRate}%` : '0%'}</div>
              <div className="text-sm">Pass Rate</div>
            </div>
            <div className="p-4 animate-pulse-once" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold mb-2">{statsInView ? `${statValues.graduates}+` : '0+'}</div>
              <div className="text-sm">Graduates</div>
            </div>
            <div className="p-4 animate-pulse-once" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold mb-2">{statsInView ? `${statValues.jobPlacement}%` : '0%'}</div>
              <div className="text-sm">Job Placement</div>
            </div>
            <div className="p-4 animate-pulse-once" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold mb-2">{statsInView ? statValues.experience : '0'}</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Elite Truck Driving School?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-t-4 border-blue-500">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Experienced Instructors</h3>
                <p className="text-gray-600 text-center">
                  Our certified instructors have years of real-world trucking experience, ensuring you get practical, hands-on training.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-t-4 border-purple-500">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Modern Fleet</h3>
                <p className="text-gray-600 text-center">
                  Train on the latest trucks and equipment, including simulators for safe, effective learning.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-t-4 border-blue-500">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Job Placement Assistance</h3>
                <p className="text-gray-600 text-center">
                  We partner with top trucking companies to help you secure employment after graduation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Training Programs
            </h2>
            
            {/* Program Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-lg">
                {programs.map((program, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProgram(index)}
                    className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                      activeProgram === index 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    {program.title}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Program Content */}
            <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-lg shadow-md transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="bg-blue-200 rounded-lg p-6 w-64 h-64 flex items-center justify-center">
                    {programs[activeProgram].icon}
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{programs[activeProgram].title}</h3>
                  <p className="text-gray-600 mb-6">{programs[activeProgram].description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {programs[activeProgram].details.map((detail, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Training Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Day and evening classes to fit your busy life</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Financial Aid</h3>
              <p className="text-gray-600">Options available for those who qualify</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-9 0H9m2 0h2m2 0h2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Modern Facilities</h3>
              <p className="text-gray-600">State-of-the-art classrooms and training areas</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Track</h3>
              <p className="text-gray-600">Complete training in as little as 4 weeks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-700 font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-blue-600 text-sm">CDL Class A Graduate</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Elite Truck Driving School gave me the confidence and skills to start my career. The instructors were fantastic and patient with beginners like me."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-700 font-bold">SL</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-purple-600 text-sm">CDL Class B Graduate</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The hands-on training and job placement help were invaluable. I had a job offer before I even graduated! Highly recommend this school."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-700 font-bold">MR</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mike Robertson</h4>
                    <p className="text-blue-600 text-sm">Refresher Course Student</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "After 10 years away from trucking, the refresher course got me back up to speed quickly. Now I'm back on the road with confidence."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <Footer />
    </div>
  );
}