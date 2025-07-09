import { Place } from '@/types';

// Mock data for offline use - all data is local only
export const mockPlaces: Place[] = [
  {
    id: '1',
    name: '中央公園',
    category: 'park',
    suitableAges: ['0-1', '2-3', '4-6'],
    crowdLevel: 'Medium',
    hasParking: true,
    hasDiaperRoom: true,
    hasNursingRoom: true,
    hasToilet: true,
    location: '東京都渋谷区',
    imageUrl: 'https://images.pexels.com/photos/1101970/pexels-photo-1101970.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventPeriod: null,
    description: '広い芝生エリアと遊具があり、家族連れに人気の公園です。授乳室やおむつ交換台も完備。',
    openHours: '24時間開放',
    rating: 4.5
  },
  {
    id: '2',
    name: 'キッズプラザ',
    category: 'indoor',
    suitableAges: ['0-1', '2-3'],
    crowdLevel: 'Low',
    hasParking: true,
    hasDiaperRoom: true,
    hasNursingRoom: true,
    hasToilet: true,
    location: '東京都新宿区',
    imageUrl: 'https://images.pexels.com/photos/8613325/pexels-photo-8613325.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventPeriod: null,
    description: '天候に関係なく楽しめる屋内施設。0-3歳向けの安全な遊具が充実。',
    openHours: '10:00-18:00',
    rating: 4.8
  },
  {
    id: '3',
    name: '春祭り in 桜公園',
    category: 'event',
    suitableAges: ['2-3', '4-6'],
    crowdLevel: 'High',
    hasParking: false,
    hasDiaperRoom: true,
    hasNursingRoom: false,
    hasToilet: true,
    location: '東京都目黒区',
    imageUrl: 'https://images.pexels.com/photos/1784578/pexels-photo-1784578.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventPeriod: {
      start: '2025-04-01',
      end: '2025-04-07'
    },
    description: '春の桜を楽しみながら子供向けワークショップや屋台が楽しめます。',
    openHours: '10:00-16:00',
    rating: 4.2
  },
  {
    id: '4',
    name: '科学館',
    category: 'museum',
    suitableAges: ['4-6'],
    crowdLevel: 'Medium',
    hasParking: true,
    hasDiaperRoom: true,
    hasNursingRoom: true,
    hasToilet: true,
    location: '東京都港区',
    imageUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventPeriod: null,
    description: '体験型の展示で科学を楽しく学べる施設。子供向けワークショップも開催。',
    openHours: '9:00-17:00',
    rating: 4.6
  },
  {
    id: '5',
    name: 'ファミリーモール',
    category: 'shopping',
    suitableAges: ['0-1', '2-3', '4-6'],
    crowdLevel: 'Low',
    hasParking: true,
    hasDiaperRoom: true,
    hasNursingRoom: true,
    hasToilet: true,
    location: '東京都世田谷区',
    imageUrl: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventPeriod: null,
    description: 'キッズエリアやベビー用品が充実したショッピングモール。レストランも家族向け。',
    openHours: '10:00-21:00',
    rating: 4.3
  },
  {
    id: '6',
    name: '動物園',
    category: 'park',
    suitableAges: ['2-3', '4-6'],
    crowdLevel: 'High',
    hasParking: true,
    hasDiaperRoom: true,
    hasNursingRoom: true,
    hasToilet: true,
    location: '東京都台東区',
    imageUrl: 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventPeriod: null,
    description: '多くの動物と触れ合える人気スポット。ファミリー向けの設備も充実。',
    openHours: '9:30-17:00',
    rating: 4.7
  },
  {
    id: '7',
    name: '夏祭り',
    category: 'event',
    suitableAges: ['2-3', '4-6'],
    crowdLevel: 'High',
    hasParking: false,
    hasDiaperRoom: true,
    hasNursingRoom: false,
    hasToilet: true,
    location: '東京都品川区',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventPeriod: {
      start: '2025-07-15',
      end: '2025-07-17'
    },
    description: '夏の風物詩！子供向けゲームコーナーや屋台が楽しめる地域のお祭り。',
    openHours: '16:00-21:00',
    rating: 4.4
  },
  {
    id: '8',
    name: '水族館',
    category: 'indoor',
    suitableAges: ['0-1', '2-3', '4-6'],
    crowdLevel: 'Medium',
    hasParking: true,
    hasDiaperRoom: true,
    hasNursingRoom: true,
    hasToilet: true,
    location: '東京都江東区',
    imageUrl: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventPeriod: null,
    description: '美しい海の生き物たちと出会える癒しのスポット。ベビーカーでも回りやすい設計。',
    openHours: '10:00-18:00',
    rating: 4.9
  }
];

// Helper function to get places by category
export const getPlacesByCategory = (category: string): Place[] => {
  if (category === 'all') return mockPlaces;
  return mockPlaces.filter(place => place.category === category);
};

// Helper function to get places by age group
export const getPlacesByAge = (ageGroup: string): Place[] => {
  if (ageGroup === 'all') return mockPlaces;
  return mockPlaces.filter(place => place.suitableAges.includes(ageGroup));
};

// Helper function to get events (places with eventPeriod)
export const getEvents = (): Place[] => {
  return mockPlaces.filter(place => place.eventPeriod !== null);
};