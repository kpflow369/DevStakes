import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { COLORS, FONTS, RADIUS } from '../data/theme';

const MENU_ITEMS = [
  { icon: '📦', label: 'My Orders', sub: 'View order history', screen: 'Orders' },
  { icon: '📍', label: 'Saved Addresses', sub: 'Home, Work & more', screen: null },
  { icon: '💳', label: 'Payment Methods', sub: 'Cards, UPI, Wallets', screen: null },
  { icon: '🎁', label: 'Offers & Vouchers', sub: '2 active offers', screen: null },
  { icon: '⭐', label: 'Favorites', sub: '5 saved restaurants', screen: null },
  { icon: '🔔', label: 'Notifications', sub: 'Manage alerts', screen: null },
  { icon: '🛡️', label: 'Privacy Policy', sub: 'How we use your data', screen: null },
  { icon: '📞', label: 'Help & Support', sub: '24/7 customer care', screen: null },
];

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.headerTitle}>Profile</Text>

        {/* Avatar card */}
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View style={styles.avatarInfo}>
            <Text style={styles.avatarName}>ChainBite User</Text>
            <Text style={styles.avatarPhone}>+91 98765 43210</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Web3 wallet card */}
        <View style={styles.walletCard}>
          <View style={styles.walletLeft}>
            <Text style={styles.walletTitle}>⛓️ Web3 Wallet</Text>
            <Text style={styles.walletAddress}>0x1a2b...3c4d</Text>
          </View>
          <View style={styles.walletRight}>
            <Text style={styles.walletBalance}>0.04 ETH</Text>
            <Text style={styles.walletLabel}>Balance</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>23</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>4</Text>
            <Text style={styles.statLabel}>NFTs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>1240</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuRow,
                index < MENU_ITEMS.length - 1 && styles.menuRowBorder,
              ]}
              onPress={() => item.screen && navigation.navigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBg}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Welcome')}
        >
          <Text style={styles.logoutText}>🚪 Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>ChainBite v1.0.0 · Powered by Web3</Text>
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 20 },
  headerTitle: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.text, marginBottom: 20 },
  avatarCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl, padding: 16,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 14, gap: 14,
  },
  avatarCircle: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: COLORS.primaryGlow,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(230,57,70,0.3)',
  },
  avatarEmoji: { fontSize: 30 },
  avatarInfo: { flex: 1 },
  avatarName: { fontSize: FONTS.lg, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  avatarPhone: { fontSize: FONTS.sm, color: COLORS.textMuted },
  editBtn: {
    borderWidth: 1, borderColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16, paddingVertical: 7,
  },
  editBtnText: { color: COLORS.primary, fontWeight: '600', fontSize: FONTS.sm },
  walletCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.primaryGlow,
    borderWidth: 1, borderColor: 'rgba(230,57,70,0.25)',
    borderRadius: RADIUS.lg, padding: 16, marginBottom: 14,
  },
  walletTitle: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  walletAddress: { fontSize: FONTS.sm, color: COLORS.textMuted },
  walletRight: { alignItems: 'flex-end' },
  walletBalance: { fontSize: FONTS.xl, fontWeight: '800', color: COLORS.primary },
  walletLabel: { fontSize: FONTS.xs, color: COLORS.textMuted },
  statsRow: {
    flexDirection: 'row', backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 14, paddingVertical: 16,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: FONTS.xl, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: FONTS.xs, color: COLORS.textMuted, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: COLORS.border },
  menuCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl, borderWidth: 1, borderColor: COLORS.border,
    overflow: 'hidden', marginBottom: 16,
  },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 16, gap: 12,
  },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIconBg: {
    width: 38, height: 38, borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  menuIcon: { fontSize: 20 },
  menuText: { flex: 1 },
  menuLabel: { fontSize: FONTS.md, fontWeight: '600', color: COLORS.text, marginBottom: 2 },
  menuSub: { fontSize: FONTS.xs, color: COLORS.textMuted },
  menuArrow: { color: COLORS.textMuted, fontSize: 22 },
  logoutBtn: {
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    paddingVertical: 14, alignItems: 'center', marginBottom: 16,
  },
  logoutText: { color: COLORS.textMuted, fontWeight: '600', fontSize: FONTS.md },
  version: { textAlign: 'center', color: COLORS.textMuted, fontSize: FONTS.xs },
});
