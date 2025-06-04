import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, Smartphone, X } from 'lucide-react';

const TypewriterText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  
  return (
    <motion.div className="flex flex-wrap justify-center gap-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.15,
            type: "spring",
            stiffness: 100
          }}
          className="inline-block"
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.div>
  );
};

const DownloadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-primary-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Téléchargez l'app Suñuy Artisan
            </h3>
            <p className="text-white/90">
              Accédez à tous nos services artisanaux directement depuis votre smartphone !
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="space-y-4">
                <a href="#" className="block hover:opacity-90 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Télécharger sur l'App Store"
                    className="h-12"
                  />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.sunuyartisan.app&hl=fr" className="block hover:opacity-90 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Télécharger sur Google Play"
                    className="h-12"
                  />
                </a>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src="/qr.png" 
                    alt="QR Code Suñuy Artisan"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <p className="text-xs font-semibold text-white/90">
                  SCANNEZ LE CODE QR<br />POUR TÉLÉCHARGER L'APP
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const slides = [
    "/slide-3.webp",
    "/slide-5.webp",
    "/slide-4.webp"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url("${slide}")`,
            zIndex: currentSlide === index ? 1 : 0
          }}
        >
         <div className="absolute inset-0 backdrop-blur-sm"></div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary-800 mb-6">
            <TypewriterText text="Des experts fiables à votre porte, pour des interventions sans souci !" />
          </h1>
          <p className="text-xl md:text-2xl text-primary-600 mb-16 max-w-2xl">
          Pour vos réparations, rénovations ou tout autre besoin artisanal, faites confiance à des experts proches<br/> de chez vous.
          </p>

          {/* Nouveau bouton de téléchargement avec effet de pulsation */}
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-primary-400 rounded-full blur-xl"
            />
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r 
                       from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600
                       text-white text-xl font-bold rounded-full shadow-lg 
                       transition-all duration-300 min-w-[280px] group"
            >
              <Smartphone className="w-6 h-6 transition-transform group-hover:rotate-12" />
              Je télécharge Suñuy Artisan
              <Download className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </motion.button>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-primary-500 w-4' : 'bg-primary-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary-500" />
        </motion.div>
      </div>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;