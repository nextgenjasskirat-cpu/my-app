"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaCalendarAlt, FaClock, FaUser, FaMapMarkerAlt, FaFilter, FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp, FaRegCalendarCheck } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { BsFillPersonCheckFill } from 'react-icons/bs';

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState([]);

  // Pre-written schedule data
  useEffect(() => {
    // Sample schedule data
    const sampleData = [
      {
        id: 1,
        title: 'CDL Class A Training',
        instructor: 'John Smith',
        date: new Date(),
        startTime: '09:00',
        endTime: '15:00',
        type: 'class',
        level: 'beginner',
        location: 'Main Training Yard',
        description: 'Comprehensive Class A CDL training covering all essential skills for commercial truck driving.'
      },
      {
        id: 2,
        title: 'Road Skills Practice',
        instructor: 'Maria Rodriguez',
        date: new Date(Date.now() + 86400000),
        startTime: '10:00',
        endTime: '16:00',
        type: 'practice',
        level: 'intermediate',
        location: 'Highway Practice Route',
        description: 'Hands-on practice with highway driving, lane changes, and merging techniques.'
      },
      {
        id: 3,
        title: 'Backing Maneuvers Workshop',
        instructor: 'Robert Johnson',
        date: new Date(Date.now() + 86400000),
        startTime: '13:00',
        endTime: '17:00',
        type: 'workshop',
        level: 'beginner',
        location: 'Maneuvering Yard',
        description: 'Learn essential backing techniques including straight line backing, offset backing, and alley docking.'
      },
      {
        id: 4,
        title: 'CDL Exam Preparation',
        instructor: 'Sarah Williams',
        date: new Date(Date.now() + 2 * 86400000),
        startTime: '08:00',
        endTime: '12:00',
        type: 'class',
        level: 'advanced',
        location: 'Classroom B',
        description: 'Focused preparation for the CDL written exam and pre-trip inspection test.'
      },
      {
        id: 5,
        title: 'Night Driving Techniques',
        instructor: 'Michael Brown',
        date: new Date(Date.now() + 3 * 86400000),
        startTime: '18:00',
        endTime: '22:00',
        type: 'workshop',
        level: 'intermediate',
        location: 'Night Driving Course',
        description: 'Specialized training for driving in low-light conditions and adverse weather.'
      },
      {
        id: 6,
        title: 'Hazardous Materials Certification',
        instructor: 'Jennifer Lee',
        date: new Date(Date.now() + 5 * 86400000),
        startTime: '09:00',
        endTime: '16:00',
        type: 'certification',
        level: 'advanced',
        location: 'Classroom A',
        description: 'Certification course for handling and transporting hazardous materials.'
      },
      {
        id: 7,
        title: 'Logbook & Regulations Review',
        instructor: 'David Wilson',
        date: new Date(Date.now() + 7 * 86400000),
        startTime: '14:00',
        endTime: '17:00',
        type: 'class',
        level: 'beginner',
        location: 'Classroom C',
        description: 'Understanding DOT regulations, hours of service, and proper logbook maintenance.'
      },
      {
        id: 8,
        title: 'Mountain Driving Techniques',
        instructor: 'Amanda Garcia',
        date: new Date(Date.now() + 9 * 86400000),
        startTime: '08:00',
        endTime: '16:00',
        type: 'practice',
        level: 'advanced',
        location: 'Mountain Route',
        description: 'Specialized training for mountain driving, including grades, curves, and brake management.'
      }
    ];
    setScheduleData(sampleData);
    setIsLoading(false);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getDatesInWeek = (date) => {
    const dates = [];
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(firstDayOfWeek);
      currentDate.setDate(firstDayOfWeek.getDate() + i);
      dates.push(currentDate);
    }
    
    return dates;
  };

  const getEventsForDate = (date) => {
    return scheduleData.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'class': return 'bg-blue-500';
      case 'practice': return 'bg-green-500';
      case 'workshop': return 'bg-purple-500';
      case 'certification': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'class': return <FaRegCalendarCheck className="inline mr-2" />;
      case 'practice': return <IoMdTime className="inline mr-2" />;
      case 'workshop': return <FaUser className="inline mr-2" />;
      case 'certification': return <BsFillPersonCheckFill className="inline mr-2" />;
      default: return <FaCalendarAlt className="inline mr-2" />;
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return level;
    }
  };

  const weekDates = getDatesInWeek(selectedDate);

  return (
    <>
      <Head>
        <title>Class Schedule - NextGen Truck Driving School</title>
        <meta name="description" content="View the class schedule for NextGen Truck Driving School. Find training sessions, workshops, and practice times." />
        <meta name="keywords" content="truck driving school schedule, CDL class times, training sessions, trucking course calendar" />
        <meta property="og:title" content="NextGen Truck Driving School - Class Schedule" />
        <meta property="og:description" content="View our comprehensive training schedule and plan your truck driving education." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-black text-gray-200">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-90"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Training <span className="text-yellow-500">Schedule</span>
              </h1>
              <p className="text-xl mb-8 animate-fade-in-up">
                View our comprehensive training schedule and plan your truck driving education
              </p>
            </div>
          </div>
        </section>


        {/* All Upcoming Sessions */}
        <section className="py-6 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              All Upcoming <span className="text-yellow-500">Sessions</span>
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                <p className="mt-4">Loading upcoming sessions...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {scheduleData
                  .filter(item => activeFilter === 'all' || item.type === activeFilter)
                  .map((item, index) => (
                  <div 
                    key={item.id}
                    className="bg-gray-900 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`h-2 ${getTypeColor(item.type)}`}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <span className="px-2 py-1 bg-gray-800 rounded text-sm">
                          {getLevelText(item.level)}
                        </span>
                      </div>
                      
                      <div className="space-y-3 text-sm text-gray-400 mb-4">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-yellow-500" />
                          {formatDate(new Date(item.date))}
                        </div>
                        <div className="flex items-center">
                          <IoMdTime className="mr-2 text-yellow-500" />
                          {item.startTime} - {item.endTime}
                        </div>
                        <div className="flex items-center">
                          <FaUser className="mr-2 text-yellow-500" />
                          {item.instructor}
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-yellow-500" />
                          {item.location}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mt-4">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Interested in <span className="text-yellow-500">Enrolling</span>?
              </h2>
              <p className="text-xl mb-8">
                Contact our admissions team to learn more about our programs and enrollment process
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="bg-black p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-500">Phone</h3>
                  <p className="text-lg">+61 402 417 462</p>
                  <p className="text-gray-400 mt-2">Mon-Fri, 8:00 AM - 6:00 PM</p>
                </div>
                <div className="bg-black p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-500">Email</h3>
                  <p className="text-lg">13jassptyltd@gmail.com</p>
                  <p className="text-gray-400 mt-2">We respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} NextGen Truck Driving School. All rights reserved.</p>
            <p className="mt-2 text-gray-500">View our training schedule and plan your career path today</p>
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
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}