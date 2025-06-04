import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EULA from './EULA';

const AnimatedFooterTitle = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.h3
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-lg font-semibold mb-4 relative inline-block"
    >
      {children}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 origin-left"
      />
    </motion.h3>
  );
};

const AnimatedLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
  <motion.a
    href={href}
    className={`relative inline-block text-primary-200 hover:text-white transition-colors duration-300 ${className}`}
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <span className="relative">
      {children}
      <motion.span
        className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </span>
  </motion.a>
);

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    className="text-primary-200 hover:text-white transition-colors"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.a>
);

const ScrollToTopLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.a
      href={to}
      onClick={handleClick}
      className="relative inline-block text-primary-200 hover:text-white transition-colors duration-300"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className="relative">
        {children}
        <motion.span
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary-500"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </span>
    </motion.a>
  );
};

const AnimatedWebsiteLink = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 bg-primary-200 rounded-lg blur-md -z-10"
      />
      <a
        href="https://pmn.sn"
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-lg transition-all duration-300 group-hover:transform group-hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-semibold text-white mb-2"
            >
              Visitez notre site internet
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-primary-200 font-medium"
            >
              Projet du Mobilier National
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-primary-200 group-hover:text-white transition-colors duration-300"
          >
            <ExternalLink className="w-6 h-6" />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-0.5 bg-gradient-to-r from-primary-400 to-primary-200 transform origin-left"
        />
      </a>
    </motion.div>
  );
};

