// Type definitions for KodomoTrip app
export interface Place {
  id: string;
  name: string;
  category: string;
  suitableAges: string[];
  crowdLevel: 'Low' | 'Medium' | 'High';
  hasParking: boolean;
  hasDiaperRoom: boolean;
  hasNursingRoom: boolean;
  hasToilet: boolean;
  location: string;
  imageUrl: string;
  eventPeriod: {
    start: string;
    end: string;
  } | null;
  description: string;
  openHours: string;
  rating: number;
}

export interface FilterState {
  ageGroup: string;
  category: string;
  dateRange: string;
}

export type CrowdLevel = 'Low' | 'Medium' | 'High';
export type AgeGroup = 'all' | '0-1' | '2-3' | '4-6';
export type OutingCategory = 'all' | 'park' | 'indoor' | 'museum' | 'shopping';
export type EventCategory =
  | 'all'
  | 'music'      // 音楽・ステージ
  | 'sports'     // スポーツ・体験
  | 'art'        // アート・ワークショップ
  | 'gourmet'    // グルメ・フード
  | 'festival'   // お祭り・季節イベント
  | 'nature'     // 動物・自然体験
  | 'local';     // 地域交流・マルシェ