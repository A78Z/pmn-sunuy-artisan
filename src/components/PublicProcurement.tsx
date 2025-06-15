import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Phone, MapPin, Building, FileCheck, Award, History, Mail, ArrowLeft, Calendar, Clock, Upload, X, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarketProposal {
  title: string;
  description: string;
  budget: string;
  startDate: string;
  duration: string;
  type: string;
  attachment: File | null;
}

interface Artisan {
  id: string;
  name: string;
  profession: string;
  region: string;
  department: string;
  commune: string;
  address: string;
  phone: string;
  company: string;
  cardNumber: string;
  approvalNumber: string;
  publicMarkets: string[];
  rating: number;
  image: string;
}

interface ApprovalRequest {
  fullName: string;
  phone: string;
  email: string;
  profession: string;
  experience: string;
  address: string;
  documents: {
    cni: File | null;
    ninea: File | null;
    residence: File | null;
    training: File | null;
    photos: File[];
  };
  termsAccepted: boolean;
}

const mockArtisans: Artisan[] = [
  {
    id: '1',
    name: 'Mamadou Diallo',
    profession: 'Menuisier Bois',
    region: 'Dakar',
    department: 'Dakar',
    commune: 'Médina',
    address: '123 Rue de la Médina',
    phone: '+221 77 123 45 67',
    company: 'Diallo & Fils Menuiserie',
    cardNumber: 'CART-2024-001',
    approvalNumber: 'AGR-2024-001',
    publicMarkets: [
      'Rénovation mobilier école primaire Médina (2023)',
      'Fourniture mobilier mairie de Dakar (2022)'
    ],
    rating: 4.8,
    image: '/menuisier.webp'
  },
  {
    id: '2',
    name: 'Fatou Sow',
    profession: 'Maçon',
    region: 'Thiès',
    department: 'Thiès',
    commune: 'Thiès Nord',
    address: '45 Avenue du Travail',
    phone: '+221 77 234 56 78',
    company: 'Entreprise Sow Construction',
    cardNumber: 'CART-2024-002',
    approvalNumber: 'AGR-2024-002',
    publicMarkets: [
      'Construction centre de santé Thiès (2023)',
      'Rénovation école publique (2022)'
    ],
    rating: 4.5,
    image: '/masson.webp'
  },
  {
    id: '3',
    name: 'Omar Ndiaye',
    profession: 'Plombier',
    region: 'Saint-Louis',
    department: 'Saint-Louis',
    commune: 'Saint-Louis',
    address: '78 Rue Blanchot',
    phone: '+221 77 345 67 89',
    company: 'Ndiaye Plomberie Services',
    cardNumber: 'CART-2024-003',
    approvalNumber: 'AGR-2024-003',
    publicMarkets: [
      'Installation sanitaire hôpital régional (2023)',
      'Rénovation réseau eau lycée (2022)'
    ],
    rating: 4.7,
    image: '/plombier.webp'
  },
  {
    "id": "4",
    "name": "Ibrahima Ba",
    "profession": "Électricien",
    "region": "Louga",
    "department": "Kébémer",
    "commune": "Darou Mousty",
    "address": "Quartier Poste",
    "phone": "+221 70 333 22 11",
    "company": "Élec-Ba Services",
    "cardNumber": "CART-2024-004",
    "approvalNumber": "AGR-2024-004",
    "publicMarkets": [
      "Électrification poste de santé (2023)",
      "Maintenance réseau mairie locale (2022)"
    ],
    rating: 4.3,
    image: '/electricien.webp'
  }
  ,
  {
    "id": "5",
    "name": "Fatou Diop",
    "profession": "Carreleur",
    "region": "Dakar",
    "department": "Pikine",
    "commune": "Guédiawaye",
    "address": "Rue 12, Unité 6",
    "phone": "+221 77 654 32 10",
    "company": "Carrelage Pro Sénégal",
    "cardNumber": "CART-2024-005",
    "approvalNumber": "AGR-2024-005",
    "publicMarkets": [
      "Pose carrelage Cité Gorgui (2023)",
      "Revêtement sol Hôpital Dalal Jamm (2022)"
    ],
    rating: 4.8,
    image: '/carreleur.webp'
  }
  ,
  {
    "id": "6",
    "name": "Moussa Fall",
    "profession": "Peintre",
    "region": "Thiès",
    "department": "Thiès",
    "commune": "Thiès-Nord",
    "address": "Quartier Diakhao, Rue 4",
    "phone": "+221 76 123 45 67",
    "company": "Fall Déco & Peinture",
    "cardNumber": "CART-2024-006",
    "approvalNumber": "AGR-2024-006",
    "publicMarkets": [
      "Peinture Hôtel Résidence Niakh Niakhal (2023)",
      "Finitions murales École Sainte-Thérèse (2021)"
    ],
    rating: 4.9,
    image: '/peintre.webp'
  },
  {
    "id": "7",
    "name": "Salif Sarr",
    "profession": "Mécanicien",
    "region": "Kaolack",
    "department": "Kaolack",
    "commune": "Ndorong",
    "address": "Garage Ndéyène",
    "phone": "+221 78 987 65 43",
    "company": "Garage Sarr Auto",
    "cardNumber": "CART-2024-007",
    "approvalNumber": "AGR-2024-007",
    "publicMarkets": [
      "Réparation flotte véhicules municipaux (2023)",
      "Entretien engins BTP Senelec (2022)"
    ],
    rating: 4.8,
    image: '/mecanique.webp'
  }
  ,
  {
    "id": "8",
    "name": "Cheikh Mboup",
    "profession": "Climatisation",
    "region": "Dakar",
    "department": "Dakar",
    "commune": "Parcelles Assainies",
    "address": "Unité 22, Villa 45",
    "phone": "+221 77 221 34 56",
    "company": "Mboup Froid Services",
    "cardNumber": "CART-2024-008",
    "approvalNumber": "AGR-2024-008",
    "publicMarkets": [
      "Installation climatisation immeuble BCEAO (2023)",
      "Entretien central de froid Université Cheikh Anta Diop (2022)"
    ],
    rating: 4.8,
    image: '/climatisation.webp'
  }
  ,
  {
    "id": "9",
    "name": "Mame Diarra Sy",
    "profession": "Tapisserie",
    "region": "Thiès",
    "department": "Mbour",
    "commune": "Saly",
    "address": "Route de Saly, Quartier Tapée",
    "phone": "+221 76 998 12 34",
    "company": "Atelier Sy Déco",
    "cardNumber": "CART-2024-009",
    "approvalNumber": "AGR-2024-009",
    "publicMarkets": [
      "Rénovation de fauteuils Hôtel Lamantin Beach (2023)",
      "Confection rideaux et tentures mairie de Mbour (2022)"
    ],
    rating: 4.6,
    image: '/tapisserie.webp'
  }
  ,
  {
    "id": "10",
    "name": "Abdoulaye Kane",
    "profession": "Électroménager",
    "region": "Ziguinchor",
    "department": "Ziguinchor",
    "commune": "Ziguinchor",
    "address": "Avenue Senghor, Quartier Lyndiane",
    "phone": "+221 78 654 78 90",
    "company": "Kane Réparations Électro",
    "cardNumber": "CART-2024-010",
    "approvalNumber": "AGR-2024-010",
    "publicMarkets": [
      "Réhabilitation appareils CHR de Ziguinchor (2023)",
      "Maintenance équipements électroménagers ENDA (2022)"
    ],
    rating: 4.5,
    image: '/electromenager.webp'
  }
  ,
  {
    "id": "11",
    "name": "Awa Ndiaye",
    "profession": "Restauration",
    "region": "Fatick",
    "department": "Foundiougne",
    "commune": "Fatick",
    "address": "Marché central, Rue des saveurs",
    "phone": "+221 77 123 89 00",
    "company": "Chez Awa Traiteur",
    "cardNumber": "CART-2024-011",
    "approvalNumber": "AGR-2024-011",
    "publicMarkets": [
      "Catering forum régional du développement (2023)",
      "Restauration scolaire commune de Fatick (2022)"
    ],
    rating: 4.7,
    image: '/restauration2.webp'
  }
  ,
  {
    "id": "12",
    "name": "El Hadji Sow",
    "profession": "Agroalimentaire",
    "region": "Kolda",
    "department": "Vélingara",
    "commune": "Vélingara",
    "address": "Quartier Médina, Rue du Marché",
    "phone": "+221 76 345 67 21",
    "company": "Sow Transformation Agro",
    "cardNumber": "CART-2024-012",
    "approvalNumber": "AGR-2024-012",
    "publicMarkets": [
      "Production jus de fruits locaux pour PNDL (2023)",
      "Fourniture produits transformés cantines scolaires (2022)"
    ],
    rating: 4.2,
    image: '/agroalimentaire22.webp'
  }
  ,
  {
    "id": "13",
    "name": "Modou Gaye",
    "profession": "Ameublement",
    "region": "Kaolack",
    "department": "Guinguinéo",
    "commune": "Guinguinéo",
    "address": "Route du Lycée, Quartier Diamaguène",
    "phone": "+221 77 556 34 78",
    "company": "Gaye Mobilier & Design",
    "cardNumber": "CART-2024-013",
    "approvalNumber": "AGR-2024-013",
    "publicMarkets": [
      "Fourniture bureaux mairie de Guinguinéo (2023)",
      "Confection tables et bancs écoles rurales (2022)"
    ],
    rating: 4.1,
    image: '/ameublement23.webp'
  }
  ,
  {
    "id": "14",
    "name": "Sokhna Fall",
    "profession": "Confection couture",
    "region": "Diourbel",
    "department": "Mbacké",
    "commune": "Touba",
    "address": "Quartier Darou Khoudoss, Rue des tailleurs",
    "phone": "+221 78 223 45 67",
    "company": "Atelier Sokhna Couture",
    "cardNumber": "CART-2024-014",
    "approvalNumber": "AGR-2024-014",
    "publicMarkets": [
      "Tenues scolaires pour établissements publics (2023)",
      "Uniformes pour groupements de femmes (2022)"
    ],
    rating: 4.9,
    image: '/confection-couture.webp'
  }
  ,
  {
    "id": "15",
    "name": "Ibrahima Diallo",
    "profession": "Maroquinerie",
    "region": "Tambacounda",
    "department": "Tambacounda",
    "commune": "Tambacounda",
    "address": "Rue des Artisans, Zone artisanale",
    "phone": "+221 76 789 00 12",
    "company": "Diallo Cuir & Création",
    "cardNumber": "CART-2024-015",
    "approvalNumber": "AGR-2024-015",
    "publicMarkets": [
      "Fourniture de sacs en cuir pour ministère de la Culture (2023)",
      "Fabrication articles promotionnels en cuir (2022)"
    ],
    rating: 4.6,
    image: '/maroquinerie12.webp'
  }
  ,
  {
    "id": "16",
    "name": "Ndeye Coumba Faye",
    "profession": "Blanchisserie",
    "region": "Saint-Louis",
    "department": "Dagana",
    "commune": "Richard-Toll",
    "address": "Rue du Marché, Quartier Escale",
    "phone": "+221 77 301 22 33",
    "company": "Faye Pressing & Services",
    "cardNumber": "CART-2024-016",
    "approvalNumber": "AGR-2024-016",
    "publicMarkets": [
      "Blanchissage linge hôpital Richard-Toll (2023)",
      "Service entretien textile centre administratif (2022)"
    ],
    rating: 4.1,
    image: '/blanchisserie14.webp'
  }
  ,
  {
    "id": "17",
    "name": "Pape Moussa Diouf",
    "profession": "Cordonnerie",
    "region": "Kaffrine",
    "department": "Kaffrine",
    "commune": "Kaffrine",
    "address": "Quartier Liberté, Allée des Artisans",
    "phone": "+221 76 445 67 89",
    "company": "Diouf Cuir & Réparations",
    "cardNumber": "CART-2024-017",
    "approvalNumber": "AGR-2024-017",
    "publicMarkets": [
      "Réparation de chaussures forces de sécurité (2023)",
      "Fabrication sandales artisanales pour ONG locale (2022)"
    ],
    rating: 4.2,
    image: '/cordonnerie15.webp'
  }
  ,
  {
    "id": "18",
    "name": "Aliou Ndoye",
    "profession": "Menuiserie métallique",
    "region": "Matam",
    "department": "Matam",
    "commune": "Matam",
    "address": "Zone Industrielle, Rue des Soudeurs",
    "phone": "+221 77 889 45 67",
    "company": "Ndoye Métal Services",
    "cardNumber": "CART-2024-018",
    "approvalNumber": "AGR-2024-018",
    "publicMarkets": [
      "Fabrication de grilles et portails mairie de Matam (2023)",
      "Construction de charpentes métalliques lycée régional (2022)"
    ],
    rating: 4.6,
    image: '/menuiserie-metallique6.webp'
  }
  ,
  {
    "id": "19",
    "name": " Alpha Bodiane",
    "profession": "Menuiserie aluminium",
    "region": "Sédhiou",
    "department": "Bounkiling",
    "commune": "Bounkiling",
    "address": "Rue de la Mairie, Quartier Ndiang",
    "phone": "+221 78 234 56 78",
    "company": "Alu-Tech Alpha",
    "cardNumber": "CART-2024-019",
    "approvalNumber": "AGR-2024-019",
    "publicMarkets": [
      "Pose de fenêtres alu centre de santé de Bounkiling (2023)",
      "Fourniture portes vitrées mairie de Sédhiou (2022)"
    ],
    rating: 4.5,
    image: '/menuiserie-aluminium7.webp'
  },
  {
    "id": "20",
    "name": "Mamadou Camara",
    "profession": "Bijouterie",
    "region": "Ziguinchor",
    "department": "Oussouye",
    "commune": "Cap Skirring",
    "address": "Rue du Port, Quartier artisanal",
    "phone": "+221 77 998 76 54",
    "company": "Camara Or & Argent",
    "cardNumber": "CART-2024-020",
    "approvalNumber": "AGR-2024-020",
    "publicMarkets": [
      "Confection de bijoux traditionnels pour festivals culturels (2023)",
      "Fourniture médailles artisanales pour associations locales (2022)"
    ],
    rating: 4.5,
    image: '/bijouterie18.webp'
  }
  ,
  {
    "id": "20",
    "name": "Aissatou Mbaye",
    "profession": "Boulangerie – Pâtisserie",
    "region": "Dakar",
    "department": "Rufisque",
    "commune": "Bargny",
    "address": "Route Nationale, Quartier Tann",
    "phone": "+221 76 456 78 90",
    "company": "Délices d’Aissatou",
    "cardNumber": "CART-2024-019",
    "approvalNumber": "AGR-2024-019",
    "publicMarkets": [
      "Fourniture de pain aux écoles publiques de Bargny (2023)",
      "Service traiteur événementiel mairie de Rufisque (2022)"
    ],
    rating: 4.5,
    image: '/boulangerie–pattisserie.webp'
  }
];

