// mockData/products.ts
import { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pioneer TS-A1600C",
    category: "акустика",
    subcategory: "компонентная",
    price: 12500,
    oldPrice: 14900,
    brand: "Pioneer",
    rating: 4.7,
    reviewsCount: 24,
    inStock: true,
    images: "/images/speakers2.webp",
    features: {
      мощность: "80 Вт",
      импеданс: "4 Ом",
      чувствительность: "90 дБ",
      частотныйДиапазон: "35-22000 Гц"
    },
    description: "Компонентная акустическая система с отличным звучанием",
    shortDescription: "2-полосная компонентная акустика"
  },
  {
    id: 2,
    name: 'Акустика Pride Ruby Light 8"',
    category: "акустика",
    subcategory: "компонентная",
    price: 8900,
    oldPrice: null,
    brand: "Pride",
    rating: 4.5,
    reviewsCount: 18,
    inStock: true,
    images: '/images/speakers1.jpeg',
    features: {
      мощность: "100 Вт",
      импеданс: "4 Ом",
      чувствительность: "88 дБ",
      частотныйДиапазон: "65-22000 Гц"
    },
    description: "Коаксиальные динамики с сбалансированным звуком",
    shortDescription: "6.5-дюймовые коаксиальные динамики"
  },
  {
    id: 3,
    name: "Kenwood DMX8020DABS",
    category: "головныеУстройства",
    subcategory: "2DIN",
    price: 34900,
    oldPrice: 38900,
    brand: "Kenwood",
    rating: 4.8,
    reviewsCount: 32,
    inStock: true,
    images: 'images/magnitola1.jpeg',
    features: {
      экран: "6.8\" сенсорный",
      беспроводныеТехнологии: "Bluetooth, Wi-Fi",
      навигация: "Apple CarPlay, Android Auto",
      видеоВходы: "2"
    },
    description: "Мультимедийная система с большим сенсорным экраном",
    shortDescription: "2DIN мультимедийная система"
  },
  {
    id: 4,
    name: "JBL Stage 1000",
    category: "сабвуферы",
    subcategory: "активный",
    price: 21500,
    oldPrice: 24900,
    brand: "JBL",
    rating: 4.6,
    reviewsCount: 15,
    inStock: false,
    images: "/images/jbl-stage-1210-1000.jpeg",
    features: {
      мощность: "300 Вт",
      диаметр: "10 дюймов",
      сопротивление: "2 Ом",
      типКорпуса: "закрытый"
    },
    description: "Активный сабвуфер с мощным усилителем",
    shortDescription: "10-дюймовый активный сабвуфер"
  },
  {
    id: 5,
    name: "Hertz HCP 4D",
    category: "усилители",
    subcategory: "4-канальный",
    price: 28900,
    oldPrice: null,
    brand: "Hertz",
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    images: "/images/usil.webp",
    features: {
      мощность: "4x100 Вт",
      классУсиления: "D",
      частотныйДиапазон: "10-25000 Гц",
      регулировкаУровня: "есть"
    },
    description: "Мощный 4-канальный усилитель класса D",
    shortDescription: "4-канальный усилитель мощности"
  },
   {
    id: 7,
    name: "Pioneer DEH-S3200BT",
    category: "головныеУстройства",
    subcategory: "1DIN",
    price: 11200,
    oldPrice: 13500,
    brand: "Pioneer",
    rating: 4.4,
    reviewsCount: 56,
    inStock: true,
    images: "/images/magnitola2.webp",
    features: {
      тип: "1DIN",
      дисплей: "Монохромный",
      беспроводныеТехнологии: "Bluetooth, USB",
      мощность: "4x50 Вт",
      выходы: "3 RCA",
      поддержкаФорматов: "MP3, WMA, AAC"
    },
    description: "Компактная магнитола с Bluetooth для качественного звука",
    shortDescription: "1DIN магнитола с Bluetooth"
  },

];