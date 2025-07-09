import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { mockPlaces } from '@/data/mockData';
import PlaceCard from '@/components/PlaceCard';
import FilterBar from '@/components/FilterBar';
import { FilterState, Place } from '@/types';

export default function EventsScreen() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    ageGroup: 'all',
    category: 'all',
    dateRange: 'all',
  });

  // Filter events (places with eventPeriod) - using local mock data only
  const filteredEvents = useMemo(() => {
    let filtered = mockPlaces.filter(place => place.eventPeriod !== null);

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

  const handleEventPress = (place: Place) => {
    router.push({
      pathname: '/detail',
      params: { placeId: place.id }
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>イベント情報</Text>
      <Text style={styles.subtitle}>期間限定の楽しいイベントをチェック</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>該当するイベントが見つかりません</Text>
      <Text style={styles.emptySubtext}>フィルターを変更してみてください</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => (
          <PlaceCard 
            place={item} 
            onPress={() => handleEventPress(item)}
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
        contentContainerStyle={filteredEvents.length === 0 ? styles.emptyContainer : undefined}
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