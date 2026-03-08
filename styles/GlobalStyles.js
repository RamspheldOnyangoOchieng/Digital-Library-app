import { StyleSheet, Platform } from 'react-native';

export const colors = {
  background:      '#0D0F14',
  surface:         '#161B24',
  surfaceElevated: '#1E2535',
  primary:         '#4F8EF7',
  primaryLight:    '#7AADFF',
  accent:          '#F7C948',
  success:         '#4ECBA0',
  danger:          '#F7614F',
  textPrimary:     '#F0F4FF',
  textSecondary:   '#8A93A8',
  textMuted:       '#4A5568',
  border:          '#252D3F',
};

export function shadow(elev = 4) {
  if (Platform.OS === 'android') return { elevation: elev };
  return { shadowColor: '#000', shadowOffset: { width: 0, height: elev / 2 }, shadowOpacity: 0.25, shadowRadius: elev };
}

export const globalStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0D0F14' },
  sectionTitle: {
    fontSize: 12, fontWeight: '700', color: '#4A5568',
    letterSpacing: 2, textTransform: 'uppercase',
    marginBottom: 10, marginHorizontal: 16, marginTop: 22,
  },
  input: {
    backgroundColor: '#1E2535', borderRadius: 12,
    paddingVertical: Platform.OS === 'android' ? 10 : 14,
    paddingHorizontal: 16, color: '#F0F4FF', fontSize: 16,
    borderWidth: 1, borderColor: '#252D3F', marginBottom: 12,
  },
  label: {
    fontSize: 12, fontWeight: '600', color: '#4A5568',
    letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6, marginLeft: 4,
  },
});