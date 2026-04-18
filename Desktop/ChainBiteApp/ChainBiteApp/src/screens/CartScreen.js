import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { COLORS, FONTS, RADIUS, SHADOW } from '../data/theme';

export default function CartScreen({ navigation }) {
  const { items, totalItems, totalPrice, addItem, removeItem, restaurantName, clearCart } = useCart();

  const deliveryFee = 0;
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.emptyContent}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add some delicious items!</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseBtnText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Restaurant label */}
        <View style={styles.restaurantLabel}>
          <Text style={styles.restaurantLabelText}>🏪 {restaurantName}</Text>
        </View>

        {/* Cart items */}
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemEmoji}>{item.emoji}</Text>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.qtyControl}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => removeItem(item.id, item.restaurantId)}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => addItem(item)}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add more */}
        <TouchableOpacity
          style={styles.addMoreBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.addMoreText}>+ Add more items</Text>
        </TouchableOpacity>

        {/* Promo code */}
        <View style={styles.promoRow}>
          <Text style={styles.promoIcon}>🏷️</Text>
          <Text style={styles.promoPlaceholder}>Apply promo code</Text>
          <TouchableOpacity>
            <Text style={styles.promoApply}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Bill */}
        <View style={styles.bill}>
          <Text style={styles.billTitle}>Bill Summary</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item total</Text>
            <Text style={styles.billValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery fee</Text>
            <Text style={[styles.billValue, { color: COLORS.success }]}>FREE</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes & charges</Text>
            <Text style={styles.billValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Platform fee</Text>
            <Text style={[styles.billValue, { color: COLORS.success }]}>$0.00</Text>
          </View>
          <View style={[styles.billRow, styles.billTotal]}>
            <Text style={styles.billTotalLabel}>Total</Text>
            <Text style={styles.billTotalValue}>${grandTotal.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Checkout button */}
      <View style={styles.checkoutBar}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout', { total: grandTotal })}
          activeOpacity={0.85}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
          <Text style={styles.checkoutBtnPrice}>${grandTotal.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  emptyContainer: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 20, paddingTop: 52 },
  emptyContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 80, marginBottom: 20 },
  emptyTitle: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  emptySub: { fontSize: FONTS.md, color: COLORS.textMuted, marginBottom: 32 },
  browseBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingHorizontal: 32,
    paddingVertical: 16,
    ...SHADOW.primary,
  },
  browseBtnText: { color: '#fff', fontWeight: '700', fontSize: FONTS.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40, height: 40,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  backText: { color: COLORS.text, fontSize: 20 },
  headerTitle: { fontSize: FONTS.xl, fontWeight: '700', color: COLORS.text },
  clearText: { fontSize: FONTS.md, color: COLORS.primary, fontWeight: '600' },
  scroll: { paddingHorizontal: 20 },
  restaurantLabel: {
    backgroundColor: COLORS.primaryGlow,
    borderWidth: 1,
    borderColor: 'rgba(230,57,70,0.2)',
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 16,
  },
  restaurantLabelText: { color: COLORS.textSub, fontSize: FONTS.sm, fontWeight: '600' },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  itemEmoji: { fontSize: 36 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: FONTS.md, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  itemPrice: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.primary },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  qtyBtn: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { color: COLORS.primary, fontSize: FONTS.lg, fontWeight: '800' },
  qtyNum: { width: 24, textAlign: 'center', color: COLORS.text, fontWeight: '700' },
  addMoreBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  addMoreText: { color: COLORS.primary, fontWeight: '600', fontSize: FONTS.md },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  promoIcon: { fontSize: 20 },
  promoPlaceholder: { flex: 1, color: COLORS.textMuted, fontSize: FONTS.md },
  promoApply: { color: COLORS.primary, fontWeight: '700', fontSize: FONTS.md },
  bill: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  billTitle: { fontSize: FONTS.lg, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  billLabel: { fontSize: FONTS.sm, color: COLORS.textMuted },
  billValue: { fontSize: FONTS.sm, color: COLORS.textSub, fontWeight: '600' },
  billTotal: { borderTopWidth: 1, borderTopColor: COLORS.border, marginTop: 4, paddingTop: 12, marginBottom: 0 },
  billTotalLabel: { fontSize: FONTS.lg, fontWeight: '700', color: COLORS.text },
  billTotalValue: { fontSize: FONTS.lg, fontWeight: '800', color: COLORS.primary },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 36,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOW.primary,
  },
  checkoutBtnText: { color: '#fff', fontSize: FONTS.md, fontWeight: '700' },
  checkoutBtnPrice: { color: '#fff', fontSize: FONTS.md, fontWeight: '800' },
});
