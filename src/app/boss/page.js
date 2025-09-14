'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiLogOut, FiImage, FiFileText, FiCamera, FiStar,
  FiUsers, FiUserPlus, FiSettings, FiMenu, FiX,
  FiHome, FiTrendingUp, FiAward, FiDatabase
} from 'react-icons/fi';
import CloudinaryUploader from './CloudinaryUploader'; // Import the component

export default function AdminPanel() {
  const [adminData, setAdminData] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    const storedAdminData = localStorage.getItem('adminData');
    
    if (!token || !storedAdminData) {
      router.push('/admin-login');
      return;
    }
    
    // Simulate loading for better UX
    setTimeout(() => {
      setAdminData(JSON.parse(storedAdminData));
      setIsLoading(false);
    }, 800);
    
    // Handle responsiveness
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      setIsSidebarOpen(!mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [router]);

  const handleLogout = () => {
    // Add fade out animation before logout
    document.querySelector('.main-content').classList.add('opacity-0');
    setTimeout(() => {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      router.push('/');
    }, 500);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'carousel':
        return <CarouselSection />;
      case 'blogs':
        return <BlogsSection />;
      case 'gallery':
        return <GallerySection />;
      case 'reviews':
        return <ReviewsSection />;
      case 'students':
        return <StudentsSection />;
      case 'add-admin':
        return <AddAdminSection />;
      default:
        return <DashboardSection />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
          <p className="text-gray-700">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-fit bg-gradient-to-br  pt-22 pb-3">
      {/* Sidebar */}
      <div className={`fixed md:relative bg-gradient-to-b rounded-4xl ml-3  from-red-800 to-red-900 text-white h-screen  transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 md:w-20 opacity-0 md:opacity-100 overflow-hidden'} ${isMobileView ? (isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0') : ''}`}>
        <div className="p-5 border-b border-red-700 flex justify-between items-center h-16">
          {isSidebarOpen && <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>}
          {(isMobileView && isSidebarOpen) && (
            <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-red-200 transition-colors">
              <FiX size={24} />
            </button>
          )}
        </div>
        
        <div className="p-4">
          <div className={`flex items-center mb-6 p-3 bg-red-700 rounded-lg transition-all duration-300 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="bg-red-600 p-2 rounded-full">
              <FiSettings size={20} />
            </div>
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="font-medium">{adminData.name}</p>
                <p className="text-red-200 text-sm">Administrator</p>
              </div>
            )}
          </div>
          
          <nav className="space-y-1">
            <NavButton 
              icon={<FiHome />}
              label="Dashboard"
              isActive={activeSection === 'dashboard'}
              onClick={() => handleSectionChange('dashboard')}
              isSidebarOpen={isSidebarOpen}
            />
            
            <NavButton 
              icon={<FiImage />}
              label="Carousel Photos"
              isActive={activeSection === 'carousel'}
              onClick={() => handleSectionChange('carousel')}
              isSidebarOpen={isSidebarOpen}
            />
            
            <NavButton 
              icon={<FiFileText />}
              label="Blogs"
              isActive={activeSection === 'blogs'}
              onClick={() => handleSectionChange('blogs')}
              isSidebarOpen={isSidebarOpen}
            />
            
            <NavButton 
              icon={<FiCamera />}
              label="Gallery"
              isActive={activeSection === 'gallery'}
              onClick={() => handleSectionChange('gallery')}
              isSidebarOpen={isSidebarOpen}
            />
            
            <NavButton 
              icon={<FiStar />}
              label="Reviews"
              isActive={activeSection === 'reviews'}
              onClick={() => handleSectionChange('reviews')}
              isSidebarOpen={isSidebarOpen}
            />
            
            <NavButton 
              icon={<FiUsers />}
              label="Students"
              isActive={activeSection === 'students'}
              onClick={() => handleSectionChange('students')}
              isSidebarOpen={isSidebarOpen}
            />
            
            <NavButton 
              icon={<FiUserPlus />}
              label="Add Admin"
              isActive={activeSection === 'add-admin'}
              onClick={() => handleSectionChange('add-admin')}
              isSidebarOpen={isSidebarOpen}
            />
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`main-content flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen && !isMobileView ? 'ml-0 md:ml-10' : 'ml-0 md:ml-10'} opacity-100`}>
        <header className="bg-red-100 rounded-3xl mr-5 shadow-md">
          <div className="flex items-center justify-between p-4 md:p-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
            >
              <FiMenu size={24} />
            </button>
            
            <div className="flex-1 md:flex-none text-center md:text-left ml-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back, <span className="text-red-600">{adminData.name}</span>!
              </h1>
              <p className="text-gray-600">Here's what's happening today</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </header>
        
        <main className="p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

// Navigation Button Component
const NavButton = ({ icon, label, isActive, onClick, isSidebarOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-3 my-1 rounded-lg transition-all duration-300 group ${isActive ? 'bg-red-700 shadow-inner' : 'hover:bg-red-700 hover:shadow-md'}`}
    >
      <span className={`${isActive ? 'text-white' : 'text-red-200 group-hover:text-white'} transition-colors`}>
        {icon}
      </span>
      {isSidebarOpen && (
        <span className="ml-3 transition-all duration-300">{label}</span>
      )}
    </button>
  );
};

