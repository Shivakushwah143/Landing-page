import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Truck, Heart, Phone, MapPin, Clock, Instagram, MessageCircle, Sparkles, Menu, X } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <div className="min-h-screen bg-linear-to-b bg-rose-50">
      <Header 
        scrollToSection={scrollToSection} 
        activeSection={activeSection} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <Hero />
      <FeaturedCollections />
      <Collections />
      <WhyChooseUs />
      <InstagramGallery />
      <Contact />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

// Header Component
const Header = ({ scrollToSection, activeSection, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => scrollToSection('home')}
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500" />
            <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-rose-500 to-lavender-500 bg-clip-text text-transparent">
              Crush Premium
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors relative ${activeSection === item.id
                  ? 'text-rose-500'
                  : 'text-gray-600 hover:text-rose-500'
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-rose-400 to-lavender-400"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-linear-to-r from-rose-500 to-lavender-500 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Order on WhatsApp</span>
              <span className="sm:hidden">Order</span>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-rose-500"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md rounded-xl shadow-xl mt-2 mb-4 py-4"
          >
            <div className="flex flex-col space-y-2 px-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium py-3 px-4 rounded-lg transition-all ${activeSection === item.id
                    ? 'bg-linear-to-r from-rose-50 to-lavender-50 text-rose-500'
                    : 'text-gray-600 hover:bg-rose-50 hover:text-rose-500'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <div className="w-2 h-2 bg-linear-to-r from-rose-400 to-lavender-400 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section id="home" className="relative pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-4 opacity-0 animate-fadeIn">
              <span className="inline-block bg-linear-to-r from-rose-100 to-lavender-100 text-rose-600 px-4 py-1 rounded-full text-sm font-semibold">
                New Collection 2024
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fadeInUp animation-delay-200">
              <span className="bg-linear-to-r from-rose-500 via-lavender-500 to-rose-400 bg-clip-text text-transparent">
                Elevate Your
              </span>
              <br />
              <span className="text-gray-800">Style Crush</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl opacity-0 animate-fadeInUp animation-delay-400">
              Discover premium fashion curated for the modern woman. Where luxury meets everyday wear.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fadeInUp animation-delay-600">
              <a
                href="https://wa.me/1234567890?text=Hi! I'd like to browse your collection"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-linear-to-r from-rose-500 to-lavender-500 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center space-x-3 shadow-xl hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Shop via WhatsApp</span>
              </a>

              <button
                onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-rose-300 text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition-colors hover:scale-105"
              >
                View Collections
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 opacity-0 animate-fadeIn animation-delay-800">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>

          <div className="relative opacity-0 animate-fadeInRight">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                alt="Premium Fashion"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-slideUp">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Summer Collection</h3>
                    <p className="text-gray-600 text-sm">Exclusive launch</p>
                  </div>
                  <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    -30%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Collections Component
const FeaturedCollections = () => {
  const collections = [
    {
      name: 'Summer Dresses',
      category: 'Dresses',
      image: 'https://media.istockphoto.com/id/2088218039/photo/young-woman-in-sundress-walks-down-pathway.webp?a=1&b=1&s=612x612&w=0&k=20&c=E2MctQYxdrSqL4hXTzSHkRkpbFbuyYE_f1KZkXFKVtQ='
    },
    {
      name: 'Casual Wear',
      category: 'Everyday',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Party Outfits',
      category: 'Evening',
      image: 'https://plus.unsplash.com/premium_photo-1673481601147-ee95199d3896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZHJlc3N8ZW58MHx8MHx8fDA%3D'
    },
    {
      name: 'Casual Tops',
      category: 'Everyday',
      image: 'https://plus.unsplash.com/premium_photo-1670588892174-857f4ef8ebdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D'
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-rose-500 to-lavender-500 bg-clip-text text-transparent">
              Featured Collections
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked selections for every occasion
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/80 text-sm mb-1">{collection.category}</p>
                  <h3 className="text-white text-xl font-bold">{collection.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Collections Component
const Collections = () => {
  const products = [
    {
      name: 'Floral Summer Dress',
      category: 'Dresses',
      price: '₹2,499',
      image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmxvcmFsJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D'
    },
    {
      name: 'Elegant Maxi Dress',
      category: 'Dresses',
      price: '₹3,299',
      image: 'https://images.unsplash.com/photo-1542295669297-4d352b042bca?q=80&w=1974&auto=format&fit=crop&w=400&h=500&crop=center'
    },
    {
      name: 'Casual Top & Jeans',
      category: 'Casual',
      price: '₹1,999',
      image: 'https://images.unsplash.com/photo-1761891873744-eb181eb1334a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fENhc3VhbCUyMFRvcCUyMCUyNiUyMEplYW5zJ3xlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      name: 'Party Gown',
      category: 'Evening',
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1974&auto=format&fit=crop&w=400&h=500&crop=center'
    },
    {
      name: 'Printed Kurti Set',
      category: 'Ethnic',
      price: '₹2,799',
      image: 'https://images.unsplash.com/photo-1769063382706-8156b3b33eac?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Summer Romper Set',
      category: 'Casual Wear',
      price: '₹2,299',
      image: 'https://images.unsplash.com/photo-1764238385987-ccf1754e899d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3VtbWVyJTIwUm9tcGVyJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D'
    },
     {
      name: 'Silk Scarf Collection',
      category: 'Accessories',
      price: '₹899',
      image: 'https://images.unsplash.com/photo-1566534335938-05f1f2949435?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNjYXJmfGVufDB8fDB8fHww'
    },
    {
      name: 'Elegant Evening Dress',
      category: 'Dresses',
      price: '₹3,499',
      image: 'https://plus.unsplash.com/premium_photo-1669834592356-b5ff164aae8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEVsZWdhbnQlMjBFdmVuaW5nJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D'
    }
  ];

  const handleProductClick = (product) => {
    const message = `Hi! I'm interested in the ${product.name} (${product.category}) priced at ${product.price}. Can you share more details?`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="collections" className="py-16 px-4 bg-linear-to-b from-rose-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-rose-500 to-lavender-500 bg-clip-text text-transparent">
              Premium Collections
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Click any item to order directly on WhatsApp
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <button className="absolute bottom-4 right-4 bg-white text-rose-600 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <p className="text-xs text-rose-500 font-medium mb-1 uppercase tracking-wider">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-rose-600">{product.price}</span>
                  <button className="text-gray-400 hover:text-rose-500 transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Component
const WhyChooseUs = () => {
  const features = [
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Luxury fabrics and expert craftsmanship for lasting elegance',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Shipping',
      description: 'Free express delivery on orders above ₹3,000',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Exclusive Designs',
      description: 'Curated collections from emerging designers',
    }
  ];

  return (
    <section id="why-us" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-rose-500 to-lavender-500 bg-clip-text text-transparent">
              Why Choose Crush Premium?
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury fashion like never before
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group p-6 rounded-3xl hover:bg-linear-to-br from-rose-50 to-lavender-50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-rose-500 to-rose-400 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-360 transition-transform duration-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Instagram Gallery Component
const InstagramGallery = () => {
  const images = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&w=500&h=500&crop=center',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&w=500&h=500&crop=center',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop&w=500&h=500&crop=center',
    'https://images.unsplash.com/photo-1763336016192-c7b62602e993?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RWxlZ2FudCUyMEV2ZW5pbmclMjBEcmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1767687700440-39800f96cf7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENhc3VhbCUyMFRvcHN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1974&auto=format&fit=crop&w=500&h=500&crop=center',
    'https://plus.unsplash.com/premium_photo-1664287731766-abc33298ba46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D',
    'https://plus.unsplash.com/premium_photo-1726930176194-5224898bb7db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8',
    'https://plus.unsplash.com/premium_photo-1675107358238-6c2ac24fb0f6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  return (
    <section id="gallery" className="py-16 px-4 bg-linear-to-b from-rose-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Instagram className="w-8 h-8 text-rose-500" />
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-linear-to-r from-rose-500 to-lavender-500 bg-clip-text text-transparent">
                Style Inspiration
              </span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Follow us for daily fashion inspiration and exclusive offers
          </p>
          <a
            href="https://instagram.com/crushpremium"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-rose-600 font-semibold hover:text-rose-700 transition-colors"
          >
            <span>@crushpremium</span>
            <span className="text-xs bg-rose-100 px-2 py-1 rounded-full">Follow</span>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={src}
                alt={`Fashion inspiration ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-rose-500 to-lavender-500 bg-clip-text text-transparent">
              Visit Our Boutique
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury shopping in person
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-linear-to-br from-rose-50 to-lavender-50 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-linear-to-br from-rose-500 to-rose-400 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                  <a href="tel:+917312345678" className="text-gray-600 hover:text-rose-500 transition-colors">
                    +91 731 1234 5678
                  </a>
                  <p className="text-gray-500 text-sm mt-1">(Also available on WhatsApp)</p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-rose-50 to-lavender-50 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-linear-to-br from-lavender-500 to-lavender-400 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Boutique Address</h3>
                  <p className="text-gray-600">
                    123 Fashion Street, Vijay Nagar<br />
                    Indore, Madhya Pradesh 452010<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-rose-50 to-lavender-50 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-linear-to-br from-fuchsia-500 to-fuchsia-400 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Store Timings</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 10:00 AM - 9:00 PM<br />
                    Sunday: 11:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/9173112345678?text=Hi! I'd like to know more about your premium collection"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-linear-to-r from-rose-500 to-lavender-500 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center space-x-3 shadow-xl hover:scale-102 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="bg-gray-100 rounded-2xl overflow-hidden h-96 lg:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234700.85820778938!2d75.65047054589864!3d22.724204430923267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1706700000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Crush Premium Boutique Location - Indore"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = ({ scrollToSection }) => {
  return (
    <footer className="bg-linear-to-br from-rose-50 via-lavender-50 to-rose-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-rose-500" />
              <span className="text-2xl font-bold bg-linear-to-r from-rose-500 to-lavender-500 bg-clip-text text-transparent">
                Crush Premium
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Luxury fashion redefined. Premium quality, exclusive designs, and exceptional service.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Since 2020</span>
              <MapPin className="w-4 h-4 text-rose-300" />
              <span>Indore, India</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {['home', 'collections', 'why-us', 'gallery', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-gray-600 hover:text-rose-500 transition-colors text-sm capitalize"
                  >
                    {item.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {['Dresses', 'Casual Wear', 'Party Outfits', 'Ethnic Wear', 'Accessories', 'Premium Collection'].map((cat) => (
                <li key={cat} className="hover:text-rose-500 transition-colors cursor-pointer">
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://instagram.com/crushpremium"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-linear-to-br from-rose-500 to-lavender-500 p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/9173112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-linear-to-br from-green-500 to-green-600 p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-500">
              Email: <a href="mailto:hello@crushpremium.com" className="text-rose-500 hover:underline">hello@crushpremium.com</a>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Phone: <a href="tel:+9173112345678" className="text-rose-500 hover:underline">+91 731 1234 5678</a>
            </p>
          </div>
        </div>

        <div className="border-t border-rose-200 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 Crush Premium. All rights reserved. Crafted with <Heart className="w-4 h-4 inline text-rose-400" /> in Indore, India.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Prices are inclusive of all taxes. Free shipping on orders above ₹3,000.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Add custom CSS for animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInRight {
    from { 
      opacity: 0;
      transform: translateX(50px);
    }
    to { 
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(50px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes rotate360 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease forwards;
  }
  
  .animate-fadeInUp {
    animation: fadeInUp 0.8s ease forwards;
  }
  
  .animate-fadeInRight {
    animation: fadeInRight 0.8s ease forwards;
  }
  
  .animate-slideUp {
    animation: slideUp 0.6s ease 0.5s forwards;
  }
  
  .group-hover\\:rotate-360:hover {
    animation: rotate360 0.6s ease;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  
  .animation-delay-400 {
    animation-delay: 0.4s;
  }
  
  .animation-delay-600 {
    animation-delay: 0.6s;
  }
  
  .animation-delay-800 {
    animation-delay: 0.8s;
  }
  
  .hover\\:scale-102:hover {
    transform: scale(1.02);
  }
  
  .transition-600 {
    transition-duration: 0.6s;
  }
  
  .shadow-soft {
    box-shadow: 0 4px 20px rgba(244, 114, 182, 0.1);
  }
`;

const StyleInjector = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return null;
};

// Wrap the App with StyleInjector
const AppWrapper = () => {
  return (
    <>
      <StyleInjector />
      <App />
    </>
  );
};

export default AppWrapper;