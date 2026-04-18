import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { restaurants } from '../data/mockData';
import { COLORS, FONTS, RADIUS } from '../data/theme';

const TRENDING = ['Biryani', 'Pizza', 'Sushi', 'Burger', 'Coffee', 'Desserts'];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  const results = query.length > 0
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search restaurants, cuisines..."
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={setQuery}
            selectionColor={COLORS.primary}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {query.length === 0 ? (
          <>
            <Text style={styles.sectionTitle}>Trending</Text>
            <View style={styles.trendingGrid}>
              {TRENDING.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={styles.trendingChip}
                  onPress={() => setQuery(t)}
                >
                  <Text style={styles.trendingText}>🔥 {t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>All Restaurants</Text>
            {restaurants.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={styles.resultCard}
                onPress={() => navigation.navigate('Restaurant', { restaurant: r })}
                activeOpacity={0.85}
              >
                <Text style={styles.resultEmoji}>{r.image}</Text>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{r.name}</Text>
                  <Text style={styles.resultCuisine}>{r.cuisine}</Text>
                  <Text style={styles.resultMeta}>
                    ⭐ {r.rating}  ·  🕐 {r.deliveryTime}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : results.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>{results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</Text>
            {results.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={styles.resultCard}
                onPress={() => navigation.navigate('Restaurant', { restaurant: r })}
                activeOpacity={0.85}
              >
                <Text style={styles.resultEmoji}>{r.image}</Text>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{r.name}</Text>
                  <Text style={styles.resultCuisine}>{r.cuisine}</Text>
                  <Text style={styles.resultMeta}>
                    ⭐ {r.rating}  ·  🕐 {r.deliveryTime}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsEmoji}>🤔</Text>
            <Text style={styles.noResultsTitle}>No results for "{query}"</Text>
            <Text style={styles.noResultsSub}>Try searching for "pizza", "sushi" or "burger"</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, paddingHorizontal: 20,
    paddingTop: 56, paddingBottom: 16,
  },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16, paddingVertical: 12,
    borderWidth: 1, borderColor: COLORS.border,
    gap: 10,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, color: COLORS.text, fontSize: FONTS.md },
  clearBtn: { color: COLORS.textMuted, fontSize: FONTS.md },
  cancelText: { color: COLORS.primary, fontWeight: '600', fontSize: FONTS.md },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  sectionTitle: {
    fontSize: FONTS.lg, fontWeight: '700',
    color: COLORS.text, marginBottom: 12, marginTop: 8,
  },
  trendingGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  trendingChip: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16, paddingVertical: 10,
    borderWidth: 1, borderColor: COLORS.border,
  },
  trendingText: { color: COLORS.textSub, fontSize: FONTS.sm, fontWeight: '600' },
  resultCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, padding: 14,
    marginBottom: 10,
    borderWidth: 1, borderColor: COLORS.border,
    gap: 14,
  },
  resultEmoji: { fontSize: 40 },
  resultInfo: { flex: 1 },
  resultName: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  resultCuisine: { fontSize: FONTS.sm, color: COLORS.textMuted, marginBottom: 4 },
  resultMeta: { fontSize: FONTS.xs, color: COLORS.textMuted },
  noResults: { alignItems: 'center', paddingTop: 60 },
  noResultsEmoji: { fontSize: 56, marginBottom: 16 },
  noResultsTitle: { fontSize: FONTS.xl, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  noResultsSub: { fontSize: FONTS.md, color: COLORS.textMuted, textAlign: 'center' },
});
