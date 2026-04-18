import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  StatusBar,
  FlatList,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { restaurants } from '../data/mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../data/theme';

const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Sushi', 'Ramen', 'Tacos', 'Desserts'];

const RestaurantCard = ({ restaurant, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 30 }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={styles.cardImageContainer}>
          <Text style={styles.cardEmoji}>{restaurant.image}</Text>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{restaurant.tag}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardRow}>
            <Text style={styles.cardName} numberOfLines={1}>{restaurant.name}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {restaurant.rating}</Text>
            </View>
          </View>
          <Text style={styles.cardCuisine}>{restaurant.cuisine}</Text>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>🕐 {restaurant.deliveryTime}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>📍 {restaurant.distance}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={[styles.metaText, { color: COLORS.success }]}>
              {restaurant.deliveryFee} delivery
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const { totalItems } = useCart();

  const filtered = selectedCat === 'All'
    ? restaurants
    : restaurants.filter((r) =>
        r.cuisine.toLowerCase().includes(selectedCat.toLowerCase())
      );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>Delivering to</Text>
            <TouchableOpacity style={styles.locationRow}>
              <Text style={styles.locationText}>Current Location 📍</Text>
              <Text style={styles.locationArrow}>▾</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.cartIconBtn}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={styles.cartIcon}>🛒</Text>
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.8}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search restaurants, cuisines...</Text>
        </TouchableOpacity>

        {/* Promo banner */}
        <View style={styles.promoBanner}>
          <View>
            <Text style={styles.promoTitle}>First Order Free!</Text>
            <Text style={styles.promoSub}>Zero commission · Web3 powered</Text>
          </View>
          <Text style={styles.promoEmoji}>🎉</Text>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, selectedCat === cat && styles.catPillActive]}
              onPress={() => setSelectedCat(cat)}
            >
              <Text
                style={[styles.catText, selectedCat === cat && styles.catTextActive]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCat === 'All' ? 'All Restaurants' : selectedCat}
          </Text>
          <Text style={styles.sectionCount}>{filtered.length} found</Text>
        </View>

        {/* Restaurant list */}
        {filtered.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onPress={() => navigation.navigate('Restaurant', { restaurant })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  locationLabel: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: FONTS.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  locationArrow: {
    color: COLORS.primary,
    fontSize: FONTS.md,
  },
  cartIconBtn: {
    position: 'relative',
    backgroundColor: COLORS.surface,
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cartIcon: {
    fontSize: 20,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    gap: 10,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchPlaceholder: {
    color: COLORS.textMuted,
    fontSize: FONTS.md,
  },
  promoBanner: {
    backgroundColor: COLORS.primaryGlow,
    borderWidth: 1,
    borderColor: 'rgba(230,57,70,0.25)',
    borderRadius: RADIUS.lg,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  promoTitle: {
    fontSize: FONTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  promoSub: {
    fontSize: FONTS.sm,
    color: COLORS.textMuted,
  },
  promoEmoji: {
    fontSize: 36,
  },
  catScroll: {
    paddingBottom: 16,
    gap: 8,
  },
  catPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  catText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sm,
    fontWeight: '600',
  },
  catTextActive: {
    color: COLORS.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: FONTS.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  sectionCount: {
    fontSize: FONTS.sm,
    color: COLORS.textMuted,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
  },
  cardImageContainer: {
    height: 140,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardEmoji: {
    fontSize: 64,
  },
  tagBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: FONTS.xs,
    fontWeight: '700',
  },
  cardBody: {
    padding: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardName: {
    fontSize: FONTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255,193,7,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  ratingText: {
    fontSize: FONTS.sm,
    color: '#FFD700',
    fontWeight: '600',
  },
  cardCuisine: {
    fontSize: FONTS.sm,
    color: COLORS.textMuted,
    marginBottom: 10,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
  },
  metaDot: {
    color: COLORS.border,
  },
});
