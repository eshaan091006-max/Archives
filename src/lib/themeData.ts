export type YearKey = '2023' | '2024' | '2025';

export interface ThemeContent {
  year: YearKey;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  accentColor: string;
}

export const themeContent: Record<YearKey, ThemeContent> = {
  '2023': {
    year: '2023',
    title: 'EYE OF THE STORM',
    subtitle: 'Malhar 2023',
    description: 'Embrace the chaos and find your center. Step into the eye of the storm and experience the raw power of culture and art.',
    heroImage: 'https://storage.googleapis.com/storage.magicpath.ai/user/419318169308651520/figma-assets/85ca2033-150e-44f5-b2b4-38748c935b74.svg',
    accentColor: '#19BAF1',
  },
  '2024': {
    year: '2024',
    title: 'VIVA LA VIDA',
    subtitle: 'Malhar 2024',
    description: 'Celebrate the vibrancy of life. Ignite your passion and join us for a festival of fiery creativity and unbridled joy.',
    heroImage: 'https://storage.googleapis.com/storage.magicpath.ai/user/419318169308651520/figma-assets/85ca2033-150e-44f5-b2b4-38748c935b74.svg',
    accentColor: '#F7B249',
  },
  '2025': {
    year: '2025',
    title: 'THE WORLD WITHIN',
    subtitle: 'Malhar 2025',
    description: 'A celebration of culture, art, and unity. Step into the world within us and experience the magic of Malhar.',
    heroImage: 'https://storage.googleapis.com/storage.magicpath.ai/user/419318169308651520/figma-assets/85ca2033-150e-44f5-b2b4-38748c935b74.svg',
    accentColor: '#C9A84C',
  }
};
