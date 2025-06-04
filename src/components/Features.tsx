import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Store, 
  CreditCard, 
  Truck, 
  MessageSquare, 
  Star,
  Palette
} from 'lucide-react';

const AnimatedTitle = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const title = "Fonctionnalités principales".split('');
  const subtitle = "Suñuy Artisan vous connecte aux artisans locaux avec réservation en ligne, messagerie intégrée et géolocalisation.\nTrouvez, contactez et évaluez facilement des experts près de chez vous.".split(' ');

  return (
    <div ref={ref} className="text-center mb-16">
      <div className="relative inline-block">
        {title.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.03,
              ease: "easeOut"
            }}
            className="inline-block text-3xl md:text-4xl font-bold text-primary-800"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: title.length * 0.03,
            ease: "easeOut"
          }}
          className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-500 origin-left"
        />
      </div>
      
      <div className="mt-4">
        {subtitle.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: (title.length * 0.03) + (i * 0.1),
              ease: "easeOut"
            }}
            className="inline-block text-lg text-primary-600 mx-1"
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
        icon: (
          <img 
            src="/compte-multi-profils.webp"
            alt="Compte multi-profils"
            className="w-full h-auto rounded-xl shadow-md object-cover transform transition duration-300 hover:scale-105"
            
          />
        ),
        title: "Compte multi-profils",
        description: "Permet aux utilisateurs (clients, artisans, administrateurs) de s’inscrire via des formulaires adaptés à leur profil, avec vérification des documents professionnels pour les artisans et authentification sécurisée (SMS OPT)."
    },
    {
      icon: (
        <img
          src="/recherche_avancee_artisans.webp"
          alt="Recherche avancée d’artisans"
          className="w-full h-auto rounded-xl shadow-md object-cover transform transition duration-300 hover:scale-105"
          
        />
      ),
      title: "Recherche avancée d’artisans",
      description: "Filtrez les artisans par métier, localisation, disponibilité, notes et budget. Géolocalisation intégrée et suggestions en temps réel pour des résultats personnalisés et précis."
  },
  {
    icon: (
      <img
        src="/reservation-en-temps-reel.webp"
        alt="Réservation en temps réel"
        className="w-full h-auto rounded-xl shadow-md object-cover transform transition duration-300 hover:scale-105"
        
      />
    ),
    title: "Réservation en temps réel",
    description: "Planifiez un rendez-vous en choisissant un créneau disponible dans le calendrier de l’artisan, avec confirmation immédiate, rappels."
},
{
  icon: (
    <img
      src="/Messagerie-integree.webp"
      alt="Messagerie intégrée"
      className="w-full h-auto rounded-xl shadow-md object-cover transform transition duration-300 hover:scale-105"
      
    />
  ),
  title: "Messagerie intégrée",
  description: "Échangez en direct avec les artisans/clients via un chat sécurisé, partagez des photos ou des documents, et recevez des notifications pour ne manquer aucune discussion."
},
{
  icon: (
    <img
      src="/gestion-de-profil-et-securite.webp"
      alt="Gestion de profil et sécurité"
      className="w-full h-auto rounded-xl shadow-md object-cover transform transition duration-300 hover:scale-105"
      
    />
  ),
  title: "Gestion de profil et sécurité",
  description: "Personnalisez votre profil, consultez vos RDV, activez la 2FA, modifiez votre mot de passe, et gérez vos appareils connectés pour une expérience sécurisée et transparente."
},
{
  icon: (
    <img
      src="/Tableau-de-bord-administrateur.webp"
      alt="Tableau de bord administrateur"
      className="w-full h-auto rounded-xl shadow-md object-cover transform transition duration-300 hover:scale-105"
      
    />
  ),
  title: "Tableau de bord administrateur",
  description: "Surveillez les statistiques (utilisateurs, revenus), modérez les comptes et les avis, gérez les litiges, et envoyez des notifications globales pour un contrôle complet de la plateforme."
},
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedTitle />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-primary-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-primary-500 mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-primary-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;