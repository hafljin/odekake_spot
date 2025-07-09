import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Car, Baby, Heart, MapPin, Clock } from 'lucide-react-native';
import { Place } from '@/types';

interface PlaceCardProps {
  place: Place;
  onPress: () => void;
}

export default function PlaceCard({ place, onPress }: PlaceCardProps) {
  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'High': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getCrowdLevelText = (level: string) => {
    switch (level) {
      case 'Low': return '空いている';
      case 'Medium': return '普通';
      case 'High': return '混雑';
      default: return '不明';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'park': return '公園';
      case 'indoor': return '屋内';
      case 'event': return 'イベント';
      case 'museum': return 'ミュージアム';
      case 'shopping': return 'ショッピング';
      default: return category;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{place.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{getCategoryText(place.category)}</Text>
          </View>
        </View>
        
        <View style={styles.locationRow}>
          <MapPin size={14} color="#666" />
          <Text style={styles.location}>{place.location}</Text>
        </View>

        <View style={styles.crowdLevel}>
          <View style={[styles.crowdIndicator, { backgroundColor: getCrowdLevelColor(place.crowdLevel) }]} />
          <Text style={styles.crowdText}>混雑度: {getCrowdLevelText(place.crowdLevel)}</Text>
        </View>

        <View style={styles.amenities}>
          {place.hasParking && (
            <View style={styles.amenityIcon}>
              <Car size={16} color="#4A90E2" />
            </View>
          )}
          {place.hasDiaperRoom && (
            <View style={styles.amenityIcon}>
              <Baby size={16} color="#4A90E2" />
            </View>
          )}
          {place.hasNursingRoom && (
            <View style={styles.amenityIcon}>
              <Heart size={16} color="#4A90E2" />
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.timeRow}>
            <Clock size={12} color="#666" />
            <Text style={styles.timeText}>{place.openHours}</Text>
          </View>
          <Text style={styles.rating}>★ {place.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  crowdLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  crowdIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  crowdText: {
    fontSize: 14,
    color: '#555',
  },
  amenities: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  amenityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
  },
});