import Carousel from "./components/ui/home/carousel";
import Footer from "./components/ui/genral/footer";
// import { motion } from "framer-motion"; // Temporarily disabled due to compatibility issues

export default function Home() {
  // Animation variants for fade-in effects
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <Carousel /> {/* Assuming Carousel handles its own animations and responsiveness */}
      </section>

      {/* Welcome/About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 md:text-5xl animate-fade-in-up">
              Welcome to Elite Truck Driving School
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in-up">
              At Elite Truck Driving School, we provide top-tier training for aspiring truck drivers. Our comprehensive programs are designed to equip you with the skills needed for a successful career in the trucking industry. With experienced instructors and state-of-the-art facilities, we're committed to your success on the road.
            </p>
            <div className="flex justify-center mb-12 animate-fade-in-up">
              <img
                src="https://via.placeholder.com/800x400?text=Truck+Driving+School+Hero+Image"
                alt="Truck driving school overview"
                className="rounded-lg shadow-lg w-full max-w-4xl object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <a
              href="/enroll"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 animate-fade-in-up"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-4xl animate-fade-in-up">
              Why Choose Elite Truck Driving School?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl animate-fade-in-up">
                <img
                  src="https://via.placeholder.com/400x300?text=Experienced+Instructors+GIF"
                  alt="Experienced instructors animation"
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Experienced Instructors</h3>
                <p className="text-gray-600">
                  Our certified instructors have years of real-world trucking experience, ensuring you get practical, hands-on training.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl animate-fade-in-up">
                <img
                  src="https://via.placeholder.com/400x300?text=Modern+Fleet+Image"
                  alt="Modern fleet"
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Modern Fleet</h3>
                <p className="text-gray-600">
                  Train on the latest trucks and equipment, including simulators for safe, effective learning.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl animate-fade-in-up">
                <img
                  src="https://via.placeholder.com/400x300?text=Job+Placement+GIF"
                  alt="Job placement assistance animation"
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Job Placement Assistance</h3>
                <p className="text-gray-600">
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
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-4xl animate-fade-in-up">
              Our Training Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 animate-fade-in-up">
                <img
                  src="https://via.placeholder.com/400x250?text=CDL+Class+A+Image"
                  alt="CDL Class A program"
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">CDL Class A</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive training for operating tractor-trailers. Includes classroom, range, and road training.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>160 hours of instruction</li>
                  <li>Pre-trip inspection</li>
                  <li>Backing maneuvers</li>
                  <li>Highway driving</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 animate-fade-in-up">
                <img
                  src="https://via.placeholder.com/400x250?text=CDL+Class+B+GIF"
                  alt="CDL Class B program animation"
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">CDL Class B</h3>
                <p className="text-gray-600 mb-4">
                  Focused on straight trucks and buses. Ideal for local delivery or passenger transport.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>120 hours of training</li>
                  <li>Vehicle maintenance</li>
                  <li>Safety protocols</li>
                  <li>Urban navigation</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 animate-fade-in-up">
                <img
                  src="https://via.placeholder.com/400x250?text=Refresher+Course+Image"
                  alt="Refresher course"
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Refresher Courses</h3>
                <p className="text-gray-600 mb-4">
                  Update your skills or prepare for endorsements like hazmat or doubles/triples.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Customized duration</li>
                  <li>Endorsement prep</li>
                  <li>Defensive driving</li>
                  <li>Logbook management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-4xl animate-fade-in-up">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <blockquote className="bg-white p-6 rounded-lg shadow-md italic text-gray-600 animate-fade-in-up">
                "Elite Truck Driving School gave me the confidence and skills to start my career. The instructors were fantastic!"
                <footer className="mt-4 text-right font-semibold text-gray-800">- John D., Graduate</footer>
              </blockquote>
              <blockquote className="bg-white p-6 rounded-lg shadow-md italic text-gray-600 animate-fade-in-up">
                "The hands-on training and job placement help were invaluable. Highly recommend!"
                <footer className="mt-4 text-right font-semibold text-gray-800">- Sarah L., Alum</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 md:text-4xl">Ready to Hit the Road?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join Elite Truck Driving School today and steer your future towards success.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}