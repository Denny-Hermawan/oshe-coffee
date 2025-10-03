'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Coffee, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function OsheCoffee() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { name: 'Espresso', price: '25K', desc: 'Rich and bold espresso shot' },
    { name: 'Cappuccino', price: '32K', desc: 'Creamy espresso with steamed milk' },
    { name: 'Latte', price: '30K', desc: 'Smooth espresso with milk art' },
    { name: 'Cold Brew', price: '35K', desc: 'Slow-brewed for 24 hours' },
    { name: 'Affogato', price: '38K', desc: 'Espresso over vanilla ice cream' },
    { name: 'Mocha', price: '35K', desc: 'Chocolate meets espresso' },
  ];

  return (
    <div className="bg-white text-neutral-900 min-h-screen overflow-x-hidden">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl" 
          style={{ 
            backgroundColor: 'rgba(4, 27, 235, 0.03)',
            top: '10%', 
            left: '5%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }} 
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl" 
          style={{ 
            backgroundColor: 'rgba(4, 27, 235, 0.05)',
            top: '50%', 
            right: '10%',
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.03}px)`
          }} 
        />
        <div 
          className="absolute w-72 h-72 rounded-full blur-3xl" 
          style={{ 
            backgroundColor: 'rgba(4, 27, 235, 0.02)',
            bottom: '20%', 
            left: '15%',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.02}px)`
          }} 
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => scrollToSection('home')}
            >
              <img 
                src="images/logo-oshe.png" 
                alt="Oshe Coffee" 
                className="h-16 w-auto group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="hidden md:flex items-center gap-1">
              {['Home', 'Story', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t animate-slide-down">
            <div className="px-6 py-6 space-y-1">
              {['Home', 'Story', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-lg transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 animate-gradient"></div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-96 h-96 rounded-full opacity-20 animate-float"
            style={{ 
              background: 'radial-gradient(circle, #041BEB 0%, transparent 70%)',
              top: '10%',
              left: '10%',
              animationDelay: '0s'
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full opacity-20 animate-float"
            style={{ 
              background: 'radial-gradient(circle, #041BEB 0%, transparent 70%)',
              bottom: '20%',
              right: '10%',
              animationDelay: '2s'
            }}
          />
          <div 
            className="absolute w-64 h-64 rounded-full opacity-20 animate-float"
            style={{ 
              background: 'radial-gradient(circle, #041BEB 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: '4s'
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8 inline-block animate-fade-in-up">
            <img 
              src="images/logo-oshe.png" 
              alt="Oshe Coffee" 
              className="h-28 sm:h-32 md:h-36 w-auto"
            />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="block mb-2">Brew Your</span>
            <span className="block" style={{ color: '#041BEB' }}>
              Perfect Moment
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Where every cup is crafted with passion, precision, and a whole lot of love. 
            Experience the art of coffee in every sip.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={() => scrollToSection('menu')}
              className="px-8 py-3 text-white font-medium text-base rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: '#041BEB' }}
            >
              Explore Menu
            </button>
            
            <button
              onClick={() => scrollToSection('story')}
              className="px-8 py-3 bg-white font-medium text-base rounded-full border-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ borderColor: '#041BEB', color: '#041BEB' }}
            >
              Our Story
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-0.5 h-16 rounded-full" style={{ background: 'linear-gradient(to bottom, #041BEB, transparent)' }}></div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="relative py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Coffee is
                <span className="block mt-2" style={{ color: '#041BEB' }}>
                  not just a drink
                </span>
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in the heart of Indonesia, Oshe Coffee is more than just a café. 
                  We are a movement, a community, a feeling.
                </p>
                <p>
                  Each cup is crafted by our passionate baristas who treat every brew 
                  like an art form. We believe in quality over quantity, soul over speed, 
                  and moments that matter over moments that pass.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#041BEB' }}>5+</div>
                  <div className="text-sm font-medium text-gray-600">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#041BEB' }}>50K+</div>
                  <div className="text-sm font-medium text-gray-600">Cups</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#041BEB' }}>15+</div>
                  <div className="text-sm font-medium text-gray-600">Awards</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#041BEB' }}>
                  <Coffee className="w-64 h-64 text-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="relative py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              Our Signature
              <span className="block mt-2" style={{ color: '#041BEB' }}>
                Menu
              </span>
            </h2>
            <p className="text-xl text-gray-600">Crafted with passion, served with love</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{ backgroundColor: '#041BEB' }}></div>
                
                <div className="relative">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:scale-105 transition-transform origin-left">
                      {item.name}
                    </h3>
                    <Coffee className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" style={{ color: '#041BEB' }} />
                  </div>
                  
                  <p className="text-gray-600 mb-6">{item.desc}</p>
                  
                  <div className="inline-block px-6 py-3 text-white font-bold text-xl rounded-full shadow-lg" style={{ backgroundColor: '#041BEB' }}>
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold">
              Captured
              <span className="block mt-2" style={{ color: '#041BEB' }}>
                Moments
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${item * 0.1}s` }}
              >
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: '#041BEB' }}>
                  <Coffee className="w-24 h-24 text-white/20 group-hover:rotate-12 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              Visit
              <span className="block mt-2" style={{ color: '#041BEB' }}>
                Us
              </span>
            </h2>
            <p className="text-xl text-gray-600">We would love to brew for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-fade-in-left">
              {[
                { icon: MapPin, title: 'Location', text: 'Jl. Coffee Street No. 123\nBanjarmasin, Kalimantan Selatan' },
                { icon: Phone, title: 'Phone', text: '+62 812-3456-7890' },
                { icon: Mail, title: 'Email', text: 'hello@oshecoffee.com' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md" style={{ backgroundColor: '#041BEB' }}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{item.text}</p>
                  </div>
                </div>
              ))}

              <div className="pt-8">
                <h3 className="font-bold text-xl mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {[Instagram, Facebook].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                      style={{ backgroundColor: '#041BEB' }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-10 shadow-lg animate-fade-in-right">
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-600 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-600 transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                ></textarea>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Message sent! (Demo)');
                  }}
                  className="w-full text-white py-4 rounded-xl font-bold text-base transition-all hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#041BEB' }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img 
              src="images/logo-oshe.png" 
              alt="Oshe Coffee" 
              className="h-14 w-auto brightness-0 invert"
            />
          </div>
          <p className="text-gray-400 font-medium">
            © 2025 Oshe Coffee. Brewing moments that matter.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}