// Section Components
const DashboardSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      </div> </div>
  );
};

const DashboardCard = ({ icon, title, value, change, isPositive }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className="p-2 rounded-lg bg-red-100 text-red-600">
          {icon}
        </div>
      </div>
      <p className={`mt-2 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last week
      </p>
    </div>
  );
};

const ActivityItem = ({ action, time }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 mr-3">
        <div className="h-2 w-2 rounded-full bg-red-500"></div>
      </div>
      <div>
        <p className="text-gray-800 text-sm">{action}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-300 transform hover:-translate-y-0.5"
    >
      <span className="text-red-600 mb-1 text-sm">{icon}</span>
      <span className="text-xs text-gray-700 text-center">{label}</span>
    </button>
  );
};

const CarouselSection = () => (
  <SectionTemplate title="Carousel Photo Editor">
    <p className="text-gray-600 mb-4">Manage the images displayed in your website carousel.</p>
    <div className="bg-white p-4 rounded-xl shadow-md">
      {/* Carousel management UI would go here */}
    </div>
  </SectionTemplate>
);

const BlogsSection = () => (
  <SectionTemplate title="Blog Editor">
    <p className="text-gray-600 mb-4">Create and manage blog content.</p>
    <div className="bg-white p-4 rounded-xl shadow-md">
      {/* Blog management UI would go here */}
    </div>
  </SectionTemplate>
);

// Updated GallerySection to use CloudinaryUploader
const GallerySection = () => (
  <SectionTemplate title="Gallery Editor">
    <p className="text-gray-600 mb-4">Manage your photo gallery.</p>
    <CloudinaryUploader />
  </SectionTemplate>
);

const ReviewsSection = () => (
  <SectionTemplate title="Review Editor">
    <p className="text-gray-600 mb-4">Moderate and respond to customer reviews.</p>
    <div className="bg-white p-4 rounded-xl shadow-md">
      {/* Review management UI would go here */}
    </div>
  </SectionTemplate>
);

const StudentsSection = () => (
  <SectionTemplate title="Student Details">
    <p className="text-gray-600 mb-4">View and manage student information.</p>
    <div className="bg-white p-4 rounded-xl shadow-md">
      {/* Student management UI would go here */}
    </div>
  </SectionTemplate>
);

const AddAdminSection = () => (
  <SectionTemplate title="Add New Admin">
    <p className="text-gray-600 mb-4">Create new administrator accounts.</p>
    <div className="bg-white p-4 rounded-xl shadow-md">
      {/* Add admin UI would go here */}
    </div>
  </SectionTemplate>
);

const SectionTemplate = ({ title, children }) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      {children}
    </div>
  );
};