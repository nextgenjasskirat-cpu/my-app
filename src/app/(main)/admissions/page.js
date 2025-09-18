"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    experience: 'none',
    licenseType: 'class-c',
    message: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/admission', {
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
          name: '',
          email: '',
          phone: '',
          address: '',
          experience: 'none',
          licenseType: 'class-c',
          message: '',
          agreeToTerms: false
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
    const phoneNumber = "1234567890"; // Replace with your school's WhatsApp number
    const message = `Hello, I'm interested in enrolling at NextGen Truck Driving School. I just submitted my application. My name is ${formData.name}.`;
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

      <div className="min-h-screen bg-black text-gray-200">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-90"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Launch Your <span className="text-yellow-500">Trucking Career</span>
              </h1>
              <p className="text-xl mb-8 animate-fade-in-up">
                Join NextGen Truck Driving School and get the high-quality training you need to succeed in the transportation industry.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose <span className="text-yellow-500">NextGen</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                <div className="text-yellow-500 text-4xl mb-4">🚛</div>
                <h3 className="text-xl font-semibold mb-2">Modern Fleet</h3>
                <p>Train on state-of-the-art trucks with the latest technology and safety features.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                <div className="text-yellow-500 text-4xl mb-4">👨‍🏫</div>
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p>Learn from industry veterans with years of professional driving experience.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                <div className="text-yellow-500 text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-2">Job Placement</h3>
                <p>Our graduates enjoy excellent job placement rates with top trucking companies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
              <div className="bg-yellow-500 py-3">
                <h2 className="text-2xl font-bold text-black text-center">Admission Application</h2>
              </div>
              <div className="p-6 md:p-8">
                {submitMessage && (
                  <div className={`p-4 mb-6 rounded-lg ${submitMessage.includes('successfully') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                    {submitMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block mb-2 font-medium">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      placeholder="Enter your full address"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="experience" className="block mb-2 font-medium">Driving Experience</label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      >
                        <option value="none">No experience</option>
                        <option value="some">Some experience</option>
                        <option value="experienced">Experienced driver</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="licenseType" className="block mb-2 font-medium">Desired License Type</label>
                      <select
                        id="licenseType"
                        name="licenseType"
                        value={formData.licenseType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      >
                        <option value="class-c">Class C</option>
                        <option value="class-b">Class B</option>
                        <option value="class-a">Class A</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      placeholder="Tell us about your career goals or any questions you may have"
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                        className="w-4 h-4 bg-black border border-gray-800 rounded focus:ring-3 focus:ring-yellow-500"
                      />
                    </div>
                    <label htmlFor="agreeToTerms" className="ml-3 text-sm">
                      I agree to the processing of my personal data according to the Privacy Policy
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Popup */}
        {showWhatsAppPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4 transform transition-transform duration-300 animate-scale-in">
              <h3 className="text-xl font-bold mb-4 text-yellow-500">Connect with us on WhatsApp</h3>
              <p className="mb-6">Would you like to start a conversation with our admissions team on WhatsApp? We're here to answer any questions you may have!</p>
              <div className="flex space-x-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Open WhatsApp
                </button>
                <button
                  onClick={() => setShowWhatsAppPopup(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
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
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform duration-300 hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">How long does the training program take?</h3>
                <p>Our comprehensive program typically takes 4-6 weeks to complete, depending on the license class and your prior experience.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform duration-300 hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">What are the requirements to enroll?</h3>
                <p>You must be at least 18 years old, have a valid driver's license, and pass a Department of Transportation physical examination.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform duration-300 hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">Do you offer financial assistance?</h3>
                <p>Yes, we have several financing options available and work with various funding sources including VA benefits and workforce development programs.</p>
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
          animation: fade-in 1s ease-out;
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