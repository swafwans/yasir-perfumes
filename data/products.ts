
import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Noir Enigma',
    description: 'A mysterious and captivating fragrance that blends spicy top notes with a rich, woody base. Perfect for evening wear.',
    price: 10000,
    imageUrl: 'https://picsum.photos/seed/perfume1/800/800',
    notes: {
      top: 'Black Pepper, Cardamom',
      middle: 'Oud, Sandalwood',
      base: 'Vanilla, Tonka Bean',
    },
  },
  {
    id: 2,
    name: 'Azure Dream',
    description: 'A fresh and invigorating scent reminiscent of a coastal breeze. Citrus and marine notes awaken the senses.',
    price: 7500,
    imageUrl: 'https://picsum.photos/seed/perfume2/800/800',
    notes: {
      top: 'Bergamot, Lemon, Sea Salt',
      middle: 'Jasmine, Neroli',
      base: 'Ambergris, Cedarwood',
    },
  },
  {
    id: 3,
    name: 'Golden Serenity',
    description: 'A warm and luxurious perfume with floral and amber accords. It radiates elegance and sophistication.',
    price: 12000,
    imageUrl: 'https://picsum.photos/seed/perfume3/800/800',
    notes: {
      top: 'Saffron, Jasmine',
      middle: 'Amberwood, Ambergris',
      base: 'Fir Resin, Cedar',
    },
  },
  {
    id: 4,
    name: 'Velvet Rose',
    description: 'A modern take on a classic rose scent. Rich, velvety, and deeply romantic with a hint of smoky oud.',
    price: 11000,
    imageUrl: 'https://picsum.photos/seed/perfume4/800/800',
    notes: {
      top: 'Bulgarian Rose, May Rose',
      middle: 'Turkish Rose, Patchouli',
      base: 'Oud, Sandalwood',
    },
  },
  {
    id: 5,
    name: 'Citrus Grove',
    description: 'A vibrant and zesty fragrance that captures the essence of a sun-drenched citrus orchard. Uplifting and energetic.',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/perfume5/800/800',
    notes: {
      top: 'Grapefruit, Mandarin Orange',
      middle: 'Basil, Thyme',
      base: 'Vetiver, Patchouli',
    },
  },
  {
    id: 6,
    name: 'Midnight Oud',
    description: 'An intense and powerful fragrance centered around precious oud wood. For those who dare to make a statement.',
    price: 14500,
    imageUrl: 'https://picsum.photos/seed/perfume6/800/800',
    notes: {
      top: 'Incense, Raspberry',
      middle: 'Oud, Leather',
      base: 'Amber, Benzoin',
    },
  },
];
