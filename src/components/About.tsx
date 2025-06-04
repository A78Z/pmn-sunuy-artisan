import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Target } from 'lucide-react';

const AnimatedTitle = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const mainTitle = "SUÑUY ARTISAN".split('');
  const subTitle = "La révolution digitale de l'artisanat sénégalais".split(' ');

  return (
    <div ref={ref} className="text-center mb-16">
      <div className="mb-2">
        {mainTitle.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              ease: "easeOut"
            }}
            className="inline-block text-3xl md:text-4xl font-bold text-primary-800"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
      
      <div className="relative">
        {subTitle.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: mainTitle.length * 0.05 + i * 0.1,
              ease: "easeOut"
            }}
            className="inline-block text-3xl md:text-4xl font-bold text-primary-800 mx-1"
          >
            {word}
          </motion.span>
        ))}
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: (mainTitle.length * 0.05) + (subTitle.length * 0.1),
            ease: "easeOut"
          }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 origin-left"
        />
      </div>
    </div>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                  >
                    <img
                      src="/Bandeau-sunuy-artisan.png"
                      alt="L'appli Sunuy Artisan"
                      className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                    />
                  </motion.div>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-primary-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src="/connectez-vous.webp"
                alt="Connectez-vous"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">
                Connectez-vous
              </h3>
              <p className="text-primary-600">
              Connectez-vous à des artisans qualifiés partout au Sénégal pour vos besoins de réparation.
              Trouvez rapidement des professionnels fiables et compétents pour un service sur mesure et de qualité.
              </p>
            </div>
          </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-primary-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src="/decouvrez.webp"
                alt="Découvrez"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">
              Découvrez
              </h3>
              <p className="text-primary-600">
              Découvrez des artisans qualifiés près de chez vous pour tous vos besoins de réparation.
              Bénéficiez d’un service rapide, fiable et sur mesure, assuré par des experts passionnés de leur métier.
              </p>
            </div>
          </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-primary-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src="/reservation_de_Service.webp"
                alt="Connexion avec des artisans"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">
              Réservation de Service
              </h3>
              <p className="text-primary-600">
              Simplifiez la gestion de vos prestations avec notre service de réservation.
              Planifiez vos rendez-vous en quelques clics et offrez à vos clients une expérience rapide, fluide et professionnelle.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;