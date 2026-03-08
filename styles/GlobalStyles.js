import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0D0F14',
  surface: '#161B24',
  surfaceElevated: '#1E2535',
  primary: '#4F8EF7',
  primaryLight: '#7AADFF',
  accent: '#F7C948',
  success: '#4ECBA0',
  danger: '#F7614F',
  textPrimary: '#F0F4FF',
  textSecondary: '#8A93A8',
  textMuted: '#4A5568',
  border: '#252D3F',
};

export const typography = {
  heading: {
    fontFamily: 'serif',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  body: {
    fontFamily: 'System',
    color: colors.textSecondary,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginHorizontal: 16,
    marginTop: 24,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: colors.textPrimary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
    marginLeft: 4,
  },
});
