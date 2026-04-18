import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { orders } from '../data/mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../data/theme';

export default function OrdersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Orders</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('OrderTracking', {
                orderId: order.id,
                total: order.total,
                restaurant: order.restaurant,
              })
            }
          >
            <View style={styles.orderTop}>
              <View style={styles.restaurantRow}>
                <Text style={styles.orderEmoji}>{order.emoji}</Text>
                <View>
                  <Text style={styles.orderRestaurant}>{order.restaurant}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${order.statusColor}20` }]}>
                <Text style={[styles.statusText, { color: order.statusColor }]}>
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.orderBottom}>
              <View style={styles.itemsList}>
                {order.items.map((item, i) => (
                  <Text key={i} style={styles.itemText}>
                    {i === order.items.length - 1 ? item : `${item}, `}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.totalText}>${order.total.toFixed(2)}</Text>
              <TouchableOpacity style={styles.reorderBtn}>
                <Text style={styles.reorderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.emptyHint}>
          <Text style={styles.emptyHintEmoji}>🍽️</Text>
          <Text style={styles.emptyHintText}>Order more to see them here!</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseBtnText}>Browse Restaurants →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16,
  },
  headerTitle: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.text },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  orderCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
  },
  orderTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  restaurantRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  orderEmoji: { fontSize: 40 },
  orderRestaurant: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  orderDate: { fontSize: FONTS.sm, color: COLORS.textMuted },
  statusBadge: {
    borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 4,
  },
  statusText: { fontSize: FONTS.xs, fontWeight: '700' },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },
  orderBottom: { marginBottom: 12 },
  itemsList: { flexDirection: 'row', flexWrap: 'wrap' },
  itemText: { fontSize: FONTS.sm, color: COLORS.textMuted },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalText: { fontSize: FONTS.lg, fontWeight: '800', color: COLORS.text },
  reorderBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingHorizontal: 20, paddingVertical: 8,
    ...SHADOW.primary,
  },
  reorderText: { color: '#fff', fontWeight: '700', fontSize: FONTS.sm },
  emptyHint: {
    alignItems: 'center', paddingVertical: 32,
  },
  emptyHintEmoji: { fontSize: 48, marginBottom: 12 },
  emptyHintText: { fontSize: FONTS.md, color: COLORS.textMuted, marginBottom: 16 },
  browseBtn: {
    borderWidth: 1, borderColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingHorizontal: 24, paddingVertical: 12,
  },
  browseBtnText: { color: COLORS.primary, fontWeight: '600', fontSize: FONTS.md },
});
