'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
// PERUBAHAN: Menambahkan ikon BookOpen, MessageSquareText, dan Bike, menghapus SpiralIcon
import { Menu, X, Coffee, MapPin, Phone, Mail, ChevronDown, Calendar, Users, ArrowRight, BookOpen, MessageSquareText, Bike } from 'lucide-react';

// PERUBAHAN: Menambahkan komponen pemisah seksi (wave)
const WaveDivider = ({ color }) => (
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -mt-px" style={{ zIndex: 10 }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[75px]">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        style={{ fill: color }}
      ></path>
    </svg>
  </div>
);

const wordsToAnimate = ['Moments', 'Stories', 'Creativity', 'Connections'];

export default function OsheCoffee() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const [animatedText, setAnimatedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const handleTyping = () => {
      const currentWord = wordsToAnimate[wordIndex];
      const updatedText = isDeleting
        ? currentWord.substring(0, animatedText.length - 1)
        : currentWord.substring(0, animatedText.length + 1);

      setAnimatedText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % wordsToAnimate.length);
      }
    };

    const typingSpeed = isDeleting ? 100 : 150;
    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [animatedText, isDeleting, wordIndex, isLoading]);


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuCategories = [
    { title: 'Best Coffee', items: [{ name: 'Espresso', price: '25K' }, { name: 'Cappuccino', price: '32K' }, { name: 'Latte', price: '30K' }, { name: 'Cold Brew', price: '35K' }] },
    { title: 'Best Non Coffee', items: [{ name: 'Matcha Latte', price: '33K' }, { name: 'Chocolate', price: '30K' }, { name: 'Red Velvet', price: '33K' }] },
    { title: 'Best Ricebowl', items: [{ name: 'Chicken Katsu', price: '40K' }, { name: 'Beef Teriyaki', price: '45K' }, { name: 'Dori Sambal Matah', price: '42K' }] },
    { title: 'Best Nusantara', items: [{ name: 'Kopi Susu Gula Aren', price: '28K' }, { name: 'Teh Tarik', price: '25K' }, { name: 'Pisang Goreng', price: '20K' }] },
  ];

  const galleryImages = [
    { src: '/images/kursi.jpg', alt: 'Oshe Coffee Ambiance' },
    { src: '/images/kopi.jpg', alt: 'Oshe Coffee Product' },
    { src: '/images/smoking.jpg', alt: 'Oshe Interior Detail' },
    { src: '/images/baju.jpg', alt: 'Customer at Oshe' },
    { src: '/images/didalam.jpg', alt: 'Food at Oshe Coffee' },
    { src: '/images/diluar.jpg', alt: 'Event at Oshe Coffee' },
  ];

  const colors = { blue: '#021de9', darkGreen: '#134534', white: '#fbfbfb', gray: '#f9fafb' };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleReservationClick = () => {
    const phoneNumber = "6282154656855"; // Ganti dengan nomor WhatsApp Anda
    const message = "Hello, I would like to make a reservation at Oshe Coffee.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGojekClick = () => {
    // Ganti dengan URL GoFood Oshe Coffee Anda
    const gojekUrl = "https://gofood.co.id/banjarmasin/restaurant/oshe-coffee-jl-cempaka-1-no-16-5a359e5e-a3da-44b2-8d96-5fa0dc9f5fac"; 
    window.open(gojekUrl, '_blank');
  };

  const navHasBg = isScrolled || isMobileMenuOpen;

  return (
    <div style={{ backgroundColor: colors.white, color: colors.darkGreen }} className="min-h-screen overflow-x-hidden">
      {isLoading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center" style={{ backgroundColor: colors.blue }}>
          <Image src="/images/logo-oshe.png" alt="Loading Oshe Coffee" width={112} height={112} className="h-28 w-auto brightness-0 invert animate-bounce-logo" />
        </div>
      )}

      {!isLoading && (
        <>
          <nav className="fixed top-0 w-full z-50 transition-all duration-300" style={{ backgroundColor: navHasBg ? colors.blue : 'transparent', boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
                  <Image src="/images/logo-oshe.png" alt="Oshe Coffee" width={48} height={48} className={`h-12 w-auto transition-all duration-300 ${navHasBg ? 'brightness-0 invert' : ''}`} />
                </div>
                <div className="hidden md:flex items-center gap-1">
                  {['Home', 'Story', 'Menu', 'Gallery', 'Reservation', 'GoFood', 'Contact'].map((item) => (
                    <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="px-4 py-2 text-lg font-medium transition-colors hover:bg-black/10 rounded-lg" style={{ color: navHasBg ? colors.white : colors.darkGreen }}>
                      {item}
                    </button>
                  ))}
                </div>
                <button className="md:hidden p-2 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: navHasBg ? colors.white : colors.darkGreen }}>
                  {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="md:hidden animate-slide-down" style={{ backgroundColor: colors.blue }}>
                <div className="px-6 py-6 space-y-1">
                  {['Home', 'Story', 'Menu', 'Gallery', 'Reservation', 'GoFood', 'Contact'].map((item) => (
                    <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-all">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>

          <section id="home" className="pt-20">
            <div className="relative w-full h-[60vh] md:h-[70vh] bg-cover bg-center flex flex-col items-center justify-center text-white text-center animate-fade-in-up px-4" style={{ backgroundImage: "url('/images/suasana-oshe.jpg')" }}>
               <div className="absolute inset-0 bg-black/40"></div>
               <div className="relative z-10">
                    <h1 className="font-finder font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight leading-tight">
                        We Brew <br className="md:hidden" />
                        <span className="min-h-[80px] sm:min-h-[90px] inline-block" style={{ color: colors.blue }}>
                            {animatedText}
                        </span>
                        <span className="blinking-cursor">|</span>
                    </h1>
               </div>
            </div>

            <div className="max-w-4xl mx-auto text-center py-16 px-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h2 className="font-finder font-bold text-4xl md:text-5xl mb-6 tracking-tight" style={{color: colors.darkGreen}}>O-she you there!</h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto" style={{color: colors.darkGreen}}>
                We are born to connect people, share stories, and spark ideas. It ain&apos;t just about serving coffee, but creating a warm and creative space to belong.
              </p>
              <h3 className="font-finder font-semibold text-3xl md:text-4xl tracking-tight" style={{color: colors.darkGreen}}>Come and have an experience!</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  {/* PERUBAHAN: Ikon tombol diganti */}
                  <button onClick={() => scrollToSection('menu')} className="flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: colors.blue }}>
                    <BookOpen className="w-6 h-6"/>
                    Explore Menu
                  </button>
                  <button onClick={() => scrollToSection('story')} className="flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: colors.darkGreen }}>
                     <MessageSquareText className="w-6 h-6"/>
                     Our Story
                  </button>
              </div>
            </div>
          </section>

          {/* PERUBAHAN: Menambahkan 'relative' dan WaveDivider */}
          <section id="story" className="relative py-16 px-4" style={{ backgroundColor: colors.gray }}>
            <WaveDivider color={colors.white} />
            <div className="max-w-7xl mx-auto pt-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 animate-fade-in-left">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight font-finder tracking-tighter">
                    Coffee is
                    <span className="block" style={{ color: colors.blue }}>not just a drink</span>
                  </h2>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>Established in the heart of Banjarmasin, Oshe Coffee is more than just a coffee shop. We are a movement, a community, and a feeling.</p>
                    <p>Every cup is crafted by our passionate baristas, who treat each brew like a work of art. We believe in quality, not quantity; soul, not speed; and meaningful moments, not just passing ones.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-8 pt-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2" style={{ color: colors.blue }}>1+</div>
                      <div className="text-sm font-medium text-gray-600">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2" style={{ color: colors.blue }}>50K+</div>
                      <div className="text-sm font-medium text-gray-600">Cups Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2" style={{ color: colors.blue }}>3+</div>
                      <div className="text-sm font-medium text-gray-600">Awards</div>
                    </div>
                  </div>
                </div>
                <div className="relative animate-fade-in-right">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/videos/story_oshe_2.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="menu" className="relative py-16 px-4 bg-white">
            <WaveDivider color={colors.gray} />
            <div className="max-w-7xl mx-auto pt-12">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="font-finder text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tighter">
                  Our Signature
                  <span className="block mt-1" style={{ color: colors.blue }}>Menu</span>
                </h2>
                <p className="text-xl text-gray-600">Crafted with passion, served with love</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {menuCategories.map((category, index) => (
                    <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div
                        className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => toggleDropdown(index)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-2xl font-bold font-finder tracking-tight" style={{ color: colors.darkGreen }}>
                            {category.title}
                          </h3>
                          <ChevronDown
                            className="w-6 h-6 transition-transform duration-300"
                            style={{
                              color: colors.blue,
                              transform: openDropdown === index ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openDropdown === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 mt-4">
                            {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex justify-between items-center text-lg animate-slide-in-item" style={{ animationDelay: `${itemIndex * 70}ms` }}>
                                    <span style={{ color: colors.darkGreen }}>{item.name}</span>
                                    <span className="font-semibold" style={{ color: colors.darkGreen }}>{item.price}</span>
                                </div>
                            ))}
                          </div>
                      </div>
                    </div>
                  ))}

                  {/* GOJEK DELIVERY SECTION ADDITION */}
                  
                  <div className="sm:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                      <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                              <div>
                                  <h3 className="text-2xl font-bold font-finder tracking-tight" style={{ color: colors.darkGreen }}>
                                      Want it Delivered?
                                  </h3>
                                  <p className="text-gray-600 mt-1">Get your favorites delivered right to you via GoFood.</p>
                              </div>
                              <button
                                  onClick={handleGojekClick}
                                  className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 text-white font-bold text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-md"
                                  style={{ backgroundColor: '#00AA13' }} // Gojek green color
                              >
                                  <Bike className="w-5 h-5" />
                                  Order on Gojek
                              </button>
                          </div>
                      </div>
                  </div>
                  {/* END OF GOJEK DELIVERY SECTION */}

                </div>

                <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                   <div className="relative h-full bg-cover bg-center rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-lg min-h-[300px] lg:min-h-full" style={{ backgroundImage: "url('/images/menu.png')" }}>
                      <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
                      <div className="relative z-10">
                        <Coffee className="w-16 h-16 text-white/80 mx-auto mb-6 animate-pulse-slow"/>
                        <h3 className="text-3xl font-bold font-finder tracking-tight text-white mb-4">
                          Want to see our full menu?
                        </h3>
                        <p className="text-white/90 mb-6">
                          More options available to brighten your day.
                        </p>
                        <button
                          onClick={() => setIsMenuModalOpen(true)}
                          className="px-6 py-3 font-bold text-base transition-all hover:scale-105 shadow-lg rounded-xl"
                          style={{ backgroundColor: colors.blue, color: colors.white }}
                        >
                          View Full Menu
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          <section id="gallery" className="relative py-16 px-4" style={{ backgroundColor: colors.gray }}>
            <WaveDivider color={colors.white} />
            <div className="max-w-7xl mx-auto pt-12">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="font-finder text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tighter">
                  Captured
                  <span className="block mt-1" style={{ color: colors.blue }}>Moments</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="reservation" className="relative py-24 px-4 overflow-hidden">
             <div className="absolute inset-0 w-full h-full z-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/images/kursi.jpg"
                >
                  <source src="/videos/reservation_bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
             </div>
             <div className="relative max-w-4xl mx-auto text-center z-10">
                <div className="animate-fade-in-up">
                  <div className="flex justify-center items-center gap-4 mb-8">
                    <Calendar className="w-12 h-12 text-white/50 animate-pulse-slow" style={{animationDelay: '0.5s'}}/>
                    <Users className="w-12 h-12 text-white/50 animate-pulse-slow" style={{animationDelay: '0.8s'}}/>
                  </div>
                  <h2 className="font-finder text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
                    Make a
                    <span className="block mt-1" style={{ color: colors.blue }}>Reservation</span>
                  </h2>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Secure your spot for an unforgettable coffee experience. Plan your visit and let us prepare the perfect table for you and your companions.
                  </p>
                  <button
                    onClick={handleReservationClick}
                    className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 text-white font-bold text-lg transition-all duration-300 overflow-hidden rounded-xl shadow-2xl animate-button-float"
                    style={{ backgroundColor: colors.blue }}
                  >
                    <span className="absolute w-0 h-full bg-white/20 left-0 top-0 transition-all duration-500 ease-out group-hover:w-full"></span>
                    <span className="relative">Book Your Table Now</span>
                    <ArrowRight className="relative w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"/>
                  </button>
                </div>
             </div>
          </section>

          <section id="contact" className="relative py-16 px-4 bg-white">
            {/* Divider di sini sengaja tidak ada agar transisi dari video lebih smooth */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="font-finder text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tighter">
                  Visit
                  <span className="block mt-1" style={{ color: colors.blue }}>Us</span>
                </h2>
                <p className="text-xl text-gray-600">We would love to brew for you</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8 animate-fade-in-left">
                  {[{ icon: MapPin, title: 'Location', text: 'Jl. Cempaka 1 No.16, Kertak Baru Ulu, Kec. Banjarmasin Tengah, Kota Banjarmasin, Kalimantan Selatan 70231' }, { icon: Phone, title: 'Phone', text: '+62 8215-4656-855' }, { icon: Mail, title: 'Email', text: 'oshecoffee@gmail.com' }].map((item, index) => (
                    <div key={index} className="flex gap-6 items-start group cursor-pointer">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md" style={{ backgroundColor: colors.blue }}><item.icon className="w-7 h-7" style={{ color: colors.white }} /></div>
                      <div>
                        <h3 className="font-bold text-xl mb-2" style={{ color: colors.darkGreen }}>{item.title}</h3>
                        <p className="text-gray-600 whitespace-pre-line leading-snug">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-2xl p-10 shadow-lg animate-fade-in-right">
                  <h3 className="text-2xl font-bold mb-8 font-finder tracking-tight" style={{ color: colors.darkGreen }}>Send a Message</h3>
                  <div className="space-y-5">
                    <input type="text" placeholder="Your Name" className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 focus:outline-none transition-colors focus:border-blue-600" />
                    <input type="email" placeholder="Your Email" className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 focus:outline-none transition-colors focus:border-blue-600" />
                    <textarea placeholder="Your Message" rows={5} className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 focus:outline-none transition-colors resize-none focus:border-blue-600"></textarea>
                    <button onClick={(e) => { e.preventDefault(); alert('Message sent! (Demo)'); }} className="w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-105 shadow-lg" style={{ backgroundColor: colors.blue, color: colors.white }}>
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PERUBAHAN: Spasi footer dirapatkan (py-12) dan divider ditambahkan */}
          <footer className="relative pt-24 pb-12 px-4" style={{ backgroundColor: colors.darkGreen }}>
            <WaveDivider color={colors.white} />
            <div className="max-w-6xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Image src="/images/logo-oshe.png" alt="Oshe Coffee" width={56} height={56} className="h-14 w-auto brightness-0 invert" />
              </div>
              <p className="font-medium" style={{ color: colors.white }}>© 2025 Oshe Coffee. Brewing moments that matter.</p>
            </div>
          </footer>
        </>
      )}

      {isMenuModalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMenuModalOpen(false)}
        >
          <button
            className="absolute top-6 right-6 z-[1000] text-white/80 hover:text-white transition-transform hover:scale-125"
            onClick={() => setIsMenuModalOpen(false)}
          >
            <X size={40} />
          </button>

          <div
            className="relative w-[90vw] h-[60vw] max-w-[1200px] max-h-[750px] bg-gray-900 rounded-3xl border-8 border-gray-700 p-4 shadow-2xl animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-16 bg-gray-700 rounded-r-md">
              <div className="absolute top-1/2 -translate-y-1/2 left-1 w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>

            <div className="w-full h-full bg-white rounded-xl overflow-hidden">
              <iframe
                src="/OsheMenuAGT25.pdf"
                className="w-full h-full border-0"
                title="Oshe Coffee Full Menu"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* Font definitions */
        .font-finder { font-family: 'Finder', sans-serif; }
        .font-bristol { font-family: 'Bristol', serif; }
        .font-itc-cheltenham { font-family: 'ITC Cheltenham Condensed', serif; }

        /* General animations */
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-left { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fade-in-right { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }

        /* Modal Animations */
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-zoom-in { animation: zoom-in 0.3s ease-out forwards; }

        /* Loading animation */
        @keyframes bounce-logo {
          0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(-25px); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }

        /* Blinking cursor animation for typing effect */
        @keyframes blink { 50% { opacity: 0; } }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @keyframes button-float {
            0% { transform: translateY(0px); box-shadow: 0 10px 20px rgba(2, 29, 233, 0.2); }
            50% { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(2, 29, 233, 0.3); }
            100% { transform: translateY(0px); box-shadow: 0 10px 20px rgba(2, 29, 233, 0.2); }
        }

        @keyframes slide-in-item {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-item {
          animation: slide-in-item 0.4s ease-out forwards;
          opacity: 0;
        }

        /* Class definitions for animations */
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-fade-in-left { animation: fade-in-left 1s ease-out forwards; opacity: 0; }
        .animate-fade-in-right { animation: fade-in-right 1s ease-out forwards; opacity: 0; }
        .animate-bounce-logo { animation: bounce-logo 1.5s infinite; }
        .blinking-cursor { animation: blink 0.8s step-end infinite; font-weight: 300; }
        .animate-pulse-slow { animation: pulse 3s infinite ease-in-out; }
        .animate-button-float { animation: button-float 4s infinite ease-in-out; }

        input:focus, textarea:focus { border-color: ${colors.blue} !important; }
      `}</style>
    </div>
  );
}