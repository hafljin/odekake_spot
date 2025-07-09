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
export type Category = 'all' | 'park' | 'indoor' | 'event' | 'museum' | 'shopping';