const AnimatedCopyright = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const text = "© 2025 Ministère du Tourisme et de l'Artisanat | Projet du Mobilier National | Suñuy Artisan";
  const words = text.split('|');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="pt-6 text-center text-primary-200"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent mb-6"
      />
      
      <div className="flex flex-wrap justify-center items-center gap-2">
        {words.map((part, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            className="inline-block"
          >
            {index === words.length - 1 ? (
              <>
                <motion.span
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="font-semibold text-primary-300"
                >
                  {part.trim()}
                </motion.span>
              </>
            ) : (
              <>{part.trim()} |</>
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isEulaOpen, setIsEulaOpen] = useState(false);

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <footer className="bg-primary-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerVariants}
          custom={0}
          className="flex justify-center items-center gap-12 mb-12 pb-8 border-b border-primary-700"
        >
          <div className="w-48 h-auto">
            <img 
              src="/NDT_blanc.png" 
              alt="Logo Sénégal 50" 
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="w-48 h-auto">
            <img 
              src="/senegal-2050.png" 
              alt="Logo Sénégal 50" 
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerVariants}
          custom={1}
          className="mb-8 border-b border-primary-700 pb-8"
        >
          <AnimatedFooterTitle>L'Artisanat au Sénégal</AnimatedFooterTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-primary-200 leading-relaxed">
                L'artisanat sénégalais, riche de plusieurs siècles de tradition, représente un pilier essentiel de l'économie 
                et de la culture du pays. Ce secteur emploie plus de 400 000 artisans à travers le pays, contribuant 
                significativement au PIB national et à la préservation du patrimoine culturel.
              </p>
              <p className="text-primary-200 leading-relaxed mt-4">
                Les artisans sénégalais excellent dans diverses disciplines : la sculpture sur bois, la maroquinerie, 
                la bijouterie, la poterie, le tissage, et la teinture. Chaque région du pays possède ses spécialités 
                artisanales uniques, reflétant la diversité culturelle du Sénégal.
              </p>
            </div>
            <div>
              <p className="text-primary-200 leading-relaxed">
                Malgré son importance, le secteur fait face à plusieurs défis : l'accès limité aux marchés internationaux, 
                le manque de digitalisation, et la difficulté à valoriser justement le travail artisanal. C'est dans ce 
                contexte que Suñuy Artisan s'engage à créer des ponts entre les artisans et le marché national.
              </p>
              <p className="text-primary-200 leading-relaxed mt-4">
                Notre plateforme préserve les savoir-faire ancestraux en les adaptant au commerce moderne, permettant aux 
                artisans de vivre dignement de leur art tout en perpétuant leurs traditions. <strong>Réparations, rénovations ou autres
                prestations</strong> : l'appli allie rapidité, fiabilité et expertise locale pour valoriser l'artisanat de proximité.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-40 h-40 rounded-full overflow-hidden bg-white p-2"
            >
              <img 
                src="/tourisme.png"
                alt="Suñuy Artisan Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-40 h-40 rounded-full overflow-hidden bg-white p-2"
            >
              <img 
                src="/logo-pmn.png"
                alt="Projet Mobilier National Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-40 h-40 rounded-full overflow-hidden bg-white p-2"
            >
              <img 
                src="/logo-sunuy-art.png"  
                alt="Ministère du Tourisme et de l'Artisanat Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerVariants}
            custom={2}
            className="space-y-4"
          >
            <div className="flex items-center">
              <motion.img 
                whileHover={{ scale: 2.05 }}
                src="/logo-sunuy-2050.png"
                alt="Suñuy Artisan" 
                className="h-24 w-24 object-cover object-center -mb-4"
              />
            </div>
            <p className="text-primary-200">
              Grâce à l'appli Suñuy Artisan, nous digitalisons l'artisanat, boostons sa compétitivité et valorisons notre riche patrimoine culturel.
            </p>
            <AnimatedWebsiteLink />
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerVariants}
            custom={3}
          >
            <AnimatedFooterTitle>Contact</AnimatedFooterTitle>
            <div className="space-y-2">
              <AnimatedLink href="mailto:contact@sunuyartisan.com" className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                info.sunuyartisan@pmn.sn
              </AnimatedLink>
              <AnimatedLink href="tel:+221123456789" className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                +221 76 624 85 05
              </AnimatedLink>
              <div className="flex items-center text-primary-200">
                <MapPin className="w-5 h-5 mr-2" />
                Diamniadio cité Senegindia Villa 009-TYPE A
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerVariants}
            custom={4}
          >
            <AnimatedFooterTitle>Liens Utiles</AnimatedFooterTitle>
            <ul className="space-y-2">
              <li>
                <ScrollToTopLink to="/legal">
                  CGU et EULA de l'Application Suñuy Artisan
                </ScrollToTopLink>
              </li>
              <li>
                <AnimatedLink href="#about">Suñuy Artisan</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#features">Fonctionnalités</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#solution">Avantages</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#PublicProcurement">Commande Publique</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#AnnouncementBanner">Concours National de Reproduction de Prototypes</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#Contact">Contact</AnimatedLink>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerVariants}
            custom={5}
            className="space-y-6"
          >
            <div>
              <AnimatedFooterTitle>Suivez-nous</AnimatedFooterTitle>
              <div className="flex space-x-4">
                <SocialIcon href="https://web.facebook.com/profile.php?viewas=100000686899395&id=61559819632773">
                  <Facebook className="w-6 h-6" />
                </SocialIcon>
                <SocialIcon href="https://x.com/MobilierProjet">
                  <Twitter className="w-6 h-6" />
                </SocialIcon>
                <SocialIcon href="#">
                  <Instagram className="w-6 h-6" />
                </SocialIcon>
                <SocialIcon href="https://www.linkedin.com/company/projet-mobilier-national/?viewAsMember=trueclearn">
                  <Linkedin className="w-6 h-6" />
                </SocialIcon>
                <SocialIcon href="https://whatsapp.com/channel/0029VaxEu5UKgsNz7tJ3MU3k">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-6 h-6"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                  </svg>
                </SocialIcon>
              </div>
            </div>
            <div>
              <p className="text-primary-200 text-sm mb-4">
                Téléchargez Suñuy Artisan dès aujourd'hui sur l'App Store et Google Play, ou scannez le QR code pour un accès rapide à l'application !
              </p>
              <div className="flex items-center space-x-8">
                <div className="flex flex-col space-y-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                      alt="Télécharger sur l'App Store" 
                      className="h-10"
                    />
                  </motion.a>
                  <motion.a
                    href="https://play.google.com/store/apps/details?id=com.sunuyartisan.app&hl=fr"
                    whileHover={{ scale: 1.05 }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                      alt="Télécharger sur Google Play" 
                      className="h-10"
                    />
                  </motion.a>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="h-[84px] flex items-center bg-white p-2 rounded-lg"
                  >
                    <img 
                      src="/qr.png" 
                      alt="QR Code Suñuy Artisan" 
                      className="h-full w-auto object-contain"
                    />
                  </motion.div>
                  <p className="text-xs font-semibold text-primary-200">
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatedCopyright />
      </div>
      
      <EULA isOpen={isEulaOpen} onClose={() => setIsEulaOpen(false)} />
    </footer>
  );
};

export default Footer;