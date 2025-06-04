import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PenTool as  Gem, Shirt   as WindowMaximize, X } from 'lucide-react';

const categories = [
  {
    id: 'plumbing',
    name: 'Plomberie',
    image: '/plomberie.webp',
  },
  {
    id: 'mechanic',
    name: 'Mécanique',
    image: '/mechanic.webp',
  },
  {
    id: 'electricity',
    name: 'Électricité',
    image: '/electrician.webp',
  },
  {
    id: 'appliances',
    name: 'Électroménager',
    image: '/electromanager.webp',
  },
  {
    id: 'ac',
    name: 'Climatisation',
    image: '/repairing.webp',
  },
  {
    id: 'carpentry',
    name: 'Menuiserie Bois',
    image: '/woodworker.webp',
  },
  {
    id: 'painting',
    name: 'Peinture',
    image: '/peinture.webp',
  },
  {
    id: 'wallpaper',
    name: 'Tapisserie',
    image: '/canape.webp',
  },
  {
    id: 'hairdressing',
    name: 'Coiffure',
    image: '/coiffure.webp',
  },
  {
    id: 'restaurant',
    name: 'Restauration',
    image: '/restauration.webp',
  },
   {
    id: 'agri-food',
    name: 'Agroalimentaire',
    image: '/agroalimentaire.webp',
  },
  {
    id: 'furnishings',
    name: 'Ameublement',
    image: '/ameublement.webp',
  },
  {
    id: 'furnishings',
    name: 'Panneaux solaires',
    image: '/solaire.webp',
  },
  {
    id: 'masonry',
    name: 'Maçonnerie',
    image: '/maconnerie.webp',
  },
  {
    id: 'leather',
    name: 'Maroquinerie',
    image: '/maroquinerie.webp',
  },
  {
    id: 'sewing',
    name: 'Confection couture',
    image: '/coutrier.webp',
  },
  {
    id: 'jewelry',
    name: 'Bijouterie',
    image: '/bijouterie.webp',
  },
  {
    id: 'laundry',
    name: 'Blanchisserie',
    image: '/blanchisserie.webp',
  },
  {
    id: 'transport',
    name: 'Transport',
    image: '/transport-1.webp',
  },
  {
    id: 'shoemaking',
    name: 'Cordonnerie',
    image: '/coordonnerie.webp',
  },
  {
    id: 'locksmith',
    name: 'Serrurerie',
    image: '/serrurerie.webp',
  },
  {
    id: 'tiling',
    name: 'Carrelage',
    image: '/carrelage.webp',
  },
  {
    id: 'metal-work',
    name: 'Menuiserie métallique',
    image: '/menuiserie-metallique.webp',
  },
  {
    id: 'aluminum-work',
    name: 'Menuiserie aluminium',
    image: '/menuiserie-aluminium.webp',
  }
];

const DownloadModal = ({ isOpen, onClose, categoryName }: { isOpen: boolean; onClose: () => void; categoryName: string }) => (
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
            Téléchargez l'app Suñuy Artisan<br/> - {categoryName}
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

const AnimatedTitle = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const words = "Nos Catégories de Services".split(" ");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4 relative">
        <span className="inline-block relative">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mx-1"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            >
              {word}
            </motion.span>
          ))}
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: words.length * 0.2,
              ease: "easeOut"
            }}
          />
        </span>
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: (words.length * 0.2) + 0.2
        }}
        className="text-xl text-primary-600"
      >
        Découvrez dans l'application Suñuy Artisan plusieurs catégories de services artisanaux,<br/> réalisés par 
        des professionnels de confiance, qualifiés pour toutes vos interventions à domicile.
      </motion.p>
    </motion.div>
  );
};

const Categories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedTitle />

        <div 
          ref={ref} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 
                           group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <div className={`p-3 rounded-full bg-gradient-to-r $
                                 shadow-lg mb-3 transform transition-transform duration-300 
                                 group-hover:scale-110`}>
                    
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: '30%' } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-1 bg-white rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        categoryName={selectedCategory}
      />
    </section>
  );
};

export default Categories;