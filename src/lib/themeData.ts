export type YearKey = '2023' | '2024' | '2025';

export interface CreativeItem {
  name: string;
  image: string;
}

export interface ThemeContent {
  year: YearKey;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  accentColor: string;
  briefLine1: string;
  briefLine2: string;
  creativesDescription: string;
  creatives: CreativeItem[];
}

export const themeContent: Record<YearKey, ThemeContent> = {
  '2023': {
    year: '2023',
    title: 'EYE OF THE STORM',
    subtitle: 'Malhar 2023',
    description:
      'Embrace the chaos and find your center. Step into the eye of the storm and experience the raw power of culture and art.',
    heroImage:
      'https://storage.googleapis.com/storage.magicpath.ai/user/419318169308651520/figma-assets/85ca2033-150e-44f5-b2b4-38748c935b74.svg',
    accentColor: '#19BAF1',
    briefLine1: 'EYE OF THE STORM',
    briefLine2: 'FIND YOUR CENTER',
    creativesDescription: 'MALHAR 2023 EMBRACES THE TURBULENT FORCES OF CREATIVITY AND FINDING ONE\'S ARTISTIC ANCHOR AMIDST THE BEAUTIFUL CHAOS.',
    creatives: [
      { name: 'Eye of the Storm', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80' },
      { name: 'Whirlwind of Colors', image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80' },
      { name: 'Centering Chaos', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Force of Nature', image: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=800&q=80' },
      { name: 'Calm in the Tempest', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  '2024': {
    year: '2024',
    title: 'VIVA LA VIDA',
    subtitle: 'Malhar 2024',
    description:
      'Celebrate the vibrancy of life. Ignite your passion and join us for a festival of fiery creativity and unbridled joy.',
    heroImage:
      'https://storage.googleapis.com/storage.magicpath.ai/user/419318169308651520/figma-assets/85ca2033-150e-44f5-b2b4-38748c935b74.svg',
    accentColor: '#F7B249',
    briefLine1: 'VIVA LA VIDA',
    briefLine2: 'CELEBRATE THE LIFE',
    creativesDescription: 'MALHAR 2024 CELEBRATES THE VIBRANCY OF LIFE, SHOWCASING THE COLORFUL PASSION AND BOUNDLESS ENERGY OF ART AND CULTURE.',
    creatives: [
      { name: 'Vibrant Horizons', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80' },
      { name: 'Fires of Passion', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80' },
      { name: 'Euphoric Beats', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80' },
      { name: 'Viva La Vida', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80' },
      { name: 'Celebration of Soul', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  '2025': {
    year: '2025',
    title: 'THE WORLD WITHIN',
    subtitle: 'Malhar 2025',
    description:
      'A celebration of culture, art, and unity. Step into the world within us and experience the magic of Malhar.',
    heroImage:
      'https://storage.googleapis.com/storage.magicpath.ai/user/419318169308651520/figma-assets/85ca2033-150e-44f5-b2b4-38748c935b74.svg',
    accentColor: '#C9A84C',
    briefLine1: 'THE WORLD WITHIN US',
    briefLine2: 'A SYMBOL OF UNITY',
    creativesDescription: 'MALHAR 2025 EXPLORES THE INNER UNIVERSE WE ALL CARRY — A CELEBRATION OF IDENTITY, EXPRESSION AND TOGETHERNESS ACROSS EVERY DEPARTMENT AND TEAM.',
    creatives: [
      { name: 'The World Within Us', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
      { name: 'Cosmic Reflections', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' },
      { name: 'Inner Sanctum', image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80' },
      { name: 'Silent Symphonies', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80' },
      { name: 'Stardust & Dreams', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' }
    ]
  },
};
