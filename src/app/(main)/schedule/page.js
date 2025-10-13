"use client"
import { useState, useEffect } from "react";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const launchDate = new Date('2024-12-31T23:59:59').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className="min-h-screen bg-black font-sans overflow-hidden pt-5">
      <style jsx>{`
        .text-gold {
          color: #D4AF37;
        }
        .bg-gold {
          background-color: #D4AF37;
        }
        .gold-gradient {
          background: linear-gradient(135deg, #D4AF37 0%, #BF953F 50%, #AA771C 100%);
        }
        .gold-gradient-text {
          background: linear-gradient(135deg, #D4AF37 0%, #BF953F 50%, #AA771C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
        .float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .glow-gold {
          animation: glow-gold 2s ease-in-out infinite alternate;
        }
        @keyframes glow-gold {
          from { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }
          to { box-shadow: 0 0 15px rgba(212, 175, 55, 0.8); }
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
        .hex-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.05) 2%, transparent 20%),
            radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.05) 2%, transparent 20%);
          background-size: 30px 30px;
        }
      `}</style>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-gold rounded-full opacity-60 float-slow"></div>
        <div className="absolute top-3/4 right-20 w-6 h-6 bg-gold rounded-full opacity-40 float-slow" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center hex-pattern">
        <div className="container mx-auto px-4 text-center">
          
          {/* Logo */}
          <div className="mb-12 fade-in-up">
            <div className="w-24 h-24 mx-auto mb-6 bg-black rounded-full flex items-center justify-center gold-border glow-gold">
              <span className="text-xl font-bold text-gold">NG</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 gold-gradient-text text-shimmer">
              NextGen
            </h1>
            <p className="text-lg text-gray-300">
              Truck Driving School
            </p>
          </div>

          {/* Coming Soon Message */}
          <div className="mb-12 fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gold-gradient-text">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-300 max-w-md mx-auto mb-8">
              We're preparing something amazing for you. Stay tuned!
            </p>
          </div>

        

          {/* Contact Info */}
          <div className="fade-in-up" style={{animationDelay: '0.9s'}}>
            <p className="text-gray-400 mb-4">For inquiries, contact us at:</p>
            <a href="mailto:13jassptyltd@gmail.com" className="text-gold hover:text-yellow-300 transition-colors">
              13jassptyltd@gmail.com
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}