const professions = [
  'Tous',
  'Menuisier Bois',
  'Maçon',
  'Plombier',
  'Électricien',
  'Carreleur',
  'Peintre',
  'Mécanicien',
  'Climatisation',
  'Tapisserie',
  'Électroménager',
  'Restauration',
  'Agroalimentaire',
  'Ameublement',
  'Confection couture',
  'Maroquinerie',
  'Blanchisserie',
  'Cordonnerie',
  'Menuiserie métallique',
  'Menuiserie aluminium',
  'Bijouterie',
  'Boulangerie – Pâtisserie'
];

const marketTypes = [
  'Fourniture',
  'Travaux',
  'Service'
];

const MarketProposalModal = ({ artisan, isOpen, onClose }: { artisan: Artisan; isOpen: boolean; onClose: () => void }) => {
  const [proposal, setProposal] = useState<MarketProposal>({
    title: '',
    description: '',
    budget: '',
    startDate: '',
    duration: '',
    type: marketTypes[0],
    attachment: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Proposal submitted:', proposal);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProposal({ ...proposal, attachment: e.target.files[0] });
    }
  };



  return (

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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary-800">
                  Proposer un marché à {artisan.name}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Intitulé du marché
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={proposal.title}
                    onChange={e => setProposal({ ...proposal, title: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description du marché
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={proposal.description}
                    onChange={e => setProposal({ ...proposal, description: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget estimé (FCFA)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="budget"
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={proposal.budget}
                      onChange={e => setProposal({ ...proposal, budget: e.target.value })}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      FCFA
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Date de début souhaitée
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="startDate"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        value={proposal.startDate}
                        onChange={e => setProposal({ ...proposal, startDate: e.target.value })}
                      />
                      <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Durée estimée (en jours)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="duration"
                        required
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        value={proposal.duration}
                        onChange={e => setProposal({ ...proposal, duration: e.target.value })}
                      />
                      <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type de marché
                  </label>
                  <select
                    id="type"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={proposal.type}
                    onChange={e => setProposal({ ...proposal, type: e.target.value })}
                  >
                    {marketTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                    Pièce jointe (PDF ou image)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="attachment"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="attachment"
                      className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-2">
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">
                          {proposal.attachment ? proposal.attachment.name : 'Choisir un fichier'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Envoyer la proposition
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  );
};

const ArtisanCard = ({ artisan, onClick }: { artisan: Artisan; onClick: () => void }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative h-64">
      <img
        src={artisan.image}
        alt={artisan.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute top-0 right-0 transform rotate-45 translate-x-8 -translate-y-2 bg-green-500 text-white py-1 px-12">
        <span className="text-sm font-semibold">Agréé</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-semibold">{artisan.name}</h3>
        <p className="text-sm opacity-90">{artisan.profession}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(artisan.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
            />
          ))}
          <span className="ml-2 text-sm">{artisan.rating}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const ArtisanModal = ({ artisan, onClose }: { artisan: Artisan; onClose: () => void }) => {
  const [showProposalModal, setShowProposalModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative h-48">
            <img
              src={artisan.image}
              alt={artisan.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-4 right-4">
              <button
                onClick={onClose}
                className="p-2 bg-white/10 rounded-full backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{artisan.name}</h2>
                <p className="text-lg text-gray-600">{artisan.profession}</p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(artisan.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold">{artisan.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Localisation</p>
                    <p className="text-gray-900">{artisan.region}, {artisan.department}</p>
                    <p className="text-gray-900">{artisan.commune}</p>
                    <p className="text-gray-600">{artisan.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="text-gray-900">{artisan.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Entreprise</p>
                    <p className="text-gray-900">{artisan.company}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Carte professionnelle</p>
                    <p className="text-gray-900">{artisan.cardNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Numéro d'agrément</p>
                    <p className="text-gray-900">{artisan.approvalNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <History className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Marchés publics</p>
                    <ul className="list-disc list-inside text-gray-900">
                      {artisan.publicMarkets.map((market, index) => (
                        <li key={index}>{market}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => setShowProposalModal(true)}
                className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Proposer un marché
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <MarketProposalModal
        artisan={artisan}
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
      />
    </>
  );
};

const ApprovalRequestModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [request, setRequest] = useState<ApprovalRequest>({
    fullName: '',
    phone: '',
    email: '',
    profession: '',
    experience: '',
    address: '',
    documents: {
      cni: null,
      ninea: null,
      residence: null,
      training: null,
      photos: []
    },
    termsAccepted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Approval request submitted:', request);
    onClose();
  };

  const handleFileChange = (field: keyof ApprovalRequest['documents'], e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (field === 'photos') {
        setRequest(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            [field]: Array.from(e.target.files || [])
          }
        }));
      } else {
        setRequest(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            [field]: e.target.files![0]
          }
        }));
      }
    }
  };

  return (
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary-800">
                  Demande d'agrément à la commande publique
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={request.fullName}
                    onChange={e => setRequest({ ...request, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    pattern="[0-9]{9}"
                    placeholder="77 123 45 67"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={request.phone}
                    onChange={e => setRequest({ ...request, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={request.email}
                    onChange={e => setRequest({ ...request, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                    Activité professionnelle
                  </label>
                  <select
                    id="profession"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={request.profession}
                    onChange={e => setRequest({ ...request, profession: e.target.value })}
                  >
                    <option value="">Sélectionnez votre métier</option>
                    {professions.filter(p => p !== 'Tous').map(profession => (
                      <option key={profession} value={profession}>{profession}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre d'années d'expérience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={request.experience}
                    onChange={e => setRequest({ ...request, experience: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse complète
                  </label>
                  <textarea
                    id="address"
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={request.address}
                    onChange={e => setRequest({ ...request, address: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Pièces justificatives</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cni" className="block text-sm font-medium text-gray-700 mb-1">
                        Copie CNI
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="cni"
                          required
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={e => handleFileChange('cni', e)}
                        />
                        <label
                          htmlFor="cni"
                          className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-2">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">
                              {request.documents.cni ? request.documents.cni.name : 'Choisir un fichier'}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ninea" className="block text-sm font-medium text-gray-700 mb-1">
                        NINEA
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="ninea"
                          required
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={e => handleFileChange('ninea', e)}
                        />
                        <label
                          htmlFor="ninea"
                          className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-2">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">
                              {request.documents.ninea ? request.documents.ninea.name : 'Choisir un fichier'}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="residence" className="block text-sm font-medium text-gray-700 mb-1">
                        Justificatif de résidence
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="residence"
                          required
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={e => handleFileChange('residence', e)}
                        />
                        <label
                          htmlFor="residence"
                          className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-2">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">
                              {request.documents.residence ? request.documents.residence.name : 'Choisir un fichier'}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="training" className="block text-sm font-medium text-gray-700 mb-1">
                        Attestation de formation
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="training"
                          required
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={e => handleFileChange('training', e)}
                        />
                        <label
                          htmlFor="training"
                          className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-2">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">
                              {request.documents.training ? request.documents.training.name : 'Choisir un fichier'}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
                      Photos de réalisations
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="photos"
                        required
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleFileChange('photos', e)}
                      />
                      <label
                        htmlFor="photos"
                        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-2">
                          <Camera className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">
                            {request.documents.photos.length > 0
                              ? `${request.documents.photos.length} photo(s) sélectionnée(s)`
                              : 'Ajouter des photos'}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={request.termsAccepted}
                    onChange={e => setRequest({ ...request, termsAccepted: e.target.checked })}
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    Je certifie que les informations fournies sont exactes
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Soumettre la demande
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InfoBlock = () => {
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 mt-12">
        <h3 className="text-2xl font-bold text-primary-800 mb-6">Comment accéder à la commande publique ?</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-primary-700 mb-4">Conditions d'accès</h4>
            <ul className="space-y-2 text-primary-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Être un artisan professionnel enregistré
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Avoir au moins 3 ans d'expérience
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Disposer d'un atelier fixe
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Être à jour de ses obligations fiscales
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary-700 mb-4">Documents requis</h4>
            <ul className="space-y-2 text-primary-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Copie de la CNI
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                NINEA
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Justificatif de résidence
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Attestation de formation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Photos de réalisations
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowApprovalModal(true)}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <FileCheck className="w-5 h-5" />
            Déposer une demande d'agrément
          </button>
        </div>
      </div>

      <ApprovalRequestModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
      />
    </>
  );
};

const PublicProcurement = () => {
  const [selectedProfession, setSelectedProfession] = useState('Tous');
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);

  const filteredArtisans = selectedProfession === 'Tous'
    ? mockArtisans
    : mockArtisans.filter(artisan => artisan.profession === selectedProfession);

  return (
    <div id="commande-publique" className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-primary-800 mb-2">Commande Publique</h1>
        <p className="text-xl text-primary-600 mb-8">
          Découvrez nos artisans agréés pour vos projets de marchés publics
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {professions.map(profession => (
            <button
              key={profession}
              onClick={() => setSelectedProfession(profession)}
              className={`px-4 py-2 rounded-full transition-colors ${selectedProfession === profession
                ? 'bg-primary-600 text-white'
                : 'bg-white text-primary-600 hover:bg-primary-50'
                }`}
            >
              {profession}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.map(artisan => (
            <ArtisanCard
              key={artisan.id}
              artisan={artisan}
              onClick={() => setSelectedArtisan(artisan)}
            />
          ))}
        </div>

        <InfoBlock />

        <AnimatePresence>
          {selectedArtisan && (
            <ArtisanModal
              artisan={selectedArtisan}
              onClose={() => setSelectedArtisan(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PublicProcurement;