import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../data/theme';

const STEPS = [
  { id: 1, label: 'Order Placed', icon: '✅', desc: 'We received your order' },
  { id: 2, label: 'Confirmed', icon: '🍳', desc: 'Restaurant is preparing' },
  { id: 3, label: 'On the Way', icon: '🛵', desc: 'Driver heading to you' },
  { id: 4, label: 'Delivered', icon: '🎉', desc: 'Enjoy your meal!' },
];

export default function OrderTrackingScreen({ route, navigation }) {
  const { orderId, total, restaurant } = route.params;
  const [currentStep, setCurrentStep] = useState(1);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  useEffect(() => {
    if (currentStep < 4) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const etaMinutes = Math.max(0, (4 - currentStep) * 8 + 5);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeText}>Home</Text>
        </TouchableOpacity>
      </View>

      {/* Order ID */}
      <View style={styles.orderIdCard}>
        <Text style={styles.orderIdLabel}>Order ID</Text>
        <Text style={styles.orderIdValue}>{orderId}</Text>
      </View>

      {/* Map placeholder */}
      <View style={styles.mapPlaceholder}>
        <Animated.Text
          style={[styles.mapIcon, { transform: [{ scale: pulseAnim }] }]}
        >
          🛵
        </Animated.Text>
        <Text style={styles.mapLabel}>Live tracking</Text>
        <Text style={styles.etaText}>
          {currentStep < 4 ? `ETA: ~${etaMinutes} mins` : 'Delivered! 🎉'}
        </Text>
      </View>

      {/* Steps */}
      <View style={styles.stepsCard}>
        {STEPS.map((step, index) => {
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;
          return (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.stepLeft}>
                <View
                  style={[
                    styles.stepCircle,
                    isDone && styles.stepCircleDone,
                    isActive && styles.stepCircleActive,
                  ]}
                >
                  <Text style={styles.stepCircleText}>
                    {isDone ? '✓' : step.icon}
                  </Text>
                </View>
                {index < STEPS.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      isDone && styles.stepLineDone,
                    ]}
                  />
                )}
              </View>
              <View style={styles.stepInfo}>
                <Text
                  style={[
                    styles.stepLabel,
                    isActive && styles.stepLabelActive,
                    isDone && styles.stepLabelDone,
                  ]}
                >
                  {step.label}
                </Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Driver info */}
      <View style={styles.driverCard}>
        <Text style={styles.driverEmoji}>👨‍🍳</Text>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>Rahul Kumar</Text>
          <Text style={styles.driverSub}>Your delivery partner</Text>
        </View>
        <TouchableOpacity style={styles.callBtn}>
          <Text style={styles.callBtnText}>📞 Call</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.ordersBtn}
        onPress={() => navigation.navigate('Orders')}
      >
        <Text style={styles.ordersBtnText}>View All Orders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 20, paddingTop: 52 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  headerTitle: { fontSize: FONTS.xl, fontWeight: '700', color: COLORS.text },
  homeText: { color: COLORS.primary, fontWeight: '600', fontSize: FONTS.md },
  orderIdCard: {
    backgroundColor: COLORS.primaryGlow,
    borderWidth: 1, borderColor: 'rgba(230,57,70,0.2)',
    borderRadius: RADIUS.md, padding: 12,
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  orderIdLabel: { fontSize: FONTS.sm, color: COLORS.textMuted },
  orderIdValue: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.primary },
  mapPlaceholder: {
    height: 160,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1, borderColor: COLORS.border,
  },
  mapIcon: { fontSize: 52, marginBottom: 8 },
  mapLabel: { fontSize: FONTS.sm, color: COLORS.textMuted, marginBottom: 4 },
  etaText: { fontSize: FONTS.lg, fontWeight: '700', color: COLORS.text },
  stepsCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl, padding: 20,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 16,
  },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  stepLeft: { alignItems: 'center', marginRight: 14, width: 40 },
  stepCircle: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  stepCircleActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryGlow },
  stepCircleDone: { borderColor: COLORS.success, backgroundColor: 'rgba(76,175,80,0.15)' },
  stepCircleText: { fontSize: 18 },
  stepLine: { width: 2, flex: 1, minHeight: 24, backgroundColor: COLORS.border, marginVertical: 4 },
  stepLineDone: { backgroundColor: COLORS.success },
  stepInfo: { flex: 1, paddingTop: 8, paddingBottom: 16 },
  stepLabel: { fontSize: FONTS.md, fontWeight: '600', color: COLORS.textMuted, marginBottom: 2 },
  stepLabelActive: { color: COLORS.primary },
  stepLabelDone: { color: COLORS.success },
  stepDesc: { fontSize: FONTS.sm, color: COLORS.textMuted },
  driverCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, padding: 16,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 16, gap: 12,
  },
  driverEmoji: { fontSize: 40 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.text },
  driverSub: { fontSize: FONTS.sm, color: COLORS.textMuted },
  callBtn: {
    backgroundColor: COLORS.primaryGlow,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16, paddingVertical: 8,
    borderWidth: 1, borderColor: 'rgba(230,57,70,0.3)',
  },
  callBtnText: { color: COLORS.primary, fontWeight: '700', fontSize: FONTS.sm },
  ordersBtn: {
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ordersBtnText: { color: COLORS.textSub, fontWeight: '600', fontSize: FONTS.md },
});
