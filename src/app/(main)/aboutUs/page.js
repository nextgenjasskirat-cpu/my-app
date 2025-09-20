"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaGraduationCap, FaUsers, FaAward, FaTruck, FaQuoteLeft } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

export default function AboutUsPage() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Michael Roberts',
      position: 'Founder & Head Instructor',
      experience: '25+ years in trucking industry',
      image: '/team/michael.jpg', // This would be replaced with actual images
      quote: 'Our mission is to create the next generation of safe, professional truck drivers.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Lead Driving Instructor',
      experience: '15 years teaching experience',
      image: '/team/sarah.jpg',
      quote: 'There\'s nothing more rewarding than seeing a student master a difficult maneuver.'
    },
    {
      id: 3,
      name: 'David Chen',
      position: 'Classroom Instructor',
      experience: 'CDL testing expert',
      image: '/team/david.jpg',
      quote: 'Knowledge is the foundation of safety on the road.'
    },
    {
      id: 4,
      name: 'Maria Rodriguez',
      position: 'Student Coordinator',
      experience: '10 years in student services',
      image: '/team/maria.jpg',
      quote: 'I love helping students navigate their path to a new career.'
    }
  ];

  // Stats data
  const stats = [
    { number: '95%', label: 'Graduation Rate' },
    { number: '1000+', label: 'CDLs Earned' },
    { number: '87%', label: 'Job Placement' },
    { number: '15+', label: 'Years Experience' }
  ];

  return (
    <>
      <Head>
        <title>About Us - NextGen Truck Driving School</title>
        <meta name="description" content="Learn about NextGen Truck Driving School, our mission, team, and why we're the premier choice for CDL training." />
        <meta name="keywords" content="truck driving school about us, CDL training mission, trucking school team" />
        <meta property="og:title" content="About NextGen Truck Driving School" />
        <meta property="og:description" content="Discover our mission, meet our team, and learn why we're the top choice for professional truck driver training." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-black text-gray-200">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-90"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                About <span className="text-yellow-500">NextGen</span>
              </h1>
              <p className="text-xl mb-8 animate-fade-in-up">
                Training the next generation of professional truck drivers since 2008
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
                <h2 className="text-3xl font-bold mb-6">
                  Our <span className="text-yellow-500">Mission</span>
                </h2>
                <p className="text-lg mb-4">
                  At NextGen Truck Driving School, our mission is to provide the highest quality commercial driver training that prepares students for successful careers in the transportation industry.
                </p>
                <p className="text-lg mb-6">
                  We combine hands-on training with comprehensive classroom instruction to develop safe, professional, and confident truck drivers who meet the evolving needs of the trucking industry.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-yellow-500 p-2 rounded-full mr-4">
                      <FaGraduationCap className="text-black text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Quality Education</h3>
                      <p className="text-gray-400">State-of-the-art training equipment and curriculum</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-yellow-500 p-2 rounded-full mr-4">
                      <FaUsers className="text-black text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Experienced Instructors</h3>
                      <p className="text-gray-400">Industry veterans with decades of experience</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-yellow-500 p-2 rounded-full mr-4">
                      <FaAward className="text-black text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Career Focused</h3>
                      <p className="text-gray-400">Job placement assistance and industry connections</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12 animate-fade-in-up">
                <div className="bg-gray-900 rounded-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-500">Why Choose NextGen?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-yellow-500 w-2 h-8 rounded-full mr-4"></div>
                      <p>Modern fleet of training trucks</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-yellow-500 w-2 h-8 rounded-full mr-4"></div>
                      <p>Flexible training schedules</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-yellow-500 w-2 h-8 rounded-full mr-4"></div>
                      <p>Small class sizes for personalized attention</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-yellow-500 w-2 h-8 rounded-full mr-4"></div>
                      <p>Financial assistance options</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-yellow-500 w-2 h-8 rounded-full mr-4"></div>
                      <p>Industry-recognized certification</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">
              By The <span className="text-yellow-500">Numbers</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 bg-black rounded-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl font-bold text-yellow-500 mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Meet Our <span className="text-yellow-500">Team</span>
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              Our experienced instructors bring decades of real-world trucking experience to your training
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id}
                  className="bg-gray-900 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-48 bg-yellow-500 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-yellow-500">{member.position}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">{member.experience}</p>
                    <div className="flex items-start">
                      <FaQuoteLeft className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-sm italic">{member.quote}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Map & Location SectionS s*/}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Our <span className="text-yellow-500">Location</span>
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Visit our state-of-the-art training facility
            </p>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2 animate-fade-in">
                <div className="bg-gray-900 rounded-xl p-6 h-full">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-500">Training Facility</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-yellow-500 mr-4 text-xl" />
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-gray-400">20 MANTAKA ST BLACKTOWN 2148 NSW AUSTRALIA</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-yellow-500 mr-4 text-xl" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-gray-400">+61 402 417 462</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-yellow-500 mr-4 text-xl" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-gray-400">13jassptyltd@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-yellow-500 mr-4 text-xl" />
                      <div>
                        <p className="font-semibold">Hours</p>
                        <p className="text-gray-400">Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p className="text-gray-400">Saturday: 9:00 AM - 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-yellow-500">Facility Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <IoIosArrowForward className="text-yellow-500 mr-2" />
                        <span>10-acre practice yard with various backing configurations</span>
                      </li>
                      <li className="flex items-center">
                        <IoIosArrowForward className="text-yellow-500 mr-2" />
                        <span>Modern classrooms with multimedia equipment</span>
                      </li>
                      <li className="flex items-center">
                        <IoIosArrowForward className="text-yellow-500 mr-2" />
                        <span>Student lounge with amenities</span>
                      </li>
                      <li className="flex items-center">
                        <IoIosArrowForward className="text-yellow-500 mr-2" />
                        <span>On-site CDL testing facility</span>
                      </li>
                      <li className="flex items-center">
                        <IoIosArrowForward className="text-yellow-500 mr-2" />
                        <span>Secure parking for personal vehicles</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 animate-fade-in-up">
                <div className="bg-gray-800 rounded-xl overflow-hidden h-96 md:h-full">
                  {!isMapLoaded ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                        <p className="mt-4">Loading map...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full relative">
                      {/* Google Maps Embed */}
                      <iframe
                        src="https://maps.google.com/maps?q=20+Mantaka+St,+Blacktown+NSW+2148,+Australia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-xl"
                      ></iframe>
                      
                      {/* Overlay with facility info and directions button */}
                      <div className="absolute top-4 left-4 bg-black bg-opacity-80 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-yellow-500 text-xl mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">NextGen Training Facility</h3>
                            <p className="text-gray-300 text-sm mb-3">20 MANTAKA ST BLACKTOWN 2148 NSW AUSTRALIA</p>
                            <a 
                              href="https://maps.app.goo.gl/7ZxwZanyv2h9nCGQ8" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-all transform hover:scale-105 text-sm"
                            >
                              Get Directions
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your <span className="text-yellow-500">Career</span>?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join the hundreds of students who have launched successful trucking careers through our program
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-all transform hover:scale-105">
                View Training Programs
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-medium rounded-lg transition-all transform hover:scale-105">
                Contact Admissions
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} NextGen Truck Driving School. All rights reserved.</p>
            <p className="mt-2 text-gray-500">Training professional truck drivers since 2008</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </>
  );
}