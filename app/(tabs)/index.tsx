import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { mockPlaces } from '@/data/mockData';
import PlaceCard from '@/components/PlaceCard';
import FilterBar from '@/components/FilterBar';
import { FilterState, Place } from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    ageGroup: 'all',
    category: 'all',
    dateRange: 'all',
  });

  // Filter places based on current filters - using local mock data only
  const filteredPlaces = useMemo(() => {
    let filtered = mockPlaces;

    // Filter by age group
    if (filters.ageGroup !== 'all') {
      filtered = filtered.filter(place => 
        place.suitableAges.includes(filters.ageGroup)
      );
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(place => 
        place.category === filters.category
      );
    }

    return filtered;
  }, [filters]);

  const handlePlacePress = (place: Place) => {
    router.push({
      pathname: '/detail',
      params: { placeId: place.id }
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>おでかけスポット</Text>
      <Text style={styles.subtitle}>お子様と一緒に楽しめる場所を見つけよう</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>該当するおでかけ先が見つかりません</Text>
      <Text style={styles.emptySubtext}>フィルターを変更してみてください</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredPlaces}
        renderItem={({ item }) => (
          <PlaceCard 
            place={item} 
            onPress={() => handlePlacePress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            <FilterBar filters={filters} onFilterChange={setFilters} />
          </View>
        }
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={filteredPlaces.length === 0 ? styles.emptyContainer : undefined}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#A0AEC0',
    textAlign: 'center',
  },
});