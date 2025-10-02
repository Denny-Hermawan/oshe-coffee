'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Coffee, MapPin, Phone, Mail, Instagram, Facebook, Star, Sparkles } from 'lucide-react';

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
    { name: 'Espresso', price: '25K', desc: 'Rich and bold espresso shot', color: 'from-orange-500 to-red-600' },
    { name: 'Cappuccino', price: '32K', desc: 'Creamy espresso with steamed milk', color: 'from-amber-500 to-orange-600' },
    { name: 'Latte', price: '30K', desc: 'Smooth espresso with milk art', color: 'from-yellow-500 to-amber-600' },
    { name: 'Cold Brew', price: '35K', desc: 'Slow-brewed for 24 hours', color: 'from-blue-500 to-cyan-600' },
    { name: 'Affogato', price: '38K', desc: 'Espresso over vanilla ice cream', color: 'from-pink-500 to-rose-600' },
    { name: 'Mocha', price: '35K', desc: 'Chocolate meets espresso', color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-neutral-900 min-h-screen overflow-x-hidden">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Star 
          className="absolute text-amber-400 animate-spin-slow" 
          size={40}
          style={{ 
            top: '10%', 
            left: '5%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }} 
        />
        <Star 
          className="absolute text-orange-400 animate-pulse" 
          size={30}
          style={{ 
            top: '20%', 
            right: '10%',
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.03}px)`
          }} 
        />
        <Sparkles 
          className="absolute text-yellow-500 animate-bounce" 
          size={35}
          style={{ 
            bottom: '20%', 
            left: '15%',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.02}px)`
          }} 
        />
        <Coffee 
          className="absolute text-amber-300 animate-spin-slow" 
          size={50}
          style={{ 
            bottom: '30%', 
            right: '8%',
            transform: `rotate(${scrollY * 0.1}deg) translate(${mousePosition.x * -0.02}px, ${mousePosition.y * 0.01}px)`
          }} 
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => scrollToSection('home')}
            >
              <div className="relative">
                <Coffee className="w-10 h-10 text-amber-600 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div>
                <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">OSHE</span>
                <div className="text-xs font-bold text-amber-600 -mt-1">COFFEE</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {['Home', 'Story', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-5 py-2 text-sm font-bold uppercase tracking-wide hover:bg-amber-100 rounded-full transition-all hover:scale-105 hover:text-amber-600"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-amber-100 rounded-full transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-2xl border-t-4 border-amber-400 animate-slide-down">
            <div className="px-6 py-8 space-y-2">
              {['Home', 'Story', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-6 py-4 text-lg font-bold uppercase hover:bg-amber-50 rounded-2xl transition-all hover:translate-x-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-orange-100/30 to-yellow-100/50"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8 inline-block animate-bounce-slow">
            <div className="relative">
              <Coffee className="w-28 h-28 text-amber-600" />
              <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black mb-8 leading-none animate-fade-in-up">
            <span className="block mb-4" style={{ animationDelay: '0.1s' }}>BREW YOUR</span>
            <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent" style={{ animationDelay: '0.2s' }}>
              MOMENT
            </span>
          </h1>
          
          <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-700 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            at OSHE COFFEE
          </p>
          
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Where every cup is crafted with passion, precision, and a whole lot of love
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => scrollToSection('menu')}
              className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-full overflow-hidden hover:scale-110 transition-all duration-300 shadow-2xl"
            >
              <span className="relative z-10 uppercase tracking-wide">Explore Menu</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button
              onClick={() => scrollToSection('story')}
              className="px-10 py-5 bg-white text-amber-600 font-bold text-lg rounded-full border-4 border-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-2xl uppercase tracking-wide"
            >
              Our Story
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-amber-600 to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="relative py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 animate-fade-in-left">
              <div className="inline-block">
                <span className="px-6 py-2 bg-amber-100 text-amber-600 font-bold rounded-full text-sm uppercase tracking-wider">
                  Rule #1
                </span>
              </div>
              
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black leading-none">
                Coffee is
                <span className="block mt-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  NOT JUST
                </span>
                <span className="block mt-4">a drink.</span>
              </h2>
              
              <div className="space-y-6 text-lg text-neutral-600">
                <p className="leading-relaxed">
                  Founded in the heart of Indonesia, Oshe Coffee is more than just a café. 
                  We are a movement, a community, a feeling.
                </p>
                <p className="leading-relaxed">
                  Each cup is crafted by our passionate baristas who treat every brew 
                  like an art form. We believe in quality over quantity, soul over speed, 
                  and moments that matter over moments that pass.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-5xl font-black text-amber-600 mb-2">5+</div>
                  <div className="text-sm font-bold text-neutral-600 uppercase">Years</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-5xl font-black text-orange-600 mb-2">50K+</div>
                  <div className="text-sm font-bold text-neutral-600 uppercase">Cups</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-5xl font-black text-red-600 mb-2">15+</div>
                  <div className="text-sm font-bold text-neutral-600 uppercase">Awards</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-2 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center">
                  <Coffee className="w-72 h-72 text-white/20" />
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-yellow-400 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-orange-400 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="relative py-32 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="inline-block px-6 py-2 bg-white text-amber-600 font-bold rounded-full text-sm uppercase tracking-wider mb-6 shadow-lg">
              The Cult Formula
            </span>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-black mb-6">
              OUR
              <span className="block bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                SIGNATURE
              </span>
              MENU
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-black group-hover:scale-110 transition-transform origin-left">
                      {item.name}
                    </h3>
                    <Star className="w-6 h-6 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  
                  <p className="text-neutral-600 mb-6">{item.desc}</p>
                  
                  <div className={`inline-block px-6 py-3 bg-gradient-to-r ${item.color} text-white font-black text-2xl rounded-full shadow-lg`}>
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="inline-block px-6 py-2 bg-amber-100 text-amber-600 font-bold rounded-full text-sm uppercase tracking-wider mb-6">
              Rule #3
            </span>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-black">
              CAPTURED
              <span className="block bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                MOMENTS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${item * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Coffee className="w-24 h-24 text-white/30 group-hover:rotate-12 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-black mb-6">
              VISIT
              <span className="block bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                THE CULT
              </span>
            </h2>
            <p className="text-2xl font-bold text-neutral-600">We would love to brew for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-fade-in-left">
              {[
                { icon: MapPin, title: 'Location', text: 'Jl. Coffee Street No. 123\nBanjarmasin, Kalimantan Selatan', color: 'from-red-500 to-orange-500' },
                { icon: Phone, title: 'Phone', text: '+62 812-3456-7890', color: 'from-amber-500 to-yellow-500' },
                { icon: Mail, title: 'Email', text: 'hello@oshecoffee.com', color: 'from-orange-500 to-red-500' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start group cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl mb-2 uppercase">{item.title}</h3>
                    <p className="text-neutral-600 whitespace-pre-line">{item.text}</p>
                  </div>
                </div>
              ))}

              <div className="pt-8">
                <h3 className="font-black text-2xl mb-6 uppercase">Follow The Cult</h3>
                <div className="flex gap-4">
                  {[Instagram, Facebook].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-orange-600 hover:to-red-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-lg"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-2xl animate-fade-in-right">
              <h3 className="text-3xl font-black mb-8 uppercase">Send a Message</h3>
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-500 transition-colors font-medium"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-500 transition-colors font-medium"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-500 transition-colors resize-none font-medium"
                ></textarea>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Message sent! (Demo)');
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-orange-600 hover:to-red-600 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-wide transition-all hover:scale-105 shadow-xl"
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
            <Coffee className="w-10 h-10 text-amber-500" />
            <div>
              <div className="text-3xl font-black">OSHE COFFEE</div>
              <div className="text-xs text-amber-500 font-bold">EST. 2020</div>
            </div>
          </div>
          <p className="text-neutral-400 font-medium">
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

        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
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

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}