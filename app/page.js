'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Coffee, MapPin, Phone, Mail, Instagram, Facebook, ArrowRight, ChevronDown } from 'lucide-react';

export default function OsheCoffee() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'menu', 'gallery', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className="bg-neutral-950 text-neutral-100 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-neutral-950/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <Coffee className="w-8 h-8 text-amber-600" />
              <span className="text-2xl font-bold">OSHE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                    activeSection === item.toLowerCase() ? 'text-amber-600' : 'text-neutral-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-neutral-900/98 backdrop-blur-lg border-t border-neutral-800">
            <div className="px-4 py-6 space-y-4">
              {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 text-neutral-300 hover:text-amber-600 hover:bg-neutral-800 rounded transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-800/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 inline-block">
            <Coffee className="w-20 h-20 text-amber-600 animate-pulse" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            OSHE COFFEE
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-neutral-400 mb-8 font-light">
            Where Every Cup Tells a Story
          </p>
          <p className="text-lg text-neutral-500 mb-12 max-w-2xl mx-auto">
            Experience the finest coffee crafted with passion and precision
          </p>
          <button
            onClick={() => scrollToSection('menu')}
            className="group bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Explore Menu
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-neutral-500" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-amber-600 mb-8"></div>
              <p className="text-lg text-neutral-400 mb-6 leading-relaxed">
                Founded in the heart of Indonesia, Oshe Coffee is more than just a café. 
                We're a community of coffee enthusiasts dedicated to bringing you the finest 
                beans from across the archipelago.
              </p>
              <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                Each cup is carefully crafted by our skilled baristas who have trained 
                extensively to perfect the art of coffee making. We believe in quality, 
                sustainability, and creating moments that matter.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-800">
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">5+</div>
                  <div className="text-sm text-neutral-500">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">50K+</div>
                  <div className="text-sm text-neutral-500">Cups Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">15+</div>
                  <div className="text-sm text-neutral-500">Awards</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amber-600/20 to-neutral-800/20 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Coffee className="w-64 h-64 text-amber-600/40" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-600/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-4 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Our Menu</h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Handcrafted beverages made with premium beans
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="group bg-neutral-900/50 backdrop-blur border border-neutral-800 rounded-2xl p-8 hover:bg-neutral-900 hover:border-amber-600/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-amber-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-amber-600">{item.price}</span>
                </div>
                <p className="text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Gallery</h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-neutral-400">Moments captured at Oshe Coffee</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Coffee className="w-20 h-20 text-neutral-700 group-hover:text-amber-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Visit Us</h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-neutral-400">We'd love to serve you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Location</h3>
                  <p className="text-neutral-400">Jl. Coffee Street No. 123<br />Banjarmasin, Kalimantan Selatan</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Phone</h3>
                  <p className="text-neutral-400">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Email</h3>
                  <p className="text-neutral-400">hello@oshecoffee.com</p>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="font-bold text-xl mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-neutral-900 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-neutral-900 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur border border-neutral-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-neutral-900 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-6 h-6 text-amber-600" />
            <span className="text-xl font-bold">OSHE COFFEE</span>
          </div>
          <p className="text-neutral-500 text-sm">
            © 2025 Oshe Coffee. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}