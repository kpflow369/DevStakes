import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { COLORS, FONTS, RADIUS, SHADOW } from '../data/theme';

const PAYMENT_METHODS = [
  { id: 'crypto', label: 'Crypto Wallet', icon: '₿', sub: 'ETH, USDT, BNB' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', sub: 'Visa, Mastercard, Rupay' },
  { id: 'upi', label: 'UPI', icon: '📱', sub: 'GPay, PhonePe, Paytm' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', sub: 'Pay when delivered' },
];

export default function CheckoutScreen({ route, navigation }) {
  const { total } = route.params;
  const { clearCart, restaurantName } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      setLoading(false);
      navigation.replace('OrderTracking', {
        orderId: 'ORD-' + Math.floor(Math.random() * 9000 + 1000),
        total,
        restaurant: restaurantName,
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Delivery address */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.addressCard}>
          <View style={styles.addressIconBg}>
            <Text style={styles.addressIcon}>🏠</Text>
          </View>
          <View style={styles.addressInfo}>
            <Text style={styles.addressName}>Home</Text>
            <Text style={styles.addressText}>Hazratganj, Lucknow, Uttar Pradesh 226001</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery time */}
        <Text style={styles.sectionTitle}>Delivery Time</Text>
        <View style={styles.timeRow}>
          {['ASAP (25 min)', 'Schedule'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.timeChip, option.includes('ASAP') && styles.timeChipActive]}
            >
              <Text
                style={[
                  styles.timeChipText,
                  option.includes('ASAP') && styles.timeChipTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment methods */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {PAYMENT_METHODS.map((pm) => (
          <TouchableOpacity
            key={pm.id}
            style={[styles.paymentCard, selectedPayment === pm.id && styles.paymentCardActive]}
            onPress={() => setSelectedPayment(pm.id)}
            activeOpacity={0.85}
          >
            <Text style={styles.paymentIcon}>{pm.icon}</Text>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentLabel}>{pm.label}</Text>
              <Text style={styles.paymentSub}>{pm.sub}</Text>
            </View>
            <View
              style={[
                styles.radioOuter,
                selectedPayment === pm.id && styles.radioOuterActive,
              ]}
            >
              {selectedPayment === pm.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

        {/* Order summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Restaurant</Text>
            <Text style={styles.summaryValue}>{restaurantName}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment via</Text>
            <Text style={styles.summaryValue}>
              {PAYMENT_METHODS.find((p) => p.id === selectedPayment)?.label}
            </Text>
          </View>
          <View style={[styles.summaryRow, { marginBottom: 0 }]}>
            <Text style={styles.summaryTotalLabel}>Grand Total</Text>
            <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Place order */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.placeOrderText}>Place Order</Text>
              <Text style={styles.placeOrderPrice}>${total.toFixed(2)}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  scroll: { paddingHorizontal: 20, paddingTop: 8 },
  sectionTitle: {
    fontSize: FONTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    marginTop: 20,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  addressIconBg: {
    width: 44, height: 44,
    backgroundColor: COLORS.primaryGlow,
    borderRadius: RADIUS.md,
    alignItems: 'center', justifyContent: 'center',
  },
  addressIcon: { fontSize: 22 },
  addressInfo: { flex: 1 },
  addressName: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  addressText: { fontSize: FONTS.sm, color: COLORS.textMuted, lineHeight: 18 },
  changeText: { color: COLORS.primary, fontWeight: '600', fontSize: FONTS.sm },
  timeRow: { flexDirection: 'row', gap: 10 },
  timeChip: {
    flex: 1, paddingVertical: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border,
  },
  timeChipActive: { backgroundColor: COLORS.primaryGlow, borderColor: COLORS.primary },
  timeChipText: { color: COLORS.textMuted, fontWeight: '600', fontSize: FONTS.sm },
  timeChipTextActive: { color: COLORS.primary },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: 12,
  },
  paymentCardActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryGlow },
  paymentIcon: { fontSize: 28 },
  paymentInfo: { flex: 1 },
  paymentLabel: { fontSize: FONTS.md, fontWeight: '600', color: COLORS.text, marginBottom: 2 },
  paymentSub: { fontSize: FONTS.xs, color: COLORS.textMuted },
  radioOuter: {
    width: 22, height: 22,
    borderRadius: 11,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterActive: { borderColor: COLORS.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: FONTS.sm, color: COLORS.textMuted },
  summaryValue: { fontSize: FONTS.sm, color: COLORS.textSub, fontWeight: '600' },
  summaryTotalLabel: { fontSize: FONTS.lg, fontWeight: '700', color: COLORS.text },
  summaryTotalValue: { fontSize: FONTS.lg, fontWeight: '800', color: COLORS.primary },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, paddingBottom: 36,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  placeOrderBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOW.primary,
  },
  placeOrderText: { color: '#fff', fontSize: FONTS.md, fontWeight: '700' },
  placeOrderPrice: { color: '#fff', fontSize: FONTS.md, fontWeight: '800' },
});
