'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Coffee, MapPin, Phone, Mail, ChevronDown, ChevronLeft, ChevronRight, Calendar, Users, ArrowRight, BookOpen, MessageSquareText, Bike } from 'lucide-react';

const WaveDivider = ({ color }) => (
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -mt-px" style={{ zIndex: 10 }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[75px]">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        style={{ fill: color }}
      ></path>
    </svg>
  </div>
);

export default function OsheCoffee() {
  // --- KONFIGURASI POP-UP ---
  // Ubah nilai di bawah ini ke 'slider' atau 'single' untuk memilih pop-up mana yang aktif.
  const activePopup = 'single'; 

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State untuk pop-up slider
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false); 
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0); 

  // State BARU untuk pop-up promo tunggal
  const [isSinglePromoModalOpen, setIsSinglePromoModalOpen] = useState(false);

  const heroImages = [
    { src: '/images/kopi.jpg', alt: 'Oshe Coffee Product' },
    { src: '/images/kursi.jpg', alt: 'Oshe Coffee Ambiance' },
    { src: '/images/didalam.jpg', alt: 'Interior Oshe Coffee' },
    { src: '/images/diluar.jpg', alt: 'Exterior Oshe Coffee' },
  ];

  // Data untuk pop-up slider
  const promoImages = [
    { src: '/images/promo/promo1.jpg', alt: 'Diskon 50% untuk menu baru', link: 'https://www.instagram.com/oshecoffee' },
    { src: '/images/promo/menu_baru.jpg', alt: 'Coba menu spesial Ramadhan', link: 'https://gofood.co.id/...' },
    { src: '/images/promo/promo2.jpg', alt: 'Buy 1 Get 1 Coffee', link: 'https://wa.me/6282154656855' },
  ];
  
  // Data BARU untuk pop-up tunggal
  const singlePromoData = {
    src: '/images/menu_baru.jpg', // Ganti dengan path gambar Anda
    alt: 'Special Promo: Coffee of the Month!',
    link: 'https://www.instagram.com/oshecoffee'
  };


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Logika untuk menampilkan pop-up yang aktif
    if (!isLoading) {
        const promoTimer = setTimeout(() => {
            if (activePopup === 'slider') {
                setIsPromoModalOpen(true);
            } else if (activePopup === 'single') {
                setIsSinglePromoModalOpen(true);
            }
        }, 500);
        return () => clearTimeout(promoTimer);
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, activePopup]); // Tambahkan isLoading dan activePopup sebagai dependency

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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
    {
      title: 'Coffee',
      items: [
        { name: 'Espresso', description: 'Ekstrak kopi murni kaya rasa.', image: '/images/kopi.jpg' },
        { name: 'Cappuccino', description: 'Espresso dengan steamed milk dan busa tebal.', image: '/images/gallery-2.jpg' },
        { name: 'Kopi Susu Gula Aren', description: 'Kopi susu kekinian dengan rasa manis legit.', image: '/images/gallery-3.jpg' },
      ],
    },
    {
      title: 'Non-Coffee',
      items: [
        { name: 'Matcha Latte', description: 'Teh hijau Jepang dengan susu lembut.', image: '/images/gallery-4.jpg' },
        { name: 'Chocolate', description: 'Minuman cokelat klasik yang creamy.', image: '/images/gallery-5.jpg' },
        { name: 'Red Velvet', description: 'Rasa kue red velvet dalam minuman.', image: '/images/gallery-6.jpg' },
      ],
    },
    {
      title: 'Food',
      items: [
        { name: 'Chicken Katsu', description: 'Nasi dengan ayam katsu renyah.', image: '/images/didalam.jpg' },
        { name: 'Beef Teriyaki', description: 'Nasi dengan daging sapi saus teriyaki.', image: '/images/food-2.jpg' },
        { name: 'Dori Sambal Matah', description: 'Nasi dengan ikan dori dan sambal matah segar.', image: '/images/food-3.jpg' },
      ],
    },
    {
      title: 'Snacks',
      items: [
        { name: 'Pisang Goreng', description: 'Pisang goreng manis dengan topping pilihan.', image: '/images/snack-1.jpg' },
        { name: 'French Fries', description: 'Kentang goreng renyah favorit semua.', image: '/images/snack-2.jpg' },
        { name: 'Cireng Rujak', description: 'Camilan aci goreng dengan bumbu rujak.', image: '/images/snack-3.jpg' },
      ],
    },
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

  const handleReservationClick = () => {
    const phoneNumber = "6282154656855";
    const message = "Hello, I would like to make a reservation at Oshe Coffee.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGojekClick = () => {
    const gojekUrl = "https://gofood.co.id/banjarmasin/restaurant/oshe-coffee-jl-cempaka-1-no-16-5a359e5e-a3da-44b2-8d96-5fa0dc9f5fac"; 
    window.open(gojekUrl, '_blank');
  };
  
  const handleViewMenuClick = () => {
    if (window.innerWidth < 768) {
      const link = document.createElement('a');
      link.href = '/OsheMenuAGT25.pdf';
      link.setAttribute('download', 'Menu-Oshe-Coffee.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setIsMenuModalOpen(true);
    }
  };
  
  const handleMobileMenuItemClick = (item) => {
      setIsMobileMenuOpen(false); 
      if (item === 'Reservation') {
          handleReservationClick();
      } else if (item === 'GoFood') {
          handleGojekClick();
      } else {
          scrollToSection(item.toLowerCase());
      }
  };


  return (
    <div style={{ backgroundColor: colors.white, color: colors.darkGreen }} className="min-h-screen overflow-x-hidden">
      {isLoading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center" style={{ backgroundColor: colors.blue }}>
          <Image src="/images/logo-oshe.png" alt="Loading Oshe Coffee" width={112} height={112} className="h-28 w-auto brightness-0 invert animate-bounce-logo" />
        </div>
      )}

      {!isLoading && (
        <>
          <nav className="fixed top-0 w-full z-50 transition-all duration-300 py-3">
             <div className={`max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out`}>
               <div className={`flex items-center justify-between h-16 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-blue-600 rounded-full shadow-2xl px-6' : 'bg-transparent'}`}
                style={{ backgroundColor: isScrolled ? colors.blue : (isMobileMenuOpen ? colors.blue : 'transparent') }}>
                 <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
                   <Image src="/images/logo-oshe.png" alt="Oshe Coffee" width={48} height={48} className={`h-12 w-auto transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'brightness-0 invert' : ''}`} />
                 </div>
                 <div className="hidden md:flex items-center gap-1">
                   {['Home', 'Story', 'Menu', 'Gallery', 'Contact'].map((item) => (
                     <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`px-4 py-2 text-lg font-medium transition-colors hover:bg-black/10 rounded-lg ${isScrolled ? 'text-white' : 'text-darkGreen'}`}
                      style={{ color: isScrolled ? colors.white : colors.darkGreen }}>
                       {item}
                     </button>
                   ))}
                 </div>
                  <div className="hidden md:flex items-center gap-2">
                     <button onClick={handleReservationClick} className="px-5 py-2 text-lg font-medium bg-white/20 text-white rounded-full transition-all hover:bg-white/30">Reservation</button>
                     <button onClick={handleGojekClick} className="px-5 py-2 text-lg font-medium bg-green-500 text-white rounded-full transition-all hover:bg-green-600">GoFood</button>
                  </div>
                 <button className="md:hidden p-2 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: isScrolled || isMobileMenuOpen ? colors.white : colors.darkGreen }}>
                   {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                 </button>
               </div>
             </div>
             {isMobileMenuOpen && (
               <div className="md:hidden animate-slide-down mt-2 mx-6 rounded-2xl" style={{ backgroundColor: colors.blue }}>
                 <div className="px-6 py-6 space-y-1">
                    {['Home', 'Story', 'Menu', 'Gallery', 'Reservation', 'GoFood', 'Contact'].map((item) => {
                        const isActionItem = item === 'Reservation' || item === 'GoFood';
                        let actionBgColor = '';
                        let textColor = 'text-white';
                        
                        if (item === 'GoFood') {
                            actionBgColor = 'bg-green-500 hover:bg-green-600'; 
                        } else if (item === 'Reservation') {
                            actionBgColor = 'bg-white hover:bg-gray-100';
                            textColor = `text-[${colors.blue}]`;
                        } else {
                            actionBgColor = 'hover:bg-white/10';
                        }

                        return (
                            <button 
                                key={item} 
                                onClick={() => handleMobileMenuItemClick(item)} 
                                className={`block w-full text-left px-4 py-3 text-lg font-medium rounded-lg transition-all 
                                            ${textColor} 
                                            ${isActionItem ? actionBgColor + ' font-bold' : actionBgColor}`}
                            >
                                {item}
                            </button>
                        );
                    })}
                 </div>
               </div>
             )}
           </nav>

          <section id="home" className="min-h-screen flex items-center pt-28 pb-12 lg:pt-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-center lg:text-left animate-fade-in-left">
                  <h1 className="font-finder font-bold text-5xl lg:text-7xl tracking-tight leading-tight mb-6" style={{color: colors.darkGreen}}>
                    O-she you there!
                  </h1>
                  // INI SOLUSINYA
                  <p className="text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0" style={{color: colors.darkGreen}}>
                    We are born to connect people, share stories, and spark ideas. It ain&apos;t just about serving coffee, but creating a warm and creative space to belong.
                  </p>
                  <h3 className="font-finder font-semibold text-xl md:text-2xl tracking-tight" style={{color: colors.darkGreen}}>Come and have an experience!</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-12">
                    <button onClick={() => scrollToSection('menu')} className="flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-lg" style={{ backgroundColor: colors.blue }}>
                      <BookOpen className="w-6 h-6"/>
                      Explore Menu
                    </button>
                    <button onClick={() => scrollToSection('story')} className="flex items-center justify-center gap-3 px-8 py-4 font-bold text-base rounded-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 border-2" style={{ borderColor: colors.darkGreen, color: colors.darkGreen }}>
                       <MessageSquareText className="w-6 h-6"/>
                       Our Story
                    </button>
                  </div>
                </div>
                <div className="relative animate-fade-in-right mt-12 lg:mt-0">
                  <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl">
                    {heroImages.map((image, index) => (
                      <Image key={image.src} src={image.src} alt={image.alt} layout="fill" objectFit="cover" priority={index === 0}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="story" className="relative py-16 px-6" style={{ backgroundColor: colors.gray }}>
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
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                      <source src="/videos/story_oshe_2.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="menu" className="relative py-16 px-6 bg-white">
            <WaveDivider color={colors.gray} />
            <div className="max-w-7xl mx-auto pt-12">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="font-finder text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tighter">
                  Our Menu
                  <span className="block mt-1" style={{ color: colors.blue }}>Highlights</span>
                </h2>
                <p className="text-xl text-gray-600">A glimpse of our finest creations</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuCategories.flatMap(category => category.items).map((item, index) => (
                  <div 
                    key={index} 
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up cursor-pointer" 
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      layout="fill" 
                      objectFit="cover" 
                      className="group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="font-bold text-lg leading-tight tracking-tight font-finder">{item.name}</h3>
                      <p className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-16 animate-fade-in-up">
                <button
                  onClick={handleViewMenuClick}
                  className="flex items-center justify-center gap-3 mx-auto px-8 py-4 text-white font-bold text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ backgroundColor: colors.blue }}
                >
                  <BookOpen className="w-6 h-6"/>
                  View Full Menu
                </button>
              </div>
            </div>
          </section>

          <section id="reservation" className="relative py-24 px-6 overflow-hidden">
             <div className="absolute inset-0 w-full h-full z-0">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover" poster="/images/kursi.jpg">
                  <source src="/videos/reservation_bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/60"></div>
             </div>
             <div className="relative max-w-5xl mx-auto z-10">
                <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in-left text-center lg:text-left">
                      <h2 className="font-finder text-4xl sm:text-5xl font-bold mb-4 tracking-tighter text-white">
                        Book a Table
                        <span className="block mt-1" style={{ color: colors.blue }}>or Order Online</span>
                      </h2>
                      <p className="text-lg text-white/80 mx-auto lg:mx-0 mb-8 leading-relaxed max-w-md">
                        Secure your spot for an unforgettable coffee experience, or get your favorites delivered right to your door.
                      </p>
                    </div>
                    
                    <div className="animate-fade-in-right">
                      <div className="flex flex-col gap-5">
                        <button
                          onClick={handleReservationClick}
                          className="group w-full relative inline-flex items-center justify-center gap-4 px-8 py-5 text-white font-bold text-lg transition-all duration-300 overflow-hidden rounded-xl shadow-2xl animate-button-float"
                          style={{ backgroundColor: colors.blue }}
                        >
                          <span className="absolute w-0 h-full bg-white/20 left-0 top-0 transition-all duration-500 ease-out group-hover:w-full"></span>
                          <Calendar className="relative w-6 h-6"/>
                          <span className="relative">Book Your Table</span>
                          <ArrowRight className="relative w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"/>
                        </button>
                         <button
                            onClick={handleGojekClick}
                            className="group w-full flex items-center justify-center gap-3 px-8 py-5 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
                            style={{ backgroundColor: '#00AA13' }} // Gojek green color
                        >
                            <Bike className="w-6 h-6" />
                            <span className="relative">Order on GoFood</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </section>

          <section id="gallery" className="relative py-16 px-6" style={{ backgroundColor: colors.gray }}>
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
                    <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="relative py-16 px-6 bg-white">
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
                  <h3 className="text-2xl font-bold mb-4 font-finder tracking-tight" style={{ color: colors.darkGreen }}>Find Us Here</h3>
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-gray-300">
                    <iframe
                      src="https://maps.google.com/maps?q=Oshe+Coffee,+Jl.+Cempaka+1+No.16,+Banjarmasin&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Oshe Coffee Location Map"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="relative pt-24 pb-12 px-6" style={{ backgroundColor: colors.darkGreen }}>
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

      {/* --- MENU MODAL POP-UP --- */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsMenuModalOpen(false)}>
          <button className="absolute top-6 right-6 z-[1000] text-white/80 hover:text-white transition-transform hover:scale-125" onClick={() => setIsMenuModalOpen(false)}>
            <X size={40} />
          </button>
          <div className="relative w-[90vw] h-[60vw] max-w-[1200px] max-h-[750px] bg-gray-900 rounded-3xl border-8 border-gray-700 p-4 shadow-2xl animate-zoom-in" onClick={(e) => e.stopPropagation()}>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-16 bg-gray-700 rounded-r-md">
              <div className="absolute top-1/2 -translate-y-1/2 left-1 w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>
            <div className="w-full h-full bg-white rounded-xl overflow-hidden">
              <iframe src="/OsheMenuAGT25.pdf" className="w-full h-full border-0" title="Oshe Coffee Full Menu"></iframe>
            </div>
          </div>
        </div>
      )}
      
      {/* --- PROMO SLIDER MODAL POP-UP --- */}
    {isPromoModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setIsPromoModalOpen(false)}>
            <div className="relative w-[90vw] max-w-sm bg-white rounded-3xl p-4 shadow-2xl animate-zoom-in overflow-hidden" onClick={(e) => e.stopPropagation()}>
                
                <button 
                    className="absolute top-4 right-4 z-20 p-2 rounded-full text-white bg-black/50 hover:bg-black/80 transition-all" 
                    onClick={() => setIsPromoModalOpen(false)}
                >
                    <X size={24} />
                </button>
                
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
                    {promoImages.map((promo, index) => (
                        <div key={index} 
                             className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentPromoIndex ? 'opacity-100' : 'opacity-0'}`}
                             onClick={() => window.open(promo.link, '_blank')}
                        >
                            <Image 
                                src={promo.src} 
                                alt={promo.alt} 
                                layout="fill" 
                                objectFit="cover" 
                                className="cursor-pointer"
                                quality={90}
                            />
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    ))}

                    {promoImages.length > 1 && (
                        <>
                            <button 
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-black/50 hover:bg-black/80 z-10" 
                                onClick={() => setCurrentPromoIndex((prev) => (prev - 1 + promoImages.length) % promoImages.length)}
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-black/50 hover:bg-black/80 z-10" 
                                onClick={() => setCurrentPromoIndex((prev) => (prev + 1) % promoImages.length)}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                        {promoImages.map((_, index) => (
                            <button 
                                key={index} 
                                onClick={() => setCurrentPromoIndex(index)} 
                                className={`w-3 h-3 rounded-full transition-all ${index === currentPromoIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="font-bold text-lg" style={{ color: colors.darkGreen }}>
                        {promoImages[currentPromoIndex].alt}
                    </p>
                    <button 
                        onClick={() => window.open(promoImages[currentPromoIndex].link, '_blank')} 
                        className="mt-2 px-6 py-2 text-white font-medium rounded-full transition-all hover:bg-blue-600"
                        style={{ backgroundColor: colors.blue }}
                    >
                        Lihat Promo!
                    </button>
                </div>
            </div>
        </div>
    )}

      {/* --- (BARU) SINGLE PROMO MODAL POP-UP --- */}
    {isSinglePromoModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setIsSinglePromoModalOpen(false)}>
            <div className="relative w-[90vw] max-w-sm bg-white rounded-[40px] p-4 shadow-2xl animate-zoom-in" onClick={(e) => e.stopPropagation()}>
                
                <button 
                    className="absolute top-4 right-4 z-20 p-2 rounded-full text-white bg-black/50 hover:bg-black/80 transition-all" 
                    onClick={() => setIsSinglePromoModalOpen(false)}
                >
                    <X size={24} />
                </button>
                
                <div className="w-full aspect-square overflow-hidden rounded-3xl cursor-pointer" onClick={() => window.open(singlePromoData.link, '_blank')}>
                    <Image 
                        src={singlePromoData.src} 
                        alt={singlePromoData.alt} 
                        layout="fill" 
                        objectFit="cover"
                        quality={90}
                    />
                </div>

                <div className="text-center mt-4">
                    <p className="font-bold text-lg" style={{ color: colors.darkGreen }}>
                        {singlePromoData.alt}
                    </p>
                    <button 
                        onClick={() => window.open(singlePromoData.link, '_blank')} 
                        className="mt-2 px-6 py-2 text-white font-medium rounded-full transition-all hover:bg-blue-600"
                        style={{ backgroundColor: colors.blue }}
                    >
                        Check It Out!
                    </button>
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

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @keyframes button-float {
            0% { transform: translateY(0px); box-shadow: 0 10px 20px rgba(2, 29, 233, 0.2); }
            50% { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(2, 29, 233, 0.3); }
            100% { transform: translateY(0px); box-shadow: 0 10px 20px rgba(2, 29, 233, 0.2); }
        }
        
        /* Class definitions for animations */
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-fade-in-left { animation: fade-in-left 1s ease-out forwards; opacity: 0; }
        .animate-fade-in-right { animation: fade-in-right 1s ease-out forwards; opacity: 0; }
        .animate-bounce-logo { animation: bounce-logo 1.5s infinite; }
        .animate-pulse-slow { animation: pulse 3s infinite ease-in-out; }
        .animate-button-float { animation: button-float 4s infinite ease-in-out; }

        input:focus, textarea:focus { border-color: ${colors.blue} !important; }
      `}</style>
    </div>
  );
}