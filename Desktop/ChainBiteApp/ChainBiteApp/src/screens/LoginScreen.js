import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOW } from '../data/theme';

export default function LoginScreen({ navigation }) {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const otpRefs = useRef([]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [step]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
      setStep('otp');
      setCountdown(30);
    }, 1500);
  };

  const handleOtpChange = (val, index) => {
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('MainTabs');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <View style={styles.glowCircle} />

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => (step === 'otp' ? setStep('phone') : navigation.goBack())}
      >
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <Animated.View
        style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        {step === 'phone' ? (
          <>
            <Text style={styles.stepLabel}>STEP 1 OF 2</Text>
            <Text style={styles.title}>Enter your{'\n'}phone number</Text>
            <Text style={styles.subtitle}>
              We'll send you a one-time verification code
            </Text>

            <View style={styles.inputGroup}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="98765 43210"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
                selectionColor={COLORS.primary}
              />
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, phone.length < 10 && styles.btnDisabled]}
              onPress={handleSendOtp}
              activeOpacity={0.85}
              disabled={phone.length < 10 || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryBtnText}>Send OTP →</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialIcon}>🍎</Text>
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialIcon}>🌐</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.stepLabel}>STEP 2 OF 2</Text>
            <Text style={styles.title}>Verify your{'\n'}number</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to +91 {phone}
            </Text>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(r) => (otpRefs.current[index] = r)}
                  style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                  value={digit}
                  onChangeText={(v) => handleOtpChange(v, index)}
                  onKeyPress={(e) => handleOtpKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  selectionColor={COLORS.primary}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.primaryBtn,
                otp.join('').length < 6 && styles.btnDisabled,
              ]}
              onPress={handleVerify}
              activeOpacity={0.85}
              disabled={otp.join('').length < 6 || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryBtnText}>Verify & Continue →</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (countdown === 0) {
                  setCountdown(30);
                }
              }}
              disabled={countdown > 0}
            >
              <Text style={[styles.resendText, countdown > 0 && styles.resendDisabled]}>
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  glowCircle: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.primaryGlow,
    bottom: -60,
    right: -60,
  },
  backBtn: {
    marginBottom: 32,
  },
  backBtnText: {
    color: COLORS.textMuted,
    fontSize: FONTS.md,
  },
  content: {
    flex: 1,
  },
  stepLabel: {
    fontSize: FONTS.xs,
    color: COLORS.primary,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  title: {
    fontSize: FONTS.xxxl,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 40,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: FONTS.md,
    color: COLORS.textMuted,
    marginBottom: 36,
    lineHeight: 22,
  },
  inputGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  countryCode: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  countryCodeText: {
    color: COLORS.text,
    fontSize: FONTS.md,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: COLORS.text,
    fontSize: FONTS.lg,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
    ...SHADOW.primary,
  },
  btnDisabled: {
    backgroundColor: '#3a1015',
    shadowOpacity: 0,
  },
  primaryBtnText: {
    color: COLORS.text,
    fontSize: FONTS.lg,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sm,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
  },
  socialIcon: {
    fontSize: 18,
  },
  socialText: {
    color: COLORS.text,
    fontSize: FONTS.md,
    fontWeight: '600',
  },
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
    justifyContent: 'center',
  },
  otpBox: {
    width: 48,
    height: 56,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    color: COLORS.text,
    fontSize: FONTS.xl,
    fontWeight: '700',
  },
  otpBoxFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryGlow,
  },
  resendText: {
    color: COLORS.primary,
    fontSize: FONTS.md,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  resendDisabled: {
    color: COLORS.textMuted,
  },
});
