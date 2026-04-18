import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../data/theme';

const { width, height } = Dimensions.get('window');

const FeatureCard = ({ emoji, title, subtitle, delay, fadeAnim }) => {
  return (
    <Animated.View style={[styles.featureCard, { opacity: fadeAnim }]}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSub}>{subtitle}</Text>
    </Animated.View>
  );
};

export default function WelcomeScreen({ navigation }) {
  const fadeTop = useRef(new Animated.Value(0)).current;
  const fadeCards = useRef(new Animated.Value(0)).current;
  const fadeBtn = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeTop, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeCards, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadeBtn, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Background glow */}
      <View style={styles.glowCircle} />
      <View style={styles.glowCircle2} />

      {/* Hero section */}
      <Animated.View style={[styles.hero, { opacity: fadeTop }]}>
        <View style={styles.logoRow}>
          <Text style={styles.logoEmoji}>⛓️</Text>
          <Text style={styles.logoText}>ChainBite</Text>
        </View>
        <Text style={styles.tagline}>Decentralized Food Delivery</Text>
        <Text style={styles.subtitle}>
          Order from top restaurants with zero commission.{'\n'}
          Powered by Web3 technology.
        </Text>
      </Animated.View>

      {/* Feature cards */}
      <Animated.View
        style={[
          styles.cardsRow,
          { opacity: fadeCards, transform: [{ translateY: slideY }] },
        ]}
      >
        <FeatureCard
          emoji="🚫"
          title="0%"
          subtitle="Commission"
          fadeAnim={fadeCards}
        />
        <FeatureCard
          emoji="🌐"
          title="Web3"
          subtitle="Powered"
          fadeAnim={fadeCards}
        />
        <FeatureCard
          emoji="🎨"
          title="NFT"
          subtitle="Rewards"
          fadeAnim={fadeCards}
        />
      </Animated.View>

      {/* Stats row */}
      <Animated.View style={[styles.statsRow, { opacity: fadeCards }]}>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>500+</Text>
          <Text style={styles.statLabel}>Restaurants</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>50K+</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>4.9★</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </Animated.View>

      {/* CTA */}
      <Animated.View style={[styles.ctaContainer, { opacity: fadeBtn }]}>
        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryBtnText}>Get Started →</Text>
        </TouchableOpacity>
        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  glowCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.primaryGlow,
    top: -80,
    right: -80,
  },
  glowCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(230,57,70,0.06)',
    bottom: 100,
    left: -60,
  },
  hero: {
    marginTop: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoEmoji: {
    fontSize: 36,
    marginRight: 10,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: FONTS.md,
    color: COLORS.primary,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: FONTS.md,
    color: COLORS.textMuted,
    lineHeight: 24,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: RADIUS.lg,
    padding: 16,
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: FONTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  featureSub: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: RADIUS.lg,
    paddingVertical: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: FONTS.xl,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.glassBorder,
  },
  ctaContainer: {
    alignItems: 'center',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
    ...SHADOW.primary,
  },
  primaryBtnText: {
    fontSize: FONTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  terms: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
