import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../data/theme';

const MenuItem = ({ item, restaurantId, restaurantName }) => {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const qty = getItemQuantity(item.id, restaurantId);
  const scale = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 40 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }),
    ]).start();
  };

  const handleAdd = () => {
    pulse();
    addItem({ ...item, restaurantId, restaurantName });
  };

  const handleRemove = () => {
    removeItem(item.id, restaurantId);
  };

  return (
    <View style={styles.menuItem}>
      <View style={styles.menuInfo}>
        {item.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>🔥 Popular</Text>
          </View>
        )}
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuDesc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.menuRight}>
        <Text style={styles.menuEmoji}>{item.emoji}</Text>
        <Animated.View style={{ transform: [{ scale }] }}>
          {qty === 0 ? (
            <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.85}>
              <Text style={styles.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyControl}>
              <TouchableOpacity style={styles.qtyBtn} onPress={handleRemove}>
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={handleAdd}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

export default function RestaurantScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const items = menuItems[restaurant.id] || [];
  const { totalItems, totalPrice } = useCart();

  const categories = [...new Set(items.map((i) => i.category))];
  const [selectedCat, setSelectedCat] = useState(categories[0] || 'All');

  const filtered = items.filter((i) => i.category === selectedCat);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartBtn}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Restaurant Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{restaurant.image}</Text>
          <Text style={styles.heroName}>{restaurant.name}</Text>
          <Text style={styles.heroCuisine}>{restaurant.cuisine}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>⭐ {restaurant.rating}</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>🕐 {restaurant.deliveryTime}</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>📍 {restaurant.distance}</Text>
            </View>
          </View>
        </View>

        {/* Category tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catTab, selectedCat === cat && styles.catTabActive]}
              onPress={() => setSelectedCat(cat)}
            >
              <Text
                style={[styles.catTabText, selectedCat === cat && styles.catTabTextActive]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <Text style={styles.sectionLabel}>{selectedCat}</Text>
        {filtered.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            restaurantId={restaurant.id}
            restaurantName={restaurant.name}
          />
        ))}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Cart footer */}
      {totalItems > 0 && (
        <TouchableOpacity
          style={styles.cartFooter}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.9}
        >
          <View style={styles.cartFooterLeft}>
            <View style={styles.cartCountBubble}>
              <Text style={styles.cartCountText}>{totalItems}</Text>
            </View>
            <Text style={styles.cartFooterLabel}>View Cart</Text>
          </View>
          <Text style={styles.cartFooterPrice}>${totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backText: { color: COLORS.text, fontSize: 20 },
  cartBtn: {
    position: 'relative',
    width: 40,
    height: 40,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cartIcon: { fontSize: 18 },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  scroll: { paddingHorizontal: 20 },
  hero: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: RADIUS.xl,
    marginBottom: 20,
  },
  heroEmoji: { fontSize: 72, marginBottom: 12 },
  heroName: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  heroCuisine: { fontSize: FONTS.sm, color: COLORS.textMuted, marginBottom: 16 },
  heroMeta: { flexDirection: 'row', gap: 10 },
  metaChip: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metaChipText: { fontSize: FONTS.xs, color: COLORS.textSub, fontWeight: '600' },
  catScroll: { paddingBottom: 12, gap: 8 },
  catTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catTabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catTabText: { color: COLORS.textMuted, fontSize: FONTS.sm, fontWeight: '600' },
  catTabTextActive: { color: '#fff' },
  sectionLabel: {
    fontSize: FONTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 4,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuInfo: { flex: 1, marginRight: 12 },
  popularBadge: {
    backgroundColor: 'rgba(255,87,34,0.15)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  popularText: { fontSize: FONTS.xs, color: '#FF5722', fontWeight: '600' },
  menuName: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  menuDesc: { fontSize: FONTS.sm, color: COLORS.textMuted, lineHeight: 18, marginBottom: 8 },
  menuPrice: { fontSize: FONTS.lg, fontWeight: '800', color: COLORS.primary },
  menuRight: { alignItems: 'center', gap: 10 },
  menuEmoji: { fontSize: 44 },
  addBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...SHADOW.primary,
  },
  addBtnText: { color: '#fff', fontSize: FONTS.sm, fontWeight: '700' },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryGlow,
  },
  qtyBtnText: { color: COLORS.primary, fontSize: FONTS.lg, fontWeight: '800' },
  qtyNum: { width: 28, textAlign: 'center', color: COLORS.text, fontWeight: '700', fontSize: FONTS.md },
  cartFooter: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOW.primary,
  },
  cartFooterLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cartCountBubble: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: { color: '#fff', fontSize: FONTS.sm, fontWeight: '700' },
  cartFooterLabel: { color: '#fff', fontSize: FONTS.md, fontWeight: '700' },
  cartFooterPrice: { color: '#fff', fontSize: FONTS.lg, fontWeight: '800' },
});
