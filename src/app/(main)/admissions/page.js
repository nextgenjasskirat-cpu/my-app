"use client"
import { useState } from 'react';
import Head from 'next/head';
import { FaTruck, FaChalkboardTeacher, FaUserTie, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentLicenceNumber: '',
    licenceCardNumber: '',
    rmsLogBookNumber: '',
    licenceCourseRequired: 'LR',
    preferredDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/admissionForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Application submitted successfully! We will contact you soon.');
        setShowWhatsAppPopup(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          currentLicenceNumber: '',
          licenceCardNumber: '',
          rmsLogBookNumber: '',
          licenceCourseRequired: 'LR',
          preferredDate: '',
          message: ''
        });
      } else {
        setSubmitMessage(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+61402417462";
    const message = `Hello, I'm interested in enrolling at NextGen Truck Driving School. I just submitted my application. My name is ${formData.firstName} ${formData.lastName}.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowWhatsAppPopup(false);
  };

  return (
    <>
      <Head>
        <title>Admission Form - NextGen Truck Driving School</title>
        <meta name="description" content="Apply to NextGen Truck Driving School, the premier institution for professional truck driver training. Start your career in the transportation industry today." />
        <meta name="keywords" content="truck driving school, CDL training, commercial driver license, trucking career, professional driver training" />
        <meta property="og:title" content="NextGen Truck Driving School - Admission Form" />
        <meta property="og:description" content="Begin your journey to a rewarding trucking career with NextGen Truck Driving School's comprehensive training program." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-black pb-22 text-gray-200">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-black to-black">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Launch Your <span className="text-yellow-500">Trucking Career</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Join NextGen Truck Driving School and get the high-quality training you need to succeed in the transportation industry.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose <span className="text-yellow-500">NextGen Truck Driving School</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10">
                <div className="text-yellow-500 text-3xl mb-4 flex justify-center">
                  <FaTruck />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Modern Equipments</h3>
                <p className="text-gray-300 text-center">Train on state-of-the-art trucks with the latest technology and safety features.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10">
                <div className="text-yellow-500 text-3xl mb-4 flex justify-center">
                  <FaChalkboardTeacher />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Expert Instructors</h3>
                <p className="text-gray-300 text-center">Learn from industry veterans with years of professional driving experience.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10">
                <div className="text-yellow-500 text-3xl mb-4 flex justify-center">
                  <FaUserTie />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Job Placement</h3>
                <p className="text-gray-300 text-center">Our graduates enjoy excellent job placement rates with top trucking companies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
              <div className="bg-yellow-500 py-4">
                <h2 className="text-2xl font-bold text-black text-center">Admission Application</h2>
              </div>
              <div className="p-6 md:p-8">
                {submitMessage && (
                  <div className={`p-4 mb-6 rounded-lg ${submitMessage.includes('successfully') ? 'bg-green-900 text-green-200 border border-green-700' : 'bg-red-900 text-red-200 border border-red-700'}`}>
                    {submitMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block mb-2 font-medium">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all placeholder-gray-400"
                        placeholder="First"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-2 font-medium">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all placeholder-gray-400"
                        placeholder="Last"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all placeholder-gray-400"
                      placeholder="Email*"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">Phone *</label>
                    <div className="flex">
                      <div className="flex items-center px-4 py-3 bg-gray-700 border border-r-0 border-gray-600 rounded-l-lg text-gray-400">
                        India +91
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all placeholder-gray-400"
                        placeholder="Phone*"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="currentLicenceNumber" className="block mb-2 font-medium">Current Licence Number</label>
                    <input
                      type="text"
                      id="currentLicenceNumber"
                      name="currentLicenceNumber"
                      value={formData.currentLicenceNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all placeholder-gray-400"
                      placeholder="Current Licence Number"
                    />
                  </div>

                  <div>
                    <label htmlFor="licenceCardNumber" className="block mb-2 font-medium">Licence Card Number</label>
                    <input
                      type="text"
                      id="licenceCardNumber"
                      name="licenceCardNumber"
                      value={formData.licenceCardNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all placeholder-gray-400"
                      placeholder="Licence Card Number"
                    />
                  </div>

                  <div>
                    <label htmlFor="rmsLogBookNumber" className="block mb-2 font-medium">RMS Log Book Number</label>
                    <input
                      type="text"
                      id="rmsLogBookNumber"
                      name="rmsLogBookNumber"
                      value={formData.rmsLogBookNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all placeholder-gray-400"
                      placeholder="RMS Log Book Number"
                    />
                  </div>

                  <div>
                    <label htmlFor="licenceCourseRequired" className="block mb-2 font-medium">Licence Course Required</label>
                    <select
                      id="licenceCourseRequired"
                      name="licenceCourseRequired"
                      value={formData.licenceCourseRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                    >
                      <option value="LR">LR</option>
                      <option value="MR">MR</option>
                      <option value="MC">MC</option>
                      <option value="HC">HC</option>
                      <option value="Bus">Bus</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block mb-2 font-medium">Preferred Date</label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Comment or Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all placeholder-gray-400"
                      placeholder="Comment or Message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Popup */}
        {showWhatsAppPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full border border-gray-700 relative">
              <button 
                onClick={() => setShowWhatsAppPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <IoClose size={24} />
              </button>
              <div className="flex items-center mb-4">
                <div className="bg-green-600 p-3 rounded-full mr-4">
                  <FaWhatsapp className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-yellow-500">Connect with us on WhatsApp</h3>
              </div>
              <p className="mb-6 text-gray-300">Would you like to start a conversation with our admissions team on WhatsApp? We're here to answer any questions you may have!</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <FaWhatsapp className="mr-2" />
                  Open WhatsApp
                </button>
                <button
                  onClick={() => setShowWhatsAppPopup(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">How long does the training program take?</h3>
                <p className="text-gray-300">Our comprehensive program typically takes 4-6 weeks to complete, depending on the license class and your prior experience.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">What are the requirements to enroll?</h3>
                <p className="text-gray-300">You must be at least 18 years old, have a valid driver's license, and pass a Department of Transportation physical examination.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">Do you offer financial assistance?</h3>
                <p className="text-gray-300">Yes, we have several financing options available and work with various funding sources including VA benefits and workforce development programs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} NextGen Truck Driving School. All rights reserved.</p>
            <p className="mt-2 text-gray-500">Start your journey to a rewarding career today</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </>
  );
}