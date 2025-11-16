// mockData/products.ts
import { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pioneer TS-A1600C",
    category: "Акустика",
    subcategory: "компонентная",
    price: 12500,
    oldPrice: 14900,
    brand: "Pioneer",
    rating: 4.7,
    reviewsCount: 24,
    inStock: true,
    images: "/images/speakers2.webp",
    features: {
      power: "80 Вт",
      impedance: "4 Ом",
      sensitivity: "90 дБ",
      frequencyRange: "35-22000 Гц"
    },
    description: "Компонентная акустическая система с отличным звучанием",
    shortDescription: "2-полосная компонентная акустика"
  },
  {
    id: 2,
    name: 'Акустика Pride Ruby Light 8"',
    category: "Акустика",
    subcategory: "компонентная",
    price: 8900,
    oldPrice: null,
    brand: "Pride",
    rating: 4.5,
    reviewsCount: 18,
    inStock: true,
    images: '/images/speakers1.jpeg',
    features: {
      power: "100 Вт",
      impedance: "4 Ом",
      sensitivity: "88 дБ",
      frequencyRange: "65-22000 Гц"
    },
    description: "Коаксиальные динамики с сбалансированным звуком",
    shortDescription: "6.5-дюймовые коаксиальные динамики"
  },
  {
    id: 3,
    name: "Kenwood DMX8020DABS",
    category: "Головные Устройства",
    subcategory: "2DIN",
    price: 34900,
    oldPrice: 38900,
    brand: "Kenwood",
    rating: 4.8,
    reviewsCount: 32,
    inStock: true,
    images: '/images/magnitola1.jpeg',
    features: {
      screen: "6.8\" сенсорный",
      wireless: "Bluetooth, Wi-Fi",
      navigation: "Apple CarPlay, Android Auto",
      videoInputs: "2"
    },
    description: "Мультимедийная система с большим сенсорным экраном",
    shortDescription: "2DIN мультимедийная система"
  },
  {
    id: 4,
    name: "JBL Stage 1000",
    category: "Сабвуферы",
    subcategory: "активный",
    price: 21500,
    oldPrice: 24900,
    brand: "JBL",
    rating: 4.6,
    reviewsCount: 15,
    inStock: false,
    images: "/images/jbl-stage-1210-1000.jpeg",
    features: {
      power: "300 Вт",
      diameter: "10 дюймов",
      impedance: "2 Ом",
      enclosureType: "закрытый"
    },
    description: "Активный сабвуфер с мощным усилителем",
    shortDescription: "10-дюймовый активный сабвуфер"
  },
  {
    id: 5,
    name: "Hertz HCP 4D",
    category: "Усилители",
    subcategory: "4-канальный",
    price: 28900,
    oldPrice: null,
    brand: "Hertz",
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    images: "/images/usil.webp",
    features: {
      power: "4x100 Вт",
      amplifierClass: "D",
      frequencyRange: "10-25000 Гц",
      levelControl: "есть"
    },
    description: "Мощный 4-канальный усилитель класса D",
    shortDescription: "4-канальный усилитель мощности"
  },
  {
    id: 6,
    name: "Pioneer DEH-S3200BT",
    category: "Головные Устройства",
    subcategory: "1DIN",
    price: 11200,
    oldPrice: 13500,
    brand: "Pioneer",
    rating: 4.4,
    reviewsCount: 56,
    inStock: true,
    images: "/images/magnitola2.webp",
    features: {
      type: "1DIN",
      display: "Монохромный",
      wireless: "Bluetooth, USB",
      power: "4x50 Вт",
      outputs: "3 RCA",
      formatSupport: "MP3, WMA, AAC"
    },
    description: "Компактная магнитола с Bluetooth для качественного звука",
    shortDescription: "1DIN магнитола с Bluetooth"
  }
];
