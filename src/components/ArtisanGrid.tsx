import React from 'react';
import ArtisanCard from './ArtisanCard';

const mockArtisans = [
  {
    id: '1',
    name: 'Mamadou Diallo',
    profession: 'Menuisier',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg'
  },
  {
    id: '2',
    name: 'Fatou Sow',
    profession: 'Maçon',
    rating: 4.5,
    image: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg'
  },
  {
    id: '3',
    name: 'Omar Ndiaye',
    profession: 'Plombier',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg'
  }
];

const ArtisanGrid = () => {
  const handleArtisanClick = (artisanId: string) => {
    console.log('Artisan clicked:', artisanId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {mockArtisans.map((artisan) => (
        <ArtisanCard
          key={artisan.id}
          artisan={artisan}
          onClick={() => handleArtisanClick(artisan.id)}
        />
      ))}
    </div>
  );
};

export default ArtisanGrid;