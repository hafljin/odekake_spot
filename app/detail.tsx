import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Clock, Car, Baby, Heart, Users, Star, Calendar } from 'lucide-react-native';
import { mockPlaces } from '@/data/mockData';
import { Place } from '@/types';

export default function DetailScreen() {
  const router = useRouter();
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  
  // Find place from local mock data
  const place = mockPlaces.find(p => p.id === placeId);

  if (!place) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>スポット情報が見つかりません</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#4A90E2" />
            <Text style={styles.backButtonText}>戻る</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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

  const getAgeText = (ages: string[]) => {
    const ageMap: { [key: string]: string } = {
      '0-1': '0-1歳',
      '2-3': '2-3歳',
      '4-6': '4-6歳',
    };
    return ages.map(age => ageMap[age] || age).join(', ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: place.imageUrl }} style={styles.image} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{place.name}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{getCategoryText(place.category)}</Text>
              </View>
            </View>
            
            <View style={styles.ratingSection}>
              <Star size={16} color="#FF9800" fill="#FF9800" />
              <Text style={styles.rating}>{place.rating}</Text>
            </View>
          </View>

          <View style={styles.locationSection}>
            <MapPin size={18} color="#666" />
            <Text style={styles.location}>{place.location}</Text>
          </View>

          <View style={styles.timeSection}>
            <Clock size={18} color="#666" />
            <Text style={styles.time}>{place.openHours}</Text>
          </View>

          {place.eventPeriod && (
            <View style={styles.eventSection}>
              <Calendar size={18} color="#4A90E2" />
              <Text style={styles.eventPeriod}>
                {formatDate(place.eventPeriod.start)} - {formatDate(place.eventPeriod.end)}
              </Text>
            </View>
          )}

          <View style={styles.crowdSection}>
            <View style={styles.crowdHeader}>
              <Users size={18} color="#666" />
              <Text style={styles.crowdTitle}>混雑度</Text>
            </View>
            <View style={styles.crowdLevel}>
              <View style={[styles.crowdIndicator, { backgroundColor: getCrowdLevelColor(place.crowdLevel) }]} />
              <Text style={styles.crowdText}>{getCrowdLevelText(place.crowdLevel)}</Text>
            </View>
          </View>

          <View style={styles.ageSection}>
            <Text style={styles.sectionTitle}>対象年齢</Text>
            <Text style={styles.ageText}>{getAgeText(place.suitableAges)}</Text>
          </View>

          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>設備・サービス</Text>
            <View style={styles.amenitiesList}>
              {place.hasParking && (
                <View style={styles.amenityItem}>
                  <Car size={20} color="#4A90E2" />
                  <Text style={styles.amenityText}>駐車場</Text>
                </View>
              )}
              {place.hasDiaperRoom && (
                <View style={styles.amenityItem}>
                  <Baby size={20} color="#4A90E2" />
                  <Text style={styles.amenityText}>おむつ交換台</Text>
                </View>
              )}
              {place.hasNursingRoom && (
                <View style={styles.amenityItem}>
                  <Heart size={20} color="#4A90E2" />
                  <Text style={styles.amenityText}>授乳室</Text>
                </View>
              )}
              {place.hasToilet && (
                <View style={styles.amenityItem}>
                  <View style={styles.toiletIcon}>
                    <Text style={styles.toiletText}>🚻</Text>
                  </View>
                  <Text style={styles.amenityText}>トイレ</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>詳細情報</Text>
            <Text style={styles.description}>{place.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  rating: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: '600',
    marginLeft: 4,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 16,
    color: '#4A5568',
    marginLeft: 8,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  time: {
    fontSize: 16,
    color: '#4A5568',
    marginLeft: 8,
  },
  eventSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
  },
  eventPeriod: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '600',
    marginLeft: 8,
  },
  crowdSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
  },
  crowdHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  crowdTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginLeft: 8,
  },
  crowdLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crowdIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  crowdText: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  ageSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  ageText: {
    fontSize: 16,
    color: '#4A5568',
    backgroundColor: '#E6FFFA',
    padding: 12,
    borderRadius: 8,
  },
  amenitiesSection: {
    marginBottom: 20,
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 8,
    fontWeight: '500',
  },
  toiletIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toiletText: {
    fontSize: 16,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#E53E3E',
    textAlign: 'center',
    marginBottom: 20,
  },
});