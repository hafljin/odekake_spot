import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { FilterState, AgeGroup, OutingCategory, EventCategory } from '@/types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  mode?: 'outing' | 'event'; // 追加: おでかけ or イベント
}

export default function FilterBar({ filters, onFilterChange, mode = 'outing' }: FilterBarProps) {
  const ageGroups = [
    { value: 'all', label: 'すべて' },
    { value: '0-1', label: '0-1歳' },
    { value: '2-3', label: '2-3歳' },
    { value: '4-6', label: '4-6歳' },
  ];

  const outingCategories = [
    { value: 'all', label: 'すべて' },
    { value: 'park', label: '公園' },
    { value: 'indoor', label: '屋内' },
    { value: 'museum', label: 'ミュージアム' },
    { value: 'shopping', label: 'ショッピング' },
  ];

  const eventCategories = [
    { value: 'all', label: 'すべて' },
    { value: 'music', label: '音楽・ステージ' },
    { value: 'sports', label: 'スポーツ・体験' },
    { value: 'art', label: 'アート・ワークショップ' },
    { value: 'gourmet', label: 'グルメ・フード' },
    { value: 'festival', label: 'お祭り・季節イベント' },
    { value: 'nature', label: '動物・自然体験' },
    { value: 'local', label: '地域交流・マルシェ' },
  ];

  const categories = mode === 'event' ? eventCategories : outingCategories;

  const handleAgeGroupChange = (ageGroup: string) => {
    onFilterChange({ ...filters, ageGroup });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>年齢</Text>
          <View style={styles.filterChips}>
            {ageGroups.map((age) => (
              <TouchableOpacity
                key={age.value}
                style={[
                  styles.chip,
                  filters.ageGroup === age.value && styles.chipActive
                ]}
                onPress={() => handleAgeGroupChange(age.value)}
              >
                <Text style={[
                  styles.chipText,
                  filters.ageGroup === age.value && styles.chipTextActive
                ]}>
                  {age.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>カテゴリー</Text>
          <View style={styles.filterChips}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  styles.chip,
                  filters.category === cat.value && styles.chipActive
                ]}
                onPress={() => handleCategoryChange(cat.value)}
              >
                <Text style={[
                  styles.chipText,
                  filters.category === cat.value && styles.chipTextActive
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  filterSection: {
    marginRight: 24,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filterChips: {
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#ffffff',
  },
});